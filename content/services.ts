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
}

export const services: ServiceSystem[] = [
  {
    index: "01",
    name: "Strategy & Positioning",
    formation: "signal",
    summary:
      "The starting system: what should be said, to whom, and in what order. Campaign architecture before any asset exists.",
    includes: ["Campaign development", "Message architecture", "Audience & channel planning"]
  },
  {
    index: "02",
    name: "Public Relations & Media",
    formation: "orbit",
    summary:
      "Reputation built in public: press relationships, coordinated coverage, and communication that stands up to scrutiny.",
    includes: ["Public relations", "Media coordination", "News coverage"]
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
    includes: ["Social media strategy & management", "Reels & digital content", "Influencer coordination"]
  },
  {
    index: "05",
    name: "Production",
    formation: "weave",
    summary:
      "In-house film and photography, produced to campaign discipline — the proof layer of every message.",
    includes: ["Content production", "Photography & video", "Post-production"]
  },
  {
    index: "06",
    name: "Events & Experiences",
    formation: "constellation",
    summary:
      "Public moments designed end-to-end: exhibitions, launches, and the coverage that makes them travel afterwards.",
    includes: ["Event coverage", "Exhibition & event experiences", "Launch moments"]
  }
];
