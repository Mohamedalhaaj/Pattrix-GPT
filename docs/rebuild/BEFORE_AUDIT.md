# Pattrix Rebuild — Before Audit

Date: 2026-07-02
Branch: `rebuild/pattrix-immersive` (created from `main` @ `042b6ff`)
Auditor: Claude (autonomous rebuild session)

## Repository state at audit

- Clean working tree, fresh clone of `Mohamedalhaaj/Pattrix`.
- HEAD: `042b6ff` — "Fix journey hash blank section".
- Single-page Next.js site, 1,808 LoC across 23 source files.

## Stack (lockfile-verified)

| Package | Version | Note |
|---|---|---|
| next | 16.2.6 | Turbopack; builds clean |
| react / react-dom | 18.3.1 | |
| framer-motion | 11.18.2 | sole animation library |
| tailwindcss | 3.4.19 | |
| typescript | 5.9.3 | strict |
| lucide-react | 0.468.0 | icon grid usage |

## Baseline checks (all green)

- `npx tsc --noEmit` → exit 0
- `npm run lint` → exit 0
- `npm run build` → exit 0 (static prerender, routes: `/`, `/_not-found`)

## Baseline runtime issues (dev, localhost:3100)

1. Console **404** on page load (no favicon or missing asset).
2. Framer Motion warning: `useScroll` container needs non-static position — scroll
   offset mis-calculation in `story-journey.tsx`.

## Current architecture

- `app/page.tsx`: SiteHeader → Hero → StoryJourney (pinned, 403 lines) → Portfolio → Footer.
- Content partially centralized in `lib/content.ts` (nav, clients, divisions,
  projects, campaign flow) — good pattern, keep and extend.
- No `next/font` — Inter referenced by name only, falls back to system stack.
- No tests, no Playwright, no sitemap/robots, no OG metadata beyond title/description.
- Metadata says "Cinematic Luxury Creative Agency" — conflicts with Marketing & PR
  positioning.

## Assets found

- `public/images/cinematic-studio.png` — 1672×941 PNG, **1.6 MB** (unoptimized,
  used as hero background and for all three portfolio cards).
- **No logo files, no client logos, no photography, no video, no fonts** in repo.
- Real client names present in content: Hyundai, United Nations, Musiad,
  Al Baraka Insurance, TBC, Optics, Retail Groups.

## Design assessment vs. rebuild brief (screenshots: `screenshots/before/`)

Violations of the brief the rebuild must fix:

1. **Predominantly dark** — hero, journey, and most scroll length are dark navy;
   brief requires predominantly light with selective dark interludes.
2. **Glassmorphism repetition** — `.glass-panel` / `.dark-glass` cards everywhere.
3. **Generic icon-card grid** — divisions render as lucide-icon cards (explicitly
   banned pattern).
4. **Dead scroll stretches** — the pinned StoryJourney produces long low-content
   regions; a large blank gap exists before the portfolio.
5. **Single repeated image** — one PNG reused as hero + all 3 project cards; no
   real image direction.
6. **No case-study routes, no services detail, no about, no contact section, no
   clients presentation** as required by the target architecture.
7. **No loaded webfont** — typography intent (editorial/premium) not actually
   delivered.

## Worth preserving

- Brand tokens: `#0171DD` (ocean), `#0B1020` (ink), `#F5F7FA` (paper) — match brief.
- `lib/content.ts` content model concept (extend into typed `src/content/*`).
- Copy fragments: "From Tripoli to the region, we build campaigns people remember."
  and the honest, non-fabricated positioning language.
- Client + sector lists (only verifiable business facts in repo).
- AGENTS.md design principles (aligned with brief; brief supersedes where they
  conflict, e.g. Framer Motion → GSAP decision made in Phase 3).
- Reduced-motion global CSS guard.

## Decision

Full rebuild on this branch. Existing components will be replaced; content facts
and brand tokens carried over. `cinematic-studio.png` retained only if a section
genuinely needs it after the new art direction lands (it reads as generic AI
render; candidate for removal).
