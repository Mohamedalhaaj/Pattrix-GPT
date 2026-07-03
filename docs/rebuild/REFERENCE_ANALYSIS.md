# Reference Analysis — mont-fort.com

Studied 2026-07-02 via Chrome DevTools at 1440×900 and 390×844. No source code was
copied; this documents observed principles to translate, not reproduce.

## Technical shape (observed, not scraped)

- Astro site; full-viewport **WebGL2 canvas fixed behind the DOM**; text/UI are
  normal DOM elements composited above it.
- **Native scroll** — no scroll hijack, no smooth-scroll lib exposed; the page is
  ~17,300px tall (desktop) / ~15,500px (mobile). Scroll position drives the 3D
  camera; the scrollbar stays honest.
- Same WebGL experience runs on mobile at DPR-scaled resolution (485×842 canvas).
- Fonts: Century Gothic / Josefin Sans — geometric sans, wide tracking, all-caps.

## The core idea worth translating

**One continuous spatial journey, chaptered by business meaning.** The camera
travels through a single evolving environment; each chapter of the journey *is*
a division of the business:

1. Mountain summit in fog (Group — solidity, Swiss identity) — light, near-white.
2. Cloud layers with editorial statements (who we are).
3. Stormy sea + tanker (Maritime) — the darkest moment of the journey.
4. Planet from orbit with labeled city markers (global markets/presence).
5. Sunlit forest canopy (sustainability/ESG) — return to light, green.
6. Clean, plain light footer (offices, divisions, contact) — exit the dream.

Sections are not separated; environments cross-fade/morph as the camera moves.
Darkness is a *narrative beat* (the storm), not the default. The site opens and
closes light.

## Interaction and rhythm principles

- **One message per viewport.** A chapter shows an eyebrow (division name), one
  all-caps statement (2–3 lines max), and one underlined text-link CTA with a
  circled arrow. Nothing else competes.
- **Numbered chapter markers** (diamond badges 1–5) float in the scene between
  chapters; a chapters navigation exists; persistent up-arrow + progress affordance
  bottom-right; "SCROLL DOWN TO DISCOVER" / "SWIPE DOWN" at open.
- **Informational density is deferred**: facts live in tabbed panels
  (Environmental/Social/Governance), thin-outline circular icons, white partner
  logos, and the conventional footer — the immersive layer never carries data.
- Long dwell distances: each chapter gets ~2,000px+ of scroll; transitions take
  their time. Statements fade/translate slowly; nothing bounces.
- Nav is text-only, small caps, letterspaced; active page marked with a thin
  underline rule. News counter badge as the only colored chip.

## What Pattrix should translate (not copy)

| Montfort principle | Pattrix translation |
|---|---|
| One environment, chaptered by divisions | One generative "pattern field" that reorganizes per chapter (see DESIGN_SYSTEM.md) |
| Light-first with one dark narrative beat | Off-white site; single dark navy interlude |
| Fixed canvas + honest native scroll | Fixed canvas hero/field + GSAP ScrollTrigger on native scroll |
| Chapter markers + one statement per view | Numbered chapters, editorial statements, single CTA per moment |
| Facts deferred to calm UI layers | Services/clients/contact in clean light sections |
| Full experience on mobile, scaled | Same field at reduced particle budget on mobile |

## What we deliberately do differently

- Montfort's metaphor is *terrain* (mountain→sea→planet→forest). Pattrix's metaphor
  is *signal becoming pattern* — abstract, procedural, brand-owned, and buildable
  without photographic/3D assets we don't have.
- Montfort is a commodity group: sober, slow, institutional. Pattrix is a
  marketing & PR agency: the same discipline but with more editorial voice and
  a visible pulse (media, momentum).
- No 3D models, no volumetric clouds — our field is 2D canvas points/lines with
  spatial depth via parallax layers, DPR-aware, cheap on mobile.
