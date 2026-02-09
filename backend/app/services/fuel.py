def estimate_fuel(distance_m: float, liters_per_100km: float = 8.5, fuel_price: float = 0.0):
    km = distance_m / 1000.0
    liters = km * (liters_per_100km / 100.0)
    cost = liters * fuel_price if fuel_price > 0 else None
    return {"km": km, "liters": liters, "cost": cost}
