import { useState } from "react";
import LanguageToggle from "../components/LanguageToggle";

function Login({ language, onLanguageChange, onLogin, t }) {
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedToken = token.trim();
    if (trimmedToken) {
      onLogin(trimmedToken);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-language">
        <LanguageToggle language={language} onLanguageChange={onLanguageChange} t={t} />
      </div>
      <form className="auth-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">{t.loginEyebrow}</p>
        <h1>{t.loginTitle}</h1>
        <label htmlFor="access-token">{t.tokenLabel}</label>
        <input
          id="access-token"
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder={t.tokenPlaceholder}
          autoComplete="current-password"
        />
        <button type="submit" disabled={!token.trim()}>
          {t.signIn}
        </button>
      </form>
    </main>
  );
}

export default Login;
