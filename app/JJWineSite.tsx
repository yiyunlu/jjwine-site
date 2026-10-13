"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode, type RefObject } from "react";
import { content, type Locale } from "./content";
import { localeLinks } from "./i18n";
import { v2Copy, type V2Messages } from "./v2-copy";

type Props = { locale: Locale };
type NavKey = "home" | "capability" | "process";
type ProductKey = "bottle" | "can" | "bib";
type FieldName = "brand" | "contact" | "email" | "category" | "packaging" | "needs";
type FieldError = "required" | "email" | "select";
type BriefStatus = { key: "summary" | "downloaded" | "copied" | "copyFail"; kind: "error" | "ok" } | null;

const HOME_LOCALE_ORDER: Locale[] = ["zh-cn", "en", "es", "fr"];
const LANG_NAME: Record<Locale, string> = {
  "zh-cn": "中文",
  en: "English",
  es: "Español",
  fr: "Français",
};
const STEP_ICONS = ["i-chat", "i-doc", "i-flask", "i-gear", "i-shield", "i-truck"] as const;
const PRODUCT_IMAGES: Record<ProductKey, string> = {
  bottle: "/media/v2/bottles.webp",
  can: "/media/v2/cans.webp",
  bib: "/media/v2/bib.webp",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const homeLocaleLinks = HOME_LOCALE_ORDER.map((id) => {
  const link = localeLinks.find((item) => item.locale === id);
  if (!link) throw new Error(`Missing locale link for ${id}`);
  return link;
});

function Icon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className ? `ico ${className}` : "ico"} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

function fieldValue(form: HTMLFormElement, name: string) {
  const element = form.elements.namedItem(name);
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return element.value;
  }
  return "";
}

function validateForm(form: HTMLFormElement) {
  const errors: Partial<Record<FieldName, FieldError>> = {};
  (["brand", "contact", "needs"] as const).forEach((name) => {
    if (!fieldValue(form, name).trim()) errors[name] = "required";
  });
  const email = fieldValue(form, "email").trim();
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "email";
  (["category", "packaging"] as const).forEach((name) => {
    if (fieldValue(form, name) === "") errors[name] = "select";
  });
  return errors;
}

function buildBrief(form: HTMLFormElement, copy: V2Messages, separator: string) {
  const empty = copy.form.brief.empty;
  const value = (name: string) => fieldValue(form, name).trim() || empty;
  const categoryIndex = fieldValue(form, "category");
  const packagingIndex = fieldValue(form, "packaging");
  const category = categoryIndex === "" ? empty : copy.form.categories[Number(categoryIndex)] ?? empty;
  const packaging = packagingIndex === "" ? empty : copy.form.packagings[Number(packagingIndex)] ?? empty;
  let stamp: string;
  try {
    stamp = new Intl.DateTimeFormat(copy.meta.htmlLang, { dateStyle: "long", timeStyle: "short" }).format(new Date());
  } catch {
    stamp = new Date().toISOString();
  }
  const rows: Array<[string, string]> = [
    [copy.form.brand, value("brand")],
    [copy.form.contact, value("contact")],
    [copy.form.email, value("email")],
    [copy.form.category, category],
    [copy.form.packaging, packaging],
    [copy.form.quantity, value("quantity")],
    [copy.form.launch, value("launch")],
  ];
  const lines = [copy.form.brief.heading, "=".repeat(32), `${copy.form.brief.generated}${separator}${stamp}`, ""];
  rows.forEach(([label, cell]) => lines.push(`${label}${separator}${cell}`));
  lines.push("", `${copy.form.needs}${separator}`, value("needs"), "", "—", copy.form.brief.footer);
  return lines.join("\n");
}

function downloadBrief(filename: string, text: string) {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const blob = new Blob([`\uFEFF${text}`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filename}-${ymd}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    anchor.remove();
  }, 1000);
}

async function copyBrief(text: string, preview: HTMLTextAreaElement | null) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  if (!preview) throw new Error("copy");
  preview.focus();
  preview.select();
  if (!document.execCommand("copy")) throw new Error("copy");
}

function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])"),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (!containerRef.current.contains(current)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, containerRef, onEscape]);
}

