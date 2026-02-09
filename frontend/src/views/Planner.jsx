import { useState } from "react";
import { planRoute } from "../api";
import MapView from "../components/MapView";

export default function Planner() {
  const [origin, setOrigin] = useState("-78.50,-0.20"); // lon,lat
  const [destination, setDestination] = useState("-78.48,-0.18");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const center = [-0.20, -78.50]; // lat, lon

  async function onPlan() {
    setLoading(true);
    try {
      const [oLon, oLat] = origin.split(",").map(Number);
      const [dLon, dLat] = destination.split(",").map(Number);

      const body = {
        origin: [oLon, oLat],
        destination: [dLon, dLat],
        liters_per_100km: 8.5,
        fuel_price: 2.6
      };

      const data = await planRoute(body);
      setRoutes(data.routes);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: "Arial" }}>
      <h2>RouteAI – rutas con menor consumo + riesgo (MVP)</h2>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div>
          <label>Origen (lon,lat)</label><br />
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} style={{ width: 220 }} />
        </div>
        <div>
          <label>Destino (lon,lat)</label><br />
          <input value={destination} onChange={(e) => setDestination(e.target.value)} style={{ width: 220 }} />
        </div>
        <div style={{ display: "flex", alignItems: "end" }}>
          <button onClick={onPlan} disabled={loading}>
            {loading ? "Calculando..." : "Calcular rutas"}
          </button>
        </div>
      </div>

      {routes.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>Alternativas</h3>
          {routes.map((r, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <b>Ruta {i + 1}</b> — {(r.distance_m / 1000).toFixed(1)} km — {(r.duration_s / 60).toFixed(0)} min —
              {` ${r.fuel.liters.toFixed(2)} L`} —
              {r.fuel.cost ? ` $${r.fuel.cost.toFixed(2)}` : ""} —
              <span> Riesgo: {r.risk.level} ({r.risk.prob})</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <MapView routes={routes} center={center} />
      </div>

      <p style={{ marginTop: 10, opacity: 0.8 }}>
        Nota: el riesgo por ahora es “stub” (reglas). Luego se reemplaza por el modelo entrenado.
      </p>
    </div>
  );
}
