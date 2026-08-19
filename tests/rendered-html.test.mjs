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
}

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
