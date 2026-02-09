import requests

OSRM_URL = "http://osrm:5000"

def get_routes(origin, destination, alternatives=True):
    o_lon, o_lat = origin
    d_lon, d_lat = destination
    url = (
        f"{OSRM_URL}/route/v1/driving/"
        f"{o_lon},{o_lat};{d_lon},{d_lat}"
        f"?overview=full&geometries=geojson&alternatives={'true' if alternatives else 'false'}&steps=true"
    )
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    return r.json()
