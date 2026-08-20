import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://jjwine.example${pathname}`, {
      headers: { accept: "text/html", host: "jjwine.example" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const localeMeta = {
  en: {
    title: "JJWine — China Production, Delivered to Global Standards",
    ogLocale: "en_US",
    skip: "Skip to main content",
  },
  "zh-CN": {
    title: "JJWine — 全球酒饮品牌的中国生产落地伙伴",
    ogLocale: "zh_CN",
    skip: "跳转到主要内容",
  },
  es: {
    title: "JJWine — Producción en China conforme a estándares globales",
    ogLocale: "es_ES",
    skip: "Saltar al contenido principal",
  },
};

for (const [pathname, expected, lang, canonicalPath] of [
  ["/", "Your standards.", "en", "/en"],
  ["/en", "One brief. Full-chain execution.", "en", "/en"],
  ["/zh-cn", "一个需求，全链路承接。", "zh-CN", "/zh-cn"],
  ["/es", "Un brief. Ejecución integral.", "es", "/es"],
]) {
  test(`renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, new RegExp(escape(expected)));
    assert.match(html, /JJWINE/i);
    assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
  });

  test(`emits lang and language alternates for ${pathname}`, async () => {
    const html = await (await render(pathname)).text();

    assert.match(html, new RegExp(`<html lang="${escape(lang)}"`));

    // Canonical and hreflang URLs must be absolute and derived from the
    // request origin, so a rename or custom domain needs no code change.
    assert.match(
      html,
      new RegExp(`<link rel="canonical" href="${escape(`https://jjwine.example${canonicalPath}`)}"\\s*/?>`),
    );
    for (const [hreflang, alternatePath] of [
      ["en", "/en"],
      ["zh-CN", "/zh-cn"],
      ["es", "/es"],
      ["x-default", "/en"],
    ]) {
      assert.match(
        html,
        new RegExp(
          `<link rel="alternate" href="${escape(`https://jjwine.example${alternatePath}`)}" hreflang="${escape(hreflang)}"`,
        ),
      );
    }
  });

  test(`emits localized social metadata and favicons for ${pathname}`, async () => {
    const html = await (await render(pathname)).text();
    const meta = localeMeta[lang];

    // Open Graph and Twitter must carry the locale's own copy, not English.
    assert.match(html, new RegExp(`property="og:title" content="${escape(meta.title)}"`));
    assert.match(html, new RegExp(`name="twitter:title" content="${escape(meta.title)}"`));
    assert.match(html, new RegExp(`property="og:locale" content="${escape(meta.ogLocale)}"`));
    assert.match(html, new RegExp(`property="og:url" content="${escape(`https://jjwine.example${canonicalPath}`)}"`));
    assert.match(html, /property="og:site_name" content="JJWine"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, new RegExp(`property="og:image" content="${escape("https://jjwine.example/og.png")}"`));

    // Declared og:image dimensions must match the real pixel size of og.png.
    const png = await readFile(new URL("../public/og.png", import.meta.url));
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    assert.match(html, new RegExp(`property="og:image:width" content="${width}"`));
    assert.match(html, new RegExp(`property="og:image:height" content="${height}"`));

    assert.match(html, /<link rel="icon" href="[^"]*\/favicon\.svg" type="image\/svg\+xml"/);
    assert.match(html, /<link rel="icon" href="[^"]*\/favicon\.ico"/);
  });

  test(`emits accessible navigation markup for ${pathname}`, async () => {
    const html = await (await render(pathname)).text();
    const meta = localeMeta[lang];

    assert.match(html, new RegExp(`<a class="skip-link" href="#main-content">${escape(meta.skip)}</a>`));
    assert.match(html, /<section class="hero" id="main-content" tabindex="-1">/);
    assert.match(html, /<button class="menu-button"[^>]*aria-expanded="false"[^>]*aria-controls="mobile-menu"/);
    assert.match(html, /<nav class="mobile-menu[^"]*" id="mobile-menu" aria-label="[^"]+"/);
    assert.match(html, /<nav class="language-links" aria-label="[^"]+"/);
    // Language switch links declare the language of their target and label.
    // (case-insensitive: the SSR serializer emits React's camelCase hrefLang,
    // which HTML parses identically to hreflang)
    assert.match(html, /<a[^>]*href="\/zh-cn"[^>]*hreflang="zh-CN"[^>]*lang="zh-CN"/i);
    // The brief dialog only mounts on demand; it must not be server-rendered.
    assert.doesNotMatch(html, /role="dialog"/);
  });
}

test("ships valid favicon files", async () => {
  const ico = await readFile(new URL("../public/favicon.ico", import.meta.url));
  assert.deepEqual([...ico.subarray(0, 4)], [0, 0, 1, 0]);
  const svg = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  assert.match(svg, /^<svg /);
});

