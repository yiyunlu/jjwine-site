"use client";

import type { FormEvent, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "./content";
import { SiteIcon, SiteIconSprites } from "./SiteIcons";
import { localeLinks } from "./i18n";

type Props = { locale: Locale };

type SectionId = "top" | "intro" | "capabilities" | "process" | "quality" | "partnership" | "contact";
const navTrackSectionIds: SectionId[] = ["top", "intro", "capabilities", "process", "quality", "partnership", "contact"];

function GlobeIcon() {
  return (
    <svg className="lang-globe" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.6 2.8 3.9 5.8 3.9 9s-1.3 6.2-3.9 9c-2.6-2.8-3.9-5.8-3.9-9S9.4 5.8 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const formatV2Images: Record<string, string> = {
  "01": "/media/v2/fmt-bottle-trio.webp",
  "02": "/media/v2/fmt-can.webp",
  "03": "/media/v2/fmt-bib.webp",
};

export function JJWineSite({ locale }: Props) {
  const copy = content[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("top");
  const siteShellRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const briefTriggerRef = useRef<HTMLElement | null>(null);

  const openBrief = (event: MouseEvent<HTMLElement>) => {
    briefTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setBriefOpen(true);
  };

  const closeBrief = () => {
    const trigger = briefTriggerRef.current;
    briefTriggerRef.current = null;
    setBriefOpen(false);
    window.setTimeout(() => { if (trigger?.isConnected) trigger.focus(); }, 0);
  };

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [locale]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !mobileMenuRef.current || !menuButtonRef.current) return;
      const focusable = [
        menuButtonRef.current,
        ...Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])',
          ),
        ),
      ].filter((element) => !element.hasAttribute("disabled"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!focusable.includes(active as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const pageBackground = Array.from(siteShellRef.current?.children ?? []).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== mobileMenuRef.current &&
        element.tagName !== "HEADER",
    );
    const headerBackground = Array.from(
      siteShellRef.current?.querySelectorAll<HTMLElement>(
        "header .brand, header .desktop-nav, header .lang-switch, header .nav-cta",
      ) ?? [],
    );
    const background = [...pageBackground, ...headerBackground];
    background.forEach((element) => { element.inert = true; });
    return () => {
      document.removeEventListener("keydown", onKey);
      background.forEach((element) => { element.inert = false; });
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!briefOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeBrief();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!dialogRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const background = Array.from(siteShellRef.current?.children ?? []).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && !element.classList.contains("brief-overlay"),
    );
    background.forEach((element) => { element.inert = true; });
    return () => {
      document.removeEventListener("keydown", onKey);
      background.forEach((element) => { element.inert = false; });
    };
  }, [briefOpen]);

  useEffect(() => {
    if (!menuOpen && !briefOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen, briefOpen]);

  // Track active section for the section rail navigation.
  useEffect(() => {
    const sectionElements = navTrackSectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topmost = visibleEntries.reduce((prev, current) =>
            current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev
          );
          setActiveSection(topmost.target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const downloadBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      copy.brief.fileHeading,
      "",
      `${copy.brief.company}: ${data.get("company") ?? ""}`,
      `${copy.brief.market}: ${data.get("market") ?? ""}`,
      `${copy.brief.product}: ${data.get("product") ?? ""}`,
      `${copy.brief.format}: ${data.get("format") ?? ""}`,
      `${copy.brief.volume}: ${data.get("volume") ?? ""}`,
      `${copy.brief.timing}: ${data.get("timing") ?? ""}`,
      "",
      `${copy.brief.details}:`,
      `${data.get("details") ?? ""}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = copy.brief.fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={`site-shell locale-${locale}`} id="top" ref={siteShellRef}>
      <SiteIconSprites />
      <a className="skip-link" href="#main-content">{copy.a11y.skipToContent}</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label={copy.a11y.home}>
            <img className="brand-logo" src="/brand/jjwine-logo-light.svg" alt="JJWine" />
            <span className="brand-tag">
              {copy.nav.brandTagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </a>
          <nav className="desktop-nav" aria-label={copy.a11y.primaryNav}>
            <a href="#top" className={activeSection === "top" ? "is-active" : undefined} aria-current={activeSection === "top" ? "page" : undefined}>
              {copy.nav.home}
            </a>
            <a href="#capabilities" className={activeSection === "capabilities" ? "is-active" : undefined}>
              {copy.nav.formats}
            </a>
            <a href="#process" className={activeSection === "process" ? "is-active" : undefined}>
              {copy.nav.process}
            </a>
            <a href="#quality" className={activeSection === "quality" ? "is-active" : undefined}>
              {copy.nav.quality}
            </a>
            <a href="#partnership" className={activeSection === "partnership" ? "is-active" : undefined}>
              {copy.nav.partnership}
            </a>
            <a href="#intro" className={activeSection === "intro" ? "is-active" : undefined}>
              {copy.nav.about}
            </a>
          </nav>
          <div className="topbar-actions">
            <nav className="lang-switch" aria-label={copy.a11y.languageNav}>
              <GlobeIcon />
              {localeLinks.map((item, index) => (
                <span className="lang-switch-item" key={item.locale}>
                  {index > 0 ? <span className="lang-sep" aria-hidden="true">|</span> : null}
                  <a
                    aria-current={item.locale === locale ? "page" : undefined}
                    className={item.locale === locale ? "is-current" : undefined}
                    href={`/${item.locale}`}
                    hrefLang={item.lang}
                    lang={item.lang}
                  >
                    {item.short}
                  </a>
                </span>
              ))}
            </nav>
            <button className="nav-cta" type="button" onClick={openBrief}>
              {copy.nav.start} <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </button>
            <button
              className="menu-button"
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? copy.nav.close : copy.nav.menu}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <MenuIcon />
              <span className="menu-button-label">{menuOpen ? copy.nav.close : copy.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" ref={mobileMenuRef} aria-label={copy.a11y.mobileNav}>
        <a href="#top" onClick={() => setMenuOpen(false)}>{copy.nav.home}</a>
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>{copy.nav.formats}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{copy.nav.process}</a>
        <a href="#quality" onClick={() => setMenuOpen(false)}>{copy.nav.quality}</a>
        <a href="#partnership" onClick={() => setMenuOpen(false)}>{copy.nav.partnership}</a>
        <a href="#intro" onClick={() => setMenuOpen(false)}>{copy.nav.about}</a>
        <div className="mobile-language-links">
          {localeLinks.map((item) => (
            <a
              aria-current={item.locale === locale ? "page" : undefined}
              href={`/${item.locale}`}
              hrefLang={item.lang}
              key={item.locale}
              lang={item.lang}
            >
              {item.short}
            </a>
          ))}
        </div>
        <div className="footer-legal-links">
          <a href={`/${locale}/privacy`} onClick={() => setMenuOpen(false)}>{copy.footer.privacyLink}</a>
          <a href={`/${locale}/legal`} onClick={() => setMenuOpen(false)}>{copy.footer.legalLink}</a>
        </div>
      </nav>

      <div className="home-v2">
        <section className="hero" id="main-content" tabIndex={-1}>
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.line1}
              <br />
              <em>{copy.hero.emphasis}</em>
              {copy.hero.line2 ? ` ${copy.hero.line2}` : ""}
            </h1>
            <p className="lead">{copy.hero.copy}</p>
            <hr className="rule" />
            <ul className="pillars">
              {copy.hero.pillars.map((pillar) => (
                <li key={pillar.title}>
                  <SiteIcon name={pillar.icon} className="ico-lg" />
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-media">
            <figure className="panel panel-main">
              <img src="/media/v2/hero-line.svg" alt={copy.hero.panels.mainAlt} />
              <figcaption className="cap-top">
                {copy.hero.panels.mainCapTop.map((line) => (
                  <span key={line}>{line}<br /></span>
                ))}
              </figcaption>
              <figcaption className="cap-bottom">{copy.hero.panels.mainCapBottom}</figcaption>
              <span className="badge badge-placeholder">{copy.hero.panels.mainNote}</span>
            </figure>
            <figure className="panel panel-side">
              <img src="/media/v2/hero-can-dark.jpg" alt={copy.hero.panels.sideAlt} />
              <figcaption className="cap-side">
                {copy.hero.panels.sideCap.map((line) => (
                  <span key={line}>{line}<br /></span>
                ))}
              </figcaption>
              <span className="badge badge-placeholder">{copy.hero.panels.sideNote}</span>
            </figure>
          </div>
        </section>

        <section className="formats" id="capabilities">
          <div className="v2-container formats-grid">
            <div className="sec-intro">
              <p className="eyebrow">{copy.capabilities.kicker}</p>
              <h2>
                {copy.capabilities.title}
                {copy.capabilities.titleBreak ? <><br />{copy.capabilities.titleBreak}</> : null}
              </h2>
              <p>{copy.capabilities.body}</p>
              <a className="link-arrow" href="#capabilities">
                {copy.capabilities.linkLabel} <SiteIcon name="arrow" className="ico-sm" />
              </a>
            </div>
            {copy.capabilities.items.map((item) => (
              <article className="card fmt-card" key={item.code}>
                <div className="fmt-img">
                  <img src={formatV2Images[item.code]} alt={item.title} />
                </div>
                <div className="fmt-body">
                  <h3>
                    {item.title}
                    {item.titleEn ? <> <span className="en">{item.titleEn}</span></> : null}
                  </h3>
                  <p>{item.body}</p>
                  <span className="badge badge-soft">{item.badge}</span>
                  <button className="link-arrow sm" type="button" onClick={openBrief}>
                    {copy.capabilities.explore} <SiteIcon name="arrow" className="ico-sm" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process" id="process">
          <div className="v2-container process-grid">
            <div className="sec-intro">
              <p className="eyebrow">{copy.process.kicker}</p>
              <h2>{copy.process.title}</h2>
              <p>{copy.process.body}</p>
              <a className="link-arrow" href="#process">
                {copy.process.linkLabel} <SiteIcon name="arrow" className="ico-sm" />
              </a>
            </div>
            <ol className="steps">
              {copy.process.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-n">{String(index + 1).padStart(2, "0")}</span>
                  <SiteIcon name={step.icon} className="ico-md" />
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="banner" id="vineyard" aria-label={copy.banner.imageAlt}>
          <img src="/media/v2/vineyard.svg" alt="" />
          <p className="banner-left">
            {copy.banner.left.map((line) => (
              <span key={line}>{line}<br /></span>
            ))}
          </p>
          <p className="banner-right">{copy.banner.right}</p>
          <span className="badge badge-placeholder on-banner">{copy.banner.placeholder}</span>
        </section>

        <section className="home-light-section" id="intro">
          <div className="about-grid">
            <div>
              <p className="eyebrow">{copy.intro.kicker}</p>
              <h2>{copy.intro.title}</h2>
            </div>
            <div>
              <p className="section-lead">{copy.intro.body}</p>
              <p className="section-lead">{copy.intro.side}</p>
            </div>
          </div>
        </section>

        <section className="home-light-section" id="quality">
          <p className="eyebrow">{copy.quality.kicker}</p>
          <h2>{copy.quality.title}</h2>
          <p className="section-lead">{copy.quality.body}</p>
          <div className="quality-badge-light">
            <span>{copy.quality.badge}</span>
            <small>{copy.quality.badgeNote}</small>
          </div>
          <div className="quality-grid-light">
            {copy.quality.pillars.map((pillar) => (
              <article key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-light-section" id="partnership">
          <p className="eyebrow">{copy.partnership.kicker}</p>
          <h2>{copy.partnership.title}</h2>
          <div className="audience-grid-light">
            <article>
              <span className="audience-mark" aria-hidden="true">G</span>
              <div>
                <h3>{copy.partnership.brandTitle}</h3>
                <p>{copy.partnership.brandBody}</p>
                <button type="button" onClick={openBrief}>{copy.partnership.brandLink} ↗</button>
              </div>
            </article>
            <article>
              <span className="audience-mark" aria-hidden="true">R</span>
              <div>
                <h3>{copy.partnership.retailTitle}</h3>
                <p>{copy.partnership.retailBody}</p>
                <button type="button" onClick={openBrief}>{copy.partnership.retailLink} ↗</button>
              </div>
            </article>
          </div>
        </section>

        <section className="home-light-section" id="contact">
          <div className="contact-panel">
            <p className="eyebrow">{copy.contact.kicker}</p>
            <h2>{copy.contact.title}</h2>
            <p className="section-lead">{copy.contact.body}</p>
            <button className="button button-primary" type="button" onClick={openBrief}>
              {copy.contact.button} <span aria-hidden="true">→</span>
            </button>
            <small>{copy.contact.note}</small>
          </div>
        </section>
      </div>

      <footer>
        <a className="wordmark footer-mark" href="#top">
          <img className="brand-logo" src="/brand/jjwine-logo-light.svg" alt="JJWine" />
        </a>
        <p>{copy.footer.line}</p>
        <small>{copy.footer.legal}</small>
        <nav className="footer-legal-links" aria-label={copy.footer.legalNav}>
          <a href={`/${locale}/privacy`}>{copy.footer.privacyLink}</a>
          <a href={`/${locale}/legal`}>{copy.footer.legalLink}</a>
        </nav>
        <a href="#top">{copy.footer.top} ↑</a>
      </footer>

      {briefOpen ? (
        <div
          className="brief-overlay"
          role="presentation"
          onMouseDown={(event) => { if (event.currentTarget === event.target) closeBrief(); }}
        >
          <section className="brief-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="brief-title">
            <button className="brief-close" ref={closeButtonRef} type="button" onClick={closeBrief} aria-label={copy.a11y.closeDialog}>×</button>
            <p className="eyebrow">JJWine</p>
            <h2 id="brief-title">{copy.brief.title}</h2>
            <p className="brief-intro">{copy.brief.intro}</p>
            <form onSubmit={downloadBrief}>
              <label><span>{copy.brief.company}</span><input name="company" required placeholder={copy.brief.companyPlaceholder} /></label>
              <label><span>{copy.brief.market}</span><input name="market" required placeholder={copy.brief.marketPlaceholder} /></label>
              <label><span>{copy.brief.product}</span><input name="product" required placeholder={copy.brief.productPlaceholder} /></label>
              <label><span>{copy.brief.format}</span><input name="format" placeholder={copy.brief.formatPlaceholder} /></label>
              <label><span>{copy.brief.volume}</span><input name="volume" placeholder={copy.brief.volumePlaceholder} /></label>
              <label><span>{copy.brief.timing}</span><input name="timing" placeholder={copy.brief.timingPlaceholder} /></label>
              <label className="brief-wide"><span>{copy.brief.details}</span><textarea name="details" rows={4} placeholder={copy.brief.detailsPlaceholder} /></label>
              <div className="brief-submit brief-wide">
                <button className="button button-primary" type="submit">{copy.brief.download} ↓</button>
                <small>{copy.brief.privacy}</small>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}
