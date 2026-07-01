import { useI18n } from "./i18n/LanguageProvider";
import "./App.css";

function App() {
  const { t, toggle } = useI18n();

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">{t("brand")}</div>
        <nav className="nav-links">
          <a href="#features">{t("nav_features")}</a>
          <a href="#about">{t("nav_about")}</a>
          <button className="lang-btn" onClick={toggle}>
            {t("lang_button")}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <span className="badge">{t("hero_badge")}</span>
          <h1 className="hero-title">{t("hero_title")}</h1>
          <p className="hero-subtitle">{t("hero_subtitle")}</p>
          <div className="cta">
            <button className="btn btn-primary">{t("cta_primary")}</button>
            <button className="btn btn-secondary">{t("cta_secondary")}</button>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">{t("features_title")}</h2>
          <p className="section-subtitle">{t("features_subtitle")}</p>
          <div className="cards">
            <div className="card">
              <h3>{t("feature_1_title")}</h3>
              <p>{t("feature_1_desc")}</p>
            </div>
            <div className="card">
              <h3>{t("feature_2_title")}</h3>
              <p>{t("feature_2_desc")}</p>
            </div>
            <div className="card">
              <h3>{t("feature_3_title")}</h3>
              <p>{t("feature_3_desc")}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">{t("footer")}</footer>
    </div>
  );
}

export default App;
