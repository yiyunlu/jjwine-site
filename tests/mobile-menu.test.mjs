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

// The three home routes and the aria-label each localized mobile menu must
// carry (source: app/content.ts -> a11y.mobileNav).
const locales = [
  ["/en", "en", "Menu"],
  ["/zh-cn", "zh-CN", "菜单"],
  ["/es", "es", "Menú"],
];

// The four in-page destinations the mobile menu offers.
const sectionTargets = ["#capabilities", "#process", "#quality", "#partnership"];

function extractMobileMenu(html) {
  const match = html.match(/<nav class="mobile-menu[^"]*" id="mobile-menu"[\s\S]*?<\/nav>/);
  return match?.[0] ?? null;
}

function extractMenuButton(html) {
  const match = html.match(/<button[^>]*class="menu-button"[^>]*>/);
  return match?.[0] ?? null;
}

// The menu links back to this locale's own document ("/en", "/zh-cn", "/es")
// and declares the language of that link. Case-insensitive because the SSR
// serializer emits React's camelCase hrefLang, which HTML parses as hreflang.
function localeLinkPattern(pathname, lang) {
  return new RegExp(`<a[^>]*href="${escape(pathname)}"[^>]*hreflang="${escape(lang)}"`, "i");
}

for (const [pathname, lang, label] of locales) {
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

    // The menu also points at this locale's own page tree, so navigation within
    // the language works with JavaScript disabled.
    assert.match(menu, localeLinkPattern(pathname, lang));
  });
}

test("mobile menu labels link to their own locale and differ across locales", async () => {
  const labels = new Map();

  for (const [pathname, lang, label] of locales) {
    const html = await (await render(pathname)).text();
    const menu = extractMobileMenu(html);
    assert.ok(menu, `expected <nav id="mobile-menu"> on ${pathname}`);
    assert.match(menu, new RegExp(`aria-label="${escape(label)}"`));
    assert.match(menu, localeLinkPattern(pathname, lang));
    labels.set(lang, label);
  }

  // A shared label would mean untranslated copy leaking between locales.
  assert.equal(new Set(labels.values()).size, labels.size);
});

test("mobile menu links are server-rendered, not injected at runtime", async () => {
  const html = await (await render("/en")).text();
  const menu = extractMobileMenu(html);
  assert.ok(menu, 'expected <nav id="mobile-menu"> in the server response');

  // Anchor links and the locale switch live in the raw SSR string, so they are
  // usable before hydration and with JavaScript disabled.
  assert.match(menu, /<a href="#capabilities">/);
  assert.match(menu, /<a[^>]*href="\/zh-cn"/);
  assert.match(menu, /<a[^>]*href="\/es"/);
});