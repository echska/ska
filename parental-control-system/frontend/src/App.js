import { useCallback, useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { getSavedLanguage, LANGUAGES, saveLanguage } from "./i18n";
import { clearToken, getSavedToken, saveToken } from "./services/api";

function App() {
  const [token, setToken] = useState(getSavedToken);
  const [language, setLanguage] = useState(getSavedLanguage);
  const t = useMemo(() => LANGUAGES[language], [language]);

  useEffect(() => {
    document.documentElement.lang = t.code;
    document.documentElement.dir = t.dir;
  }, [t]);

  const handleLogin = useCallback((nextToken) => {
    saveToken(nextToken);
    setToken(nextToken);
  }, []);

  const handleLogout = useCallback(() => {
    clearToken();
    setToken("");
  }, []);

  const handleLanguageChange = useCallback((nextLanguage) => {
    saveLanguage(nextLanguage);
    setLanguage(nextLanguage);
  }, []);

  if (!token) {
    return <Login language={language} onLanguageChange={handleLanguageChange} onLogin={handleLogin} t={t} />;
  }

  return (
    <Dashboard
      language={language}
      onLanguageChange={handleLanguageChange}
      onLogout={handleLogout}
      t={t}
      token={token}
    />
  );
}

export default App;
