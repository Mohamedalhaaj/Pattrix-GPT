/**
 * Global site content — edit text here, not inside components.
 * See docs/rebuild/EDITING_GUIDE.md
 * Contact facts verified against the official Pattrix profile (2026).
 */

export const site = {
  name: "Pattrix",
  tagline: "Strategic Communications & PR — Tripoli",
  /** Used in <title> and social sharing. */
  metaTitle: "Pattrix — Strategic Communications & PR, Tripoli",
  metaDescription:
    "Pattrix is a strategic communications and PR agency in Tripoli, working globally. Strategy, public relations, campaigns, social media, events, and production for brands and institutions.",
  /** Base URL for canonical/OG links. */
  url: "https://pattrix.co",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Clients", href: "/#clients" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" }
  ],

  contact: {
    email: "info@pattrix.co",
    phones: ["+218 91 097 0099", "+218 91 164 6600"],
    location: "Tripoli — Working Globally",
    website: "Pattrix.co",
    /** Social profiles: add { label, href } entries ONLY once URLs are verified. */
    socials: [] as { label: string; href: string }[]
  },

  hero: {
    eyebrow: "Strategic Communications & PR — Tripoli",
    /** The one-line identity statement. */
    headline: "We turn noise into patterns people remember.",
    sub: "Strategy, public relations, and production for brands and institutions that need to be understood — from Tripoli, working globally.",
    primaryCta: { label: "See selected work", href: "/#work" },
    secondaryCta: { label: "Start a project", href: "mailto:info@pattrix.co" },
    scrollHint: "Scroll — the signal begins"
  },

  positioning: {
    chapter: "01",
    chapterName: "The pattern",
    statement:
      "Attention is never won by volume. It is won by pattern — the message, repeated with discipline, until it becomes memory.",
    editorialAside: "Where strategy meets creativity.",
    body:
      "Pattrix is a strategic communications and PR agency with full production capability. We build brand experiences through integrated communication, content, and campaigns — designed to move audiences and hold together from strategy to screen.",
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
    sub: "Engagements for international institutions and regional market leaders — each one a system of message, media, and production moving together."
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
    statement: "Trusted by leading brands and global organizations.",
    note: "From international institutions to regional market leaders."
  },

  about: {
    chapter: "05",
    chapterName: "Origin",
    statement: "From Tripoli, working globally.",
    body:
      "Pattrix was founded in Tripoli, where communication carries real consequence. Working here taught us precision: reading context carefully, saying exactly what is meant, and producing work that stands up in public. We bring that discipline to brands and institutions across Libya, the region, and beyond.",
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
    ],
    /** Real event photography from the agency's delivered coverage. */
    proof: {
      caption: "Public rooms, delivered end-to-end — executive forums, international panels, and large-scale business gatherings.",
      images: [
        {
          src: "/images/events/banquet.jpg",
          alt: "Large business gathering in a grand hall, coordinated by Pattrix"
        },
        {
          src: "/images/events/forum.jpg",
          alt: "Speaker at the podium of an executive forum"
        },
        {
          src: "/images/events/buffet.jpg",
          alt: "Guests at a large-scale business gathering during a coordinated event"
        }
      ]
    }
  },

  contactSection: {
    chapter: "06",
    chapterName: "Contact",
    statement: "Let's make the next pattern.",
    sub: "Where strategy meets creativity — tell us what needs to be understood, and we'll design how it travels."
  },

  footer: {
    line: "Strategic communications & PR — strategy, relations, campaigns, social, events, production.",
    builtIn: "Tripoli — Working Globally"
  }
} as const;

export type Site = typeof site;
