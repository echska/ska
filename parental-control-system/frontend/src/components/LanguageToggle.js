function LanguageToggle({ language, onLanguageChange, t }) {
  const nextLanguage = language === "ar" ? "en" : "ar";

  return (
    <button
      className="secondary-button language-toggle"
      type="button"
      onClick={() => onLanguageChange(nextLanguage)}
    >
      {t.switchLabel}
    </button>
  );
}

export default LanguageToggle;
