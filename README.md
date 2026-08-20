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
- dynamic Open Graph metadata and project-specific social preview card
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

Cloudflare will assign a `*.workers.dev` address. A custom domain can be attached in the Cloudflare dashboard after the first deployment.

The deployment configuration is in `wrangler.jsonc`. Version 1.0 uses no D1, R2, KV or paid third-party runtime service.

## Temporary test deployment

- URL: `https://jjwine.ecomm101.cc`
- Cloudflare Worker: `jjwine-site`
- The custom domain is declared in `wrangler.jsonc`.
- `workers.dev` and per-deployment preview URLs are disabled; this test deployment is reachable only through the custom domain.

## Before public launch

- confirm the final domain and business contact route
- replace the local brief download with an approved enquiry destination if required
- revalidate every public certification, capability and authorization claim
- add privacy, cookie and legal pages for the actual operating entity and target markets
- confirm China hosting/ICP requirements if the site will use a mainland-China origin