function InfoBody({ copy, infoKey }: { copy: V2Messages; infoKey: string }) {
  const [kind, arg] = infoKey.split(":");
  if ((kind === "product") && (arg === "bottle" || arg === "can" || arg === "bib")) {
    const product = copy.products[arg];
    return (
      <>
        <p className="eyebrow">{copy.products.eyebrow}</p>
        <h2 id="info-title" className="modal-title">{product.title}</h2>
        <img className="modal-figure" src={PRODUCT_IMAGES[arg]} alt={product.alt} width={150} height={150} />
        <p className="modal-text">{product.intro}</p>
        <p className="modal-subtitle">{product.listTitle}</p>
        <ul className="modal-list">{product.list.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="modal-note">{copy.products.note}</p>
      </>
    );
  }
  if (kind === "step" && arg) {
    const index = Number(arg);
    const step = copy.process.steps[index];
    const icon = STEP_ICONS[index];
    if (!step || !icon) return null;
    const label = copy.process.stepLabel.replace("{n}", String(index + 1));
    return (
      <>
        <p className="eyebrow">{copy.process.eyebrow} · {label}</p>
        <div className="modal-kicker">
          <Icon id={icon} />
          <h2 id="info-title" className="modal-title">{`0${index + 1} ${step.t}`}</h2>
        </div>
        <p className="modal-text"><strong>{step.d}</strong></p>
        <p className="modal-text">{step.body}</p>
        <ul className="modal-list">{step.list.map((item) => <li key={item}>{item}</li>)}</ul>
      </>
    );
  }
  if (infoKey === "processOverview") {
    const dialog = copy.dialogs.processOverview;
    return (
      <>
        <p className="eyebrow">{copy.process.eyebrow}</p>
        <h2 id="info-title" className="modal-title">{dialog.title}</h2>
        <p className="modal-text">{dialog.intro}</p>
        <ol className="process-list">
          {copy.process.steps.map((step, index) => (
            <li key={step.t}>
              <span className="step-num" aria-hidden="true">{`0${index + 1}`}</span>
              <div>
                <h3>{step.t}</h3>
                <p>{step.body}</p>
                <ul>{step.list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </>
    );
  }
  if (infoKey === "capability" || infoKey === "quality" || infoKey === "partners" || infoKey === "about") {
    const dialog = copy.dialogs[infoKey];
    return (
      <>
        <p className="eyebrow">JJWINE</p>
        <h2 id="info-title" className="modal-title">{dialog.title}</h2>
        <p className="modal-text">{dialog.intro}</p>
        <p className="modal-subtitle">{dialog.listTitle}</p>
        <ul className="modal-list">{dialog.list.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="modal-note">{dialog.note}</p>
      </>
    );
  }
  return null;
}

function ModalFrame({
  labelledBy,
  titleId,
  className,
  closeLabel,
  onDismiss,
  initialFocus,
  children,
}: {
  labelledBy: string;
  titleId: string;
  className: string;
  closeLabel: string;
  onDismiss: () => void;
  initialFocus: "close" | "field";
  children: ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(true, overlayRef, onDismiss);
  useEffect(() => {
    if (initialFocus === "close") closeRef.current?.focus();
    else overlayRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }, [initialFocus, titleId]);

  return (
    <div className="modal-overlay" ref={overlayRef}>
      <button className="modal-backdrop" type="button" aria-label={closeLabel} onClick={onDismiss} />
      <div className={className} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <div className="modal-inner">
          <button className="modal-close" ref={closeRef} type="button" aria-label={closeLabel} onClick={onDismiss}>
            <Icon id="i-close" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

function BriefDialog({ copy, separator, onDismiss }: { copy: V2Messages; separator: string; onDismiss: () => void }) {
  const [errors, setErrors] = useState<Partial<Record<FieldName, FieldError>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<BriefStatus>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);

  const refresh = (form: HTMLFormElement) => {
    if (!attempted) return;
    const next = validateForm(form);
    setErrors(next);
    setStatus((current) => (current?.kind === "error" && Object.keys(next).length === 0 ? null : current));
    if (preview != null && Object.keys(next).length === 0) setPreview(buildBrief(form, copy, separator));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const next = validateForm(event.currentTarget);
    setErrors(next);
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const action = submitter instanceof HTMLButtonElement && submitter.value === "copy" ? "copy" : "download";
    if (Object.keys(next).length > 0) {
      setStatus({ key: "summary", kind: "error" });
      const first = (["brand", "contact", "email", "category", "packaging", "needs"] as const).find((name) => next[name]);
      if (first) {
        const element = event.currentTarget.elements.namedItem(first);
        if (element instanceof HTMLElement) element.focus();
      }
      return;
    }
    const text = buildBrief(event.currentTarget, copy, separator);
    setPreview(text);
    if (action === "download") {
      downloadBrief(copy.form.brief.filename, text);
      setStatus({ key: "downloaded", kind: "ok" });
      return;
    }
    copyBrief(text, previewRef.current).then(
      () => setStatus({ key: "copied", kind: "ok" }),
      () => {
        setStatus({ key: "copyFail", kind: "error" });
        previewRef.current?.focus();
        previewRef.current?.select();
      },
    );
  };

  const statusText = !status ? "" : status.key === "summary" ? copy.form.err.summary : copy.form.status[status.key];
  const fields: Array<{ name: FieldName; label: string; required: boolean; wide?: boolean; control: "input" | "email" | "select" | "textarea" }> = [
    { name: "brand", label: copy.form.brand, required: true, control: "input" },
    { name: "contact", label: copy.form.contact, required: true, control: "input" },
    { name: "email", label: copy.form.email, required: true, control: "email" },
    { name: "category", label: copy.form.category, required: true, control: "select" },
    { name: "packaging", label: copy.form.packaging, required: true, control: "select" },
    { name: "quantity", label: copy.form.quantity, required: false, control: "input" },
    { name: "launch", label: copy.form.launch, required: false, control: "input" },
    { name: "needs", label: copy.form.needs, required: true, wide: true, control: "textarea" },
  ];

  return (
    <ModalFrame labelledBy="brief-title" titleId="brief" className="modal modal-form" closeLabel={copy.common.close} onDismiss={onDismiss} initialFocus="field">
      <p className="eyebrow">{copy.form.subtitle}</p>
      <h2 id="brief-title" className="modal-title">{copy.form.title}</h2>
      <p className="modal-text">{copy.form.intro}</p>
      <p className="notice">{copy.form.notice}</p>
      <form noValidate onSubmit={onSubmit} onInput={(event) => refresh(event.currentTarget)} onChange={(event) => refresh(event.currentTarget)}>
        <p className="form-legend">{copy.form.legend}</p>
        <div className="form-grid">
          {fields.map((field) => {
            const error = errors[field.name];
            const describedBy = `e-${field.name}`;
            const invalid = error ? true : undefined;
            const options = field.name === "category" ? copy.form.categories : copy.form.packagings;
            return (
              <div className={field.wide ? "field field-wide" : "field"} key={field.name} data-field={field.name}>
                <label htmlFor={`f-${field.name}`}>
                  {field.required ? <span>{field.label}</span> : field.label}
                  {field.required ? <> <abbr title={copy.common.required}>*</abbr></> : null}
                </label>
                {field.control === "textarea" ? (
                  <textarea id={`f-${field.name}`} name={field.name} rows={4} required placeholder={copy.form.ph.needs} aria-describedby={describedBy} aria-invalid={invalid} />
                ) : null}
                {field.control === "select" ? (
                  <select id={`f-${field.name}`} name={field.name} required aria-describedby={describedBy} aria-invalid={invalid}>
                    <option value="">{copy.form.choose}</option>
                    {options.map((option, index) => <option value={index} key={option}>{option}</option>)}
                  </select>
                ) : null}
                {field.control === "input" || field.control === "email" ? (
                  <input
                    id={`f-${field.name}`}
                    name={field.name}
                    type={field.control === "email" ? "email" : "text"}
                    required={field.required}
                    autoComplete={field.name === "brand" ? "organization" : field.name === "contact" ? "name" : field.name === "email" ? "email" : undefined}
                    inputMode={field.control === "email" ? "email" : undefined}
                    placeholder={copy.form.ph[field.name as keyof typeof copy.form.ph]}
                    aria-describedby={field.required ? describedBy : undefined}
                    aria-invalid={invalid}
                  />
                ) : null}
                {field.required ? <p className="field-error" id={describedBy} aria-live="polite">{error ? copy.form.err[error] : ""}</p> : null}
              </div>
            );
          })}
        </div>
        <p className={status ? `form-status is-${status.kind}` : "form-status"} role="status" aria-live="polite">{statusText}</p>
        <div className="modal-actions">
          <button className="btn-primary" type="submit" value="download">{copy.form.download}</button>
          <button className="btn-secondary" type="submit" value="copy">{copy.form.copy}</button>
          <button className="btn-text" type="button" onClick={onDismiss}>{copy.form.cancel}</button>
        </div>
        <div className="brief-preview" hidden={preview == null}>
          <label htmlFor="brief-text">{copy.form.preview}</label>
          <textarea id="brief-text" ref={previewRef} readOnly rows={10} value={preview ?? ""} />
        </div>
      </form>
    </ModalFrame>
  );
}

export function JJWineSite({ locale }: Props) {
  const copy = v2Copy[locale];
  const site = content[locale];
  const separator = locale === "zh-cn" ? "：" : ": ";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavKey>("home");
  const [infoKey, setInfoKey] = useState<string | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [videoSoon, setVideoSoon] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const soonBackRef = useRef<HTMLButtonElement>(null);
  const bigPlayRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const navLockRef = useRef(0);

  const dismissOverlay = useCallback(() => {
    setInfoKey(null);
    setBriefOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    window.setTimeout(() => {
      if (trigger?.isConnected) trigger.focus();
    }, 0);
  }, []);

  const openInfo = (key: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setMenuOpen(false);
    setBriefOpen(false);
    setInfoKey(key);
  };

  const openBrief = (trigger: HTMLElement) => {
    if (!infoKey) triggerRef.current = trigger;
    setMenuOpen(false);
    setInfoKey(null);
    setBriefOpen(true);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (Date.now() < navLockRef.current) return;
        const y = window.scrollY + window.innerHeight * 0.35;
        let key: NavKey = "home";
        (["capability", "process"] as const).forEach((id) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top + window.scrollY <= y) key = id;
        });
        if (window.scrollY < 40) key = "home";
        setActiveNav((current) => (current === key ? current : key));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event: globalThis.MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!infoKey && !briefOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [infoKey, briefOpen]);

  useEffect(() => {
    if (!videoSoon) return;
    soonBackRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoSoon(false);
        bigPlayRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoSoon]);

  const goTo = (key: NavKey, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    setActiveNav(key);
    navLockRef.current = Date.now() + 1200;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    if (key === "home") {
      window.scrollTo({ top: 0, behavior });
      document.getElementById("hero-title")?.focus({ preventScroll: true });
      return;
    }
    const target = document.getElementById(key);
    target?.scrollIntoView({ behavior, block: "start" });
    target?.querySelector("h2")?.focus({ preventScroll: true });
  };

  const showSoon = () => setVideoSoon(true);
  const features = [
    { icon: "i-globe", title: copy.hero.f1t, body: copy.hero.f1d },
    { icon: "i-gear", title: copy.hero.f2t, body: copy.hero.f2d },
    { icon: "i-shield", title: copy.hero.f3t, body: copy.hero.f3d },
  ];
  const products: Array<{ key: ProductKey }> = [{ key: "bottle" }, { key: "can" }, { key: "bib" }];

  return (
    <>
      <IconSprites />
      <a className="skip-link" href="#main">{copy.common.skip}</a>
      <header className={menuOpen ? "site-header is-open" : "site-header"} id="top" ref={headerRef}>
        <a className="logo" href="#top" aria-label={copy.common.logo} onClick={(event) => goTo("home", event)}>
          <img className="brand-logo" src="/brand/jjwine-logo-light.svg" alt="JJWine" />
        </a>
        <button
          className="menu-toggle"
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? copy.common.menuClose : copy.common.menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <Icon id="i-menu" />
        </button>
        <div className="site-menu" id="site-menu">
          <nav className="main-nav" aria-label={copy.nav.label}>
            <ul>
              <li><a href="#top" aria-current={activeNav === "home" ? "page" : undefined} onClick={(event) => goTo("home", event)}>{copy.nav.home}</a></li>
              <li><a href="#capability" aria-current={activeNav === "capability" ? "page" : undefined} onClick={(event) => goTo("capability", event)}>{copy.nav.capability}</a></li>
              <li><a href="#process" aria-current={activeNav === "process" ? "page" : undefined} onClick={(event) => goTo("process", event)}>{copy.nav.process}</a></li>
              <li><button type="button" aria-haspopup="dialog" onClick={(event) => openInfo("quality", event.currentTarget)}>{copy.nav.quality}</button></li>
              <li><button type="button" aria-haspopup="dialog" onClick={(event) => openInfo("partners", event.currentTarget)}>{copy.nav.partners}</button></li>
              <li><button type="button" aria-haspopup="dialog" onClick={(event) => openInfo("about", event.currentTarget)}>{copy.nav.about}</button></li>
              <li className="menu-legal-item"><a href={`/${locale}/privacy`}>{site.footer.privacyLink}</a></li>
              <li className="menu-legal-item"><a href={`/${locale}/legal`}>{site.footer.legalLink}</a></li>
            </ul>
          </nav>
          <div className="header-tools">
            <div className="lang-switch" role="group" aria-label={copy.common.langGroup}>
              <Icon id="i-globe" className="ico-globe" />
              {homeLocaleLinks.map((item) => (
                <a
                  key={item.locale}
                  href={`/${item.locale}`}
                  hrefLang={item.lang}
                  lang={item.lang}
                  aria-label={LANG_NAME[item.locale]}
                  aria-current={item.locale === locale ? "page" : undefined}
                >
                  {item.short}
                </a>
              ))}
            </div>
            <button className="btn-primary" type="button" onClick={(event) => openBrief(event.currentTarget)}>
              <span>{copy.common.startProject}</span>
              <Icon id="i-arrow" className="ico-arrow" />
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero-title" tabIndex={-1}>
              <span className="line-dark">{copy.hero.title1}</span>
              <span className="line-wine">{copy.hero.title2}</span>
            </h1>
            <p className="hero-lead">{copy.hero.lead}</p>
            <span className="rule" aria-hidden="true" />
            <ul className="hero-features">
              {features.map((feature) => (
                <li key={feature.title}>
                  <Icon id={feature.icon} />
                  <div><strong>{feature.title}</strong><span>{feature.body}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="video-module" id="video-module" role="region" aria-label={copy.video.region}>
            <div className="video-cover" id="video-cover" inert={videoSoon ? true : undefined}>
              <img className="video-poster" src="/media/v2/hero.webp" width={1930} height={815} alt={copy.video.coverAlt} fetchPriority="high" />
              <div className="video-shade" aria-hidden="true" />
              <div className="video-text">
                <p className="video-headline"><span>{copy.video.line1}</span><br /><span>{copy.video.line2}</span></p>
                <p className="video-sub"><span>{copy.video.sub1}</span><br /><span>{copy.video.sub2}</span></p>
              </div>
              <p className="video-script" aria-hidden="true"><span>{copy.video.script1}</span><br /><span>{copy.video.script2}</span></p>
              <button className="video-bigplay" ref={bigPlayRef} type="button" aria-label={copy.video.play} onClick={showSoon}>
                <Icon id="i-play" />
              </button>
              <div className="video-bar">
                <button className="vb-btn" type="button" aria-label={copy.video.play} onClick={showSoon}><Icon id="i-play" /></button>
                <span className="vb-time" role="img" aria-label={copy.video.timeLabel} title={copy.video.timeLabel}><span>{copy.video.time}</span></span>
                <button className="vb-progress" type="button" aria-disabled="true" aria-label={copy.video.progress} onClick={showSoon}><span className="vb-track"><span className="vb-knob" /></span></button>
                <button className="vb-btn" type="button" aria-disabled="true" aria-label={copy.video.volume} onClick={showSoon}><Icon id="i-volume" /></button>
                <button className="vb-btn" type="button" aria-disabled="true" aria-label={copy.video.fullscreen} onClick={showSoon}><Icon id="i-fullscreen" /></button>
              </div>
            </div>
            <div className="video-soon" id="video-soon" hidden={!videoSoon} role="status">
              <div className="video-soon-inner">
                <span className="video-soon-ring" aria-hidden="true"><Icon id="i-play" /></span>
                <p className="video-soon-title">{copy.video.soonTitle}</p>
                <p className="video-soon-body">{copy.video.soonBody}</p>
                <button className="btn-ghost-light" ref={soonBackRef} type="button" onClick={() => { setVideoSoon(false); bigPlayRef.current?.focus(); }}>{copy.video.soonBack}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="products" id="capability" aria-labelledby="products-title">
          <div className="section-intro">
            <p className="eyebrow">{copy.products.eyebrow}</p>
            <h2 id="products-title" className="section-title" tabIndex={-1}><span>{copy.products.title1}</span><br /><span>{copy.products.title2}</span></h2>
            <p className="section-lead">{copy.products.lead}</p>
            <button className="text-link" type="button" aria-haspopup="dialog" onClick={(event) => openInfo("capability", event.currentTarget)}>
              <span>{copy.products.link}</span><Icon id="i-arrow" className="ico-arrow" />
            </button>
          </div>
          <ul className="cards">
            {products.map(({ key }) => {
              const product = copy.products[key];
              return (
                <li className="card" key={key}>
                  <img src={PRODUCT_IMAGES[key]} width={1254} height={1254} loading="lazy" alt={product.alt} />
                  <div className="card-body">
                    <h3>{product.title}</h3>
                    <p><span>{product.d1}</span><br /><span>{product.d2}</span></p>
                    <button className="card-link" type="button" aria-haspopup="dialog" aria-label={`${copy.products.more} – ${product.title}`} onClick={(event) => openInfo(`product:${key}`, event.currentTarget)}>
                      <span>{copy.products.more}</span><Icon id="i-arrow" className="ico-arrow" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="process" id="process" aria-labelledby="process-title">
          <div className="section-intro">
            <p className="eyebrow">{copy.process.eyebrow}</p>
            <h2 id="process-title" className="section-title" tabIndex={-1}>{copy.process.title}</h2>
            <p className="section-lead">{copy.process.lead}</p>
            <button className="text-link" type="button" aria-haspopup="dialog" onClick={(event) => openInfo("processOverview", event.currentTarget)}>
              <span>{copy.process.link}</span><Icon id="i-arrow" className="ico-arrow" />
            </button>
          </div>
          <ol className="steps" id="steps">
            {copy.process.steps.map((step, index) => {
              const icon = STEP_ICONS[index];
              const label = `${copy.process.stepLabel.replace("{n}", String(index + 1))}${separator}${step.t} – ${copy.process.viewStep}`;
              return (
                <li className="step" key={step.t}>
                  <button className="step-btn" type="button" aria-haspopup="dialog" aria-label={label} onClick={(event) => openInfo(`step:${index}`, event.currentTarget)}>
                    <span className="step-num" aria-hidden="true">{`0${index + 1}`}</span>
                    {icon ? <Icon id={icon} className="step-icon" /> : null}
                    <span className="step-title">{step.t}</span>
                    <span className="step-desc">{step.d}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="banner" aria-label={`${copy.banner.en1} ${copy.banner.en2}`}>
          <img src="/media/v2/vineyard.webp" width={2172} height={724} loading="lazy" alt={copy.banner.alt} />
          <div className="banner-shade" aria-hidden="true" />
          <p className="banner-left"><span>{copy.banner.en1}</span><br /><span>{copy.banner.en2}</span></p>
          <p className="banner-right"><span>{copy.banner.l1}</span><br /><span>{copy.banner.l2}</span></p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-mark" href="#top" onClick={(event) => goTo("home", event)}>
          <img className="brand-logo" src="/brand/jjwine-logo-light.svg" alt="JJWine" />
        </a>
        <p>{site.footer.line}</p>
        <nav aria-label={site.footer.legalNav}>
          <a href={`/${locale}/privacy`}>{site.footer.privacyLink}</a>
          <a href={`/${locale}/legal`}>{site.footer.legalLink}</a>
        </nav>
        <small>{site.footer.legal}</small>
      </footer>

      {infoKey ? (
        <ModalFrame labelledBy="info-title" titleId={infoKey} className="modal" closeLabel={copy.common.close} onDismiss={dismissOverlay} initialFocus="close">
          <InfoBody copy={copy} infoKey={infoKey} />
          <div className="modal-actions">
            <button className="btn-primary" type="button" onClick={(event) => openBrief(event.currentTarget)}>
              <span>{copy.common.startProject}</span>
              <Icon id="i-arrow" className="ico-arrow" />
            </button>
            <button className="btn-secondary" type="button" onClick={dismissOverlay}>{copy.common.close}</button>
          </div>
        </ModalFrame>
      ) : null}
      {briefOpen ? <BriefDialog copy={copy} separator={separator} onDismiss={dismissOverlay} /> : null}
    </>
  );
}

function IconSprites() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.2" /><path d="M2.8 12h18.4M12 2.8c2.6 2.6 3.9 5.6 3.9 9.2s-1.3 6.6-3.9 9.2M12 2.8C9.4 5.4 8.1 8.4 8.1 12s1.3 6.6 3.9 9.2M4.3 7h15.4M4.3 17h15.4" /></g></symbol>
        <symbol id="i-gear" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.2" /><path d="M10.3 2.8h3.4l.5 2.6 1.6.7 2.2-1.5 2.4 2.4-1.5 2.2.7 1.6 2.6.5v3.4l-2.6.5-.7 1.6 1.5 2.2-2.4 2.4-2.2-1.5-1.6.7-.5 2.6h-3.4l-.5-2.6-1.6-.7-2.2 1.5-2.4-2.4 1.5-2.2-.7-1.6-2.6-.5v-3.4l2.6-.5.7-1.6-1.5-2.2 2.4-2.4 2.2 1.5 1.6-.7z" /></g></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.8 4.5 5.6v6c0 4.6 3.1 8.2 7.5 9.6 4.4-1.4 7.5-5 7.5-9.6v-6z" /><path d="m8.6 12 2.4 2.4 4.6-4.8" /></g></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" d="M12 4c4.7 0 8.5 3 8.5 6.8s-3.8 6.8-8.5 6.8c-1 0-1.9-.1-2.8-.4L5 19.5l1-3.6c-1.6-1.3-2.5-3-2.5-5.1C3.5 7 7.3 4 12 4z" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6.5v18h11V6.5z" /><path d="M14 3v3.5h3.5M9 11h6M9 14h6M9 17h4" /></g></symbol>
        <symbol id="i-flask" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 3h5M10.3 3v6.2L4.8 19a1.4 1.4 0 0 0 1.2 2h12a1.4 1.4 0 0 0 1.2-2l-5.5-9.8V3" /><path d="M7.4 15h9.2" /></g></symbol>
        <symbol id="i-truck" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h11.5v10.5H2.5zM14 9.5h4l3.5 3.5v3.5H14z" /><circle cx="6.5" cy="17.5" r="1.8" fill="#FBFAF7" /><circle cx="17.5" cy="17.5" r="1.8" fill="#FBFAF7" /></g></symbol>
        <symbol id="i-arrow" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.5 8h11M9.5 4l4 4-4 4" /></symbol>
        <symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4.5v15l12.5-7.5z" /></symbol>
        <symbol id="i-volume" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 9.5h3.5L12 5v14l-5-4.5H3.5z" fill="currentColor" /><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.4a8 8 0 0 1 0 11.2" /></g></symbol>
        <symbol id="i-fullscreen" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6M20 4l-6.5 6.5M10 20H4v-6M4 20l6.5-6.5" /></symbol>
        <symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M5.5 5.5l13 13M18.5 5.5l-13 13" /></symbol>
        <symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M3.5 7h17M3.5 12h17M3.5 17h17" /></symbol>
      </defs>
    </svg>
  );
}
