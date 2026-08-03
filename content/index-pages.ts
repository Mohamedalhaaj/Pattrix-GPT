/**
 * Copy for the hub/index routes and the Arabic home page.
 *
 * Why these routes exist: /services, /work, /ar, /ar/services and /ar/insights
 * were all missing. Two consequences, both SEO-visible — service and case-study
 * pages could only ever emit a two-level BreadcrumbList (a middle crumb with no
 * URL is invalid), and an Arabic-first market had no Arabic entry point at all.
 *
 * Copy rules are the same as content/service-pages.ts: no invented clients,
 * results, or claims. Every line below is either lifted from already-approved
 * copy in content/site.ts and content/service-pages.ts, or is structural
 * connective text that asserts no new business fact. The Arabic is written in
 * the same professional MSA register as the shipped /ar/services pages — the
 * positioning line and the three pillars mirror their approved English
 * counterparts in content/site.ts, phrased natively rather than translated
 * literally.
 */

export interface IndexPageCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
}

/** EN — /services */
export const servicesIndex: IndexPageCopy = {
  metaTitle: "Marketing, PR & Communications Services in Libya | Pattrix",
  metaDescription:
    "Public relations, strategic communications, marketing, social media, events, production, and market analysis — delivered from Tripoli, Libya by Pattrix.",
  eyebrow: "Services",
  h1: "Communication systems built for Libya",
  intro:
    "Every engagement is built from named systems, so clients always know what is being done and why. Each one below is a full service page — what it includes, how it runs, and the delivered work behind it."
};

/** EN — /work */
export const workIndex: IndexPageCopy = {
  metaTitle: "Selected Work — Case Studies | Pattrix",
  metaDescription:
    "Case studies from Pattrix: strategic communications, public relations, campaigns, events, and production for international institutions and regional market leaders.",
  eyebrow: "Selected work",
  h1: "Patterns that held attention.",
  intro:
    "Engagements for international institutions and regional market leaders — each one a system of message, media, and production moving together."
};

/** AR — /ar/services */
export const arServicesIndex: IndexPageCopy = {
  metaTitle: "خدمات التسويق والعلاقات العامة في ليبيا | باتريكس",
  metaDescription:
    "علاقات عامة، اتصال استراتيجي، تسويق، سوشيال ميديا، فعاليات، إنتاج، وتحليل السوق والإعلام — من طرابلس، ليبيا مع باتريكس.",
  eyebrow: "الخدمات",
  h1: "أنظمة اتصال مبنية للسوق الليبي",
  intro:
    "كل تعاون يُبنى من أنظمة لها أسماء واضحة، ليعرف العميل دائماً ما الذي يُنفَّذ ولماذا. كل خدمة أدناه لها صفحة كاملة تشرح ما تشمله وكيف تُدار."
};

/** AR — /ar/insights */
export const arInsightsIndex: IndexPageCopy = {
  metaTitle: "مقالات في التسويق والعلاقات العامة في ليبيا | باتريكس",
  metaDescription:
    "أدلة عملية في التسويق والعلاقات العامة والاتصال الاستراتيجي وتحليل الإعلام في ليبيا — بقلم فريق باتريكس من طرابلس.",
  eyebrow: "مقالات",
  h1: "ملاحظات في الاتصال الذي ينجح في ليبيا",
  intro:
    "أدلة عملية في التسويق والعلاقات العامة والاتصال الاستراتيجي وتحليل الإعلام — مكتوبة من طرابلس، للمؤسسات التي تحتاج أن تصمد رسالتها."
};

/**
 * AR — /ar (the Arabic home page).
 *
 * `statement` and `pillars` are the Arabic counterparts of
 * site.positioning.statement and site.positioning.pillars; `headline`/`sub`
 * correspond to site.hero. The phrase "الانتباه لا يُكسب بالكثرة بل بالنمط"
 * is already approved and shipped in /ar/services/marketing-agency-tripoli.
 */
export const arHome = {
  metaTitle: "باتريكس — وكالة تسويق وعلاقات عامة في طرابلس، ليبيا",
  metaDescription:
    "باتريكس شركة اتصال استراتيجي وعلاقات عامة في طرابلس، ليبيا: استراتيجية، علاقات عامة، حملات، سوشيال ميديا، فعاليات، وإنتاج — للمؤسسات والعلامات التجارية.",
  eyebrow: "اتصال استراتيجي وعلاقات عامة — طرابلس، ليبيا",
  headline: "نحوّل الضجيج إلى أنماط تبقى في الذاكرة.",
  sub: "استراتيجية وعلاقات عامة وإنتاج للمؤسسات والعلامات التجارية التي تحتاج أن تُفهم — من طرابلس، ليبيا، ونعمل عالمياً.",

  positioningHeading: "النمط",
  statement:
    "الانتباه لا يُكسب بالكثرة، بل بالنمط: الرسالة تتكرر بانضباط حتى تصير ذاكرة.",
  body:
    "باتريكس شركة اتصال استراتيجي وعلاقات عامة بقدرات إنتاج كاملة داخل الشركة. نبني تجارب العلامات التجارية عبر اتصال ومحتوى وحملات متكاملة — مصمّمة لتحريك الجمهور، ومتماسكة من الاستراتيجية حتى الشاشة.",
  pillars: [
    {
      title: "الاستراتيجية",
      copy: "التموضع، وهندسة الحملات، واللغة التي تستجيب لها المؤسسات والجماهير فعلاً."
    },
    {
      title: "العلاقات",
      copy: "العلاقات العامة، والتنسيق الإعلامي، والتغطية الإخبارية التي تبني ثقة عامة راسخة."
    },
    {
      title: "الإنتاج",
      copy: "أفلام وتصوير ومحتوى رقمي يُنتج داخلياً وفق انضباط الحملة."
    }
  ],

  servicesHeading: "الخدمات",
  servicesSub: "ستة أنظمة، وانضباط واحد.",
  insightsHeading: "مقالات",
  insightsSub: "أدلة عملية في الاتصال والتسويق في ليبيا.",
  insightsMore: "كل المقالات",

  contactHeading: "لنصنع النمط التالي.",
  contactSub:
    "حيث تلتقي الاستراتيجية بالإبداع — أخبرنا بما يحتاج أن يُفهم، ونصمّم كيف ينتقل.",
  contactCta: "ابدأ مشروعاً",

  /** Link to the English home page (hreflang pair). */
  langSwitch: { label: "English", href: "/" }
} as const;
