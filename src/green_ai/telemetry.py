import aiohttp
from typing import List, Dict

async def poll(endpoint: str, metrics: List[str]) -> Dict[str, float]:
    """Fetch metric values from a Prometheus endpoint.

    Parameters
    ----------
    endpoint: str
        Base URL of the Prometheus server.
    metrics: list[str]
        Prometheus metric names to query.

    Returns
    -------
    dict[str, float]
        Mapping of metric name to latest value. Missing metrics return 0.0.
    """
    results: Dict[str, float] = {}
    async with aiohttp.ClientSession() as session:
        for metric in metrics:
            url = f"{endpoint}/api/v1/query"
            params = {"query": metric}
            try:
                async with session.get(url, params=params) as resp:
                    data = await resp.json()
                    value = 0.0
                    if data.get("data", {}).get("result"):
                        value = float(data["data"]["result"][0]["value"][1])
                    results[metric] = value
            except Exception:
                results[metric] = 0.0
    return results
