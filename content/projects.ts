/**
 * Selected work. Add a project by appending an entry; it appears on the home
 * page and gets a case-study route at /work/<slug> automatically.
 *
 * IMPORTANT: `challenge` / `approach` / `outcome` must stay qualitative and
 * truthful — no invented statistics or client-confidential details.
 *
 * Images are the agency's own delivered material (uncropped originals from
 * the Pattrix profile source files). `coverW`/`coverH` are the image's real
 * pixel dimensions so pages can render it at its natural aspect ratio.
 * When `cover` is absent, a generative pattern cover is rendered instead.
 */

export interface ProjectImage {
  src: string;
  alt: string;
  w: number;
  h: number;
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
  coverW?: number;
  coverH?: number;
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
      "UNSMIL bilingual institutional media: an Arabic accountability-dialogue design and an online-discussion announcement with SRSG Hannah Tetteh",
    coverW: 1800,
    coverH: 1200,
    gallery: [
      {
        src: "/images/work/unsmil-justice-en.jpg",
        alt: "UNSMIL public-dialogue design in English: What do you think is meant by justice?",
        w: 1600,
        h: 1600
      }
    ]
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
    coverW: 1536,
    coverH: 1024,
    gallery: [
      {
        src: "/images/work/hyundai-training.jpg",
        alt: "DLTA training academy room with Hyundai environmental branding",
        w: 1536,
        h: 1024
      },
      {
        src: "/images/work/hyundai-red.jpg",
        alt: "Hyundai brand wall — New Thinking, New Possibilities entrance",
        w: 1024,
        h: 1024
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
      "Albaraka Insurance campaign system: 2026 branded desk calendar and mobile app promotion with QR campaign screens",
    coverW: 1800,
    coverH: 1200,
    gallery: [
      {
        src: "/images/work/albaraka-brand.jpg",
        alt: "Albaraka Insurance brand visual direction board",
        w: 1143,
        h: 579
      },
      {
        src: "/images/work/albaraka-calendar.jpg",
        alt: "Albaraka Insurance 2026 branded desk calendar",
        w: 1280,
        h: 878
      }
    ]
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
    coverAlt: "MUSIAD Libya 2025 program launch design — a new start for the network's activities and initiatives",
    coverW: 1672,
    coverH: 1115,
    gallery: [
      {
        src: "/images/work/musiad-office.jpg",
        alt: "MUSIAD Libya branded office — invest in your skills with MUSIAD Libya",
        w: 1600,
        h: 1600
      },
      {
        src: "/images/events/musiad-booth.jpg",
        alt: "Conversation at a MUSIAD event stand during a business gathering",
        w: 1468,
        h: 966
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
