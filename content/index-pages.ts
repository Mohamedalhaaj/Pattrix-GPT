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

/**
 * Arabic site chrome — the header, footer, and skip link for /ar/*.
 *
 * The Arabic routes used to render the English Header/Footer verbatim, because
 * a single root layout meant one <html lang>. /ar now has its own root layout
 * (app/(ar)/layout.tsx), so the chrome is translated and the whole document
 * flips to dir="rtl" rather than only the article body.
 *
 * Nav hrefs mirror site.nav but point at the Arabic hub routes rather than
 * same-page anchors: the hubs carry the middle crumb of every Arabic
 * BreadcrumbList and deserve the internal links, and the home page now has
 * its own Work/Clients/About chapters mirroring the English home.
 */
export const arSite = {
  skipToContent: "تخطَّ إلى المحتوى",
  /**
   * The brand name in Arabic. Every Arabic page bakes this into its own
   * `title.absolute`, except the case studies, which set a plain `title` and so
   * inherited the (ar) layout's `%s — ${site.name}` template — shipping the
   * Latin "Pattrix" as the only Arabic title suffix on the site.
   */
  arName: "باتريكس",
  logoAriaLabel: "باتريكس — الصفحة الرئيسية",
  primaryNavLabel: "التنقل الرئيسي",
  mobileNavLabel: "قائمة الجوال",
  footerNavLabel: "تذييل الصفحة",
  openMenu: "افتح القائمة",
  closeMenu: "أغلق القائمة",
  navigateHeading: "تنقل",
  contactHeading: "تواصل",
  ctaLabel: "ابدأ مشروعاً",
  rightsReserved: "جميع الحقوق محفوظة.",
  location: "طرابلس، ليبيا — نعمل عالمياً",
  footerLine:
    "اتصال استراتيجي وعلاقات عامة — استراتيجية، علاقات، حملات، سوشيال ميديا، فعاليات، وإنتاج.",
  nav: [
    { label: "الخدمات", href: "/ar/services" },
    { label: "مقالات", href: "/ar/insights" },
    { label: "أعمالنا", href: "/ar/work" },
    { label: "تواصل", href: "/ar#ar-contact-heading" }
  ],
  /** Link back to the English site (hreflang counterpart of the home page). */
  langSwitch: { label: "English", href: "/" }
} as const;

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

/** AR — /ar/work */
export const arWorkIndex: IndexPageCopy = {
  metaTitle: "أعمالنا — دراسات حالة | باتريكس",
  metaDescription:
    "دراسات حالة من باتريكس: اتصال استراتيجي، علاقات عامة، حملات، فعاليات، وإنتاج لمؤسسات دولية وعلامات رائدة في السوق.",
  eyebrow: "أعمالنا",
  h1: "أنماط حافظت على الانتباه.",
  intro:
    "تعاونات مع مؤسسات دولية وعلامات رائدة في السوق — كل واحدة منها نظام من الرسالة والإعلام والإنتاج يتحرك معاً."
};

/** AR — section labels on /ar/work/<slug>, mirroring the English case-study page. */
export const arCaseStudy = {
  challenge: "التحدي",
  approach: "المقاربة",
  outcome: "ما صار إليه",
  servicesLabel: "الخدمات",
  /** Heading of the image gallery — the Arabic counterpart of "From the engagement". */
  galleryHeading: "من المشروع",
  backToWork: "كل الأعمال",
  readCase: "اقرأ دراسة الحالة"
} as const;

/**
 * Heading for the "related reading" block on a service page, which lists the
 * articles that point back at that service (see insightsForService). Section
 * chrome only — it introduces no business claim.
 */
