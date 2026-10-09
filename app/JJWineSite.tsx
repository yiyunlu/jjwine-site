"use client";

import type { CSSProperties, FormEvent, MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "./content";
import { localeLinks } from "./i18n";

type Props = { locale: Locale };

function Eyebrow({ children, className = "eyebrow" }: { children: string; className?: string }) {
  const parts = children.split(" / ");
  if (parts.length < 2) return <p className={className}>{children}</p>;
  return (
    <p className={className}>
      <span className="eyebrow-num">{parts[0]}</span>
      <span> / {parts.slice(1).join(" / ")}</span>
    </p>
  );
}

export function JJWineSite({ locale }: Props) {
  const copy = content[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const siteShellRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const briefTriggerRef = useRef<HTMLElement | null>(null);

  const openBrief = (event: MouseEvent<HTMLElement>) => {
    // Use the actual control rather than document.activeElement: Safari does
    // not consistently focus buttons when they are clicked with a pointer.
    briefTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setBriefOpen(true);
  };

  const closeBrief = () => {
    const trigger = briefTriggerRef.current;
    briefTriggerRef.current = null;
    setBriefOpen(false);
    // Defer until React unmounts the dialog and its effect releases `inert`
    // from the page behind it.
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    if (!reducedMotion.matches) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [locale]);

  // While the mobile menu is open: keep keyboard focus in the menu/toggle,
  // close on Escape, and make the covered page content inert.
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
        "header > .wordmark, header .desktop-nav, header .language-links, header .nav-cta",
      ) ?? [],
    );
    const background = [...pageBackground, ...headerBackground];
    background.forEach((element) => { element.inert = true; });
    return () => {
      document.removeEventListener("keydown", onKey);
      background.forEach((element) => { element.inert = false; });
    };
  }, [menuOpen]);

  // While the brief dialog is open: move focus in, trap Tab inside it,
  // close on Escape, and lock background scrolling. Focus returns to the
  // trigger via closeBrief.
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

  // A single shared scroll lock avoids competing cleanup effects if UI state
  // changes quickly (for example, opening the brief while the menu is open).
  useEffect(() => {
    if (!menuOpen && !briefOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen, briefOpen]);

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
    <main className={`site-shell locale-${locale}`} id="top" ref={siteShellRef} onPointerMove={onPointerMove}>
      <a className="skip-link" href="#main-content">{copy.a11y.skipToContent}</a>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={copy.a11y.home}>
          JJ<span>WINE</span>
        </a>
        <nav className="desktop-nav" aria-label={copy.a11y.primaryNav}>
          <a href="#capabilities">{copy.nav.capabilities}</a>
          <a href="#process">{copy.nav.process}</a>
          <a href="#quality">{copy.nav.quality}</a>
          <a href="#partnership">{copy.nav.partnership}</a>
        </nav>
        <div className="topbar-actions">
          <nav className="language-links" aria-label={copy.a11y.languageNav}>
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
          </nav>
          <button className="nav-cta" type="button" onClick={openBrief}>
            {copy.nav.start}
          </button>
          <button
            className="menu-button"
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? copy.nav.close : copy.nav.menu}
          </button>
        </div>
      </header>

      <nav className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" ref={mobileMenuRef} aria-label={copy.a11y.mobileNav}>
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>{copy.nav.capabilities}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{copy.nav.process}</a>
        <a href="#quality" onClick={() => setMenuOpen(false)}>{copy.nav.quality}</a>
        <a href="#partnership" onClick={() => setMenuOpen(false)}>{copy.nav.partnership}</a>
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

      <section className="hero grid-bg" id="main-content" tabIndex={-1}>
        <div className="pointer-glow" aria-hidden="true" />
        <div className="motion-stage" aria-hidden="true">
          <div className="motion-orbit motion-orbit-a" />
          <div className="motion-orbit motion-orbit-b" />
          <div className="liquid-core"><div className="liquid-shine" /></div>
          <div className="grain" />
        </div>

        <div className="hero-content">
          <div className="hero-kicker">
            {copy.hero.kicker.split(" / ").map((part, i) => (
              i === 0 ? <span key={i} className="kicker-num">{part}</span> : <span key={i}> / {part}</span>
            ))}
          </div>
          <h1>
            {copy.hero.line1}
            <br />
            <span className="grad-word">{copy.hero.emphasis}</span> {copy.hero.line2}
          </h1>
          <p className="hero-copy">{copy.hero.copy}</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={openBrief}>
              {copy.hero.primary} <span aria-hidden="true">→</span>
            </button>
            <a className="button button-outline" href="#capabilities">
              {copy.hero.secondary} <span aria-hidden="true">↗</span>
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

      <section className="intro-section section-dark grid-bg">
        <div className="section-index" aria-hidden="true">01</div>
        <div className="intro-grid">
          <div data-reveal>
            <Eyebrow>{copy.intro.kicker}</Eyebrow>
            <h2>{copy.intro.title}</h2>
          </div>
          <div className="intro-body" data-reveal>
            <p>{copy.intro.body}</p>
            <span>{copy.intro.side}</span>
          </div>
        </div>
        <div className="red-thread red-thread-intro" aria-hidden="true" />
      </section>

      <section className="capabilities-section section-dark" id="capabilities">
        <div className="section-head" data-reveal>
          <div>
            <Eyebrow>{copy.capabilities.kicker}</Eyebrow>
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
              <div className="format-preview" aria-hidden="true">
                <div className="format-orb" />
                <span className="format-tagline">{item.tagline}</span>
              </div>
              <div className="format-card-content">
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul className="format-tags" aria-label={copy.a11y.formatTags}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a className="format-link" href="#contact" onClick={(event) => { event.preventDefault(); openBrief(event); }}>
                  {copy.capabilities.explore} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-dark grid-bg" id="process">
        <div className="process-sticky">
          <Eyebrow>{copy.process.kicker}</Eyebrow>
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
          <Eyebrow>{copy.quality.kicker}</Eyebrow>
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

      <section className="partnership-section section-dark grid-bg" id="partnership">
        <div className="section-head partnership-head" data-reveal>
          <div><Eyebrow>{copy.partnership.kicker}</Eyebrow><h2>{copy.partnership.title}</h2></div>
        </div>
        <div className="audience-grid">
          <article data-reveal>
            <span className="audience-mark" aria-hidden="true">G</span>
            <div>
              <h3>{copy.partnership.brandTitle}</h3>
              <p>{copy.partnership.brandBody}</p>
              <button type="button" onClick={openBrief}>{copy.partnership.brandLink} ↗</button>
            </div>
          </article>
          <article data-reveal>
            <span className="audience-mark" aria-hidden="true">R</span>
            <div>
              <h3>{copy.partnership.retailTitle}</h3>
              <p>{copy.partnership.retailBody}</p>
              <button type="button" onClick={openBrief}>{copy.partnership.retailLink} ↗</button>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="contact-content" data-reveal>
          <Eyebrow>{copy.contact.kicker}</Eyebrow>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.body}</p>
          <button className="button button-dark" type="button" onClick={openBrief}>
            {copy.contact.button} <span aria-hidden="true">↗</span>
          </button>
          <small>{copy.contact.note}</small>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top">JJ<span>WINE</span></a>
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
