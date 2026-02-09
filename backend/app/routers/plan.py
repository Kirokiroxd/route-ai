from fastapi import APIRouter
from pydantic import BaseModel
from app.services.osrm import get_routes
from app.services.fuel import estimate_fuel
from app.services.risk_stub import score_route_risk

router = APIRouter()

class PlanRequest(BaseModel):
    origin: list[float]        # [lon, lat]
    destination: list[float]   # [lon, lat]
    liters_per_100km: float = 8.5
    fuel_price: float = 0.0

@router.post("/plan")
def plan(req: PlanRequest):
    data = get_routes(req.origin, req.destination, alternatives=True)

    results = []
    for r in data["routes"]:
        dist = r["distance"]
        dur = r["duration"]
        fuel = estimate_fuel(dist, req.liters_per_100km, req.fuel_price)
        risk = score_route_risk(dur, dist)

        results.append({
            "distance_m": dist,
            "duration_s": dur,
            "fuel": fuel,
            "risk": risk,
            "geometry": r["geometry"],  # GeoJSON LineString
        })

    # ordena por: menor costo si hay precio, sino menor litros, sino menor tiempo
    results_sorted = sorted(
        results,
        key=lambda x: (
            (x["fuel"]["cost"] if x["fuel"]["cost"] is not None else x["fuel"]["liters"]),
            x["duration_s"]
        )
    )

    return {"routes": results_sorted}
