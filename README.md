# JJWine Website 1.0

A motion-led multilingual B2B website for JJWine, built for Cloudflare Workers.

## Project organization

This directory is the dedicated workspace for all JJWine website code and development documentation.

- `CLAUDE.md` — project rules automatically loaded by Claude Code
- `docs/事实与来源边界.md` — evidence requirements and limits for public claims
- `docs/开发路线图.md` — prioritized development and launch plan
- `app/`, `public/`, `tests/`, `worker/` — application source, assets, tests and Worker entry

Run Claude Code and all development commands from this directory. Business contracts, quotations, customer files and internal project notes remain outside this website workspace.

## Included

- English, Simplified Chinese and Spanish routes
- responsive motion with reduced-motion support
- production formats, six-stage project process and quality/compliance sections
- separate global-brand and retail/private-label entry points
- local project-brief generator; form data never leaves the visitor's device
- trilingual Privacy Policy and Legal Notice pages (`/{locale}/privacy`, `/{locale}/legal`) for the operator 上海捷嘉酒业有限公司, linked from every footer
- dynamic Open Graph metadata and project-specific social preview card, including page-specific canonical/hreflang for the legal pages
- Cloudflare Worker-compatible server and static asset output

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The language routes are `/en`, `/zh-cn` and `/es`.

## Validate

```bash
npm run build
npm test
npm run deploy:dry-run
```

The production Worker output is generated under `dist/`.

## Deploy to Cloudflare Workers

Authenticate Wrangler once:

```bash
npx wrangler login
```

Then deploy:

```bash
npm run deploy
```

The current configuration deploys directly to the custom domain declared in `wrangler.jsonc`; `workers.dev` and per-deployment preview URLs are disabled.

The deployment configuration is in `wrangler.jsonc`. Version 1.0 uses no D1, R2, KV or paid third-party runtime service.

### Automatic test deploys (GitHub Actions)

Every push to `main` (docs-only changes excluded) and every manual **Run workflow** runs `.github/workflows/deploy-test.yml`, which lints, tests, builds and runs `wrangler deploy --config wrangler.jsonc` to the **test site only** (`https://jjwine.ecomm101.cc`). A guard step fails the job if `wrangler.jsonc` ever targets any other domain; production `www.jiawine.com` is never deployed from this repo.

Required repository secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Roll back with `npx wrangler rollback --config wrangler.jsonc`. Details (token permissions, rollback, pausing): `docs/ops/自动部署-测试站.md`.

## Temporary test deployment

- URL: `https://jjwine.ecomm101.cc`
- Cloudflare Worker: `jjwine-site`
- The custom domain is declared in `wrangler.jsonc`.
- `workers.dev` and per-deployment preview URLs are disabled; this test deployment is reachable only through the custom domain.

## Before public launch

- confirm the final domain and business contact route
- replace the local brief download with an approved enquiry destination if required
- revalidate every public certification, capability and authorization claim
- have the published privacy and legal pages (effective 2026-08-20, operator 上海捷嘉酒业有限公司) reviewed by qualified counsel for the actual target markets; they are website policies, not legal advice
- confirm China hosting/ICP requirements if the site will use a mainland-China origin
