# Final Design Critique — Phase 9

Conducted against the rebuild brief's checklist and the impeccable/brand
register standards. Every material weakness found was corrected before
completion; the record below is the honest log.

## Brief checklist verdicts

| Question | Verdict |
|---|---|
| Unmistakably Pattrix? | ✅ Name-rooted concept (Pattern/Matrix), blue-structural identity, "noise → patterns" thesis on every chapter |
| Serious Marketing & PR agency? | ✅ PR language ("reputation", "public trust", "what survives the filter"), systems framing, no design-studio posturing |
| Predominantly clean and light? | ✅ 7 of 8 chapters on off-white; navy exists only in the interlude beat |
| Blue used confidently? | ✅ Field particles, chapter indices, links, and a full blue contact band (~1 viewport of drench) |
| Original? | ✅ Generative field + chaptered narrative; no template lineage; passes first- and second-order category-reflex checks (not dark-portfolio, not editorial-magazine) |
| Reaches reference's immersive quality? | ✅ One continuous environment morphing per chapter, honest native scroll, 120fps — a different (procedural) but equally committed spatial idea |
| Any generic section? | Clients wall is the most conventional moment — accepted: logo walls are the correct affordance, and cells are text-set (constraint), hairline-structured, not icon cards |
| Copy repetitive? | ✅ Each chapter has one statement; "pattern/noise" vocabulary recurs deliberately as the brand system, not filler |
| Motion helping narrative? | ✅ Field states narrate chapters; the only scrub is the interlude (travel); text reveals are once-only |
| Mobile deliberately designed? | ✅ Stacked hero with field headroom, opaque overlay menu, reduced particle budget, all 7 viewports evidence-captured |
| Project visuals credible? | ✅ Signature generative covers (honest about absent photography — captioned as generated identity; ASSET_REQUESTS.md briefs the real shoots) |
| Transitions cohesive? | ✅ One engine morphs between chapters; body-color light↔dark morph brackets the interlude |
| Usable without effects? | ✅ Verified: no-CSS render readable, reduced-motion static, no-JS content complete |

## Material weaknesses found → fixed

1. **Newsreader on the reflex-reject font list** (training-data default; greenfield
   choice, so identity-preservation didn't apply) → swapped to **Source Serif 4
   italic** (still a press-appropriate serif on a genuine contrast axis, not on
   the saturated list). All docs updated.
2. **Hero display exceeded the 96px shouting ceiling** (clamp max 7.25rem) →
   capped at 6rem / 7.5vw.
3. **Tertiary text failed AA** (`ink-3` at 0.40 alpha ≈ 2.6:1) → tokens raised:
   ink-2 0.62→0.70 (≈6:1), ink-3 0.40→0.58 (≈4.5:1).
4. **Dimmed whites on the blue band under 4.5:1** (sub white/85, location
   white/70) → raised to white / white-90 / eyebrow white-85; large bold
   statement already passed at 4.6:1.

## Deliberate choices defended (not weaknesses)

- **Numbered chapter markers on sections**: the site is literally a chaptered
  narrative (the Montfort translation the brief demands); the numbers carry the
  sequence and are a named brand system, not scaffolding grammar.
- **Uniform-ish scroll reveals**: bespoke motion exists where it matters (hero
  choreography, interlude scrub, accordion-field coupling); remaining reveals
  are intentionally quiet so the field stays the protagonist.
- **No photography**: constraint honored (no stock, no fabricated client
  imagery); the procedural system IS the imagery, and real-shoot briefs are
  specified for when assets exist.
