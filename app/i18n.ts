/**
 * Centralized locale configuration for JJWine.
 *
 * Adding a new locale only requires:
 * 1. Add an entry to LOCALE_CONFIG below
 * 2. Create content translations in content.ts and legal-content.ts
 * 3. Create page routes under app/<locale>/
 */

export type LocaleConfig = {
  /** URL path segment (e.g. "en", "zh-cn") */
  pathSegment: string;
  /** BCP 47 language tag for <html lang> (e.g. "en", "zh-CN") */
  htmlLang: string;
  /** hreflang value for alternate links (same as htmlLang) */
  hreflang: string;
  /** Open Graph locale (e.g. "en_US", "zh_CN") */
  ogLocale: string;
  /** Short label for language switcher (e.g. "EN", "中文") */
  switcherLabel: string;
};

/**
 * The single source of truth for all supported locales.
 * Order determines display order in language switchers.
 */
export const LOCALE_CONFIG: readonly LocaleConfig[] = [
  { pathSegment: "en", htmlLang: "en", hreflang: "en", ogLocale: "en_US", switcherLabel: "EN" },
  { pathSegment: "zh-cn", htmlLang: "zh-CN", hreflang: "zh-CN", ogLocale: "zh_CN", switcherLabel: "中文" },
  { pathSegment: "es", htmlLang: "es", hreflang: "es", ogLocale: "es_ES", switcherLabel: "ES" },
  { pathSegment: "fr", htmlLang: "fr", hreflang: "fr", ogLocale: "fr_FR", switcherLabel: "FR" },
] as const;

/** All supported locale path segments */
export const locales = LOCALE_CONFIG.map((l) => l.pathSegment) as unknown as readonly ["en", "zh-cn", "es", "fr"];

export type Locale = (typeof locales)[number];

/** Default locale used for x-default and root path */
export const DEFAULT_LOCALE: Locale = "en";

/** Map from locale path segment to its full config */
export const localeConfigByPath: Record<Locale, LocaleConfig> = Object.fromEntries(
  LOCALE_CONFIG.map((config) => [config.pathSegment, config])
) as Record<Locale, LocaleConfig>;

/** Map from locale to URL path (e.g. "en" -> "/en") */
export const localePaths: Record<Locale, string> = Object.fromEntries(
  LOCALE_CONFIG.map((config) => [config.pathSegment, `/${config.pathSegment}`])
) as Record<Locale, string>;

/** Map from locale to Open Graph locale */
export const openGraphLocales: Record<Locale, string> = Object.fromEntries(
  LOCALE_CONFIG.map((config) => [config.pathSegment, config.ogLocale])
) as Record<Locale, string>;

/**
 * Language alternates for hreflang tags.
 * Keys use BCP 47 format for hreflang attribute.
 */
export const languageAlternates: Record<string, string> = {
  ...Object.fromEntries(LOCALE_CONFIG.map((config) => [config.hreflang, `/${config.pathSegment}`])),
  "x-default": `/${DEFAULT_LOCALE}`,
};

/**
 * Locale links for language switchers.
 * Used by both JJWineSite.tsx and LegalPage.tsx.
 */
export const localeLinks: Array<{ locale: Locale; short: string; lang: string }> = LOCALE_CONFIG.map((config) => ({
  locale: config.pathSegment as Locale,
  short: config.switcherLabel,
  lang: config.htmlLang,
}));

/**
 * Resolve the BCP 47 language tag from a pathname.
 * Used by layout.tsx to set <html lang>.
 */
export function resolveLang(pathname: string): string {
  for (const config of LOCALE_CONFIG) {
    const prefix = `/${config.pathSegment}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return config.htmlLang;
    }
  }
  return localeConfigByPath[DEFAULT_LOCALE].htmlLang;
}

/**
 * Get Open Graph alternate locales (all except the current one).
 */
export function getOgAlternateLocales(currentLocale: Locale): string[] {
  return LOCALE_CONFIG
    .filter((config) => config.pathSegment !== currentLocale)
    .map((config) => config.ogLocale);
}
