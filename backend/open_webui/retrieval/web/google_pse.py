import logging
from typing import Optional

import requests
from open_webui.retrieval.web.main import SearchResult, get_filtered_results, SearchParameters
from open_webui.env import SRC_LOG_LEVELS

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["RAG"])


def search_google_pse(
    params : SearchParameters,
    api_key : str,
    search_engine_id : str,
) -> list[SearchResult]:
    """Search using Google's Programmable Search Engine API and return the results as a list of SearchResult objects.
    Handles pagination for counts greater than 10.

    Args expected in params:
        api_key (str): A Programmable Search Engine API key
        search_engine_id (str): A Programmable Search Engine ID
        params.query (str): The query to search for
        params.count (int): The number of results to return (max 100, as PSE max results per query is 10 and max page is 10)

    Returns:
        list[SearchResult]: A list of SearchResult objects.
    """
    url = "https://www.googleapis.com/customsearch/v1"
    headers = {"Content-Type": "application/json"}
    all_results = []
    start_index = 1  # Google PSE start parameter is 1-based

    count = params.count
    while count > 0:
        num_results_this_page = min(count, 10)  # Google PSE max results per page is 10
        params = {
            "cx": search_engine_id,
            "q": params.query,
            "key": api_key,
            "num": num_results_this_page,
            "start": start_index,
        }
        response = requests.request("GET", url, headers=headers, params=params)
        response.raise_for_status()
        json_response = response.json()
        results = json_response.get("items", [])
        if results:  # check if results are returned. If not, no more pages to fetch.
            all_results.extend(results)
            count -= len(
                results
            )  # Decrement count by the number of results fetched in this page.
            start_index += 10  # Increment start index for the next page
        else:
            break  # No more results from Google PSE, break the loop

    all_results = get_filtered_results(all_results, params)
    return [
        SearchResult(
            link=result["link"],
            title=result.get("title"),
            snippet=result.get("snippet"),
        )
        for result in all_results
    ]
