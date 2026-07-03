# Sanity Studio — visual editing for Pattrix

Project: `0rakouhl` · Dataset: `production` · Studio route: **`/studio`**

## How the model works

The website stays **file-driven and fully static** (fast, deployable anywhere,
still editable by Claude Code). Sanity is the *editing surface*:

```
Studio (/studio)  →  publish  →  npm run sanity:pull  →  content/*.ts + images
                                     ↓
                              git commit → deploy
```

`sanity:pull` regenerates the four content files and downloads any images that
were drag-&-dropped in the Studio into `public/images/sanity/`. Every change is
reviewable in `git diff` before it ships.

## One-time setup (owner, ~3 minutes)

1. **CORS**: at [manage → project 0rakouhl](https://www.sanity.io/manage/project/0rakouhl)
   → API → CORS origins, add `http://localhost:3000` and your live domain
   (with credentials allowed).
2. **Token**: same page → Tokens → create an **Editor** token. Copy
   `.env.local.example` to `.env.local` and paste it as `SANITY_API_TOKEN`.
3. **Migrate**: `npm run sanity:push` — fills the Studio with all current
   site content (safe to re-run).

## Editing flow (anyone on the team)

1. Run the site (`npm run dev`) and open **http://localhost:3000/studio**
   (or `https://<domain>/studio` once deployed) — log in with your Sanity account.
2. Edit: Site Settings (contact, headlines, copy) · Projects (drag to reorder,
   drag-&-drop cover/gallery images) · Services · Clients. Publish.
3. Apply to the site: `npm run sanity:pull` → review `git diff` → commit → deploy.
   (Or just tell Claude Code: "pull the latest Sanity content and deploy".)

## Notes

- Videos stay as files in `public/videos/` (too heavy for the dataset); the
  Studio edits their labels/order via path fields.
- The generated `content/*.ts` files carry a GENERATED header — direct edits
  still work but are overwritten by the next pull; prefer the Studio once live.
- Invite teammates at manage → Members (free plan includes generous seats).
