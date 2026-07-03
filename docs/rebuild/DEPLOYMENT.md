# Deployment Notes — Hostinger

## What this site needs

Next.js 16 App Router. Two viable Hostinger paths:

### Option A — Hostinger VPS / Cloud (full Next.js, recommended)

Node 20+ on the server:

```bash
npm ci
npm run build
npm run start        # serves on :3000
```

Run behind Nginx (reverse proxy 80/443 → 3000) with a process manager:

```bash
pm2 start npm --name pattrix -- start
```

### Option B — Hostinger shared hosting (static export)

The site is fully static-friendly (all routes prerender; no server actions,
no dynamic APIs). Enable static export:

1. In `next.config.mjs` add: `output: "export"` and
   `images: { unoptimized: true }` (the site now ships real photography via
   `next/image`, which needs the optimizer disabled for static export).
2. `npm run build` → upload the generated `out/` directory to `public_html`.

Note: with static export, the `/work/[slug]` pages are prerendered from
`generateStaticParams` — adding a new project requires a rebuild + re-upload.

## Pre-launch checklist

- [ ] Set the real domain in `content/site.ts → url` (sitemap/OG/canonical)
- [ ] Verify `studio@pattrix.com` mailbox (all CTAs are mailto:)
- [ ] Resolve items in `CONTENT_GAPS.md` that matter for launch
- [ ] `npx tsc --noEmit && npm run lint && npm run build` all green
- [ ] `npx playwright test` green
- [ ] HTTPS enabled (Hostinger SSL), HTTP→HTTPS redirect
- [ ] Check `https://<domain>/sitemap.xml` and `/robots.txt` after deploy

## Local preview

```bash
npm install
npm run dev        # http://localhost:3000
```
