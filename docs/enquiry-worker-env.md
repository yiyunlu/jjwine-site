# Enquiry Worker env (names only)

`POST /api/enquiry` reads these from the Cloudflare Worker environment. Set values with `wrangler secret put <NAME>` or the CF dashboard. **Never commit values.**

| Name | Required | Notes |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | yes | Cloudflare Turnstile secret |
| `EMAIL_API_KEY` | yes (unless dry run) | Resend API key |
| `EMAIL_FROM` | yes (unless dry run) | Verified Resend sender, e.g. `JJWine <enquiry@yourdomain>` |
| `ENQUIRY_TO` | no | Defaults to `eddielu@winekee.com` |
| `ENQUIRY_DRY_RUN` | no | `1` = verify Turnstile, skip email; logs hashed email + field lengths only |

Front-end build (ECO-131): public `VITE_TURNSTILE_SITE_KEY` at build time (not a secret).

Missing required config → HTTP 503 `{ ok: false, error: "not_configured" }`.
Rate limit: 5 requests / 10 min per `CF-Connecting-IP` (in-memory per isolate; best-effort).
Same-origin `Origin` required; no CORS. Locales accepted: `en`, `zh-cn` only.
