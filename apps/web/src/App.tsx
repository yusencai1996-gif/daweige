import { useEffect, useState } from "react";
import { useI18n } from "./i18n/LanguageProvider";
import "./App.css";

function App() {
  const { t, lang, toggle } = useI18n();
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hello?name=daweige")
      .then((r) => r.json())
      .then((d) => setGreeting(d.message))
      .catch(() => setGreeting(null));
  }, []);

  const workCards = [1, 2, 3, 4];
  const essayCards = [1, 2, 3];
  const productCards = [1, 2];
  const timelineRows = [
    { year: t("exp_now"), role: t("exp_now_role"), note: t("exp_now_note") },
    { year: t("exp_ph_year"), role: t("exp_ph_role"), note: t("exp_ph_note") },
    { year: t("exp_ph_year"), role: t("exp_ph_role"), note: t("exp_ph_note") },
    {
      year: t("exp_ph_year"),
      role: t("exp_start_role"),
      note: t("exp_start_note"),
    },
  ];

  return (
    <div className="page">
      {/* ============ NAV ============ */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <a className="wordmark" href="#top">
            {t("brand")}
            <span className="en">{t("brand_en")}</span>
          </a>
          <div className="nav-links">
            <a href="#about">{t("nav_about")}</a>
            <a href="#work">{t("nav_work")}</a>
            <a href="#writing">{t("nav_writing")}</a>
            <a href="#products">{t("nav_products")}</a>
            <a href="#experience">{t("nav_experience")}</a>
            <a href="#contact">{t("nav_contact")}</a>
          </div>
          <div className="nav-meta">
            <span className="nav-role">{t("nav_role")}</span>
            <button
              type="button"
              className="lang"
              onClick={toggle}
              aria-label="Toggle language"
            >
              {lang === "zh" ? "中 / EN" : "EN / 中"}
            </button>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header className="hero wrap" id="top">
        <span className="hero-num">{t("hero_num")}</span>

        <div className="hero-meta">
          <span className="left">{t("hero_meta_left")}</span>
          <span className="center">{t("hero_meta_center")}</span>
          <span className="right">{t("hero_meta_right")}</span>
        </div>

        <div className="hero-headline">
          <div className="hero-tag">{t("hero_tag")}</div>
          <h1 className="hero-title-cn">{t("hero_title")}</h1>
          <div className="hero-sub-en">
            {t("hero_sub_1")}
            <span className="dot">·</span>
            {t("hero_sub_2")}
            <span className="dot">·</span>
            {t("hero_sub_3")}
          </div>
        </div>

        <div className="hero-foot">
          <div className="foot-col">
            <span className="label">{t("hero_foot_positioning")}</span>
            <p className="role">{t("hero_foot_role")}</p>
          </div>
          <div className="foot-col">
            <span className="label">{t("hero_foot_value")}</span>
            <p className="pitch">
              {t("hero_foot_pitch_1")}
              <br />
              {t("hero_foot_pitch_2")}
            </p>
          </div>
          <div className="foot-col">
            <span className="label">{t("hero_foot_next")}</span>
            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">
                {t("hero_cta_contact")} <span className="arrow">↗</span>
              </a>
              <a className="btn btn-ghost" href="#work">
                {t("hero_cta_work")}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============ ABOUT ============ */}
      <section className="block" id="about">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">{t("about_num")}</span>
            <h2 className="sec-title">
              {t("about_title")}
              <span className="en-side">{t("about_title_en")}</span>
            </h2>
            <p className="sec-kicker">
              {t("about_kicker_1")}
              <br />
              {t("about_kicker_2")}
            </p>
          </div>

          <div className="about-grid">
            <div className="about-left">
              <p className="quote">
                {t("about_quote_1")}
                <br />
                {t("about_quote_2")}
              </p>
              <div className="quote-src">{t("about_quote_src")}</div>
            </div>

            <div className="about-right">
              <p>
                {t("about_p1_a")}
                <span className="moss">{t("about_p1_b")}</span>
                {t("about_p1_c")}
              </p>
              <p>
                {t("about_p2_a")}
                <span className="moss">{t("about_p2_b")}</span>
                {t("about_p2_c")}
              </p>
              <p>{t("about_p3")}</p>

              <div className="about-facts">
                <div className="fact">
                  <div className="k">{t("fact_focus_k")}</div>
                  <div className="v">
                    {t("fact_focus_v")}
                    <br />
                    <span className="pending">{t("fact_focus_pending")}</span>
                  </div>
                </div>
                <div className="fact">
                  <div className="k">{t("fact_stack_k")}</div>
                  <div className="v">
                    {t("fact_stack_v")}
                    <br />
                    <span className="pending">{t("fact_stack_pending")}</span>
                  </div>
                </div>
                <div className="fact">
                  <div className="k">{t("fact_avail_k")}</div>
                  <div className="v">
                    {t("fact_avail_v")}
                    <br />
                    <span className="pending">{t("fact_avail_pending")}</span>
                  </div>
                </div>
                <div className="fact">
                  <div className="k">{t("fact_based_k")}</div>
                  <div className="v">
                    {t("fact_based_v")}
                    <br />
                    <span className="pending">{t("fact_based_pending")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline" />

      {/* ============ WORK ============ */}
      <section className="block" id="work">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">{t("work_num")}</span>
            <h2 className="sec-title">
              {t("work_title")}
              <span className="en-side">{t("work_title_en")}</span>
            </h2>
            <p className="sec-kicker">
              {t("work_kicker_1")}
              <br />
              {t("work_kicker_2")}
            </p>
          </div>

          <div className="coming-intro">
            <div>
              <span className="coming-tag">{t("work_tag")}</span>
              <p className="coming-desc">{t("work_desc")}</p>
            </div>
            <p className="coming-note">{t("work_note")}</p>
          </div>

          <div className="card-grid cols-2">
            {workCards.map((n) => (
              <div className="ph-card" key={n}>
                <div className="ph-mark">
                  — {t("work_ph_mark")}
                  {String(n).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="ph-title">{t("work_ph_title")}</h3>
                  <div className="ph-meta">
                    <span className="type">{t("work_ph_type")}</span>
                    <span>·</span>
                    <span>{t("work_ph_year")}</span>
                  </div>
                  <p className="ph-blurb">{t("work_ph_blurb")}</p>
                </div>
                <div className="ph-foot">
                  <span>{t("work_ph_foot_left")}</span>
                  <span>{t("work_ph_foot_right")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" />

      {/* ============ WRITING ============ */}
      <section className="block" id="writing">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">{t("writing_num")}</span>
            <h2 className="sec-title">
              {t("writing_title")}
              <span className="en-side">{t("writing_title_en")}</span>
            </h2>
            <p className="sec-kicker">
              {t("writing_kicker_1")}
              <br />
              {t("writing_kicker_2")}
            </p>
          </div>

          <div className="coming-intro">
            <div>
              <span className="coming-tag">{t("writing_tag")}</span>
              <p className="coming-desc">{t("writing_desc")}</p>
            </div>
            <p className="coming-note">{t("writing_note")}</p>
          </div>

          <div className="card-grid cols-3">
            {essayCards.map((n) => (
              <div className="ph-card" key={n}>
                <div className="ph-mark">
                  — {t("writing_ph_mark")}
                  {String(n).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="ph-title">{t("writing_ph_title")}</h3>
                  <div className="ph-meta">
                    <span className="type">{t("writing_ph_type")}</span>
                    <span>·</span>
                    <span>{t("writing_ph_read")}</span>
                  </div>
                  <p className="ph-blurb">{t("writing_ph_blurb")}</p>
                </div>
                <div className="ph-foot">
                  <span>{t("writing_ph_foot_left")}</span>
                  <span>{t("writing_ph_foot_right")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" />

      {/* ============ PRODUCTS ============ */}
      <section className="block" id="products">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">{t("products_num")}</span>
            <h2 className="sec-title">
              {t("products_title")}
              <span className="en-side">{t("products_title_en")}</span>
            </h2>
            <p className="sec-kicker">
              {t("products_kicker_1")}
              <br />
              {t("products_kicker_2")}
            </p>
          </div>

          <div className="coming-intro">
            <div>
              <span className="coming-tag">{t("products_tag")}</span>
              <p className="coming-desc">{t("products_desc")}</p>
            </div>
            <p className="coming-note">{t("products_note")}</p>
          </div>

          <div className="product-row">
            {productCards.map((n) => (
              <div className="product-card" key={n}>
                <div>
                  <div className="pmark">{String(n).padStart(2, "0")}</div>
                  <h3 className="pname">{t("products_ph_name")}</h3>
                  <p className="pdesc">{t("products_ph_desc")}</p>
                </div>
                <div className="pstatus">{t("products_ph_status")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline" />

      {/* ============ EXPERIENCE ============ */}
      <section className="block" id="experience">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">{t("exp_num")}</span>
            <h2 className="sec-title">
              {t("exp_title")}
              <span className="en-side">{t("exp_title_en")}</span>
            </h2>
            <p className="sec-kicker">
              {t("exp_kicker_1")}
              <br />
              {t("exp_kicker_2")}
            </p>
          </div>

          <div className="timeline">
            <div className="tl-side">
              <div className="big">{t("exp_side_big")}</div>
              <p className="sub">
                {t("exp_side_sub_1")}
                <br />
                {t("exp_side_sub_2")}
              </p>
            </div>

            <div className="tl-list">
              {timelineRows.map((row, i) => (
                <div className="tl-row" key={i}>
                  <div className="tl-year">{row.year}</div>
                  <div className="tl-body">
                    <div className="role-line">{row.role}</div>
                    <p className="pending-note">{row.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contact-meta">
            <span>{t("contact_num")}</span>
            <span className="moss">{t("contact_meta_mid")}</span>
            <span>{t("contact_meta_right")}</span>
          </div>

          <h2 className="contact-headline">
            {t("contact_headline_pre")}
            <span className="italic">{t("contact_headline_italic")}</span>
            {t("contact_headline_post")}
          </h2>

          <p className="contact-sub">{t("contact_sub")}</p>

          <div className="contact-cta">
            <a className="btn btn-on-dark solid" href="mailto:">
              {t("contact_cta_primary")} <span className="arrow">↗</span>
            </a>
            <a className="btn btn-on-dark ghost" href="#work">
              {t("contact_cta_secondary")}
            </a>
          </div>

          <div className="contact-channels">
            <div className="channel">
              <div className="ck">{t("contact_ch_email_k")}</div>
              <div className="cv">
                {t("contact_ch_email_v")}
                <span className="pending">
                  {t("contact_ch_email_pending")}
                </span>
              </div>
            </div>
            <div className="channel">
              <div className="ck">{t("contact_ch_social_k")}</div>
              <div className="cv">
                {t("contact_ch_social_v")}
                <span className="pending">
                  {t("contact_ch_social_pending")}
                </span>
              </div>
            </div>
            <div className="channel">
              <div className="ck">{t("contact_ch_avail_k")}</div>
              <div className="cv">
                {t("contact_ch_avail_v")}
                <span className="pending">
                  {t("contact_ch_avail_pending")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-inner">
          <span>
            {t("footer_left").split("大微阁")[0]}
            <span className="moss">大微阁</span>
            {t("footer_left").split("大微阁")[1] ?? ""}
          </span>
          <span className="center">{t("footer_center")}</span>
          <span className="right">
            {t("footer_right_1")}
            <span className="moss">{t("footer_right_2")}</span>
          </span>
        </div>
      </footer>

      {/* 后端联通保持：fetch /api/hello，结果不渲染（设计稿无 demo 板块） */}
      <span className="sr-only" aria-live="polite">
        {greeting ?? ""}
      </span>
    </div>
  );
}

export default App;
