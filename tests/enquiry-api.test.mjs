import assert from "node:assert/strict";
import test from "node:test";

const ORIGIN = "https://jjwine.ecomm101.cc";
const good = {
  locale: "en", brand: "Brand", contact: "Jane", email: "jane@example.com", category: "Wine",
  packaging: "Bottle", quantity: "1000", launch: "Q1", needs: "Local production", turnstileToken: "tok",
};
const env = { TURNSTILE_SECRET_KEY: "s", EMAIL_API_KEY: "k", EMAIL_FROM: "a@b.co", ASSETS: {} };
const ctx = { waitUntil() {}, passThroughOnException() {} };

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const { default: worker } = await import(workerUrl.href);

let ipCounter = 0;
function post(body, { headers = {}, e = env, ip } = {}) {
  return worker.fetch(new Request(`${ORIGIN}/api/enquiry`, {
    method: "POST",
    headers: {
      "content-type": "application/json", origin: ORIGIN,
      "cf-connecting-ip": ip ?? `10.0.0.${++ipCounter}`, ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }), e, ctx);
}

function mockFetch({ turnstile = true, emailOk = true } = {}) {
  const calls = [];
  const orig = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes("turnstile")) return Response.json({ success: turnstile });
    return new Response("{}", { status: emailOk ? 200 : 500 });
  };
  return { calls, restore: () => { globalThis.fetch = orig; } };
}

test("rejects non-POST, cross-origin and bad content type", async () => {
  const get = await worker.fetch(new Request(`${ORIGIN}/api/enquiry`), env, ctx);
  assert.equal(get.status, 405);
  assert.equal((await post(good, { headers: { origin: "https://evil.example" } })).status, 403);
  assert.equal((await post(good, { headers: { origin: "" } })).status, 403);
  assert.equal((await post(good, { headers: { "content-type": "text/plain" } })).status, 415);
  const res = await post(good);
  assert.equal(res.headers.get("access-control-allow-origin"), null);
  assert.equal(res.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("validates locale and required fields", async () => {
  assert.equal((await post({ ...good, locale: "es" })).status, 400);
  assert.equal((await post({ ...good, locale: undefined })).status, 400);
  assert.equal((await post({ ...good, brand: " " })).status, 400);
  assert.equal((await post({ ...good, email: "nope" })).status, 400);
  assert.equal((await post({ ...good, turnstileToken: "" })).status, 400);
  assert.equal((await post("{not json")).status, 400);
  assert.equal((await post("[]")).status, 400);
});

test("accepts en and zh-cn and sends email to the default recipient", async () => {
  const m = mockFetch();
  try {
    for (const locale of ["en", "zh-cn"]) {
      const res = await post({ ...good, locale });
      assert.equal(res.status, 200);
      assert.deepEqual(await res.json(), { ok: true });
    }
    const email = m.calls.find((c) => c.url.includes("resend"));
    const payload = JSON.parse(email.init.body);
    assert.deepEqual(payload.to, ["eddielu@winekee.com"]);
    assert.equal(payload.reply_to, "jane@example.com");
    assert.equal(email.init.headers.Authorization, "Bearer k");
  } finally { m.restore(); }
});

test("failed Turnstile returns 403 and sends no email", async () => {
  const m = mockFetch({ turnstile: false });
  try {
    assert.equal((await post(good)).status, 403);
    assert.equal(m.calls.filter((c) => c.url.includes("resend")).length, 0);
  } finally { m.restore(); }
});

test("email provider failure returns 502", async () => {
  const m = mockFetch({ emailOk: false });
  try { assert.equal((await post(good)).status, 502); } finally { m.restore(); }
});

test("missing secrets return 503", async () => {
  assert.equal((await post(good, { e: { ASSETS: {} } })).status, 503);
});

test("dry run verifies Turnstile, skips email and logs no raw email", async () => {
  const m = mockFetch();
  const logs = [];
  const origLog = console.log;
  console.log = (...a) => logs.push(a.join(" "));
  try {
    const res = await post(good, { e: { TURNSTILE_SECRET_KEY: "s", ENQUIRY_DRY_RUN: "1", ASSETS: {} } });
    assert.equal(res.status, 200);
    assert.equal((await res.json()).dryRun, true);
    assert.equal(m.calls.filter((c) => c.url.includes("resend")).length, 0);
    assert.ok(logs.some((l) => l.includes("enquiry_dry_run")));
    assert.ok(!logs.join("").includes("jane@example.com"));
  } finally { console.log = origLog; m.restore(); }
});

test("rate limits per IP with 429", async () => {
  const m = mockFetch();
  try {
    const ip = "203.0.113.9";
    for (let i = 0; i < 5; i++) assert.equal((await post(good, { ip })).status, 200);
    const res = await post(good, { ip });
    assert.equal(res.status, 429);
    assert.ok(res.headers.get("retry-after"));
    assert.equal((await post(good, { ip: "203.0.113.10" })).status, 200);
  } finally { m.restore(); }
});
