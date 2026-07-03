/**
 * Materializes Sanity content back into the repo:
 *  - regenerates content/site.ts, projects.ts, services.ts, clients.ts
 *  - downloads any images uploaded in the Studio into public/images/sanity/
 * so the site stays fully static, fast, and reviewable in git.
 *
 *   npm run sanity:pull        (then review `git diff`, commit, deploy)
 *
 * No token needed for public datasets; uses SANITY_API_TOKEN if present.
 */

import { createClient } from "@sanity/client";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

function loadEnvLocal() {
  if (!existsSync(".env.local")) return;
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "0rakouhl",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-07-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

const J = (v: unknown) => JSON.stringify(v ?? null, null, 2);

interface AssetRef {
  url: string;
  w: number;
  h: number;
  ext: string;
}

async function materializeImage(
  asset: AssetRef | null,
  fallbackPath: string | null,
  name: string
): Promise<{ path: string; w: number | null; h: number | null } | null> {
  if (asset) {
    mkdirSync("public/images/sanity", { recursive: true });
    const rel = `/images/sanity/${name}.${asset.ext}`;
    execSync(`curl -sf "${asset.url}" -o "public${rel}"`);
    return { path: rel, w: asset.w, h: asset.h };
  }
  if (fallbackPath) return { path: fallbackPath, w: null, h: null };
  return null;
}

const assetProjection = `{ "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height, "ext": asset->extension }`;

// ---------- fetch ----------
const [settings, sProjects, sServices, sClients] = await Promise.all([
  client.fetch(`*[_id == "siteSettings"][0]`),
  client.fetch(
    `*[_type == "project"] | order(order asc) { ..., "slug": slug.current, "coverAsset": cover ${assetProjection}, gallery[]{ ..., "imageAsset": image ${assetProjection} } }`
  ),
  client.fetch(`*[_type == "service"] | order(index asc)`),
  client.fetch(`*[_type == "client"] | order(order asc)`)
]);

if (!settings || !sProjects?.length || !sServices?.length || !sClients?.length) {
  console.error("Sanity dataset looks empty — run `npm run sanity:push` first.");
  process.exit(1);
}

// ---------- content/site.ts ----------
const siteTs = `/**
 * GENERATED from Sanity by scripts/sanity-pull.ts — edit in the Studio (/studio)
 * and re-run \`npm run sanity:pull\`, or edit here directly (next pull overwrites).
 */

export const site = {
  name: "Pattrix",
  tagline: "Strategic Communications & PR — Tripoli",
  metaTitle: ${J(settings.metaTitle)},
  metaDescription: ${J(settings.metaDescription)},
  url: ${J(settings.url)},

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Clients", href: "/#clients" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" }
  ],

  contact: {
    email: ${J(settings.contactEmail)},
    phones: ${J(settings.phones ?? [])},
    location: ${J(settings.location)},
    website: "Pattrix.co",
    socials: ${J((settings.socials ?? []).map((s: { label: string; href: string }) => ({ label: s.label, href: s.href })))} as { label: string; href: string }[]
  },

  hero: {
    eyebrow: ${J(settings.heroEyebrow)},
    headline: "We turn noise into patterns people remember.",
    sub: ${J(settings.heroSub)},
    primaryCta: { label: "See selected work", href: "/#work" },
    secondaryCta: { label: "Start a project", href: ${J("mailto:" + settings.contactEmail)} },
    scrollHint: "Scroll — the signal begins"
  },

  positioning: {
    chapter: "01",
    chapterName: "The pattern",
    statement: ${J(settings.positioningStatement)},
    editorialAside: "Where strategy meets creativity.",
    body: ${J(settings.positioningBody)},
    pillars: [
      { title: "Strategy", copy: "Positioning, campaign architecture, and the language institutions and audiences actually respond to." },
      { title: "Relations", copy: "Public relations, media coordination, and news coverage that build durable public trust." },
      { title: "Production", copy: "Film, photography, and digital content produced in-house to campaign discipline." }
    ]
  },

  interlude: {
    lines: [
      "Every day your audience filters thousands of messages.",
      "Almost all of them are noise.",
      "Our work is what survives the filter."
    ]
  },

  work: {
    chapter: "02",
    chapterName: "Selected work",
    statement: "Patterns that held attention.",
    sub: ${J(settings.workSub)}
  },

  services: {
    chapter: "03",
    chapterName: "The systems",
    statement: "Six systems. One discipline.",
    sub: "Every engagement is built from named systems, so clients always know what is being done and why."
  },

  clients: {
    chapter: "04",
    chapterName: "Reach",
    statement: ${J(settings.clientsStatement)},
    note: "From international institutions to regional market leaders."
  },

  about: {
    chapter: "05",
    chapterName: "Origin",
    statement: "From Tripoli, working globally.",
    body: ${J(settings.aboutBody)},
    philosophy: [
      { title: "Precision before volume", copy: "One clear message, placed well, outworks ten loud ones." },
      { title: "Strategy owns production", copy: "We produce what the strategy needs — never content for its own sake." },
      { title: "Public work must hold", copy: "Everything we release is built to survive scrutiny, not just launch day." }
    ],
    proof: {
      caption: "Public rooms, delivered end-to-end — executive forums, international panels, and large-scale business gatherings.",
      images: [
        { src: "/images/events/banquet.jpg", alt: "Large business gathering in a grand hall, coordinated by Pattrix" },
        { src: "/images/events/forum.jpg", alt: "Speaker at the podium of an executive forum" },
        { src: "/images/events/buffet.jpg", alt: "Guests at a large-scale business gathering during a coordinated event" }
      ]
    }
  },

  contactSection: {
    chapter: "06",
    chapterName: "Contact",
    statement: ${J(settings.contactStatement)},
    sub: ${J(settings.contactSub)}
  },

  footer: {
    line: ${J(settings.footerLine)},
    builtIn: "Tripoli — Working Globally"
  }
} as const;

export type Site = typeof site;
`;

// ---------- content/projects.ts ----------
interface SGallery {
  path?: string;
  alt?: string;
  w?: number;
  h?: number;
  imageAsset?: AssetRef | null;
}
interface SVideo {
  path?: string;
  posterPath?: string;
  label?: string;
  w?: number;
  h?: number;
}

const projectEntries = [];
for (const p of sProjects) {
  const cover = await materializeImage(p.coverAsset ?? null, p.coverPath ?? null, `${p.slug}-cover`);
  const gallery = [];
  let gi = 0;
  for (const g of (p.gallery ?? []) as SGallery[]) {
    gi++;
    const img = await materializeImage(g.imageAsset ?? null, g.path ?? null, `${p.slug}-g${gi}`);
    if (img) gallery.push({ src: img.path, alt: g.alt ?? "", w: img.w ?? g.w ?? 1600, h: img.h ?? g.h ?? 1000 });
  }
  projectEntries.push({
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    services: p.services ?? [],
    premise: p.premise,
    challenge: p.challenge,
    approach: p.approach,
    outcome: p.outcome,
    accent: p.accent ?? "#0171DD",
    ...(cover
      ? { cover: cover.path, coverAlt: p.coverAlt, coverW: cover.w ?? p.coverW ?? 1600, coverH: cover.h ?? p.coverH ?? 1000 }
      : {}),
    ...(gallery.length ? { gallery } : {}),
    ...((p.videos ?? []).length
      ? {
          videos: (p.videos as SVideo[]).map((v) => ({
            src: v.path ?? "",
            poster: v.posterPath ?? "",
            label: v.label ?? "",
            w: v.w ?? 1920,
            h: v.h ?? 1080
          }))
        }
      : {})
  });
}

const projectsTs = `/**
 * GENERATED from Sanity by scripts/sanity-pull.ts — edit in the Studio (/studio).
 * Truthfulness rule stands: no invented statistics or confidential results.
 */

export interface ProjectImage {
  src: string;
  alt: string;
  w: number;
  h: number;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  label: string;
  w: number;
  h: number;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  services: string[];
  premise: string;
  challenge: string;
  approach: string;
  outcome: string;
  accent: string;
  cover?: string;
  coverAlt?: string;
  coverW?: number;
  coverH?: number;
  gallery?: ProjectImage[];
  videos?: ProjectVideo[];
}

export const projects: Project[] = ${J(projectEntries)};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
`;

// ---------- content/services.ts ----------
const servicesTs = `/**
 * GENERATED from Sanity by scripts/sanity-pull.ts — edit in the Studio (/studio).
 */

import type { FormationName } from "@/components/field/formations";

export interface ServiceSystem {
  index: string;
  name: string;
  formation: FormationName;
  summary: string;
  includes: string[];
}

export const services: ServiceSystem[] = ${J(
  sServices.map((s: Record<string, unknown>) => ({
    index: s.index,
    name: s.name,
    formation: s.formation,
    summary: s.summary,
    includes: s.includes ?? []
  }))
)} as ServiceSystem[];
`;

// ---------- content/clients.ts ----------
const clientsTs = `/**
 * GENERATED from Sanity by scripts/sanity-pull.ts — edit in the Studio (/studio).
 */

export interface Client {
  name: string;
  sector: string;
  logo?: string;
}

export const clients: Client[] = ${J(
  sClients.map((c: Record<string, unknown>) => ({ name: c.name, sector: c.sector ?? "" }))
)};

export const sectors = [
  "International institutions",
  "Automotive",
  "Insurance",
  "Business networks",
  "Energy",
  "Real estate",
  "Optics",
  "Events"
];
`;

writeFileSync("content/site.ts", siteTs);
writeFileSync("content/projects.ts", projectsTs);
writeFileSync("content/services.ts", servicesTs);
writeFileSync("content/clients.ts", clientsTs);
console.log("Regenerated content/site.ts, projects.ts, services.ts, clients.ts from Sanity.");
console.log("Review with `git diff`, then commit and deploy.");
