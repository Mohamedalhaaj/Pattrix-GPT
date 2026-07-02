/**
 * Selected work. Add a project by appending an entry; it appears on the home
 * page and gets a case-study route at /work/<slug> automatically.
 *
 * IMPORTANT: `challenge` / `approach` / `outcome` must stay qualitative and
 * truthful — no invented statistics or client-confidential details.
 * `cover` is optional: when absent, a generative pattern cover is rendered
 * from the project's seed.
 */

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  services: string[];
  /** One-line premise shown on the home page. */
  premise: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** Accent used in the generative cover. */
  accent: string;
  /** Optional real image: path under /public. */
  cover?: string;
}

export const projects: Project[] = [
  {
    slug: "regional-campaign-launch",
    title: "Regional Campaign Launch",
    category: "Campaign System",
    year: "2026",
    services: ["Strategy & Positioning", "Production", "Social & Digital"],
    premise: "One campaign language, built to travel beyond local awareness without losing cultural specificity.",
    challenge:
      "A brand needed to move beyond local awareness without losing the cultural specificity that made it credible at home.",
    approach:
      "We built one campaign language across message, film, social cadence, and public-facing digital touchpoints — a single system designed for recognition and repetition.",
    outcome:
      "A launch system designed for recognition, repetition, and regional attention, with every asset produced to the same discipline.",
    accent: "#0171DD"
  },
  {
    slug: "institutional-communication-system",
    title: "Institutional Communication System",
    category: "Public Relations",
    year: "2025",
    services: ["Public Relations & Media", "Strategy & Positioning"],
    premise: "Complex institutional activity translated into calm, credible public language.",
    challenge:
      "A serious organization needed clearer public language across channels and stakeholder moments.",
    approach:
      "We translated complex activity into a calm communication system with hierarchy, proof, and editorial cadence — one voice across media, events, and digital channels.",
    outcome:
      "A sharper institutional presence across media, events, social, and digital channels.",
    accent: "#0A50A8"
  },
  {
    slug: "brand-visibility-campaign",
    title: "Brand Visibility Campaign",
    category: "Brand & Content",
    year: "2025",
    services: ["Brand & Identity", "Production", "Social & Digital"],
    premise: "A repeatable content system for a brand competing in a crowded attention environment.",
    challenge:
      "A market-facing brand needed to become more memorable in a crowded attention environment.",
    approach:
      "We created a repeatable content and production system around proof, aspiration, and category authority — campaign rhythm instead of one-off posts.",
    outcome:
      "A more coherent public image built through campaign rhythm, social assets, and cinematic production.",
    accent: "#2B8CE6"
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
