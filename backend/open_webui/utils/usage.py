import json
import logging
from decimal import Decimal
from typing import List, Union

import tiktoken
from fastapi import HTTPException, Request
from openai.types import CompletionUsage
from openai.types.chat import ChatCompletion, ChatCompletionChunk
from pydantic import BaseModel, ConfigDict
from tiktoken import Encoding

from open_webui.env import SRC_LOG_LEVELS
from open_webui.models.credits import AddCreditForm, Credits, SetCreditFormDetail
from open_webui.models.models import Models
from open_webui.models.users import UserModel

logger = logging.getLogger(__name__)
logger.setLevel(SRC_LOG_LEVELS["MAIN"])


class MessageItem(BaseModel):
    model_config = ConfigDict(extra="allow")

    role: str
    content: str


class Calculator:
    """
    Usage Calculator
    """

    def __init__(self) -> None:
        self._encoder = {}

    def get_encoder(
        self,
        model_id: str,
        model_prefix_to_remove: str = "",
        default_model_for_encoding: str = "gpt-4o",
    ) -> Encoding:
        # remove prefix
        model_id_ops = model_id
        if model_prefix_to_remove:
            model_id_ops = model_id.lstrip(model_prefix_to_remove)
        # load from cache
        if model_id_ops in self._encoder:
            return self._encoder[model_id_ops]
        # load from tiktoken
        try:
            self._encoder[model_id_ops] = tiktoken.encoding_for_model(model_id_ops)
        except KeyError:
            return self.get_encoder(default_model_for_encoding)
        return self.get_encoder(model_id)

    def calculate_usage(
        self,
        model_id: str,
        messages: List[dict],
        response: Union[ChatCompletion, ChatCompletionChunk],
        model_prefix_to_remove: str = "",
        default_model_for_encoding: str = "gpt-4o",
    ) -> (bool, CompletionUsage):
        try:
            # usage
            if response.usage is not None:
                return True, response.usage
            # init
            messages = [MessageItem.model_validate(message) for message in messages]
            # calculate
            encoder = self.get_encoder(
                model_id=model_id,
                model_prefix_to_remove=model_prefix_to_remove,
                default_model_for_encoding=default_model_for_encoding,
            )
            usage = CompletionUsage(
                prompt_tokens=0, completion_tokens=0, total_tokens=0
            )
            # prompt tokens
            for message in messages:
                usage.prompt_tokens += len(encoder.encode(message.content or ""))
            # completion tokens
            choices = response.choices
            if choices:
                choice = choices[0]
                if isinstance(response, ChatCompletion):
                    usage.completion_tokens = len(
                        encoder.encode(choice.message.content or "")
                    )
                elif isinstance(response, ChatCompletionChunk):
                    usage.completion_tokens = len(
                        encoder.encode(choice.delta.content or "")
                    )
            # total tokens
            usage.total_tokens = usage.prompt_tokens + usage.completion_tokens
            return False, usage
        except Exception as err:
            logger.exception("[calculate_usage] failed: %s", err)
            raise err


calculator = Calculator()


class CreditDeduct:
    """
    Deduct Credit

    Must be used as following, so __exit__ will be called on exit

    with CreditDeduct(xxx) as credit_deduct:
        credit_deduct.run(xxx)
    """

    def __init__(
        self,
        request: Request,
        user: UserModel,
        model: dict,
        body: dict,
        is_stream: bool,
    ) -> None:
        self.request = request
        self.user = user
        self.model = model
        self.body = body
        self.is_stream = is_stream
        self.usage = CompletionUsage(
            prompt_tokens=0, completion_tokens=0, total_tokens=0
        )
        self.prompt_unit_price, self.completion_unit_price = self.get_model_price()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        prompt_price = self.prompt_unit_price * self.usage.prompt_tokens / 1000 / 1000
        completion_price = (
            self.completion_unit_price * self.usage.completion_tokens / 1000 / 1000
        )
        total_price = prompt_price + completion_price
        Credits.add_credit_by_user_id(
            form_data=AddCreditForm(
                user_id=self.user.id,
                amount=Decimal(-total_price),
                detail=SetCreditFormDetail(
                    usage={
                        "prompt_unit_price": float(self.prompt_unit_price),
                        "completion_unit_price": float(self.completion_unit_price),
                        **self.usage.model_dump(),
                    },
                    api_path=str(self.request.url),
                    api_params={"model": self.model, "is_stream": self.is_stream},
                    desc=f"updated by {self.__class__.__name__}",
                ),
            )
        )
        logger.info(
            "[credit_deduct] user: %s; tokens: %d %d; cost: %s",
            self.user.id,
            self.usage.prompt_tokens,
            self.usage.completion_tokens,
            total_price,
        )

    def get_model_price(self) -> (Decimal, Decimal):
        model = Models.get_model_by_id(self.model["id"])
        if model is None:
            return Decimal("0"), Decimal("0")
        model_price = model.price or {}
        return Decimal(model_price.get("prompt_price", "0")), Decimal(
            model_price.get("completion_price", "0")
        )

    def run(self, response: Union[dict, bytes]) -> None:
        if not isinstance(response, (dict, bytes)):
            logger.warning("[credit_deduct] response is type of %s", type(response))
            return
        # prompt messages
        messages = self.body.get("messages", [])
        if not messages:
            raise HTTPException(status_code=400, detail="prompt messages is empty")
        # stream
        if self.is_stream:
            _response = response.decode("utf-8").strip().lstrip("data: ")
            if not _response or _response.startswith("[DONE]"):
                return
            try:
                _response = json.loads(_response)
            except json.decoder.JSONDecodeError:
                logger.error("[credit_deduct] json decode error: %s", _response)
                return
            _response["object"] = "chat.completion.chunk"
            response = ChatCompletionChunk.model_validate(_response)
        else:
            response = ChatCompletion.model_validate(response)
        # usage
        is_official_usage, usage = calculator.calculate_usage(
            model_id=self.model["id"],
            messages=messages,
            response=response,
            model_prefix_to_remove=self.request.app.state.config.USAGE_CALCULATE_MODEL_PREFIX_TO_REMOVE,
            default_model_for_encoding=self.request.app.state.config.USAGE_DEFAULT_ENCODING_MODEL,
        )
        if is_official_usage:
            self.usage = usage
            return
        if self.is_stream:
            self.usage.prompt_tokens = usage.prompt_tokens
            self.usage.completion_tokens += usage.completion_tokens
            self.usage.total_tokens = (
                self.usage.prompt_tokens + self.usage.completion_tokens
            )
            return
        self.usage = usage
