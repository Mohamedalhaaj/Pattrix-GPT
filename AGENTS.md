# PATTRIX — Agent & Contributor Guide

Pattrix is a premium **Marketing & PR agency in Tripoli**. The site is a single
continuous "Pattern Field" experience: a generative particle field that
reorganizes per chapter. Concept, tokens, and rules live in:

- `docs/rebuild/DESIGN_SYSTEM.md` — the Pattern Field concept, color, type, grid
- `docs/rebuild/MOTION_SYSTEM.md` — GSAP ownership model, timing, reduced motion
- `docs/rebuild/EDITING_GUIDE.md` — how to change content (start here for copy)

## Non-negotiables

- **Light-first.** Off-white `#F7F8FA` base; navy `#0A1220` appears only in the
  single interlude beat. Never add more dark sections.
- **Pattrix blue `#0171DD` is structural**, not decorative confetti: field dots,
  chapter numbers, links, the contact band.
- **One metaphor.** Everything visual derives from the field (dots, waves,
  formations). No mountains, globes, blobs, glass cards, or icon grids.
- **GSAP + ScrollTrigger own all scroll/reveal motion.** CSS transitions own
  hover/focus micro-states. Do not add Framer Motion or another animation lib.
- **Content lives in `content/*.ts`** — never hardcode business copy in
  components. No invented stats, awards, testimonials, or client claims.
- Native scroll only; no scroll hijack; `prefers-reduced-motion` must always
  yield a fully readable static experience.

## Engineering rules

- Next.js App Router + TypeScript strict + Tailwind. Keep components server-side
  unless they genuinely need state/effects.
- Animations: `useGSAP` with `scope`; cleanup is automatic; body/document tweens
  must target elements by reference (scoped selector strings won't reach them).
- The header must never carry a CSS transform (it would trap the fixed mobile
  overlay); only the inner bar translates.
- Verify with `npx tsc --noEmit && npm run lint && npm run build` plus the
  Playwright suite before calling anything done.

## Typography

Archivo (variable width axis) for everything structural; Source Serif 4 italic for
sparse editorial asides. Loaded via `next/font/google` — do not add font `<link>`s.
