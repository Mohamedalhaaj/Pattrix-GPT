/**
 * The six service systems. Each groups offerings from the agency's real
 * service list. `formation` names the field pattern shown when the row opens.
 */

import type { FormationName } from "@/components/field/formations";

export interface ServiceSystem {
  index: string;
  name: string;
  /**
   * Arabic name and summary — native counterparts of the approved English
   * copy, in the same MSA register as content/service-pages.ts. The names are
   * the exact strings already canonized across projects.ar.services, so the
   * vocabulary cannot fork. Written for the Arabic home page, which previously
   * showed the SEO page titles here ("… في ليبيا" seven times) instead of the
   * six geo-free systems the English home shows.
   */
  arName: string;
  arSummary: string;
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
    arName: "الاستراتيجية والتموضع",
    arSummary:
      "نظام البداية: ما الذي يجب أن يُقال، ولمن، وبأي ترتيب. هندسة الحملة قبل وجود أي مادة.",
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
    arName: "العلاقات العامة والإعلام",
    arSummary:
      "سمعة تُبنى على الملأ: علاقات صحفية، وتغطية منسّقة، واتصال يصمد أمام التدقيق.",
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
    arName: "العلامة والهوية",
    arSummary:
      "النظام البصري واللفظي الذي تكرّره العلامة حتى تُعرف — هوية مصمّمة لتُستخدم، لا لتُعجب.",
    formation: "lattice",
    summary:
      "The visual and verbal system a brand repeats until it is recognized — identity designed to be used, not admired.",
    includes: ["Brand identity", "Design systems", "Brand language"]
  },
  {
    index: "04",
    name: "Social & Digital",
    arName: "السوشيال والديجيتال",
    arSummary:
      "حضور دائم بانضباط تحريري: استراتيجية المنصات، والإدارة، والمحتوى القصير الذي يغذّيها.",
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
    arName: "الإنتاج",
    arSummary:
      "أفلام وتصوير داخلي يُنتَج بانضباط الحملات — طبقة الإثبات لكل رسالة.",
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
    arName: "الفعاليات والتجارب",
    arSummary:
      "فعاليات مؤسسية عالية الأثر من الفكرة إلى تنفيذٍ متقن — منتديات تنفيذية، وجلسات دولية، وتجمّعات أعمال واسعة.",
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

/**
 * Service-system name → its dedicated page, for the "Systems used" list on
 * case studies. That list named the systems a project used but linked nowhere,
 * so the case studies — the pages carrying the actual proof — sent no internal
 * authority to the service pages meant to rank for those systems.
 *
 * Keyed on the English name because that is what `project.services` holds in
 * both locales' data; the Arabic route resolves its own label positionally and
 * prefixes "/ar" (see app/(ar)/ar/work/[slug]/page.tsx). Systems without a
 * dedicated page (Brand & Identity) are absent and stay plain text.
 */
export const serviceHrefByName: Record<string, string> = Object.fromEntries(
  services.filter((s) => s.href).map((s) => [s.name, s.href as string])
);
