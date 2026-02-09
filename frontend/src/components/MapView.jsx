import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ routes, center }) {
  const polylines = (routes || []).map((r) =>
    r.geometry.coordinates.map(([lon, lat]) => [lat, lon])
  );

  return (
    <MapContainer center={center} zoom={13} style={{ height: "70vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      {polylines.map((line, idx) => (
        <Polyline key={idx} positions={line} />
      ))}
    </MapContainer>
  );
}
