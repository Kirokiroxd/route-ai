export async function planRoute(body) {
  const res = await fetch("http://localhost:8000/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Error al planificar ruta");
  return res.json();
}
