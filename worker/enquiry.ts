/** POST /api/enquiry: validate, Turnstile-verify, rate-limit, then email the enquiry. */

export interface EnquiryEnv {
  TURNSTILE_SECRET_KEY?: string;
  EMAIL_API_KEY?: string;
  EMAIL_FROM?: string;
  ENQUIRY_TO?: string;
  ENQUIRY_DRY_RUN?: string;
}

const LOCALES = ["en", "zh-cn"];
const TEXT_FIELDS = ["brand", "contact", "email", "category", "packaging", "quantity", "launch", "needs"] as const;
const OPTIONAL_FIELDS: ReadonlySet<string> = new Set(["quantity", "launch"]);
const MAX_FIELD = 4000;
const MAX_BODY = 32 * 1024;
const DEFAULT_TO = "eddielu@winekee.com";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Per-isolate only: each Worker isolate keeps its own counters, so the limit is
// best-effort and resets on isolate recycling. Turnstile is the primary abuse control.
const hits = new Map<string, number[]>();

export function resetEnquiryRateLimit(): void {
  hits.clear();
}

function json(status: number, body: Record<string, unknown>, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra },
  });
}

function rateLimited(ip: string, now: number): boolean {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);
  if (ip !== "unknown") form.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    if (!res.ok) return false;
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

async function hashEmail(email: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.toLowerCase()));
  return [...new Uint8Array(digest)].slice(0, 6).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function handleEnquiry(request: Request, env: EnquiryEnv): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" }, { Allow: "POST" });

  // Same-origin only: no CORS headers are ever emitted, and cross-origin posts are refused.
  const origin = request.headers.get("Origin");
  if (!origin || origin !== new URL(request.url).origin) return json(403, { ok: false, error: "forbidden_origin" });

  if (!(request.headers.get("Content-Type") ?? "").toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, error: "unsupported_media_type" });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (rateLimited(ip, Date.now())) return json(429, { ok: false, error: "rate_limited" }, { "Retry-After": String(RATE_WINDOW_MS / 1000) });

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: "payload_too_large" });
  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    data = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  if (typeof data.locale !== "string" || !LOCALES.includes(data.locale)) {
    return json(400, { ok: false, error: "invalid_locale" });
  }
  const fields: Record<string, string> = {};
  for (const name of TEXT_FIELDS) {
    const value = data[name];
    // Optional fields may be omitted or blank; they are stored as "".
    if (OPTIONAL_FIELDS.has(name) && (value === undefined || value === null)) {
      fields[name] = "";
      continue;
    }
    if (typeof value !== "string" || (!value.trim() && !OPTIONAL_FIELDS.has(name)) || value.length > MAX_FIELD) {
      return json(400, { ok: false, error: "invalid_field", field: name });
    }
    fields[name] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) {
    return json(400, { ok: false, error: "invalid_field", field: "email" });
  }
  if (typeof data.turnstileToken !== "string" || !data.turnstileToken) {
    return json(400, { ok: false, error: "invalid_field", field: "turnstileToken" });
  }

  const dryRun = env.ENQUIRY_DRY_RUN === "1";
  if (!env.TURNSTILE_SECRET_KEY || (!dryRun && (!env.EMAIL_API_KEY || !env.EMAIL_FROM))) {
    return json(503, { ok: false, error: "not_configured" });
  }
  if (!(await verifyTurnstile(data.turnstileToken, env.TURNSTILE_SECRET_KEY, ip))) {
    return json(403, { ok: false, error: "turnstile_failed" });
  }

  if (dryRun) {
    console.log(JSON.stringify({
      event: "enquiry_dry_run", locale: data.locale, emailHash: await hashEmail(fields.email),
      fields: Object.fromEntries(TEXT_FIELDS.map((n) => [n, fields[n].length])),
    }));
    return json(200, { ok: true, dryRun: true });
  }

  const text = [`Locale: ${data.locale}`, ...TEXT_FIELDS.map((n) => `${n}: ${fields[n]}`)].join("\n");
  try {
    // Resend HTTP API; swap this call to change provider.
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.EMAIL_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [env.ENQUIRY_TO || DEFAULT_TO],
        reply_to: fields.email,
        subject: `JJWine enquiry: ${fields.brand.slice(0, 80).replace(/[\r\n]+/g, " ")}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error(JSON.stringify({ event: "enquiry_email_failed", status: res.status }));
      return json(502, { ok: false, error: "email_failed" });
    }
  } catch {
    console.error(JSON.stringify({ event: "enquiry_email_failed", status: 0 }));
    return json(502, { ok: false, error: "email_failed" });
  }
  return json(200, { ok: true });
}
