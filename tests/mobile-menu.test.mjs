import assert from "node:assert/strict";
import test from "node:test";

// Same rendering path as tests/rendered-html.test.mjs: import the built worker
// and call worker.fetch directly, so nothing here depends on a running server.
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

// The three home routes, the aria-label each localized mobile menu must carry
// (source: app/content.ts -> a11y.mobileNav) and the language switch entry that
// belongs to that locale (href === pathname, hreflang === lang).
const locales = [
  { pathname: "/en", lang: "en", label: "Menu" },
  { pathname: "/zh-cn", lang: "zh-CN", label: "菜单" },
  { pathname: "/es", lang: "es", label: "Menú" },
];

// The four in-page destinations the mobile menu offers.
const sectionTargets = ["#capabilities", "#process", "#quality", "#partnership"];

function extractMobileMenu(html) {
  const match = html.match(/<nav class="mobile-menu[^"]*" id="mobile-menu"[\s\S]*?<\/nav>/);
  return match?.[0] ?? null;
}

function extractMenuTag(menu) {
  return menu.match(/^<nav[^>]*>/)?.[0] ?? null;
}

function extractMenuButton(html) {
  const match = html.match(/<button[^>]*class="menu-button"[^>]*>/);
  return match?.[0] ?? null;
}

// Every anchor inside the menu fragment, in document order.
function extractAnchors(fragment) {
  return fragment.match(/<a\s[^>]*>/gi) ?? [];
}

// Reads one attribute off a raw tag, case-insensitively: the SSR serializer
// emits React's camelCase names, which HTML parses as lowercase.
function getAttr(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] ?? null;
}

// A language switch entry, recognized by its href, declares the language of the
// document it points at. Case-insensitive for the hrefLang/hreflang casing.
function localeLinkPattern(pathname, lang) {
  return new RegExp(`<a[^>]*href="${escape(pathname)}"[^>]*hreflang="${escape(lang)}"`, "i");
}

for (const { pathname, lang, label } of locales) {
  test(`renders a progressively enhanced mobile menu on ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();

    // Trigger button: it must announce the controlled container and start
    // collapsed, both in the server-rendered markup.
    const button = extractMenuButton(html);
    assert.ok(button, `expected a .menu-button on ${pathname}`);
    assert.match(button, /aria-controls="mobile-menu"/);
    assert.match(button, /aria-expanded="false"/);

    // Menu container: localized accessible name, matching the locale.
    const menu = extractMobileMenu(html);
    assert.ok(menu, `expected <nav id="mobile-menu"> on ${pathname}`);
    assert.match(menu, new RegExp(`aria-label="${escape(label)}"`));

    // Navigation links must exist in the HTML itself (progressive enhancement),
    // not be injected by client-side JavaScript.
    for (const target of sectionTargets) {
      assert.match(menu, new RegExp(`<a href="${escape(target)}"`));
    }

    // All three language switch entries are server-rendered, each declaring the
    // language of the page it points at, so switching language works with
    // JavaScript disabled.
    for (const target of locales) {
      assert.match(menu, localeLinkPattern(target.pathname, target.lang));
    }

    // The entry pointing at this very route is flagged as the current page —
    // exactly once — so the switch tells the reader where they already are.
    const anchors = extractAnchors(menu);
    const languageAnchors = anchors.filter((anchor) =>
      locales.some((target) => getAttr(anchor, "href") === target.pathname),
    );
    assert.equal(
      languageAnchors.length,
      locales.length,
      `expected ${locales.length} language links in the menu on ${pathname}`,
    );

    const current = languageAnchors.filter((anchor) => getAttr(anchor, "aria-current") === "page");
    assert.equal(current.length, 1, `expected exactly one aria-current="page" link on ${pathname}`);
    assert.equal(getAttr(current[0], "href"), pathname);
    assert.equal(getAttr(current[0], "hreflang"), lang);
  });
}

test("mobile menu labels are read from the rendered HTML and differ across locales", async () => {
  const labelsByRoute = new Map();

  for (const { pathname, label } of locales) {
    const html = await (await render(pathname)).text();
    const menu = extractMobileMenu(html);
    assert.ok(menu, `expected <nav id="mobile-menu"> on ${pathname}`);

    const menuTag = extractMenuTag(menu);
    assert.ok(menuTag, `expected an opening <nav> tag on ${pathname}`);
    const renderedLabel = getAttr(menuTag, "aria-label");
    assert.ok(renderedLabel, `expected nav#mobile-menu to carry an aria-label on ${pathname}`);
    labelsByRoute.set(pathname, renderedLabel);

    // ...and the rendered value is this locale's own copy, not another's.
    assert.equal(renderedLabel, label);
  }

  // A shared label would mean untranslated copy leaking between locales.
  const renderedLabels = [...labelsByRoute.values()];
  assert.equal(new Set(renderedLabels).size, renderedLabels.length);
});

test("mobile menu links are server-rendered, not injected at runtime", async () => {
  const html = await (await render("/en")).text();
  const menu = extractMobileMenu(html);
  assert.ok(menu, 'expected <nav id="mobile-menu"> in the server response');

  // Anchor links and the locale switch live in the raw SSR string, so they are
  // usable before hydration and with JavaScript disabled.
  const hrefs = extractAnchors(menu).map((anchor) => getAttr(anchor, "href"));
  for (const target of sectionTargets) {
    assert.ok(hrefs.includes(target), `expected ${target} in the server-rendered menu`);
  }
  for (const { pathname } of locales) {
    assert.ok(hrefs.includes(pathname), `expected ${pathname} in the server-rendered menu`);
  }
});