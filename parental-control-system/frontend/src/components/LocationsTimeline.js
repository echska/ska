function LocationsTimeline({ locations, t }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl mb-2">🕒 {t.panels.locationTimeline}</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">{t.columns.device}</th>
            <th className="px-2 py-1">{t.columns.latitude}</th>
            <th className="px-2 py-1">{t.columns.longitude}</th>
            <th className="px-2 py-1">{t.columns.timestamp}</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={`${loc.device || "device"}-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{loc.device || t.panels.unknown}</td>
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
