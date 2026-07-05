# SEO Checklist — Pattrix (pattrix.co)

> **Scope reminder:** all SEO work happens in **`Mohamedalhaaj/Pattrix-GPT`**
> (this repo). Never modify `Mohamedalhaaj/Pattrix`.

## What is implemented

| Item | Where | Notes |
| --- | --- | --- |
| Homepage title/description | `content/site.ts` → `metaTitle`, `metaDescription` | Rendered by `app/layout.tsx` |
| Social (OG/Twitter) copy | `content/site.ts` → `ogTitle`, `ogDescription` | Shorter variants for share cards |
| Title template | `app/layout.tsx` (`%s — Pattrix`) | Child pages set only their own part |
| Canonical URLs | `app/page.tsx` (`/`), `app/work/[slug]/page.tsx` (`/work/<slug>`) | Resolved against `metadataBase` (`https://pattrix.co`) |
| Case-study metadata | `app/work/[slug]/page.tsx` → `generateMetadata` | Unique title/description/OG per project, built from `content/projects.ts` only |
| OG image | `app/opengraph-image.tsx` | Generated at build (1200×630); applies site-wide via Next file convention |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml` | Home + all `/work/<slug>` routes; `/studio` excluded; `lastModified` = build date |
| Robots | `app/robots.ts` → `/robots.txt` | Allows public pages; disallows `/studio`, `/api/`, `/admin`, `/draft`, `/preview`; references sitemap |
| Studio noindex | `app/studio/layout.tsx` | `robots: { index: false, follow: false }` |
| Structured data (JSON-LD) | `components/seo/json-ld.tsx`, mounted in `app/layout.tsx` | Organization + ProfessionalService + WebSite `@graph`; facts sourced from `content/site.ts` |
| Search Console hook | `app/layout.tsx` + `.env.example` | Meta tag rendered only when `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set |
| H1/heading hierarchy | `components/chapters/*` | One H1 (hero), one H2 per chapter, H3 cards — audit passed, unchanged |
| Image alt text | `content/site.ts`, `content/projects.ts`, components | Descriptive alts with real width/height — audit passed, unchanged |

## How to update things

### Homepage metadata
Edit `content/site.ts`:
- `metaTitle` / `metaDescription` — search snippet (title ≤ ~65 chars, description ≤ ~165 chars).
- `ogTitle` / `ogDescription` — social share cards.

Never hardcode copy in components (see `AGENTS.md`).

### Case-study metadata
It is generated automatically from `content/projects.ts` (`title`, `premise`,
`category`, `year`). Write a strong one-line `premise` for every new project —
it doubles as the meta description. No extra SEO work needed per project.

### Adding a page to the sitemap
- New `/work/<slug>` project: nothing to do — `app/sitemap.ts` maps over
  `projects`.
- A brand-new top-level route: add an entry to the returned array in
  `app/sitemap.ts` and give the page its own `metadata` (title, description,
  `alternates.canonical`).

### Google Search Console verification
1. Add the property `https://pattrix.co` (URL-prefix) in Search Console.
2. Choose the **HTML tag** method and copy the `content="…"` value only.
3. In Netlify → Site settings → Environment variables, set
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to that value and redeploy.
4. Verify in Search Console, then submit `https://pattrix.co/sitemap.xml`
   under *Sitemaps*.

Do **not** paste the token into source code.

## How to test

```bash
npm install
npx tsc --noEmit && npm run lint && npm run build
npm run start   # then check:
```

- `http://localhost:3000/` — view-source: one `<h1>`, canonical `https://pattrix.co/`,
  OG/Twitter tags, `application/ld+json` script.
- `http://localhost:3000/sitemap.xml` — home + all work routes, **no** `/studio`.
- `http://localhost:3000/robots.txt` — `Disallow: /studio`, sitemap line.
- `http://localhost:3000/work/<slug>` — unique title/description, canonical
  `https://pattrix.co/work/<slug>`.
- Validate JSON-LD at https://search.google.com/test/rich-results or
  https://validator.schema.org.

## Common mistakes to avoid

- **Don't put `alternates.canonical` in `app/layout.tsx`** — child pages would
  inherit `/` as their canonical. Canonicals live per page.
- **Don't invent facts in structured data** — no ratings, awards, founding
  dates, employee counts, or unverified social links. `sameAs` fills itself
  from `site.contact.socials` once real URLs are added there.
- **Don't hardcode `pattrix.netlify.app`, deploy-preview URLs, or localhost**
  anywhere in metadata — `site.url` is the single source of the canonical
  domain.
- **Don't remove `metadataBase`** — relative OG/canonical URLs depend on it.
- **Keep social `sameAs`/`socials` empty until URLs are verified** (matches
  the rule already in `content/site.ts`).
- If a page must never be indexed, give it `robots: { index: false }` metadata
  **and** a `disallow` entry in `app/robots.ts` (belt and suspenders — note
  that `Disallow` alone does not de-index an already-known URL).
