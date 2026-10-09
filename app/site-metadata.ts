import type { Metadata } from "next";
import { content, type Locale } from "./content";
import { localePaths, openGraphLocales, languageAlternates, LOCALE_CONFIG, DEFAULT_LOCALE } from "./i18n";
import { legalContent, type LegalPageKey } from "./legal-content";

function legalPageAlternates(page: LegalPageKey): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const config of LOCALE_CONFIG) {
    alternates[config.hreflang] = `/${config.pathSegment}/${page}`;
  }
  alternates["x-default"] = `/${DEFAULT_LOCALE}/${page}`;
  return alternates;
}

// public/og.png's real pixel size; tests/rendered-html.test.mjs asserts the
// emitted og:image:width/height match the file so the two cannot drift.
export const ogImage = { url: "/og.png", width: 1731, height: 909, alt: "JJWine" };

/**
 * Locale-specific page metadata. Relative URLs (canonical, alternates, og:url,
 * images) are made absolute by the metadataBase derived from the request
 * origin in app/layout.tsx.
 */
export function localeMetadata(locale: Locale): Metadata {
  const { title, description } = content[locale].meta;
  const path = localePaths[locale];
  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "JJWine",
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: Object.values(openGraphLocales).filter((item) => item !== openGraphLocales[locale]),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/**
 * Metadata for the Privacy Policy and Legal Notice pages: page-specific
 * canonical, hreflang alternates, Open Graph and Twitter tags. Relative URLs
 * become absolute via the metadataBase in app/layout.tsx.
 */
export function legalPageMetadata(locale: Locale, page: LegalPageKey): Metadata {
  const { metaTitle: title, metaDescription: description } = legalContent[locale][page];
  const path = `${localePaths[locale]}/${page}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: legalPageAlternates(page),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "JJWine",
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: Object.values(openGraphLocales).filter((item) => item !== openGraphLocales[locale]),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
