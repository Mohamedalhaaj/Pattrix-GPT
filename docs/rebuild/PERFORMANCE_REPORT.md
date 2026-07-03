# Performance Report

Measured 2026-07-02 on the production build (`next build` + `next start`,
Chrome DevTools trace, no CPU/network throttling, M-series MacBook).

## Core Web Vitals (lab, home page, 1440×900)

| Metric | Value | Assessment |
|---|---|---|
| LCP | **776 ms** | Good (<2.5s). LCP element is the H1 text, as designed. |
| CLS | **0.00** | Perfect — no layout shift at all (no raster images, fonts swap into same metrics-adjacent layout). |
| TTFB | 7 ms | local server |
| Render-blocking savings | 0 ms | single CSS file, no blocking scripts |

LCP breakdown: 7 ms TTFB + 770 ms render delay (font decode + hydration).
No render-blocking third parties; zero external requests.

## Payload (gzipped, home route)

| Asset class | Size |
|---|---|
| JS total (React + Next runtime + GSAP + field engine + chapters) | **~243 KB** |
| Preloaded fonts (Archivo variable wdth + italic editorial serif, latin) | **~232 KB** (was ~360 KB before dropping the unused upright serif cuts; the serif was later swapped Newsreader → Source Serif 4 in the design critique) |
| HTML (includes 3 inline generative SVG covers) | ~63 KB |
| Raster images | **0 KB** — every visual is procedural |

## Animation / runtime

- **120 fps sustained** during a scripted full-page scroll (field engine +
  ScrollTrigger active) — measured via rAF counting over 3 s.
- Field engine budget: 2,000 particles ≥1024px / 1,100 tablet / 650 phone;
  DPR capped at 2; single rAF loop; pauses on `document.hidden`; reduced
  motion renders one static frame (no loop at all).
- Only `transform`/`opacity` tweened on DOM; body `background-color` tween is
  the single intentional exception (interlude morph, compositor-adjacent and
  paint-only on a solid color).
- One ForcedReflow flagged in the trace: ScrollTrigger's initial measurement
  pass on load — inherent to ScrollTrigger setup, happens once, ~127 ms window
  during init, not during scrolling.

## Practices applied

- No WebGL/three.js — Canvas 2D delivers the concept at a fraction of the cost.
- No smooth-scroll library; native scrolling (also keeps INP clean).
- `next/font` self-hosted subsets with `display: swap`; italic-only Source Serif 4.
- Case-study covers are seeded inline SVG (zero requests, cache-free).
- All routes prerendered (static/SSG) — no server work per request.

## Operational note

After every `npm run build`, restart `next start` (hashed asset filenames
change; a stale server serves HTML referencing removed CSS/JS). PM2/systemd
restart covers this in deployment.
