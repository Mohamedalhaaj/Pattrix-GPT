# Content Gaps — needs owner input before launch

Nothing here blocks the build; the site handles every gap gracefully.
Resolve each item in `content/` when the information is confirmed.

| # | Item | Current state | Where to fix |
|---|------|---------------|--------------|
| 1 | **Contact email** | `studio@pattrix.com` carried over from the previous site — verify it is real and monitored | `content/site.ts → contact.email` |
| 2 | **Domain** | `https://www.pattrix.com` assumed for SEO links | `content/site.ts → url` |
| 3 | **Social profiles** | None rendered (old site had dead `#` links) — add verified URLs only | `content/site.ts → contact.socials` |
| 4 | **Phone / WhatsApp** | Not present anywhere in the repo; add if the agency wants calls | `content/site.ts → contact` + footer/contact components |
| 5 | **Official Pattrix logo** | Typographic wordmark in use; replace when a logo file exists | header/footer + `app/icon.svg` |
| 6 | **Client logos** | Text-set names for all 7 clients (no logo files in repo) | `content/clients.ts` + `public/logos/` |
| 7 | **Client name clarifications** | "TBC", "Optics", "Retail Groups" read as placeholders/categories, not company names — confirm real names | `content/clients.ts` |
| 8 | **Case-study specifics** | Three engagements described qualitatively (carried from previous site copy). Client names, dates, deliverable lists, photography all unconfirmed | `content/projects.ts` |
| 9 | **Founding year / team facts** | Deliberately absent (nothing verifiable in repo) — About stays qualitative until facts are provided | `content/site.ts → about` |
| 10 | **Legal pages** | No privacy/terms pages; footer intentionally links none. Add if required for the market | new routes + footer nav |
| 11 | **Arabic version** | Site is English-only; RTL/Arabic needs a dedicated decision | — |
