/**
 * One-time migration: pushes the current content/*.ts into the Sanity dataset.
 * Requires SANITY_API_TOKEN (Editor) in the environment or .env.local.
 *   npm run sanity:push
 * Safe to re-run: uses createOrReplace with stable _ids.
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { site } from "../content/site.ts";
import { projects } from "../content/projects.ts";
import { services } from "../content/services.ts";
import { clients } from "../content/clients.ts";

function loadEnvLocal() {
  if (!existsSync(".env.local")) return;
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN.\nCreate one at https://www.sanity.io/manage/project/0rakouhl → API → Tokens (Editor),\nthen add SANITY_API_TOKEN=... to .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "0rakouhl",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-07-01",
  token,
  useCdn: false
});

const key = (i: number) => `k${i}`;

const docs: Record<string, unknown>[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    metaTitle: site.metaTitle,
    metaDescription: site.metaDescription,
    url: site.url,
    contactEmail: site.contact.email,
    phones: [...site.contact.phones],
    location: site.contact.location,
    socials: site.contact.socials.map((s, i) => ({ _key: key(i), ...s })),
    heroEyebrow: site.hero.eyebrow,
    heroSub: site.hero.sub,
    positioningStatement: site.positioning.statement,
    positioningBody: site.positioning.body,
    workSub: site.work.sub,
    clientsStatement: site.clients.statement,
    aboutBody: site.about.body,
    contactStatement: site.contactSection.statement,
    contactSub: site.contactSection.sub,
    footerLine: site.footer.line
  },
  ...projects.map((p, i) => ({
    _id: `project-${p.slug}`,
    _type: "project",
    title: p.title,
    slug: { current: p.slug },
    order: i + 1,
    category: p.category,
    year: p.year,
    services: [...p.services],
    premise: p.premise,
    challenge: p.challenge,
    approach: p.approach,
    outcome: p.outcome,
    accent: p.accent,
    coverPath: p.cover,
    coverAlt: p.coverAlt,
    coverW: p.coverW,
    coverH: p.coverH,
    gallery: (p.gallery ?? []).map((g, gi) => ({ _key: key(gi), path: g.src, alt: g.alt, w: g.w, h: g.h })),
    videos: (p.videos ?? []).map((v, vi) => ({
      _key: key(vi),
      path: v.src,
      posterPath: v.poster,
      label: v.label,
      w: v.w,
      h: v.h
    }))
  })),
  ...services.map((s) => ({
    _id: `service-${s.index}`,
    _type: "service",
    index: s.index,
    name: s.name,
    formation: s.formation,
    summary: s.summary,
    includes: [...s.includes]
  })),
  ...clients.map((c, i) => ({
    _id: `client-${i + 1}`,
    _type: "client",
    name: c.name,
    sector: c.sector,
    order: i + 1
  }))
];

let tx = client.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc as Parameters<typeof tx.createOrReplace>[0]);
const result = await tx.commit();
console.log(`Pushed ${docs.length} documents to Sanity (${result.transactionId}).`);
console.log("Open the studio at http://localhost:3000/studio (or /studio on the live site).");
