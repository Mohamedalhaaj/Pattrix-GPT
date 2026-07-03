# Asset Manifest

## Original assets created in code (no licensing risk)

| Asset | Technique | Location |
|---|---|---|
| Pattern Field (hero + chapters) | Canvas 2D particle engine, seeded formations | `components/field/` |
| Pattrix wordmark treatment | Typographic (Archivo), CSS letterspacing | header/footer |
| Chapter glyphs (6 formations) | Inline SVG, generated dot patterns | `components/ui/chapter-glyph.tsx` |
| Project signature patterns | Seeded SVG pattern per project slug | `components/work/pattern-cover.tsx` |
| Favicon + OG image | Generated SVG/PNG from the field motif | `public/`, `app/` metadata |
| Dark interlude starfield | Same field engine, `noise` formation | field engine |

## Real photography (extracted from the official Pattrix profile PDF, 2026-07-03)

| Asset | Use |
|---|---|
| `public/images/work/unsmil.jpg` | UNSMIL case cover — bilingual institutional media designs |
| `public/images/work/hyundai.jpg` | Hyundai Libya case cover — DLTA workshop environmental branding |
| `public/images/work/hyundai-red.jpg` | Hyundai case gallery — brand wall + staff identity |
| `public/images/work/albaraka.jpg` | Albaraka case cover — app/QR/print campaign system |
| `public/images/work/musiad.jpg` | MUSIAD case cover — 2025 program media + office branding |
| `public/images/events/banquet.jpg` | About proof strip — large business gathering |
| `public/images/events/forum.jpg` | About proof strip — executive forum speaker |
| `public/images/events/musiad-booth.jpg` | About proof strip + MUSIAD gallery |

Extracted at 150dpi from the deck (~1100–1600px wide, ~700KB total). A Magnific
upscale pass or the original photo files would sharpen them further (CONTENT_GAPS #4).

## Video work (from the agency's Google Drive, 2026-07-03)

| Asset | Source | Use |
|---|---|---|
| `public/videos/albaraka-car-insurance.mp4` (652KB, 1440×1080, 18s) | Albaraka MOTION GRAPHIC / CAR INSURANCE.mp4 (4000×3000 master) | Albaraka case — "In motion" |
| `public/videos/unsmil-roadmap.mp4` (2MB, 720×1280, 45s) | UNSMIL Media / ROADMAP V.mp4 | UNSMIL case — "In motion" |
| `public/videos/optics-reel-1.mp4` / `-2.mp4` (4MB each, 720×1280) | Al-Noor/Tripoli Optics reels (2160×3840 masters) | Tripoli Optics case — "In motion" |

All served click-to-play (`preload="none"`, poster frames) — zero autoplay cost.

**Downloaded but awaiting client/campaign attribution before use** (in Drive
`Pattrix/Clients/Pattrix/Commercials/`): three produced commercials
(surgical/medical 57s, rocket-footage 80s, "watermelon" stylized 146s).
Also available in Drive: `UNSMIL FINAL.mov` (371MB produced film + 8 parts),
Albaraka `SERVICES_DARK` + `Comp 1` motion graphics (40s, 4000×3000).

## Existing repo assets

| Asset | Status |
|---|---|
| `public/images/cinematic-studio.png` (1.6MB) | **Removed from build** — generic AI render, off-concept (photographic glass studio vs. procedural pattern system). Kept in git history. |
| Client names (Hyundai, United Nations, Musiad, Al Baraka Insurance, TBC, Optics, Retail Groups) | Used as text-set entries in Clients section |
| `studio@pattrix.com` | Carried over as contact action — **needs owner verification** (see CONTENT_GAPS.md) |

## Fonts

- Archivo (variable, latin subset) — OFL, via `next/font/google`, self-hosted at build.
- Source Serif 4 (italic, latin subset) — OFL, via `next/font/google`.

## Not available — see ASSET_REQUESTS.md

- Real Pattrix logo file (using typographic wordmark until provided)
- Client logo SVGs (text-set presentation until provided)
- Case-study photography/video (generative pattern covers until provided)
