# Content Gaps

Updated 2026-07-03 after integrating the official Pattrix profile PDF.
Nothing here blocks the build; the site handles every gap gracefully.

## Resolved (from the profile)

| Item | Resolution |
|---|---|
| Contact email | ✅ `info@pattrix.co` (profile, final page) |
| Domain | ✅ `pattrix.co` — set in `content/site.ts → url` |
| Phone numbers | ✅ `+218 91 097 0099` and `+218 91 164 6600` — contact band + footer, tel: links |
| Client roster | ✅ UNSMIL, Hyundai Libya, Albaraka Insurance, MUSIAD, Karjen Generators, Takadum, Biout Aleaz |
| Case studies | ✅ Four real engagements (UNSMIL, Hyundai Libya, Albaraka, MUSIAD) with real photography extracted from the profile |
| Positioning language | ✅ "Strategic Communications & PR", "Where strategy meets creativity", "Tripoli — Working Globally" |
| Wordmark cue | ✅ "Pattrix." with blue period reproduced typographically |

## Still open

| # | Item | Current state | Where to fix |
|---|------|---------------|--------------|
| 1 | **Pattrix logo vector** | Typographic wordmark with blue period; the real logotype (custom "tt", blue i-notch) needs the SVG/AI source | header/footer + `app/icon.svg` |
| 2 | **Social profiles** | None rendered — add verified URLs only | `content/site.ts → contact.socials` |
| 3 | **Client logo files** | Text-set names (deck logos are angled/low-res on glass cards — not extraction-worthy) | `content/clients.ts` + `public/logos/` |
| 4 | **Higher-res campaign photography** | Current images extracted from the profile PDF at 150dpi (≈1100–1600px) — good, but original photo files (or a Magnific upscale pass) would sharpen case-study covers | `public/images/work/`, `public/images/events/` |
| 5 | **Takadum / Biout Aleaz sector labels** | Labeled "Corporate" / "Real estate" from logo reading — confirm | `content/clients.ts` |
| 6 | **8th partner logo (page 3, unidentified)** | Omitted until the name is confirmed | `content/clients.ts` |
| 7 | **Per-project dates** | All real engagements labeled 2025 from profile context (UNSMIL event graphic dated Feb 2025) — confirm years | `content/projects.ts` |
| 8 | **Legal pages** | None; footer links none. Add if required | new routes + footer nav |
| 9 | **Arabic version** | English-only; RTL needs a dedicated decision | — |

## Note on Magnific

The user connected Magnific, but no Magnific/Freepik MCP tools are exposed in
this Claude Code session (only claude.ai-side connectors). When available here,
priority uses: upscale the 8 extracted photos, and generate the atmospheric
brand film frames per ASSET_REQUESTS.md.
