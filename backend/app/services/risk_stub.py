def score_route_risk(route_duration_s: float, route_distance_m: float):
    # Heurística aun básica:
    km = route_distance_m / 1000.0
    minutes = route_duration_s / 60.0

    base = (km * 0.02) + (minutes * 0.01)  # escala suave
    prob = min(0.85, max(0.05, base))

    if prob < 0.25:
        level = "bajo"
    elif prob < 0.50:
        level = "medio"
    else:
        level = "alto"

    return {"prob": round(prob, 3), "level": level}
