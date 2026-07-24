/**
 * The six service systems. Each groups offerings from the agency's real
 * service list. `formation` names the field pattern shown when the row opens.
 */

import type { FormationName } from "@/components/field/formations";

export interface ServiceSystem {
  index: string;
  name: string;
  formation: FormationName;
  summary: string;
  includes: string[];
  /** Optional dedicated service page; renders a link in the open panel. */
  href?: string;
  hrefLabel?: string;
}

export const services: ServiceSystem[] = [
  {
    index: "01",
    name: "Strategy & Positioning",
    formation: "signal",
    summary:
      "The starting system: what should be said, to whom, and in what order. Campaign architecture before any asset exists.",
    includes: ["Campaign development", "Message architecture", "Audience & channel planning"],
    href: "/services/strategic-communications-libya",
    hrefLabel: "More on strategic communications"
  },
  {
    index: "02",
    name: "Public Relations & Media",
    formation: "orbit",
    summary:
      "Reputation built in public: press relationships, coordinated coverage, and communication that stands up to scrutiny.",
    includes: ["Public relations", "Media coordination", "News coverage"],
    href: "/services/pr-agency-libya",
    hrefLabel: "More on public relations"
  },
  {
    index: "03",
    name: "Brand & Identity",
    formation: "lattice",
    summary:
      "The visual and verbal system a brand repeats until it is recognized — identity designed to be used, not admired.",
    includes: ["Brand identity", "Design systems", "Brand language"]
  },
  {
    index: "04",
    name: "Social & Digital",
    formation: "stream",
    summary:
      "Always-on presence with editorial discipline: platform strategy, management, and the short-form content that feeds it.",
    includes: ["Social media strategy & management", "Reels & digital content", "Influencer coordination"],
    href: "/services/social-media-management-libya",
    hrefLabel: "More on social media management"
  },
  {
    index: "05",
    name: "Production",
    formation: "weave",
    summary:
      "In-house film and photography, produced to campaign discipline — the proof layer of every message.",
    includes: ["Content production", "Photography & video", "Post-production"],
    href: "/services/content-production-libya",
    hrefLabel: "More on content production"
  },
  {
    index: "06",
    name: "Events & Experiences",
    formation: "constellation",
    summary:
      "High-impact institutional events from concept to flawless execution — executive forums, international panels, and large-scale business gatherings.",
    includes: [
      "Full event planning",
      "Institutional coordination",
      "Speaker & program management",
      "Media & coverage execution"
    ],
    href: "/services/event-coverage-tripoli",
    hrefLabel: "More on event coverage"
  }
];
