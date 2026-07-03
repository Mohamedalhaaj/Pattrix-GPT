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

export interface ProjectVideo {
  src: string;
  poster: string;
  label: string;
  w: number;
  h: number;
  /** Featured videos render full-width; the rest render in a side-by-side grid. */
  featured?: boolean;
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
  /** Produced video work shown on the case-study page (click to play). */
  videos?: ProjectVideo[];
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
      },
      {
        src: "/images/work/unsmil-post1.jpg",
        alt: "UNSMIL media-literacy campaign: 96% of Libyans see false information online",
        w: 1400,
        h: 1400
      },
      {
        src: "/images/work/unsmil-post12.jpg",
        alt: "UNSMIL media-literacy campaign: your personal verification toolbox",
        w: 1400,
        h: 1400
      },
      {
        src: "/images/work/unsmil-post6.jpg",
        alt: "UNSMIL media-literacy campaign: protect Libya's elections from disinformation",
        w: 1400,
        h: 1400
      }
    ],
    videos: [
      {
        src: "/videos/unsmil-roadmap.mp4",
        poster: "/videos/unsmil-roadmap-poster.jpg",
        label: "The Libyan Roadmap — explainer produced for the mission's public channels",
        w: 720,
        h: 1280
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
    cover: "/images/work/albaraka-cover.jpg",
    coverAlt:
      "Albaraka Insurance 'download the app' campaign banner: QR code, mobile app in hand, and the Albaraka logo",
    coverW: 2200,
    coverH: 1100,
    gallery: [
      {
        src: "/images/work/albaraka-cal-01.jpg",
        alt: "Albaraka Insurance branded calendar — January, cyber risk insurance",
        w: 1225,
        h: 1177
      },
      {
        src: "/images/work/albaraka-cal-02.jpg",
        alt: "Albaraka Insurance branded calendar — February, property insurance",
        w: 1214,
        h: 1170
      },
      {
        src: "/images/work/albaraka-cal-03.jpg",
        alt: "Albaraka Insurance branded calendar — March, health insurance",
        w: 1223,
        h: 1192
      },
      {
        src: "/images/work/albaraka-cal-04.jpg",
        alt: "Albaraka Insurance branded calendar — April, car comprehensive insurance",
        w: 1218,
        h: 1204
      }
    ],
    videos: [
      {
        src: "/videos/albaraka-commercial.mp4",
        poster: "/videos/albaraka-commercial-poster.jpg",
        label: "Brand commercial — cinematic production, shot in 4K",
        w: 1920,
        h: 1080,
        featured: true
      },
      {
        src: "/videos/albaraka-car-insurance.mp4",
        poster: "/videos/albaraka-car-insurance-poster.jpg",
        label: "Car insurance — motion graphic from the campaign system",
        w: 1440,
        h: 1080
      },
      {
        src: "/videos/albaraka-comp1.mp4",
        poster: "/videos/albaraka-comp1-poster.jpg",
        label: "Insurance services — motion graphic from the campaign system",
        w: 1440,
        h: 1080
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
        w: 2936,
        h: 1932
      }
    ],
    videos: [
      {
        src: "/videos/musiad-iftar.mp4",
        poster: "/videos/musiad-iftar-poster.jpg",
        label: "MUSIAD Ramadan Iftar — event film from the network's business gathering",
        w: 1920,
        h: 1080
      }
    ]
  },
  {
    slug: "tripoli-optics-reels",
    title: "Tripoli Optics — Reels & In-Store Content",
    category: "Content Production",
    year: "2025",
    services: ["Production", "Social & Digital"],
    premise:
      "Reels, product photography, and in-store content production for an optics retailer in Tripoli.",
    challenge:
      "An optics retailer carrying premium eyewear brands needed its social presence to look as considered as its shelves — short-form content and product imagery that sell without cheapening the brands.",
    approach:
      "We produced a running series of in-store reels — product-led shooting with editorial pacing — and an art-directed studio photo session for the Joelle contact-lens line, from set design to final retouch.",
    outcome:
      "A consistent visual presence where every reel and product shot carries the store's premium positioning.",
    accent: "#0E7490",
    cover: "/images/work/optics-cover.jpg",
    coverAlt: "Frames from Tripoli Optics product reels: premium eyewear, styled and shot in-store",
    coverW: 1800,
    coverH: 1200,
    gallery: [
      {
        src: "/images/work/joelle-green-bag.jpg",
        alt: "Joelle contact lenses — art-directed product shot with leopard-print packaging in a green bag",
        w: 1440,
        h: 1800
      },
      {
        src: "/images/work/joelle-opened-trav-bag.jpg",
        alt: "Joelle contact lenses — campaign still life in an opened travel case with passport props",
        w: 1440,
        h: 1800
      },
      {
        src: "/images/work/joelle-tripoli.jpg",
        alt: "Joelle contact lenses — surreal campaign composite with a Tripoli landmark",
        w: 1440,
        h: 1800
      }
    ],
    videos: [
      {
        src: "/videos/optics-reel-a.mp4",
        poster: "/videos/optics-reel-a-poster.jpg",
        label: "Product reel — optical frames, editorial styling",
        w: 720,
        h: 1280
      },
      {
        src: "/videos/optics-reel-b.mp4",
        poster: "/videos/optics-reel-b-poster.jpg",
        label: "Product reel — sunglasses, lifestyle set",
        w: 720,
        h: 1280
      },
      {
        src: "/videos/optics-reel-c.mp4",
        poster: "/videos/optics-reel-c-poster.jpg",
        label: "Product reel — eyewear in a styled interior",
        w: 720,
        h: 1280
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
