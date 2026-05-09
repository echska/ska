function AlertsPanel({ notifications, t }) {
  return (
    <div>
      <h2 className="text-xl mb-2">🚨 {t.panels.alerts}</h2>
      <ul className="space-y-2">
        {notifications.map((item, index) => (
          <li key={`notif-${index}`} className="bg-gray-700 rounded p-3">
            <p className="font-semibold">{item.title || t.panels.alertFallback}</p>
            <p className="text-sm text-gray-200">{item.message || t.panels.noDetails}</p>
            <p className="text-xs text-gray-400 mt-1">{item.timestamp || "-"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsPanel;
