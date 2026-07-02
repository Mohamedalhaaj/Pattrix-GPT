# Pattrix Website — Editing Guide

Everything editable lives in the **`content/`** folder. You never need Framer,
Webflow, or to touch components for routine updates. After any change, run
`npm run build` (or just save in dev mode) and the site updates.

## Change text (headlines, positioning, contact info)

Open **`content/site.ts`**. Every section's copy is a named block:
`hero`, `positioning`, `interlude`, `work`, `services`, `clients`, `about`,
`contactSection`, `footer`. Edit the strings; keep them short — the design
assumes one statement per section.

Contact email/location: `site.contact`. This also updates the header CTA,
contact band, and footer at once.

## Add or edit a project (case study)

Open **`content/projects.ts`** and copy an existing entry. Required fields:

- `slug` — lowercase-with-dashes; becomes the URL `/work/<slug>`
- `title`, `category`, `year`, `services` (names from `content/services.ts`)
- `premise` — one line for the home page
- `challenge` / `approach` / `outcome` — qualitative, truthful paragraphs.
  **Never invent statistics or confidential results.**
- `accent` — a hex color used by the generated cover art

The project appears on the home page and gets its own page automatically.
The cover image is generated (unique per slug). To use a real photo instead,
put it in `public/images/` and set `cover: "/images/your-photo.jpg"`
(the component prefers `cover` when present — ask a developer to wire it the
first time).

## Add a client

Open **`content/clients.ts`**, add `{ name: "...", sector: "..." }`.
When you receive a publishable logo file, save it as SVG/PNG under
`public/logos/` and add `logo: "/logos/file.svg"` — the text placeholder is
replaced automatically.

## Change services

Open **`content/services.ts`**. Each system has `name`, `summary`, `includes`
(bullet list). `formation` controls which background pattern shows when the row
opens — leave it unless a designer says otherwise.

## Replace images

All current visuals are generated code (no image files needed). Real photos go
in `public/images/`, then reference them from content as above.

## Social links

`content/site.ts → site.contact.socials`. Add entries ONLY with verified URLs:
`{ label: "Instagram", href: "https://instagram.com/..." }` — they appear in
the footer automatically. Empty list = nothing renders (no dead links).

## Update the domain

`content/site.ts → site.url` — used for SEO (sitemap, canonical, OG links).
