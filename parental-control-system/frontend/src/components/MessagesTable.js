function MessagesTable({ messages }) {
  return (
    <div>
      <h2 className="text-xl mb-2">💬 Messages</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Device</th>
            <th className="px-2 py-1">From</th>
            <th className="px-2 py-1">To</th>
            <th className="px-2 py-1">Content</th>
            <th className="px-2 py-1">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={`msg-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{msg.device || "Unknown"}</td>
              <td className="px-2 py-1">{msg.from || "-"}</td>
              <td className="px-2 py-1">{msg.to || "-"}</td>
              <td className="px-2 py-1">{msg.content || "-"}</td>
              <td className="px-2 py-1">{msg.timestamp || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessagesTable;
