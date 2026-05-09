function CallsTable({ calls }) {
  return (
    <div>
      <h2 className="text-xl mb-2">📞 Calls</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Device</th>
            <th className="px-2 py-1">Number</th>
            <th className="px-2 py-1">Duration</th>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call, index) => (
            <tr key={`call-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{call.device || "Unknown"}</td>
              <td className="px-2 py-1">{call.number || "-"}</td>
              <td className="px-2 py-1">{call.duration || "-"}</td>
              <td className="px-2 py-1">{call.call_type || "-"}</td>
              <td className="px-2 py-1">{call.timestamp || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CallsTable;
