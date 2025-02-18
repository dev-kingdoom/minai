from open_webui.utils.task import prompt_template, prompt_variables_template
from open_webui.utils.misc import (
    add_or_update_system_message,
)

from typing import Callable, Optional


# inplace function: form_data is modified
def apply_model_system_prompt_to_body(
    params: dict, form_data: dict, metadata: Optional[dict] = None, user=None
) -> dict:
    system = params.get("system", None)
    if not system:
        return form_data

    # Metadata (WebUI Usage)
    if metadata:
        variables = metadata.get("variables", {})
        if variables:
            system = prompt_variables_template(system, variables)

    # Legacy (API Usage)
    if user:
        template_params = {
            "user_name": user.name,
            "user_location": user.info.get("location") if user.info else None,
        }
    else:
        template_params = {}

    system = prompt_template(system, **template_params)

    form_data["messages"] = add_or_update_system_message(
        system, form_data.get("messages", [])
    )
    return form_data


# inplace function: form_data is modified
def apply_model_params_to_body(
    params: dict, form_data: dict, mappings: dict[str, Callable]
) -> dict:
    if not params:
        return form_data

    for key, cast_func in mappings.items():
        if (value := params.get(key)) is not None:
            form_data[key] = cast_func(value)

    return form_data


# inplace function: form_data is modified
def apply_model_params_to_body_openai(params: dict, form_data: dict) -> dict:
    mappings = {
        "temperature": float,
        "top_p": float,
        "max_tokens": int,
        "frequency_penalty": float,
        "reasoning_effort": str,
        "seed": lambda x: x,
        "stop": lambda x: [bytes(s, "utf-8").decode("unicode_escape") for s in x],
    }
    return apply_model_params_to_body(params, form_data, mappings)


def apply_model_params_to_body_ollama(params: dict, form_data: dict) -> dict:
    # Convert OpenAI parameter names to Ollama parameter names if needed.
    name_differences = {
        "max_tokens": "num_predict",
    }
    
    for key, value in name_differences.items():
        if (param := params.get(key, None)) is not None:
            # Copy the parameter to new name then delete it, to prevent Ollama warning of invalid option provided
            params[value] = params[key]
            del params[key]

    # See https://github.com/ollama/ollama/blob/main/docs/api.md#request-8
    mappings = {
        "temperature": float,
        "top_p": float,
        "seed": lambda x: x,
        "mirostat": int,
        "mirostat_eta": float,
        "mirostat_tau": float,
        "num_ctx": int,
        "num_batch": int,
        "num_keep": int,
        "num_predict": int,
        "repeat_last_n": int,
        "top_k": int,
        "min_p": float,
        "typical_p": float,
        "repeat_penalty": float,
        "presence_penalty": float,
        "frequency_penalty": float,
        "penalize_newline": bool,
        "stop": lambda x: [bytes(s, "utf-8").decode("unicode_escape") for s in x],
        "numa": bool,
        "num_gpu": int,
        "main_gpu": int,
        "low_vram": bool,
        "vocab_only": bool,
        "use_mmap": bool,
        "use_mlock": bool,
        "num_thread": int,
    }

    return apply_model_params_to_body(params, form_data, mappings)


def convert_messages_openai_to_ollama(messages: list[dict]) -> list[dict]:
    ollama_messages = []

    for message in messages:
        # Initialize the new message structure with the role
        new_message = {"role": message["role"]}

        content = message.get("content", [])

        # Check if the content is a string (just a simple message)
        if isinstance(content, str):
            # If the content is a string, it's pure text
            new_message["content"] = content
        else:
            # Otherwise, assume the content is a list of dicts, e.g., text followed by an image URL
            content_text = ""
            images = []

            # Iterate through the list of content items
            for item in content:
                # Check if it's a text type
                if item.get("type") == "text":
                    content_text += item.get("text", "")

                # Check if it's an image URL type
                elif item.get("type") == "image_url":
                    img_url = item.get("image_url", {}).get("url", "")
                    if img_url:
                        # If the image url starts with data:, it's a base64 image and should be trimmed
                        if img_url.startswith("data:"):
                            img_url = img_url.split(",")[-1]
                        images.append(img_url)

            # Add content text (if any)
            if content_text:
                new_message["content"] = content_text.strip()

            # Add images (if any)
            if images:
                new_message["images"] = images

        # Append the new formatted message to the result
        ollama_messages.append(new_message)

    return ollama_messages


def convert_payload_openai_to_ollama(openai_payload: dict) -> dict:
    """
    Converts a payload formatted for OpenAI's API to be compatible with Ollama's API endpoint for chat completions.

    Args:
        openai_payload (dict): The payload originally designed for OpenAI API usage.

    Returns:
        dict: A modified payload compatible with the Ollama API.
    """
    ollama_payload = {}

    # Mapping basic model and message details
    ollama_payload["model"] = openai_payload.get("model")
    ollama_payload["messages"] = convert_messages_openai_to_ollama(
        openai_payload.get("messages")
    )
    ollama_payload["stream"] = openai_payload.get("stream", False)

    if "tools" in openai_payload:
        ollama_payload["tools"] = openai_payload["tools"]

    if "format" in openai_payload:
        ollama_payload["format"] = openai_payload["format"]

    if openai_payload.get("options"):
        ollama_options = openai_payload["options"]
        ollama_payload["options"] = ollama_options
        
        # Mapping OpenAI's `max_tokens` -> Ollama's `num_predict`
        if "max_tokens" in ollama_options:
            ollama_options["num_predict"] = ollama_options["max_tokens"] 
            del ollama_options["max_tokens"] # To prevent Ollama warning of invalid option provided
        
        # Ollama lacks a "system" prompt option. It has to be provided as a direct parameter, so we copy it down.
        if "system" in ollama_options:
            ollama_payload["system"] = ollama_options["system"] 
            del ollama_options["system"] # To prevent Ollama warning of invalid option provided

    if "metadata" in openai_payload:
        ollama_payload["metadata"] = openai_payload["metadata"]

    return ollama_payload
