import { useEffect, useMemo, useState } from "react";
import CallsTable from "../components/CallsTable";
import MessagesTable from "../components/MessagesTable";
import LocationsMap from "../components/LocationsMap";
import LocationsTimeline from "../components/LocationsTimeline";
import RouterMonitor from "../components/RouterMonitor";
import AlertsPanel from "../components/AlertsPanel";
import WhatsAppPanel from "../components/WhatsAppPanel";
import InstagramPanel from "../components/InstagramPanel";
import { fetchCategory } from "../services/api";

const TABS = ["alerts", "router", "calls", "messages", "locations", "whatsapp", "instagram"];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("alerts");
  const [calls, setCalls] = useState([]);
  const [messages, setMessages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let intervalId;

    const loadData = async () => {
      const [c, m, l, n] = await Promise.allSettled([
        fetchCategory("calls"),
        fetchCategory("messages"),
        fetchCategory("locations"),
        fetchCategory("notifications"),
      ]);

      setCalls(c.status === "fulfilled" && Array.isArray(c.value) ? c.value : []);
      setMessages(m.status === "fulfilled" && Array.isArray(m.value) ? m.value : []);
      setLocations(l.status === "fulfilled" && Array.isArray(l.value) ? l.value : []);
      setNotifications(n.status === "fulfilled" && Array.isArray(n.value) ? n.value : []);
    };

    loadData();
    intervalId = setInterval(loadData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "alerts":
        return <AlertsPanel notifications={notifications} />;
      case "router":
        return <RouterMonitor />;
      case "calls":
        return <CallsTable calls={calls} />;
      case "messages":
        return <MessagesTable messages={messages} />;
      case "locations":
        return (
          <>
            <LocationsMap locations={locations} />
            <LocationsTimeline locations={locations} />
          </>
        );
      case "whatsapp":
        return <WhatsAppPanel />;
      case "instagram":
        return <InstagramPanel />;
      default:
        return <AlertsPanel notifications={notifications} />;
    }
  }, [activeTab, calls, messages, locations, notifications]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🔒 Unified Parental Control Dashboard</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${activeTab === tab ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">{tabContent}</div>
    </div>
  );
}

export default Dashboard;
