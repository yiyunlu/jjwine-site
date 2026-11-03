# Enquiry Worker env (names only)

`POST /api/enquiry` reads these from the Cloudflare Worker environment. Set values with `wrangler secret put <NAME>` or the CF dashboard. **Never commit values.**

| Name | Required | Notes |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | yes | Cloudflare Turnstile secret |
| `EMAIL_API_KEY` | yes (unless dry run) | Resend API key |
| `EMAIL_FROM` | yes (unless dry run) | Verified Resend sender, e.g. `JJWine <enquiry@yourdomain>` |
| `ENQUIRY_TO` | no | Defaults to `CONTACT_EMAIL` in `app/legal-content.ts` (`eddielu@winekee.com`) |
| `ENQUIRY_DRY_RUN` | no | `1` = verify Turnstile, skip email; logs hashed email + field lengths only |

Front-end build (ECO-131): public `VITE_TURNSTILE_SITE_KEY` at build time (not a secret).

Missing required config → HTTP 503 `{ ok: false, error: "not_configured" }`.
Rate limit: 5 requests / 10 min per `CF-Connecting-IP` (in-memory per isolate; best-effort). Only requests that pass body, field and config checks count, so 400, 413 and 503 responses do not use it up.
Same-origin `Origin` required; no CORS. Locales accepted: `en`, `zh-cn` only.

Turnstile: siteverify must return `success: true` and a `hostname` equal to the request host (`new URL(request.url).hostname`). Dry run verifies Turnstile the same way. Cloudflare's dummy test secret keys return `hostname: "example.com"`, so they fail this check on any real host, in dry run too.
Body limit: 32 KiB. A `Content-Length` above it, or a body above it in UTF-8 bytes, returns 413.
