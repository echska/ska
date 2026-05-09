import { useEffect, useMemo, useState } from "react";
import CallsTable from "../components/CallsTable";
import MessagesTable from "../components/MessagesTable";
import LocationsMap from "../components/LocationsMap";
import LocationsTimeline from "../components/LocationsTimeline";
import RouterMonitor from "../components/RouterMonitor";
import AlertsPanel from "../components/AlertsPanel";
import WhatsAppPanel from "../components/WhatsAppPanel";
import InstagramPanel from "../components/InstagramPanel";
import LanguageToggle from "../components/LanguageToggle";
import { fetchCategory } from "../services/api";

const TABS = ["alerts", "router", "calls", "messages", "locations", "whatsapp", "instagram"];

function Dashboard({ language, onLanguageChange, token, onLogout, t }) {
  const [activeTab, setActiveTab] = useState("alerts");
  const [calls, setCalls] = useState([]);
  const [messages, setMessages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState(t.statuses.loading);

  useEffect(() => {
    let intervalId;
    let isMounted = true;

    const loadData = async () => {
      const [c, m, l, n] = await Promise.allSettled([
        fetchCategory("calls", token),
        fetchCategory("messages", token),
        fetchCategory("locations", token),
        fetchCategory("notifications", token),
      ]);

      if (!isMounted) return;

      const rejected = [c, m, l, n].find((result) => result.status === "rejected");
      if (rejected?.reason?.status === 401) {
        onLogout();
        return;
      }

      setCalls(c.status === "fulfilled" && Array.isArray(c.value) ? c.value : []);
      setMessages(m.status === "fulfilled" && Array.isArray(m.value) ? m.value : []);
      setLocations(l.status === "fulfilled" && Array.isArray(l.value) ? l.value : []);
      setNotifications(n.status === "fulfilled" && Array.isArray(n.value) ? n.value : []);
      setStatus(
        rejected?.reason?.status === 503
          ? t.statuses.missingToken
          : rejected
            ? t.statuses.partial
            : t.statuses.ready
      );
    };

    loadData();
    intervalId = setInterval(loadData, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [token, onLogout, t]);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "alerts":
        return <AlertsPanel notifications={notifications} t={t} />;
      case "router":
        return <RouterMonitor t={t} />;
      case "calls":
        return <CallsTable calls={calls} t={t} />;
      case "messages":
        return <MessagesTable messages={messages} t={t} />;
      case "locations":
        return (
          <>
            <LocationsMap locations={locations} t={t} />
            <LocationsTimeline locations={locations} t={t} />
          </>
        );
      case "whatsapp":
        return <WhatsAppPanel t={t} />;
      case "instagram":
        return <InstagramPanel t={t} />;
      default:
        return <AlertsPanel notifications={notifications} t={t} />;
    }
  }, [activeTab, calls, messages, locations, notifications, t]);

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">{t.dashboardEyebrow}</p>
          <h1>{t.dashboardTitle}</h1>
          <p>{status}</p>
        </div>
        <div className="header-actions">
          <LanguageToggle language={language} onLanguageChange={onLanguageChange} t={t} />
          <button className="secondary-button" type="button" onClick={onLogout}>
            {t.signOut}
          </button>
        </div>
      </header>
      <nav className="tab-list" aria-label={t.sectionsLabel}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "tab-button active" : "tab-button"}
          >
            {t.tabs[tab]}
          </button>
        ))}
      </nav>
      <section className="panel">{tabContent}</section>
    </div>
  );
}

export default Dashboard;