export const relatedReadingHeading = {
  en: "Related reading",
  ar: "اقرأ أيضاً"
} as const;

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
  eyebrow: "اتصال استراتيجي وعلاقات عامة — طرابلس",
  headline: "نحوّل الضجيج إلى أنماط تبقى في الذاكرة.",
  sub: "استراتيجية وعلاقات عامة وإنتاج للمؤسسات والعلامات التجارية التي تحتاج أن تُفهم — من طرابلس، ونعمل عالمياً.",
  /**
   * Hero CTAs — mirrors site.hero: the primary CTA anchors to the on-page
   * work chapter (the counterpart of "See selected work" → "/#work"), the
   * secondary is the start-a-project mailto (label = contactCta below), and
   * the scroll hint is the counterpart of "Scroll — the signal begins".
   * NOT "كل الأعمال": that label belongs to allWork below, which renders on
   * the same page linking to the /ar/work hub — two identically-named links
   * with different destinations would be ambiguous for assistive tech.
   */
  heroPrimaryCta: { label: "شاهد أعمالاً مختارة", href: "/ar#ar-work" },
  heroScrollHint: "مرّر — تبدأ الإشارة",

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
  servicesLine: "كل تعاون يُبنى من أنظمة لها أسماء واضحة، ليعرف العميل دائماً ما الذي يُنفَّذ ولماذا.",
  allServices: "كل الخدمات",

  /**
   * The chapters below mirror the English home (Work → Services → Clients →
   * About). They were missing entirely, which — together with the services
   * grid showing SEO page titles — is what made /ar read as a different,
   * geo-stuffed site rather than the same site in Arabic. Every line is the
   * native counterpart of approved English copy in content/site.ts.
   */
  workHeading: "أعمالنا",
  workStatement: "أنماط حافظت على الانتباه.",
  workSub:
    "تعاونات مع مؤسسات دولية وعلامات رائدة في السوق — كل واحدة منها نظام من الرسالة والإعلام والإنتاج يتحرك معاً.",
  allWork: "كل الأعمال",

  clientsStatement: "موثوقون لدى علامات رائدة ومؤسسات عالمية.",
  clientsNote: "من المؤسسات الدولية إلى قادة السوق في المنطقة.",

  aboutHeading: "الأصل",
  aboutStatement: "من طرابلس، نعمل عالمياً.",
  aboutBody:
    "تأسست باتريكس في طرابلس، حيث يحمل الاتصال أثراً حقيقياً. العمل هنا علّمنا الدقة: قراءة السياق بعناية، وقول المقصود تماماً، وإنتاج عملٍ يصمد أمام الجمهور. ونحمل هذا الانضباط إلى العلامات والمؤسسات في ليبيا والمنطقة وما بعدهما.",
  aboutPillars: [
    {
      title: "الدقة قبل الكثرة",
      copy: "رسالة واحدة واضحة، في موضعها الصحيح، تتفوق على عشرٍ صاخبة."
    },
    {
      title: "الاستراتيجية تقود الإنتاج",
      copy: "ننتج ما تحتاجه الاستراتيجية — لا محتوى لذاته."
    },
    {
      title: "العمل العام يجب أن يصمد",
      copy: "كل ما نُصدره مبنيّ ليصمد أمام التدقيق، لا ليوم الإطلاق فقط."
    }
  ],
  /**
   * Arabic captions for the about chapter's event-photography strip
   * (site.about.proof). `alts` is INDEX-PARALLEL to site.about.proof.images —
   * same files, forked description — following the same parallel-array rule as
   * projects EN/AR `services`. The caption reuses the events system's
   * canonized vocabulary from content/services.ts (arSummary of "الفعاليات
   * والتجارب").
   */
  aboutProof: {
    caption:
      "قاعات عامة تُدار من طرف إلى طرف — منتديات تنفيذية، وجلسات دولية، وتجمّعات أعمال واسعة.",
    alts: [
      "تجمّع أعمال واسع في قاعة كبرى بتنسيق باتريكس",
      "متحدث على منصة منتدى تنفيذي",
      "ضيوف في تجمّع أعمال واسع خلال فعالية منسّقة"
    ]
  },

  insightsHeading: "مقالات",
  insightsSub: "أدلة عملية في الاتصال والتسويق.",
  insightsMore: "كل المقالات",

  contactHeading: "لنصنع النمط التالي.",
  contactSub:
    "حيث تلتقي الاستراتيجية بالإبداع — أخبرنا بما يحتاج أن يُفهم، ونصمّم كيف ينتقل.",
  contactCta: "ابدأ مشروعاً",

  /** Link to the English home page (hreflang pair). */
  langSwitch: { label: "English", href: "/" }
} as const;

/**
 * AR — the Arabic 404 (app/(ar)/ar/not-found.tsx). Counterpart of the copy in
 * app/not-found.tsx: same structure, native MSA phrasing, and the four Arabic
 * entry points instead of the English ones.
 */
export const ar404 = {
  title: "الصفحة غير موجودة",
  headline: "هذه الصفحة خرجت عن النمط.",
  body: "الرابط الذي وصلت منه معطوب، أو أن الصفحة انتقلت. كل ما تبحث عنه ما يزال في مكانه أدناه.",
  navLabel: "صفحات مقترحة",
  destinations: [
    { href: "/ar", label: "الرئيسية" },
    { href: "/ar/services", label: "الخدمات" },
    { href: "/ar/work", label: "أعمالنا" },
    { href: "/ar/insights", label: "مقالات" }
  ],
  /** Link back to the English site, mirroring the العربية link on the English 404. */
  langSwitch: { label: "English", href: "/" }
} as const;
