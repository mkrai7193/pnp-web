# pnp-web

React + Vite website for PNP Sports Management LLP ([pnpsports.in](https://pnpsports.in)), served
by a Cloudflare Worker (`worker/`, config in `wrangler.jsonc`).

**Start here → [`GUIDELINES.md`](./GUIDELINES.md)** — design tokens, component conventions, SEO
checklist, and what to do (and not do) when changing this repo.

## Getting started

```bash
npm install
cp .env.example .env               # if not already present
cp .dev.vars.example .dev.vars     # worker secrets for `wrangler dev`
npm run dev                        # http://localhost:5173
npx wrangler dev                   # optional: serves /api/* on :8787 (Vite proxies to it)
npm run lint
npm run build
```

Deploys to Cloudflare on push to `main` via `.github/workflows/web-deploy.yml`
(needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets).
