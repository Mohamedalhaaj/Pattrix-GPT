# QA Report

Date: 2026-07-02 · Build: production (`next build`), branch `rebuild/pattrix-immersive`

## Automated suite — `npx playwright test` → **18/18 passed**

| Area | Tests | Result |
|---|---|---|
| Load & metadata (title, H1, 8 sections, zero console errors) | 1 | ✅ |
| Landmarks & chapters (banner, contentinfo, nav, all section ids) | 1 | ✅ |
| CTAs (≥3 mailto actions, work CTA, **zero `href="#"` dead links**) | 1 | ✅ |
| Anchor navigation scrolls | 1 | ✅ |
| Services accordion (aria-expanded, single-open, content visible) | 1 | ✅ |
| Keyboard: skip-link first Tab, logo second | 1 | ✅ |
| Case study: card → route, next-case chain, 404 for bad slug | 2 | ✅ |
| Mobile menu: open/Escape-close, link navigation, hidden when closed | 2 | ✅ |
| Responsive: 1440/1280/1024/768/430/390/360 — full-page scroll walk, **0px horizontal overflow**, zero console errors each | 7 | ✅ |
| Reduced motion: interlude + work readable statically (opacity 1) | 1 | ✅ |

## Manual browser verification (Chrome DevTools)

- Hero entrance, field noise→signal morph, scroll-hint pulse — desktop + mobile ✅
- Interlude: body paper→navy morph, starfield, 3 scrubbed statements, snap-to-order,
  return to light ✅ (fixed: body tween must target `document.body`, not a scoped selector)
- Header: quiet→hairline+blur on scroll, hide/reveal, no transform on the outer
  element (fixed: transform trapped the mobile overlay) ✅
- Mobile menu: opaque, focus moves in, Escape closes, body scroll locked ✅
- Services accordion retunes the field per system ✅
- Progressive enhancement: page fully readable with CSS-only (verified
  accidentally via stale-server run: all copy renders unstyled) and with
  animation disabled ✅

## Defects found & fixed during QA

1. `gsap.to("body")` inside scoped `useGSAP` targeted nothing → interlude never
   darkened. Fixed with `document.body` reference.
2. Header transform created a containing block → mobile overlay collapsed and
   rendered transparent. Fixed by moving the transform to the inner bar.
3. Menu close button unreachable (stacking context) → explicit z-order. Fixed.
4. Closed mobile menu was only `opacity-0` (still "visible" to AT/tests) →
   added `visibility` toggling.
5. Pattern-cover variant hash collision (projects 1 & 3 identical family) →
   explicit variant by index.
6. OG image build error (`dotted` border unsupported by Satori) → `dashed`.
7. Playwright `test.use({ reducedMotion })` silently ignored in v1.61 →
   `page.emulateMedia()`.

## Evidence

- `screenshots/final/` — 20 captures: hero at all 7 required viewports, all 7
  desktop chapters, 3 mobile chapters, open mobile menu, case study desktop+mobile.
- `screenshots/before/` — pre-rebuild state for comparison.

## Known limitations (accepted)

- Full-page screenshot stitching shows blank regions for unreached scroll
  reveals — an artifact of once-only reveals, not a user-facing issue.
- `test.use({ reducedMotion })` type gap in Playwright 1.61 — worked around.
