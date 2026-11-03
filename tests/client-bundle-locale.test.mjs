import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://jjwine.example${pathname}`, {
      headers: { accept: "text/html", host: "jjwine.example" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function loadedChunks(html) {
  const queue = [...html.matchAll(/\b(?:src|href)=["'](\/_next\/static\/[^"']+\.js(?:[?#][^"']*)?)["']/g)]
    .map((match) => new URL(match[1], "https://jjwine.example").pathname);
  const chunks = new Map();
  const clientUrl = new URL("../dist/client/", import.meta.url);

  while (queue.length) {
    const chunk = queue.shift();
    if (chunks.has(chunk)) continue;
    const source = await readFile(new URL(`.${chunk}`, clientUrl), "utf8");
    chunks.set(chunk, source);
    for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?)(["'`])(\.{1,2}\/[^"'`]+\.js(?:[?#][^"'`]*)?)\1/g)) {
      queue.push(new URL(match[2], `https://jjwine.example${chunk}`).pathname);
    }
  }

  return chunks;
}

const markers = {
  en: "One request, managed end to end",
  "zh-cn": "一个需求，全链路承接",
  es: "Una necesidad",
  fr: "Un besoin, une prise en charge",
};

for (const locale of Object.keys(markers)) {
  test(`home /${locale} client chunks exclude other locales' copy`, async () => {
    const route = `/${locale}`;
    const response = await render(route);
    assert.equal(response.status, 200, `${route} must render successfully`);
    const chunks = await loadedChunks(await response.text());

    assert.ok(chunks.size > 0, `${route} must load client chunks`);
    assert.ok(
      [...chunks.keys()].some((chunk) => /\/JJWineSite-[^/]+\.js$/.test(chunk)),
      `${route} must load a JJWineSite chunk`,
    );
    for (const [chunk, source] of chunks) {
      for (const [otherLocale, marker] of Object.entries(markers)) {
        if (otherLocale === locale) continue;
        assert.ok(!source.includes(marker), `${route}: ${chunk} must not contain ${otherLocale} marker "${marker}"`);
      }
    }
  });
}