test("ships the social card and Cloudflare configuration", async () => {
  const og = await readFile(new URL("../public/og.png", import.meta.url));
  assert.deepEqual([...og.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);

  const wrangler = JSON.parse(await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
  assert.equal(wrangler.name, "jjwine-site");
  assert.equal(wrangler.main, "./dist/server/index.js");
  assert.equal(wrangler.assets.directory, "./dist/client");

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../app/JJWineSite.tsx", import.meta.url));
});

// --- Privacy Policy and Legal Notice pages ---

const legalRoutes = [
  ["/en/privacy", "en", "Privacy Policy", "no user accounts, no login, no analytics or advertising scripts"],
  ["/en/legal", "en", "Legal Notice", "confirmed for each individual project, product and market"],
  ["/zh-cn/privacy", "zh-CN", "隐私政策", "不使用任何分析统计或广告脚本"],
  ["/zh-cn/legal", "zh-CN", "法律声明", "依据当时的现行证据逐一确认"],
  ["/es/privacy", "es", "Política de privacidad", "no utiliza scripts de analítica ni de publicidad"],
  ["/es/legal", "es", "Aviso legal", "se confirman para cada proyecto, producto y mercado"],
];

const localBriefMarkers = {
  en: "processed entirely on your own device",
  "zh-CN": "完全在您自己的设备和浏览器中处理",
  es: "se procesa íntegramente en su propio dispositivo",
};

for (const [pathname, lang, title, marker] of legalRoutes) {
  const isPrivacy = pathname.endsWith("/privacy");

  test(`renders ${pathname} with the approved operator facts`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();

    assert.match(html, new RegExp(`<h1>${escape(title)}</h1>`));
    assert.match(html, new RegExp(escape(marker)));
    // The exact registered operator name — never an invented English name.
    assert.match(html, /上海捷嘉酒业有限公司/);
    // The only contact channel is the visitor's own mail client.
    assert.match(html, /href="mailto:eddielu@winekee\.com"/);

    if (isPrivacy) {
      // Privacy policy must state local brief generation and Cloudflare processing.
      assert.match(html, new RegExp(escape(localBriefMarkers[lang])));
      assert.match(html, /Cloudflare Workers/);
      assert.match(html, /PIPL/);
      assert.match(html, /GDPR|RGPD/);
    }
  });

  test(`emits page-specific metadata for ${pathname}`, async () => {
    const html = await (await render(pathname)).text();
    assert.match(html, new RegExp(`<html lang="${escape(lang)}"`));
    assert.match(
      html,
      new RegExp(`<link rel="canonical" href="${escape(`https://jjwine.example${pathname}`)}"`),
    );
    const page = pathname.split("/").pop();
    for (const [hreflang, prefix] of [
      ["en", "/en"],
      ["zh-CN", "/zh-cn"],
      ["es", "/es"],
      ["x-default", "/en"],
    ]) {
      assert.match(
        html,
        new RegExp(
          `<link rel="alternate" href="${escape(`https://jjwine.example${prefix}/${page}`)}" hreflang="${escape(hreflang)}"`,
        ),
      );
    }
    assert.match(html, new RegExp(`property="og:title" content="[^"]*${escape(title)}[^"]*"`));
    assert.match(html, new RegExp(`property="og:url" content="${escape(`https://jjwine.example${pathname}`)}"`));
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
  });

  test(`links ${pathname} back to its locale home and sibling document`, async () => {
    const html = await (await render(pathname)).text();
    const locale = pathname.split("/")[1];
    const sibling = isPrivacy ? "legal" : "privacy";
    assert.match(html, new RegExp(`<a href="/${escape(locale)}">`));
    assert.match(html, new RegExp(`href="/${escape(locale)}/${sibling}"`));
    // Language switch links point at the same document in the other locales.
    for (const other of ["en", "zh-cn", "es"]) {
      const page = pathname.split("/").pop();
      assert.match(html, new RegExp(`href="/${other}/${page}"`));
    }
  });
}

for (const locale of ["en", "zh-cn", "es"]) {
  test(`home /${locale} footer links to its privacy and legal pages`, async () => {
    const html = await (await render(`/${locale}`)).text();
    assert.match(html, new RegExp(`<a href="/${locale}/privacy">`));
    assert.match(html, new RegExp(`<a href="/${locale}/legal">`));
  });
}

test("legal pages introduce no analytics, tracking or external scripts", async () => {
  for (const [pathname] of legalRoutes) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\(|plausible|umami|hotjar|facebook\.net/i);
    assert.doesNotMatch(html, /<form/i);
    const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)].map((match) => match[1]);
    for (const source of scriptSources) assert.match(source, /^\/_next\//);
  }
});

test("legal pages retain responsive language links and readable footer links", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.legal-topbar \.language-links\s*\{\s*display:\s*flex;/);
  assert.match(css, /\.legal-footer > a:last-child\s*\{[^}]*font-size:\s*13px;/s);
});
