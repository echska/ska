function CallsTable({ calls, t }) {
  return (
    <div>
      <h2 className="text-xl mb-2">📞 {t.panels.calls}</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">{t.columns.device}</th>
            <th className="px-2 py-1">{t.columns.number}</th>
            <th className="px-2 py-1">{t.columns.duration}</th>
            <th className="px-2 py-1">{t.columns.type}</th>
            <th className="px-2 py-1">{t.columns.timestamp}</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call, index) => (
            <tr key={`call-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{call.device || t.panels.unknown}</td>
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
