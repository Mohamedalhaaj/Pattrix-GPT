# Pattrix Design System — "The Pattern Field"

## The concept (one metaphor, executed everywhere)

**Pattrix = Pattern + Matrix.** The agency's job, stated visually: *take the noise
of the market and organize it into patterns people remember.*

The entire site is one continuous generative system — a field of points ("the
field") rendered on a fixed canvas behind the DOM. As the visitor scrolls, the
field reorganizes to narrate each chapter:

| # | Chapter | Field state | Environment |
|---|---------|-------------|-------------|
| 1 | Hero — *Signal* | scattered noise converges into radial waves emitting from one origin point | light |
| 2 | Positioning — *Pattern* | waves settle into a calm interference pattern behind statements | light |
| 3 | Interlude — *Noise* | the one dark moment: chaotic starfield, "attention is scarce" → snaps to order | **dark navy** |
| 4 | Selected Work | each case = a crystallized signature pattern | light, per-project accent |
| 5 | Services — *Systems* | field forms 6 named formations (radial, lattice, stream, orbit, pulse, weave) | light |
| 6 | Clients — *Reach* | constellation: points link into a network | light |
| 7 | About — *Origin* | all waves radiate from a single point (Tripoli) outward | light, blue-forward |
| 8 | Contact | the field converges into the CTA | Pattrix blue band |

Never mix in other metaphors (no mountains, no globes, no lenses). The field is
the only scenography.

## Color tokens

```
--paper:      #F7F8FA   base background (off-white, cool)
--surface:    #FFFFFF   raised surfaces, cards
--ink:        #101623   primary text (charcoal-navy)
--ink-2:      rgba(16,22,35,0.70)  secondary text (AA on paper)
--ink-3:      rgba(16,22,35,0.58)  tertiary/captions (≈4.5:1 on paper)
--hairline:   rgba(16,22,35,0.10)  rules, borders
--blue:       #0171DD   Pattrix blue — identity, links, field, CTA band
--blue-deep:  #0A50A8   hover/pressed, gradients into blue
--blue-tint:  #E9F2FC   tinted panels, selection wash
--navy:       #0A1220   the single dark interlude + selected cinematic text blocks
--navy-ink:   #E9EEF6   text on navy
```

Rules: the site is light. Navy appears once as a narrative beat (plus footer-adjacent
contact band is **blue**, not navy). Blue is structural — chapter numbers, field
particles, underlines, the contact band — not confetti.
Contrast: body text ink-on-paper 15.4:1; white-on-blue #0171DD = 4.6:1 (AA for
large/bold text — use ≥18px semibold on blue).

## Typography

Loaded via `next/font/google` (subset latin, `display: swap`):

- **Archivo** (variable; weight + width axes) — everything structural.
  - Display headlines: 600–700, width ~115 (semi-expanded), tracking -0.5 to -1%,
    sizes clamp(2.6rem → 7.5rem), line-height 0.95–1.02.
  - Eyebrows/labels: 600, width 125, ALL-CAPS, tracking +14–18%, 11–12px.
  - Body: 400/500, width 100, 16–18px, line-height 1.6, max-width 34em.
- **Source Serif 4** (italic, opsz) — the editorial voice. Used sparingly: one italic
  line per chapter (the "human" counterpoint), pull-quotes, image captions.

Hierarchy per viewport: one display statement, one eyebrow, ≤1 paragraph, one CTA.

## Space & grid

- 4px base unit. Section padding: `clamp(6rem, 10vw, 11rem)` vertical.
- Container: max-width 1360px, padding-inline `clamp(1.25rem, 4vw, 4rem)`.
- 12-col grid on desktop; editorial asymmetry: text columns 5–7 wide, offset
  starts (col 2, col 6) rather than centered-everything.
- Hairline rules (1px `--hairline`) structure sections — editorial, not cards.

## Components vocabulary

- **Chapter marker**: small blue index `01 — SIGNAL` eyebrow style, with a 24px
  generative mini-pattern glyph (SVG) per chapter.
- **CTA link**: underlined text + circled arrow (→) that fills blue on hover;
  focus-visible ring 2px blue offset 4px.
- **Primary button**: pill, ink background, white text; hover → blue; used at most
  once per viewport.
- **Project card**: full-bleed generative pattern header (per-project seed +
  accent), category + year meta row, title, one-line premise. No glass, no icon grids.
- **Service row**: numbered accordion rows with formation preview in the field —
  not icon cards.
- **Client logos**: monochrome ink at 40% opacity, hover → full ink; text-set
  names where no logo asset exists (all of them currently — see ASSET_MANIFEST).

## Voice

Confident, concrete, short. No "we are passionate", no "solutions" filler.
Positioning line carried over from existing repo copy: *"From Tripoli to the
region, we build campaigns people remember."* All service/client facts come from
`content/` only.
