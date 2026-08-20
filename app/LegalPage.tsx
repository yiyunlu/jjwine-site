import type { Locale } from "./content";
import {
  CONTACT_EMAIL,
  legalContent,
  legalUi,
  type LegalPageKey,
} from "./legal-content";

type Props = { locale: Locale; page: LegalPageKey };

const localeLinks: Array<{ locale: Locale; short: string; lang: string }> = [
  { locale: "en", short: "EN", lang: "en" },
  { locale: "zh-cn", short: "中文", lang: "zh-CN" },
  { locale: "es", short: "ES", lang: "es" },
];

/** Shared server-rendered layout for the Privacy Policy and Legal Notice pages. */
export function LegalPage({ locale, page }: Props) {
  const doc = legalContent[locale][page];
  const ui = legalUi[locale];
  const otherPage: LegalPageKey = page === "privacy" ? "legal" : "privacy";

  return (
    <main className={`site-shell legal-shell locale-${locale}`}>
      <header className="topbar legal-topbar">
        <a className="wordmark" href={`/${locale}`}>
          JJ<span>WINE</span>
        </a>
        <nav className="language-links" aria-label={ui.languageNav}>
          {localeLinks.map((item) => (
            <a
              aria-current={item.locale === locale ? "page" : undefined}
              href={`/${item.locale}/${page}`}
              hrefLang={item.lang}
              key={item.locale}
              lang={item.lang}
            >
              {item.short}
            </a>
          ))}
        </nav>
      </header>

      <article className="legal-article">
        <header className="legal-article-head">
          <h1>{doc.title}</h1>
          <p className="legal-effective">{doc.effectiveDate}</p>
          <p className="legal-disclaimer">{doc.disclaimer}</p>
        </header>

        {doc.sections.map((section) => (
          <section className="legal-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="legal-section legal-contact">
          <h2>{ui.contactHeading}</h2>
          <p>
            {ui.contactLine}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </section>
      </article>

      <footer className="legal-footer">
        <a href={`/${locale}`}>← {ui.backToHome}</a>
        <a href={`/${locale}/${otherPage}`}>{ui.otherDocument[otherPage]}</a>
      </footer>
    </main>
  );
}
