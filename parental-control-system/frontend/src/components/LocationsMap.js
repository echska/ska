import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function LocationsMap({ locations }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([36.19, 44.01], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    layersRef.current.forEach((layer) => mapRef.current.removeLayer(layer));
    layersRef.current = [];

    const points = locations
      .filter((loc) => Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng)))
      .map((loc) => [Number(loc.lat), Number(loc.lng)]);

    if (points.length === 0) return;

    const polyline = L.polyline(points, { color: "#2563eb" }).addTo(mapRef.current);
    const marker = L.marker(points[points.length - 1]).addTo(mapRef.current).bindPopup("Latest location");
    mapRef.current.fitBounds(polyline.getBounds(), { padding: [20, 20] });

    layersRef.current.push(polyline, marker);
  }, [locations]);

  return (
    <div>
      <h2 className="text-xl mb-2">📍 Device Route Timeline</h2>
      <div ref={containerRef} className="h-96 rounded-lg shadow-lg" />
    </div>
  );
}

export default LocationsMap;
