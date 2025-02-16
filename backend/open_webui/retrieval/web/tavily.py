import logging
from typing import Optional

import requests
from open_webui.retrieval.web.main import SearchResult, SearchParameters
from open_webui.env import SRC_LOG_LEVELS

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["RAG"])


def search_tavily(
    params : SearchParameters,
    api_key : str,
    # **kwargs,
) -> list[SearchResult]:
    """Search using Tavily's Search API and return the results as a list of SearchResult objects.

    Args:
        api_key (str): A Tavily Search API key
        query (str): The query to search for

    Returns:
        list[SearchResult]: A list of search results
    """
    url = "https://api.tavily.com/search"
    data = {"query": params.query, "api_key": api_key}
    response = requests.post(url, params.domains_allow, json=data)
    response.raise_for_status()

    json_response = response.json()

    raw_search_results = json_response.get("results", [])

    return [
        SearchResult(
            link=result["url"],
            title=result.get("title", ""),
            snippet=result.get("content"),
        )
        for result in raw_search_results[:count]
    ]
