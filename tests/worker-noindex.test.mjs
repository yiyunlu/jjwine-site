import assert from "node:assert/strict";
import test from "node:test";

const disallowBody = "User-agent: *\nDisallow: /\n";

async function fetchWorker(origin, pathname, options = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${origin}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`${origin}${pathname}`, { headers: { accept: "text/html" }, ...options }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const origin of [
  "https://jjwine.ecomm101.cc",
  "https://ecomm101.cc",
  "https://preview.jjwine.workers.dev",
  "https://JJWINE.ECOMM101.CC:8443",
]) {
  test(`${origin} app responses block indexing`, async () => {
    const response = await fetchWorker(origin, "/en");
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.match(response.headers.get("content-type"), /^text\/html\b/);
    assert.match(await response.text(), /One request, managed end to end\./);
  });
}

for (const method of ["GET", "HEAD"]) {
  test(`test robots.txt ${method} blocks crawling`, async () => {
    const response = await fetchWorker("https://jjwine.ecomm101.cc", "/robots.txt", { method });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(await response.text(), method === "HEAD" ? "" : disallowBody);
  });
}

for (const origin of ["https://jjwine.ecomm101.cc", "https://www.jiawine.com"]) {
  for (const [source, target] of [["/es/privacy", "/en/privacy"], ["/fr/legal", "/en/legal"]]) {
    test(`${origin}${source} preserves its legal redirect`, async () => {
      const response = await fetchWorker(origin, source);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get("location"), `${origin}${target}`);
      assert.equal(response.headers.get("x-robots-tag"), origin.includes("ecomm101.cc") ? "noindex, nofollow" : null);
    });
  }
}

for (const origin of [
  "https://www.jiawine.com", "https://jiawine.com", "http://localhost:3000",
  "https://jjwine.example", "https://ecomm101.cc.evil.com", "https://notecomm101.cc",
]) {
  test(`${origin} retains app and robots behavior`, async () => {
    const response = await fetchWorker(origin, "/en", { headers: { host: "jjwine.ecomm101.cc" } });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-robots-tag"), null);
    await response.text();
    const robots = await fetchWorker(origin, "/robots.txt");
    assert.equal(robots.headers.get("x-robots-tag"), null);
    assert.notEqual(await robots.text(), disallowBody);
  });
}

test("a client Host header cannot bypass test host protection", async () => {
  const response = await fetchWorker("https://jjwine.ecomm101.cc", "/robots.txt", {
    headers: { host: "www.jiawine.com" },
  });
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.equal(await response.text(), disallowBody);
});
