/**
 * Global site content — edit text here, not inside components.
 * See docs/rebuild/EDITING_GUIDE.md
 */

export const site = {
  name: "Pattrix",
  tagline: "Marketing & PR Agency — Tripoli",
  /** Used in <title> and social sharing. */
  metaTitle: "Pattrix — Marketing & PR Agency in Tripoli",
  metaDescription:
    "Pattrix is a marketing and PR agency in Tripoli. Strategy, public relations, campaigns, social media, and production for brands and institutions across Libya and the region.",
  /** Base URL for canonical/OG links. Update when the domain is confirmed. */
  url: "https://www.pattrix.com",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Clients", href: "/#clients" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" }
  ],

  contact: {
    /** Carried over from the previous site — verify before launch (CONTENT_GAPS.md). */
    email: "studio@pattrix.com",
    location: "Tripoli, Libya",
    /** Social profiles: add { label, href } entries ONLY once URLs are verified. */
    socials: [] as { label: string; href: string }[]
  },

  hero: {
    eyebrow: "Marketing & PR Agency — Tripoli",
    /** The one-line identity statement. */
    headline: "We turn noise into patterns people remember.",
    sub: "Strategy, public relations, and production for brands and institutions that need to be understood — from Tripoli, outward.",
    primaryCta: { label: "See selected work", href: "/#work" },
    secondaryCta: { label: "Start a project", href: "mailto:studio@pattrix.com" },
    scrollHint: "Scroll — the signal begins"
  },

  positioning: {
    chapter: "01",
    chapterName: "The pattern",
    statement:
      "Attention is never won by volume. It is won by pattern — the message, repeated with discipline, until it becomes memory.",
    editorialAside: "This is the quiet mechanics of reputation.",
    body:
      "Pattrix is a marketing and PR consultancy with full production capability. We design the message, place it in the right rooms, and produce the material that carries it — so campaigns hold together from strategy to screen.",
    pillars: [
      {
        title: "Strategy",
        copy: "Positioning, campaign architecture, and the language institutions and audiences actually respond to."
      },
      {
        title: "Relations",
        copy: "Public relations, media coordination, and news coverage that build durable public trust."
      },
      {
        title: "Production",
        copy: "Film, photography, and digital content produced in-house to campaign discipline."
      }
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
    sub: "A selection of engagements. Each one is a system — message, media, and production moving together."
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
    statement: "Trusted by organizations that need to be understood.",
    note: "Selected clients and collaborations."
  },

  about: {
    chapter: "05",
    chapterName: "Origin",
    statement: "From Tripoli, outward.",
    body:
      "Pattrix was founded in Tripoli, where communication carries real consequence. Working here taught us precision: reading context carefully, saying exactly what is meant, and producing work that stands up in public. We bring that discipline to brands and institutions across Libya and the region.",
    philosophy: [
      {
        title: "Precision before volume",
        copy: "One clear message, placed well, outworks ten loud ones."
      },
      {
        title: "Strategy owns production",
        copy: "We produce what the strategy needs — never content for its own sake."
      },
      {
        title: "Public work must hold",
        copy: "Everything we release is built to survive scrutiny, not just launch day."
      }
    ]
  },

  contactSection: {
    chapter: "06",
    chapterName: "Contact",
    statement: "Let's make the next pattern.",
    sub: "Tell us what needs to be understood. We'll design how it travels."
  },

  footer: {
    line: "Marketing & PR — strategy, relations, campaigns, social, production.",
    builtIn: "Built in Tripoli"
  }
} as const;

export type Site = typeof site;
