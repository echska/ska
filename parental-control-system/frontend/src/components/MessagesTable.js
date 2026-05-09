function MessagesTable({ messages, t }) {
  return (
    <div>
      <h2 className="text-xl mb-2">💬 {t.panels.messages}</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">{t.columns.device}</th>
            <th className="px-2 py-1">{t.columns.from}</th>
            <th className="px-2 py-1">{t.columns.to}</th>
            <th className="px-2 py-1">{t.columns.content}</th>
            <th className="px-2 py-1">{t.columns.timestamp}</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={`msg-${index}`} className="border-t border-gray-700">
              <td className="px-2 py-1">{msg.device || t.panels.unknown}</td>
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
