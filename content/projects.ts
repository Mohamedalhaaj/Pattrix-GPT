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
  /**
   * Arabic alt text. The Arabic case study renders the gallery only for images
   * that carry this — an image without it is silently omitted on /ar rather
   * than shipped with an English description on an Arabic page. The image
   * files themselves are shared between locales; only the description forks.
   */
  arAlt?: string;
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

/**
 * Arabic counterpart of a case study, rendered at /ar/work/<slug>.
 *
 * Same rule as the English fields: qualitative and truthful, no invented
 * statistics or client-confidential details. These carry exactly the facts of
 * their English counterparts — nothing is added, dropped, or strengthened —
 * phrased in professional MSA rather than literally translated, matching the
 * register of content/service-pages.ts. Structural values (year, slug, images,
 * accent) are shared, not duplicated.
 */
export interface ProjectAr {
  title: string;
  category: string;
  services: string[];
  premise: string;
  challenge: string;
  approach: string;
  outcome: string;
  coverAlt?: string;
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
  /** How the cover fills the home-page card. "contain" shows a wide graphic in full. */
  coverFit?: "cover" | "contain";
  /** Arabic case study. When absent, the project has no /ar/work/<slug> route. */
  ar?: ProjectAr;
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
    ar: {
      title: "بعثة الأمم المتحدة للدعم في ليبيا — اتصال استراتيجي وإعلام مؤسسي",
      category: "إعلام مؤسسي",
      services: ["العلاقات العامة والإعلام", "الاستراتيجية والتموضع", "السوشيال والديجيتال"],
      premise: "إعلام مؤسسي واتصال عام لبعثة الأمم المتحدة للدعم في ليبيا.",
      challenge:
        "احتاجت بعثة دولية إلى اتصال عام واضح وموثوق بالعربية والإنجليزية — عبر حوارات الحوكمة والإعلانات الرسمية وصيغ النقاش العام — في بيئة تحمل فيها الدقة أثراً حقيقياً.",
      approach:
        "أنتجنا الاتصال البصري الموجّه إلى جمهور البعثة: أنظمة سوشيال ميديا ثنائية اللغة، وإعلانات الفعاليات والحوارات، ومواد إعلامية مؤسسية مبنية على لغة بصرية واحدة منضبطة.",
      outcome:
        "صوت مؤسسي متسق عبر قنوات البعثة العامة — اتصال مصمّم ليُفهم، ويُوثق به، ويتكرر."
    },
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
        arAlt:
          "تصميم حوار عام من بعثة الأمم المتحدة للدعم في ليبيا بالإنجليزية: ما الذي تعنيه العدالة في رأيك؟",
        w: 1600,
        h: 1600
      },
      {
        src: "/images/work/unsmil-post1.jpg",
        alt: "UNSMIL media-literacy campaign: 96% of Libyans see false information online",
        arAlt:
          "من حملة التوعية الإعلامية للبعثة الأممية: 96% من الليبيين يصادفون معلومات زائفة على الإنترنت",
        w: 1400,
        h: 1400
      },
      {
        src: "/images/work/unsmil-post12.jpg",
        alt: "UNSMIL media-literacy campaign: your personal verification toolbox",
        arAlt: "من حملة التوعية الإعلامية للبعثة الأممية: صندوق أدواتك الشخصي للتحقق من المعلومات",
        w: 1400,
        h: 1400
      },
      {
        src: "/images/work/unsmil-post6.jpg",
        alt: "UNSMIL media-literacy campaign: protect Libya's elections from disinformation",
        arAlt: "من حملة التوعية الإعلامية للبعثة الأممية: احمِ انتخابات ليبيا من المعلومات المضللة",
        w: 1400,
        h: 1400
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
    ar: {
      title: "هيونداي ليبيا — العلامة وهوية صالة العرض",
      category: "العلامة والبيئات",
      services: ["العلامة والهوية", "الإنتاج", "الفعاليات والتجارب"],
      premise: "العلامة وهوية صالة العرض والمواد البصرية للحملات لعمليات هيونداي في ليبيا.",
      challenge:
        "احتاجت علامة سيارات عالمية إلى أن تحمل بيئاتها البيعية في ليبيا — صالة العرض والورشة والاستقبال — العلامة بالانضباط نفسه الذي تحمله حملاتها.",
      approach:
        "صمّمنا نظام هوية صالة العرض من طرف إلى طرف: العلامة في البيئة الداخلية، وجدران العلامة، ومواد هوية الفريق، والمواد البصرية للحملات التي تربط المكان بالسوق.",
      outcome:
        "بيئة بيعية موسومة بالعلامة، يتحدث فيها كل سطح — من الورشة إلى الاستقبال — لغة بصرية واحدة.",
      coverAlt:
        "ورشة دروب ليبيا (DLTA) مع رافعة سيارات وهوية هيونداي البيئية بالأحمر والرمادي والأبيض"
    },
    accent: "#0171DD",
    // New filenames, not replacements-in-place: netlify.toml caches /images/*
    // for 30 days, so a same-name swap would serve the old renders to repeat
    // visitors and OG scrapers for up to a month.
    cover: "/images/work/hyundai-workshop.jpg",
    coverAlt:
      "DLTA Doroub Libya workshop with a vehicle lift and red, grey and white Hyundai environmental branding",
    coverW: 1920,
    coverH: 1054,
    gallery: [
      {
        src: "/images/work/hyundai-academy.jpg",
        alt: "DLTA Doroub Libya Training Academy meeting room with branded wall and diamond-pattern accent wall",
        arAlt: "قاعة اجتماعات أكاديمية دروب ليبيا للتدريب (DLTA) بجدار يحمل الهوية وجدار مميز بنقش معيّنات",
        w: 1600,
        h: 1187
      },
      {
        src: "/images/work/hyundai-stairs.jpg",
        alt: "Stairway mural — “Impossible is just an opportunity” beside the Hyundai logo and New Thinking, New Possibilities",
        arAlt: "جدارية الدرج — «المستحيل مجرد فرصة» إلى جانب شعار هيونداي وعبارة New Thinking, New Possibilities",
        w: 1600,
        h: 1113
      },
      {
        src: "/images/work/hyundai-entry.jpg",
        alt: "Second-floor entrance framed in Hyundai red — New Thinking, New Possibilities brand wall",
        arAlt: "مدخل الطابق الثاني مؤطّر بأحمر هيونداي — جدار العلامة New Thinking, New Possibilities",
        w: 829,
        h: 909
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
    ar: {
      title: "البركة للتأمين — حملات تجارية",
      category: "الحملات والتوجيه البصري",
      services: ["الاستراتيجية والتموضع", "العلامة والهوية", "السوشيال والديجيتال"],
      premise: "حملات تجارية وتوجيه بصري للعلامة لمؤسسة تأمين ليبية.",
      challenge:
        "احتاجت مؤسسة مالية إلى أن تبدو منتجاتها الرقمية وعروضها التجارية جديرة بالثقة كالمؤسسة نفسها — عبر الترويج للتطبيق، والحملات المباشرة، والمواد المطبوعة.",
      approach:
        "وضعنا التوجيه البصري التجاري للعلامة وأنتجنا نظام الحملة: الترويج لإطلاق التطبيق، ومواد الحملة المعتمدة على رمز الاستجابة السريعة، ومطبوعات موسومة باللغة البصرية نفسها.",
      outcome:
        "حضور تجاري متماسك عبر الرقمي والمطبوع — حملات تبني الألفة مع كل تكرار."
    },
    accent: "#0A50A8",
    cover: "/images/work/albaraka-cover.jpg",
    coverAlt:
      "Albaraka Insurance 'download the app' campaign banner: QR code, mobile app in hand, and the Albaraka logo",
    coverW: 2200,
    coverH: 1100,
    coverFit: "contain",
    gallery: [
      {
        src: "/images/work/albaraka-cal-01.jpg",
        alt: "Albaraka Insurance branded calendar — January, cyber risk insurance",
        arAlt: "تقويم البركة للتأمين الموسوم بالعلامة — يناير، التأمين ضد المخاطر السيبرانية",
        w: 1225,
        h: 1177
      },
      {
        src: "/images/work/albaraka-cal-02.jpg",
        alt: "Albaraka Insurance branded calendar — February, property insurance",
        arAlt: "تقويم البركة للتأمين الموسوم بالعلامة — فبراير، تأمين الممتلكات",
        w: 1214,
        h: 1170
      },
      {
        src: "/images/work/albaraka-cal-03.jpg",
        alt: "Albaraka Insurance branded calendar — March, health insurance",
        arAlt: "تقويم البركة للتأمين الموسوم بالعلامة — مارس، التأمين الصحي",
        w: 1223,
        h: 1192
      },
      {
        src: "/images/work/albaraka-cal-04.jpg",
        alt: "Albaraka Insurance branded calendar — April, car comprehensive insurance",
        arAlt: "تقويم البركة للتأمين الموسوم بالعلامة — أبريل، التأمين الشامل للسيارات",
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
    ar: {
      title: "مصياد — إعلام مؤسسي وفعاليات",
      category: "إعلام مؤسسي وفعاليات",
      services: ["العلاقات العامة والإعلام", "الفعاليات والتجارب", "الإنتاج"],
      premise: "إعلام مؤسسي وتجارب فعاليات واتصال استراتيجي لشبكة أعمال مصياد في ليبيا.",
      challenge:
        "احتاجت جمعية أعمال دولية إلى أن تتواصل أنشطة فرعها الليبي — الإطلاقات وبرامج الأعضاء وتجمعات الأعمال — بمعيار مؤسسي.",
      approach:
        "قدّمنا نظام الاتصال المحيط بنشاط الشبكة: إعلام الإطلاق والبرامج، وتوسيم المكتب والفعاليات، وتغطية تجمعات الأعمال.",
      outcome: "حضور مؤسسي ينتقل من البرنامج المطبوع إلى قاعة الفعالية إلى القناة العامة."
    },
    accent: "#8A6D1D",
    cover: "/images/work/musiad.jpg",
    coverAlt: "MUSIAD Libya 2025 program launch design — a new start for the network's activities and initiatives",
    coverW: 1672,
    coverH: 1115,
    gallery: [
      {
        src: "/images/work/musiad-office.jpg",
        alt: "MUSIAD Libya branded office — invest in your skills with MUSIAD Libya",
        arAlt: "مكتب مصياد ليبيا الموسوم بالهوية — استثمر في مهاراتك مع مصياد ليبيا",
        w: 1600,
        h: 1600
      },
      {
        src: "/images/events/musiad-booth.jpg",
        alt: "Conversation at a MUSIAD event stand during a business gathering",
        arAlt: "حوار عند منصة مصياد في أحد تجمّعات الأعمال",
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
    ar: {
      title: "طرابلس أوبتكس — ريلز ومحتوى داخل المتجر",
      category: "إنتاج المحتوى",
      services: ["الإنتاج", "السوشيال والديجيتال"],
      premise: "ريلز وتصوير منتجات وإنتاج محتوى داخل المتجر لمتجر بصريات في طرابلس.",
      challenge:
        "احتاج متجر بصريات يحمل علامات نظارات فاخرة إلى أن يبدو حضوره على السوشيال مدروساً كرفوفه — محتوى قصير وصور منتجات تبيع دون أن تبخس العلامات قيمتها.",
      approach:
        "أنتجنا سلسلة مستمرة من الريلز داخل المتجر — تصوير يقوده المنتج بإيقاع تحريري — وجلسة تصوير استوديو موجّهة فنياً لخط العدسات اللاصقة جويل، من تصميم المشهد حتى المعالجة النهائية.",
      outcome:
        "حضور بصري متسق يحمل فيه كل ريل وكل صورة منتج تموضع المتجر الفاخر."
    },
    accent: "#0E7490",
    cover: "/images/work/optics-cover.jpg",
    coverAlt: "Frames from Tripoli Optics product reels: premium eyewear, styled and shot in-store",
    coverW: 1800,
    coverH: 1200,
    gallery: [
      {
        src: "/images/work/joelle-green-bag.jpg",
        alt: "Joelle contact lenses — art-directed product shot with leopard-print packaging in a green bag",
        arAlt:
          "عدسات جويل اللاصقة — لقطة منتج بإخراج فني مع عبوات بنقشة جلد النمر داخل حقيبة خضراء",
        w: 1440,
        h: 1800
      },
      {
        src: "/images/work/joelle-opened-trav-bag.jpg",
        alt: "Joelle contact lenses — campaign still life in an opened travel case with passport props",
        arAlt: "عدسات جويل اللاصقة — مشهد ثابت من الحملة داخل حقيبة سفر مفتوحة مع جواز سفر",
        w: 1440,
        h: 1800
      },
      {
        src: "/images/work/joelle-tripoli.jpg",
        alt: "Joelle contact lenses — surreal campaign composite with a Tripoli landmark",
        arAlt: "عدسات جويل اللاصقة — تركيب سوريالي من الحملة مع معلم من معالم طرابلس",
        w: 1440,
        h: 1800
      },
      {
        src: "/images/work/joelle-boarding.jpg",
        alt: "Joelle EYECANDY contact lenses — travel-themed campaign composite with a boarding pass",
        arAlt: "عدسات جويل EYECANDY اللاصقة — تركيب من الحملة بطابع السفر مع بطاقة صعود إلى الطائرة",
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
