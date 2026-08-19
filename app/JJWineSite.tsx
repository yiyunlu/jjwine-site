"use client";

import type { CSSProperties, FormEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "./content";

type Props = { locale: Locale };

const localeLinks: Array<{ locale: Locale; short: string }> = [
  { locale: "en", short: "EN" },
  { locale: "zh-cn", short: "中文" },
  { locale: "es", short: "ES" },
];

export function JJWineSite({ locale }: Props) {
  const copy = content[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
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

    let ticking = false;
    const updateScroll = () => {
      document.documentElement.style.setProperty(
        "--hero-shift",
        `${Math.min(window.scrollY * 0.12, 130)}px`,
      );
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [locale]);

  useEffect(() => {
    if (!briefOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBriefOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [briefOpen]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  const downloadBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "JJWINE — PROJECT BRIEF",
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
    anchor.download = "jjwine-project-brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={`site-shell locale-${locale}`} onPointerMove={onPointerMove}>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="JJWine home">
          JJ<span>WINE</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#capabilities">{copy.nav.capabilities}</a>
          <a href="#process">{copy.nav.process}</a>
          <a href="#quality">{copy.nav.quality}</a>
          <a href="#partnership">{copy.nav.partnership}</a>
        </nav>
        <div className="topbar-actions">
          <div className="language-links" aria-label="Language selection">
            {localeLinks.map((item) => (
              <a
                aria-current={item.locale === locale ? "page" : undefined}
                href={`/${item.locale}`}
                key={item.locale}
              >
                {item.short}
              </a>
            ))}
          </div>
          <button className="nav-cta" type="button" onClick={() => setBriefOpen(true)}>
            {copy.nav.start}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? copy.nav.close : copy.nav.menu}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu">
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>{copy.nav.capabilities}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{copy.nav.process}</a>
        <a href="#quality" onClick={() => setMenuOpen(false)}>{copy.nav.quality}</a>
        <a href="#partnership" onClick={() => setMenuOpen(false)}>{copy.nav.partnership}</a>
        <div className="mobile-language-links">
          {localeLinks.map((item) => (
            <a aria-current={item.locale === locale ? "page" : undefined} href={`/${item.locale}`} key={item.locale}>
              {item.short}
            </a>
          ))}
        </div>
      </div>

      <section className="hero" id="top">
        <div className="pointer-glow" aria-hidden="true" />
        <div className="motion-stage" aria-hidden="true">
          <div className="motion-orbit motion-orbit-a" />
          <div className="motion-orbit motion-orbit-b" />
          <div className="liquid-core"><div className="liquid-shine" /></div>
          <div className="grain" />
        </div>

        <div className="hero-content">
          <div className="hero-kicker">{copy.hero.kicker}</div>
          <h1>
            {copy.hero.line1}
            <br />
            <em>{copy.hero.emphasis}</em> {copy.hero.line2}
          </h1>
          <p className="hero-copy">{copy.hero.copy}</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => setBriefOpen(true)}>
              {copy.hero.primary} <span aria-hidden="true">↗</span>
            </button>
            <a className="text-link" href="#capabilities">
              {copy.hero.secondary} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-rail" aria-hidden="true">
          {copy.hero.rail.map((item, index) => (
            <span className="rail-item" key={item}>
              <b>{item}</b>
              {index < copy.hero.rail.length - 1 ? <i /> : null}
            </span>
          ))}
        </div>
      </section>

      <section className="intro-section section-dark">
        <div className="section-index" aria-hidden="true">01</div>
        <div className="intro-grid">
          <div data-reveal>
            <p className="eyebrow">{copy.intro.kicker}</p>
            <h2>{copy.intro.title}</h2>
          </div>
          <div className="intro-body" data-reveal>
            <p>{copy.intro.body}</p>
            <span>{copy.intro.side}</span>
          </div>
        </div>
        <div className="red-thread red-thread-intro" aria-hidden="true" />
      </section>

      <section className="capabilities-section" id="capabilities">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">{copy.capabilities.kicker}</p>
            <h2>{copy.capabilities.title}</h2>
          </div>
          <p>{copy.capabilities.body}</p>
        </div>
        <div className="format-grid">
          {copy.capabilities.items.map((item, index) => (
            <article
              className="format-card"
              data-reveal
              key={item.title}
              style={{ "--card-delay": `${index * 100}ms` } as CSSProperties}
            >
              <div className="format-orb" aria-hidden="true"><span>{item.code}</span></div>
              <div className="format-card-content">
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-dark" id="process">
        <div className="process-sticky">
          <p className="eyebrow">{copy.process.kicker}</p>
          <h2>{copy.process.title}</h2>
          <p>{copy.process.body}</p>
          <div className="process-signal" aria-hidden="true"><span /></div>
        </div>
        <ol className="process-list">
          {copy.process.steps.map((step, index) => (
            <li data-reveal key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="quality-section" id="quality">
        <div className="quality-lead" data-reveal>
          <p className="eyebrow">{copy.quality.kicker}</p>
          <h2>{copy.quality.title}</h2>
          <p>{copy.quality.body}</p>
        </div>
        <div className="quality-badge" data-reveal>
          <span>{copy.quality.badge}</span>
          <small>{copy.quality.badgeNote}</small>
          <i aria-hidden="true" />
        </div>
        <div className="quality-grid">
          {copy.quality.pillars.map((pillar, index) => (
            <article data-reveal key={pillar.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partnership-section section-dark" id="partnership">
        <div className="section-head partnership-head" data-reveal>
          <div><p className="eyebrow">{copy.partnership.kicker}</p><h2>{copy.partnership.title}</h2></div>
        </div>
        <div className="audience-grid">
          <article data-reveal>
            <span className="audience-mark" aria-hidden="true">G</span>
            <div>
              <h3>{copy.partnership.brandTitle}</h3>
              <p>{copy.partnership.brandBody}</p>
              <button type="button" onClick={() => setBriefOpen(true)}>{copy.partnership.brandLink} ↗</button>
            </div>
          </article>
          <article data-reveal>
            <span className="audience-mark" aria-hidden="true">R</span>
            <div>
              <h3>{copy.partnership.retailTitle}</h3>
              <p>{copy.partnership.retailBody}</p>
              <button type="button" onClick={() => setBriefOpen(true)}>{copy.partnership.retailLink} ↗</button>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="contact-content" data-reveal>
          <p className="eyebrow">{copy.contact.kicker}</p>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.body}</p>
          <button className="button button-dark" type="button" onClick={() => setBriefOpen(true)}>
            {copy.contact.button} <span aria-hidden="true">↗</span>
          </button>
          <small>{copy.contact.note}</small>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top">JJ<span>WINE</span></a>
        <p>{copy.footer.line}</p>
        <small>{copy.footer.legal}</small>
        <a href="#top">{copy.footer.top} ↑</a>
      </footer>

      {briefOpen ? (
        <div
          className="brief-overlay"
          role="presentation"
          onMouseDown={(event) => { if (event.currentTarget === event.target) setBriefOpen(false); }}
        >
          <section className="brief-dialog" role="dialog" aria-modal="true" aria-labelledby="brief-title">
            <button className="brief-close" ref={closeButtonRef} type="button" onClick={() => setBriefOpen(false)} aria-label={copy.nav.close}>×</button>
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
