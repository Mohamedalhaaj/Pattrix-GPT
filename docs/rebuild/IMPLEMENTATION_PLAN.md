# Implementation Plan

## Stack decision (Phase 3)

Keep: Next.js 16.2.6 (App Router, Turbopack — builds green), React 18.3.1,
Tailwind 3.4, TypeScript strict. No version bumps without need.

Add: `gsap` (core + ScrollTrigger, MIT-free) — sole scroll/reveal system.
Remove from usage (then from package.json): `framer-motion`, `lucide-react`.
No three.js — the concept is a 2D field with parallax depth; Canvas 2D delivers
it at a fraction of the cost, works on all targets, trivial static fallback.
No smooth-scroll library — native scroll (matches reference behaviour).

## File architecture

```
app/
  layout.tsx            fonts (Archivo, Newsreader), metadata, JSON-LD
  page.tsx              chapter composition (server component)
  work/[slug]/page.tsx  case-study route (SSG via generateStaticParams)
  robots.ts, sitemap.ts, icon.svg, opengraph-image
content/
  site.ts       nav, contact, meta, positioning copy
  services.ts   6 service systems (groups the 11 offerings)
  projects.ts   case studies (slug, premise, approach, scope — no invented results)
  clients.ts    client names + optional logo path
components/
  field/        field-canvas.tsx (client), engine.ts (pure TS), formations.ts
  chapters/     hero, positioning, interlude, work, services, clients, about, contact
  ui/           header, footer, cta-link, chapter-marker, container, section
lib/
  gsap.ts       plugin registration + matchMedia helpers
  seed.ts       seeded PRNG for deterministic patterns
```

## Build order (Phase 5)

1. Tokens: tailwind config + globals (colors, type, spacing, easings)
2. Content system (typed) + layout/fonts/metadata
3. Field engine + formations (with reduced-motion static render + no-JS fallback)
4. Header + footer + ui primitives
5. Hero → Positioning → Interlude → Work → Services → Clients → About → Contact
   (each: semantic HTML → desktop → tablet → mobile → motion → reduced-motion →
   keyboard pass → browser check)
6. Case-study route + pattern covers
7. Metadata/SEO/favicon/OG
8. Phases 6–10: responsive+a11y sweep, performance, Playwright, critique, gates

## Verification gates (Phase 10)

tsc • eslint • next build • Playwright suite (7 viewports, overflow, console,
keyboard, reduced-motion) • DevTools perf pass • design critique corrections •
logical commits on `rebuild/pattrix-immersive` (no push).
