/**
 * Selected work. Add a project by appending an entry; it appears on the home
 * page and gets a case-study route at /work/<slug> automatically.
 *
 * IMPORTANT: `challenge` / `approach` / `outcome` must stay qualitative and
 * truthful — no invented statistics or client-confidential details.
 * `cover` (path under /public) shows real work; when absent, a generative
 * pattern cover is rendered from the project's seed instead.
 *
 * All four engagements below are taken from the official Pattrix profile
 * (docs/rebuild reference: "Pattrix Profile.pdf", 2026).
 */

export interface ProjectImage {
  src: string;
  alt: string;
}

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
  /** Accent used in generative pattern accents. */
  accent: string;
  /** Real cover image: path under /public. */
  cover?: string;
  coverAlt?: string;
  /** Additional real images shown on the case-study page. */
  gallery?: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "unsmil-strategic-communications",
    title: "UNSMIL — Strategic Communications & Institutional Media",
    category: "Institutional Media",
    year: "2025",
    services: ["Public Relations & Media", "Strategy & Positioning", "Social & Digital"],
    premise:
      "Institutional media and public-facing communication for the United Nations Support Mission in Libya.",
    challenge:
      "An international mission needed clear, credible public communication in Arabic and English — across governance dialogues, official announcements, and public discussion formats — in an environment where precision carries real consequence.",
    approach:
      "We produced the mission's public-facing visual communication: bilingual social media systems, event and dialogue announcements, and institutional media assets built to one disciplined visual language.",
    outcome:
      "A consistent institutional voice across the mission's public channels — communication designed to be understood, trusted, and repeated.",
    accent: "#2B8CE6",
    cover: "/images/work/unsmil.jpg",
    coverAlt:
      "UNSMIL bilingual social media designs: a governance-track discussion graphic and an online-discussion announcement with SRSG Hannah Tetteh"
  },
  {
    slug: "hyundai-libya-showroom-identity",
    title: "Hyundai Libya — Branding & Showroom Identity",
    category: "Brand & Environments",
    year: "2025",
    services: ["Brand & Identity", "Production", "Events & Experiences"],
    premise:
      "Branding, showroom identity, and campaign visuals for Hyundai's Libyan operation.",
    challenge:
      "A global automotive brand needed its Libyan retail environments — showroom, workshop, and reception — to carry the brand with the same discipline as its campaigns.",
    approach:
      "We designed the showroom identity system end-to-end: environmental branding, interior brand walls, staff identity material, and the campaign visuals that connect the space to the market.",
    outcome:
      "A branded retail environment where every surface — from the workshop to the reception — speaks one visual language.",
    accent: "#0171DD",
    cover: "/images/work/hyundai.jpg",
    coverAlt: "DLTA Duroue Libya workshop interior with red and grey Hyundai environmental branding",
    gallery: [
      {
        src: "/images/work/hyundai-red.jpg",
        alt: "Hyundai Libya showroom brand wall and staff identity material"
      }
    ]
  },
  {
    slug: "albaraka-insurance-campaigns",
    title: "Albaraka Insurance — Commercial Campaigns",
    category: "Campaigns & Brand Direction",
    year: "2025",
    services: ["Strategy & Positioning", "Brand & Identity", "Social & Digital"],
    premise:
      "Commercial campaigns and brand visual direction for a Libyan insurance institution.",
    challenge:
      "A financial institution needed its digital products and commercial offers to feel as trustworthy as the institution itself — across app promotion, direct campaigns, and printed brand material.",
    approach:
      "We set the brand's commercial visual direction and produced the campaign system: app-launch promotion, QR-driven campaign material, and branded print built to the same language.",
    outcome:
      "A coherent commercial presence across digital and print — campaigns that build familiarity with every repetition.",
    accent: "#0A50A8",
    cover: "/images/work/albaraka.jpg",
    coverAlt:
      "Albaraka Insurance campaign system: mobile app promotion, QR campaign screens, and branded desk calendar"
  },
  {
    slug: "musiad-institutional-media-events",
    title: "MUSIAD — Institutional Media & Events",
    category: "Institutional Media & Events",
    year: "2025",
    services: ["Public Relations & Media", "Events & Experiences", "Production"],
    premise:
      "Institutional media, event experiences, and strategic communications for the MUSIAD business network in Libya.",
    challenge:
      "An international business association needed its Libyan chapter's activities — launches, member programs, and business gatherings — to communicate at an institutional standard.",
    approach:
      "We delivered the communication system around the network's activity: launch and program media, office and event branding, and coverage of its business gatherings.",
    outcome:
      "An institutional presence that carries from printed program to event room to public channel.",
    accent: "#8A6D1D",
    cover: "/images/work/musiad.jpg",
    coverAlt: "MUSIAD Libya institutional media: 2025 program launch designs and branded office environment",
    gallery: [
      {
        src: "/images/events/musiad-booth.jpg",
        alt: "Conversation at a MUSIAD event stand during a business gathering"
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
