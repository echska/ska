function LocationsTimeline({ locations }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl mb-2">🕒 Location Timeline</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Device</th>
            <th className="px-2 py-1">Latitude</th>
            <th className="px-2 py-1">Longitude</th>
            <th className="px-2 py-1">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={`${loc.device || "device"}-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{loc.device || "Unknown"}</td>
              <td className="px-2 py-1">{loc.lat ?? "-"}</td>
              <td className="px-2 py-1">{loc.lng ?? "-"}</td>
              <td className="px-2 py-1">{loc.timestamp || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationsTimeline;
