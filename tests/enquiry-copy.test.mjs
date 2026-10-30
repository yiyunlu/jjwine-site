import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const src = await readFile(new URL("../app/v2-copy.ts", import.meta.url), "utf8");
const block = (locale, next) => {
  const start = src.indexOf(`  "${locale}": {`);
  const end = next ? src.indexOf(`  "${next}": {`, start) : src.length;
  assert.ok(start >= 0 && end > start, `locale block ${locale}`);
  return src.slice(start, end);
};

test("en and zh-cn enquiry copy include submit and not_configured", () => {
  const en = block("en", "zh-cn");
  assert.match(en, /"submit": "Submit enquiry"/);
  assert.match(en, /"not_configured": "Online enquiry is temporarily unavailable\. Please download or copy the brief/);
  const zh = block("zh-cn", "es");
  assert.match(zh, /"submit": "提交询盘"/);
  assert.match(zh, /"not_configured": "在线询盘暂时不可用。请下载或复制/);
});

test("es and fr have no server enquiry copy", () => {
  const rest = src.slice(src.indexOf(`  "es": {`));
  assert.doesNotMatch(rest, /"enquiry":/);
  assert.doesNotMatch(rest, /not_configured/);
});

test("client maps not_configured and skips POST without site key", async () => {
  const site = await readFile(new URL("../app/JJWineSite.tsx", import.meta.url), "utf8");
  assert.match(site, /if \(!TURNSTILE_SITE_KEY\) \{\s*setStatus\(\{ key: "not_configured"/);
  assert.match(site, /response\.status === 503/);
  assert.match(site, /result\?\.error === "turnstile_failed"/);
});
