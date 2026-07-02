# Pattrix Motion System

## Ownership model (one system, no mixing)

- **GSAP + ScrollTrigger** own all scroll choreography, section transitions,
  reveals, and the field's chapter states. Registered once in a client provider.
- **The field canvas** (custom Canvas 2D engine) owns its own rAF loop; GSAP
  drives it only by tweening its *parameters* (formation index, progress, energy),
  never by touching pixels.
- **CSS transitions** own hover/focus micro-states (links, buttons, cards) —
  150–300ms, `ease-out`.
- Framer Motion is removed. No animation library duplication.

## Principles (Emil Kowalski school)

1. Animation must explain structure — every move answers "where did this come
   from / what does it belong to". No decoration-only motion.
2. Enter fast, settle soft: `power3.out`, 0.6–0.9s for reveals; scene-level
   crossfades `power2.inOut`, 1.0–1.4s.
3. No bounce, no elastic, no spin. Distance ≤ 32px for text reveals; opacity from
   0.0; slight blur-out only on hero statement (≤ 8px).
4. Stagger 0.06–0.08s, max 6 items staggered; beyond that, group.
5. Scrub only what represents *travel* (field states, chapter progress, dark
   interlude). Text reveals are triggered once (`once: true`), never scrubbed —
   readable at any scroll speed.
6. Nothing pins longer than 1.5 viewport-heights except the dark interlude
   (max 2). Native scrollbar always honest — no scroll hijack, no smooth-scroll
   virtualization.
7. Nav, anchors, and all content work with animation disabled.

## Scroll architecture

```
<FieldCanvas />        fixed, z-0, aria-hidden — one instance for the whole page
<main> sections        z-10, normal flow
```

- Each chapter section registers a ScrollTrigger (`start: top 65%`) that tweens
  the field engine's `formation` + `palette` params.
- The dark interlude: section with `position: sticky` inner panel; background
  color of `<body>` tweened paper→navy→paper via ScrollTrigger scrub across the
  section (clean light↔dark transition per brief).
- Header: quiet until scroll > 24px, then hairline + backdrop blur; hides on
  scroll-down > 600px, returns on scroll-up (240ms transform).

## Timing tokens

```
--dur-micro: 180ms   hover, focus, underline
--dur-small: 320ms   menu, accordion
--dur-reveal: 700ms  text/image entrance
--dur-scene: 1200ms  field formation morph, light↔dark
ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)     (reveals)
ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1) (scenes)
```

## Reduced motion

`prefers-reduced-motion: reduce` →
- gsap.matchMedia gate: no scrubs, no pins; reveals become opacity-only 200ms.
- Field engine renders a **static** composed pattern (one frame, no rAF loop).
- Body background does not animate; interlude renders navy block statically.
- Smooth anchor scrolling → `behavior: auto`.

## Performance rules

- Field: DPR capped at 2; particle budget 2400 desktop / 1200 tablet / 700 phone;
  loop pauses when canvas offscreen or `document.hidden`.
- Only `transform` + `opacity` tweened on DOM. No layout properties.
- All ScrollTriggers created inside `gsap.context` per component; killed on
  unmount. `ScrollTrigger.refresh()` after fonts load.
- Hero LCP is the H1 text (not canvas) — canvas fades in after first paint.
