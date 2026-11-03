import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

const sharedHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "DENY",
  "content-security-policy": "frame-ancestors 'none'",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

function assertSecurityHeaders(response, { https }) {
  for (const [name, value] of Object.entries(sharedHeaders)) {
    assert.equal(response.headers.get(name), value, name);
  }
  assert.equal(response.headers.get("strict-transport-security"), https ? "max-age=31536000" : null);
}

const cases = [
  ["GET /en", "https://jjwine.example", "/en", {}, 200],
  ["308 legal redirect", "https://www.jiawine.com", "/es/privacy", {}, 308],
  ["test-host robots.txt", "https://jjwine.ecomm101.cc", "/robots.txt", {}, 200],
  ["POST /api/enquiry", "https://jjwine.example", "/api/enquiry", { method: "POST" }, 403],
];

for (const [label, origin, pathname, options, status] of cases) {
  test(`${label} carries the security headers`, async () => {
    const response = await fetchWorker(origin, pathname, options);
    assert.equal(response.status, status);
    assertSecurityHeaders(response, { https: true });
    await response.text();
  });
}

test("HSTS is not sent over http", async () => {
  const response = await fetchWorker("http://localhost:3000", "/en");
  assert.equal(response.status, 200);
  assertSecurityHeaders(response, { https: false });
  await response.text();
});

test("test hosts keep X-Robots-Tag and other hosts do not gain it", async () => {
  const testHost = await fetchWorker("https://jjwine.ecomm101.cc", "/robots.txt");
  assert.equal(testHost.headers.get("x-robots-tag"), "noindex, nofollow");
  const production = await fetchWorker("https://www.jiawine.com", "/es/privacy");
  assert.equal(production.headers.get("x-robots-tag"), null);
});

test("static assets get the same security headers from public/_headers", async () => {
  const lines = (await readFile(new URL("../public/_headers", import.meta.url), "utf8")).split("\n");
  const block = {};
  for (const line of lines.slice(lines.indexOf("/*") + 1)) {
    if (!/^\s+\S/.test(line)) break;
    const [name, ...value] = line.trim().split(":");
    block[name.toLowerCase()] = value.join(":").trim();
  }
  assert.deepEqual(block, { ...sharedHeaders, "strict-transport-security": "max-age=31536000" });
});
