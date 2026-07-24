/**
 * Phase 1 SEO service pages — single source of truth for /services/* and
 * /ar/services/*. Copy rules (see docs/SEO_SERVICE_PAGE_ARCHITECTURE.md):
 * no invented clients, results, rankings, or claims; proof comes only from
 * projects that exist in content/projects.ts. Arabic is written natively in
 * professional Modern Standard Arabic — never as literal translation.
 */

export type ServiceLocale = "en" | "ar";

export interface ServicePageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: { title: string; text: string }[];
}

export interface ServicePage {
  slug: string;
  locale: ServiceLocale;
  /** Route path, also used for canonical (resolved against metadataBase). */
  path: string;
  /** Path of the same page in the other language (hreflang pair). */
  counterpartPath: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ServicePageSection[];
  proofHeading: string;
  proofLead: string;
  /** Slugs from content/projects.ts — never invent projects. */
  proofProjects: string[];
  proofCtaLabel: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { heading: string; text: string; buttonLabel: string };
  related: { label: string; href: string };
  langSwitch: { label: string; href: string };
  /** schema.org Service.serviceType */
  serviceType: string;
  breadcrumb: { home: string; label: string };
}

export const servicePages: ServicePage[] = [
  /* ------------------------------------------------------------------ */
  /* EN — Public Relations                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "pr-agency-libya",
    locale: "en",
    path: "/services/pr-agency-libya",
    counterpartPath: "/ar/services/pr-agency-libya",
    title: "PR Agency in Libya — Public Relations & Media | Pattrix",
    metaDescription:
      "Pattrix is a PR agency in Tripoli, Libya. Public relations, media coordination, and news coverage for brands, institutions, and international organizations.",
    ogTitle: "PR Agency in Libya — Pattrix",
    ogDescription:
      "Public relations, media coordination, and news coverage from Tripoli, Libya — for brands, institutions, and international organizations.",
    eyebrow: "Services — Public Relations & Media",
    h1: "A public relations agency in Tripoli, Libya",
    intro:
      "Pattrix is a public relations and strategic communications agency based in Tripoli, working with brands, institutions, and international organizations across Libya and beyond. Public relations, as we practice it, is not noise management — it is message discipline: deciding what should be said in public, saying it precisely, and repeating it until it earns trust.",
    sections: [
      {
        heading: "What the public relations system includes",
        paragraphs: [
          "We treat public relations as one connected system rather than scattered media activity. It begins with reading the context and ends with a public presence that stands up to scrutiny."
        ],
        bullets: [
          {
            title: "Press relations",
            text: "Working relationships with newsrooms and editors, built on material that is accurate enough to publish."
          },
          {
            title: "Media coordination",
            text: "Managing how an organization appears in the media — before, during, and after its announcements and events."
          },
          {
            title: "News coverage",
            text: "Turning an organization's real activity into precise, publishable news material in Arabic and English."
          },
          {
            title: "Official announcements",
            text: "Institutional statements written in clear language that can withstand public questioning."
          },
          {
            title: "Campaign support",
            text: "Connecting PR to the wider campaign so every statement, post, and appearance moves in the same direction."
          },
          {
            title: "Institutional communications",
            text: "A consistent public voice for organizations whose words carry real consequence."
          }
        ]
      },
      {
        heading: "How we work",
        bullets: [
          {
            title: "Read the context",
            text: "We start with the media environment and the audience — the right message in the wrong context does not arrive."
          },
          {
            title: "Build the message",
            text: "One clear central message, from which materials are derived — never the other way around."
          },
          {
            title: "Place it and repeat it",
            text: "The message goes to the right channels and is repeated with discipline until it becomes public memory."
          }
        ]
      },
      {
        heading: "Arabic and English, one voice",
        paragraphs: [
          "Pattrix works in both languages from a single desk. Arabic materials are written natively — not translated — while the message stays consistent across languages. That is what international organizations and institutions addressing local and international audiences at the same time actually require.",
          "Our work with the United Nations Support Mission in Libya was built on exactly this: one disciplined visual and editorial system, in Arabic and English."
        ]
      }
    ],
    proofHeading: "Selected public relations work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["unsmil-strategic-communications", "musiad-institutional-media-events"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "What does a PR agency in Libya actually do?",
        a: "It manages how your organization appears in public: what is said, when, through which channel, and how you respond when it matters. The goal is not constant visibility — it is precise presence that builds trust over time."
      },
      {
        q: "Do you work in Arabic and English?",
        a: "Yes. We write and produce in both languages in-house, and we keep the message consistent between them so the organization speaks with one voice to local and international audiences."
      },
      {
        q: "Do you work with international organizations?",
        a: "Yes — it is a core part of our work. We understand the accuracy and accountability that institutional communication demands; our published work includes the United Nations Support Mission in Libya and the MUSIAD business network."
      },
      {
        q: "How do you measure PR results?",
        a: "With realistic indicators, not inflated numbers: whether the message appears in coverage, how consistently it holds across channels, the quality of media presence, and how stable the institutional narrative stays over time. Indicators are agreed before work begins."
      },
      {
        q: "Do you cover activity outside Tripoli?",
        a: "We are based in Tripoli and work across Libya, and we deliver work for clients beyond Libya when engagements require it."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your audience needs to understand, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    related: {
      label: "Strategic communications in Libya",
      href: "/services/strategic-communications-libya"
    },
    langSwitch: { label: "اقرأ هذه الصفحة بالعربية", href: "/ar/services/pr-agency-libya" },
    serviceType: "Public relations",
    breadcrumb: { home: "Home", label: "PR Agency in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Strategic Communications                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "strategic-communications-libya",
    locale: "en",
    path: "/services/strategic-communications-libya",
    counterpartPath: "/ar/services/strategic-communications-libya",
    title: "Strategic Communications Agency in Libya | Pattrix",
    metaDescription:
      "Strategy, positioning, and campaign architecture from Tripoli, Libya. Pattrix builds communication systems institutions and audiences actually respond to.",
    ogTitle: "Strategic Communications in Libya — Pattrix",
    ogDescription:
      "Positioning, message architecture, and campaign systems for brands and institutions in Libya — from Tripoli, working globally.",
    eyebrow: "Services — Strategy & Positioning",
    h1: "Strategic communications for brands and institutions in Libya",
    intro:
      "Attention is never won by volume. It is won by pattern — a clear message, repeated with discipline, until it becomes memory. Pattrix designs communication systems for brands and institutions in Libya: from positioning and message architecture to campaign structure and delivery, from Tripoli and beyond it.",
    sections: [
      {
        heading: "What strategic communications means",
        paragraphs: [
          "Strategic communications is broader than marketing and deeper than public relations alone. It is the methodical answer to three questions — what should be said, to whom, and in what order — before any asset is produced or any campaign launched.",
          "When that answer is missing, budgets turn into noise. When it is present, every post, statement, and event works in the same direction."
        ]
      },
      {
        heading: "The strategy system",
        bullets: [
          {
            title: "Positioning",
            text: "Defining the place an organization holds in its audience's mind — and what genuinely distinguishes it."
          },
          {
            title: "Message architecture",
            text: "One clear central message, from which channel and audience messages are derived without drift."
          },
          {
            title: "Audience & channel planning",
            text: "Who we are addressing, and where their attention actually lives in the Libyan context."
          }
        ]
      },
      {
        heading: "Campaign architecture",
        paragraphs: [
          "We build a campaign as one system: a central narrative, a publishing rhythm, and visual and editorial materials produced in-house to one standard — then we manage it through its phases and adjust course by what the response shows.",
          "In Libya's media environment, where attention is split between traditional channels and social platforms, that discipline is the difference between a campaign that is seen and a campaign that is forgotten."
        ]
      },
      {
        heading: "Communication for institutions",
        paragraphs: [
          "Institutions carry requirements commercial campaigns never meet: language that withstands accountability, precision in detail, and consistency between what is said in Arabic and what is said in English.",
          "Our work with the United Nations Support Mission in Libya — across governance dialogues, official announcements, and public discussion formats — was built on that understanding: institutional trust is earned by the disciplined repetition of a precise message, not by scattered visibility."
        ]
      }
    ],
    proofHeading: "Selected strategy work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["unsmil-strategic-communications"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "What is the difference between PR and strategic communications?",
        a: "Public relations is one instrument of strategic communications. Strategy defines the message, the audience, and the order; PR, campaigns, and content then carry it out. We provide both together, or each on its own, depending on what the organization needs."
      },
      {
        q: "How do you build a campaign for the Libyan media environment?",
        a: "We start by reading the media landscape and the audience, define the central message and its channels and sequence, produce the materials in-house, and manage publishing at a disciplined rhythm with continuous measurement."
      },
      {
        q: "Do you work with government bodies and international organizations?",
        a: "Yes. Institutional communication is a core part of our experience — including the precision, official language, and bilingual work it demands."
      },
      {
        q: "How does an engagement start?",
        a: "With a working session where we understand what your organization needs its audience to understand. We then present a clear strategic direction before anything is produced."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what needs to be understood, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    related: { label: "Public relations in Libya", href: "/services/pr-agency-libya" },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/services/strategic-communications-libya"
    },
    serviceType: "Strategic communications",
    breadcrumb: { home: "Home", label: "Strategic Communications in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — العلاقات العامة                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "pr-agency-libya",
    locale: "ar",
    path: "/ar/services/pr-agency-libya",
    counterpartPath: "/services/pr-agency-libya",
    title: "شركة علاقات عامة في طرابلس، ليبيا — باتريكس",
    metaDescription:
      "باتريكس شركة علاقات عامة واتصال استراتيجي في طرابلس، ليبيا. علاقات إعلامية، تغطية إخبارية، وحملات اتصال للمؤسسات والعلامات التجارية.",
    ogTitle: "شركة علاقات عامة في طرابلس، ليبيا — باتريكس",
    ogDescription:
      "علاقات إعلامية، تغطية إخبارية، وحملات اتصال للمؤسسات والعلامات التجارية — من طرابلس، ليبيا.",
    eyebrow: "الخدمات — العلاقات العامة والإعلام",
    h1: "شركة علاقات عامة في طرابلس، ليبيا",
    intro:
      "باتريكس شركة علاقات عامة واتصال استراتيجي مقرّها طرابلس، تعمل مع المؤسسات والعلامات التجارية والمنظمات الدولية في ليبيا وخارجها. نمارس العلاقات العامة بوصفها انضباطاً في الرسالة: أن يُقال ما ينبغي قوله بدقة، في القناة المناسبة، وأن يتكرر بثبات حتى يتحول إلى ثقة راسخة لدى الجمهور.",
    sections: [
      {
        heading: "ماذا يشمل نظام العلاقات العامة لدينا",
        paragraphs: [
          "لا نتعامل مع العلاقات العامة كنشاط إعلامي متفرق، بل كنظام متكامل يبدأ من فهم السياق وينتهي بحضور عام يصمد أمام التدقيق."
        ],
        bullets: [
          {
            title: "العلاقات الإعلامية",
            text: "علاقات مهنية مع غرف الأخبار والمحررين، تقوم على مواد دقيقة تستحق النشر."
          },
          {
            title: "التنسيق الإعلامي",
            text: "إدارة حضور المؤسسة في وسائل الإعلام قبل إعلاناتها وفعالياتها وأثناءها وبعدها."
          },
          {
            title: "التغطية الإخبارية",
            text: "تحويل نشاط المؤسسة الحقيقي إلى مادة إخبارية دقيقة، بالعربية والإنجليزية."
          },
          {
            title: "البيانات والإعلانات الرسمية",
            text: "صياغة الرسائل المؤسسية بلغة واضحة تحتمل المساءلة العامة."
          },
          {
            title: "دعم الحملات الاتصالية",
            text: "ربط العلاقات العامة بالحملة الأوسع حتى يعمل كل بيان ومنشور وظهور في اتجاه واحد."
          },
          {
            title: "الاتصال المؤسسي",
            text: "صوت عام متّسق للمؤسسات التي تحمل كلمتها وزناً حقيقياً."
          }
        ]
      },
      {
        heading: "طريقة عملنا",
        bullets: [
          {
            title: "قراءة السياق",
            text: "نبدأ من البيئة الإعلامية والجمهور، لأن الرسالة الصحيحة في السياق الخطأ لا تصل."
          },
          {
            title: "بناء الرسالة",
            text: "رسالة مركزية واحدة واضحة، تتفرع عنها المواد — لا العكس."
          },
          {
            title: "النشر والتكرار",
            text: "نضع الرسالة في القنوات الصحيحة ونكررها بانضباط حتى تصبح ذاكرة عامة."
          }
        ]
      },
      {
        heading: "بالعربية والإنجليزية، بصوت واحد",
        paragraphs: [
          "نعمل باللغتين من مكتب واحد. تُكتب المواد العربية بلغة عربية سليمة لا كترجمة حرفية، مع الحفاظ على اتساق الرسالة بين اللغتين — وهو ما تتطلبه المنظمات الدولية والمؤسسات التي تخاطب جمهوراً محلياً ودولياً في آن واحد.",
          "عملنا مع بعثة الأمم المتحدة للدعم في ليبيا قام على هذا الأساس تحديداً: نظام اتصال مرئي وتحريري واحد، بالعربية والإنجليزية."
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["unsmil-strategic-communications", "musiad-institutional-media-events"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "ماذا تفعل شركة العلاقات العامة تحديداً؟",
        a: "تدير الطريقة التي تظهر بها مؤسستك أمام الجمهور: ماذا تقول، ومتى، وعبر أي قناة، وكيف ترد حين يلزم. الهدف ليس الظهور الدائم، بل حضور دقيق يبني الثقة على المدى الطويل."
      },
      {
        q: "هل تعملون بالعربية والإنجليزية؟",
        a: "نعم. نكتب وننتج باللغتين داخلياً، وننسّق الرسائل بينهما حتى تتحدث المؤسسة بصوت واحد أمام الجمهورين المحلي والدولي."
      },
      {
        q: "هل تتعاملون مع المنظمات الدولية والجهات الرسمية؟",
        a: "نعم، وهذا جزء أساسي من عملنا. نعرف ما يتطلبه الاتصال المؤسسي من دقة ومساءلة، ومن أعمالنا المنشورة عملنا مع بعثة الأمم المتحدة للدعم في ليبيا وشبكة أعمال موصياد."
      },
      {
        q: "كيف تُقاس نتائج العلاقات العامة؟",
        a: "بمؤشرات واقعية لا بأرقام مضخّمة: حضور الرسالة في التغطية، واتساقها عبر القنوات، وجودة الظهور الإعلامي، وثبات السردية المؤسسية بمرور الوقت. نتفق على المؤشرات قبل بدء العمل."
      },
      {
        q: "هل تغطون أنشطة وفعاليات خارج طرابلس؟",
        a: "مقرّنا طرابلس ونعمل في عموم ليبيا، وننفّذ أعمالاً لعملاء خارج ليبيا عندما يتطلب الأمر."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن يفهمه جمهورك، ونصمم نحن كيفية وصوله.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: {
      label: "الاتصال الاستراتيجي والحملات الإعلامية",
      href: "/ar/services/strategic-communications-libya"
    },
    langSwitch: { label: "Read this page in English", href: "/services/pr-agency-libya" },
    serviceType: "Public relations",
    breadcrumb: { home: "الرئيسية", label: "شركة علاقات عامة في ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — الاتصال الاستراتيجي                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "strategic-communications-libya",
    locale: "ar",
    path: "/ar/services/strategic-communications-libya",
    counterpartPath: "/services/strategic-communications-libya",
    title: "الاتصال الاستراتيجي والحملات الإعلامية في ليبيا — باتريكس",
    metaDescription:
      "استراتيجية الرسائل، بناء الحملات الإعلامية، وإدارتها باحترافية من طرابلس. باتريكس تصمم الاتصال الذي تفهمه الجماهير وتثق به المؤسسات.",
    ogTitle: "الاتصال الاستراتيجي في ليبيا — باتريكس",
    ogDescription:
      "التموضع، هندسة الرسائل، وبناء الحملات الإعلامية للمؤسسات والعلامات التجارية في ليبيا — من طرابلس.",
    eyebrow: "الخدمات — الاستراتيجية والتموضع",
    h1: "اتصال استراتيجي وحملات إعلامية للمؤسسات في ليبيا",
    intro:
      "الانتباه لا يُكسب بالضجيج، بل بالنمط: رسالة واضحة تتكرر بانضباط حتى تصبح ذاكرة. تصمم باتريكس أنظمة الاتصال للمؤسسات والعلامات التجارية في ليبيا — من تحديد التموضع وهندسة الرسائل إلى بناء الحملات وإدارتها — انطلاقاً من طرابلس وبامتداد يتجاوزها.",
    sections: [
      {
        heading: "ما الاتصال الاستراتيجي؟",
        paragraphs: [
          "الاتصال الاستراتيجي أوسع من التسويق، وأعمق من العلاقات العامة وحدها. هو الإجابة المنهجية عن ثلاثة أسئلة — ماذا نقول؟ ولمن؟ وبأي ترتيب؟ — قبل إنتاج أي مادة أو إطلاق أي حملة.",
          "حين تغيب هذه الإجابة تتحول الميزانيات إلى ضجيج، وحين تحضر يعمل كل منشور وكل بيان وكل فعالية في اتجاه واحد."
        ]
      },
      {
        heading: "نظام الاستراتيجية",
        bullets: [
          {
            title: "التموضع",
            text: "تحديد المكانة التي تحتلها المؤسسة في ذهن جمهورها، وما يميزها فعلاً عمّا سواها."
          },
          {
            title: "هندسة الرسائل",
            text: "رسالة مركزية واضحة تتفرع عنها رسائل القنوات والجماهير المختلفة دون انحراف."
          },
          {
            title: "فهم الجمهور وتخطيط القنوات",
            text: "من نخاطب، وأين يتركز انتباهه فعلاً في السياق الليبي."
          }
        ]
      },
      {
        heading: "بناء الحملات وإدارتها",
        paragraphs: [
          "نبني الحملة بوصفها نظاماً واحداً: سردية مركزية، وإيقاع نشر، ومواد بصرية وتحريرية تُنتج داخلياً بمعيار موحّد، ثم نديرها عبر مراحلها ونعدّل مسارها وفق ما يظهر من أثر.",
          "في البيئة الإعلامية الليبية، حيث يتوزع الانتباه بين القنوات التقليدية ومنصات التواصل، يصنع هذا الانضباط الفرق بين حملة تُرى وحملة تُنسى."
        ]
      },
      {
        heading: "اتصال المؤسسات وبناء الثقة",
        paragraphs: [
          "للمؤسسات متطلبات لا تعرفها الحملات التجارية: لغة تحتمل المساءلة، ودقة في التفاصيل، واتساق بين ما يُقال بالعربية وما يُقال بالإنجليزية.",
          "عملنا مع بعثة الأمم المتحدة للدعم في ليبيا — عبر حوارات الحوكمة والإعلانات الرسمية وصيغ النقاش العام — قام على هذا الفهم: الثقة المؤسسية تُبنى بالتكرار المنضبط لرسالة دقيقة، لا بالظهور العشوائي."
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["unsmil-strategic-communications"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "ما الفرق بين العلاقات العامة والاتصال الاستراتيجي؟",
        a: "العلاقات العامة إحدى أدوات الاتصال الاستراتيجي. تحدد الاستراتيجية الرسالة والجمهور والترتيب، ثم تتولى العلاقات العامة والحملات والمحتوى التنفيذ. نقدّم الاثنين معاً أو كلاً على حدة بحسب حاجة المؤسسة."
      },
      {
        q: "كيف تُبنى حملة إعلامية في السياق الليبي؟",
        a: "نبدأ بقراءة المشهد الإعلامي والجمهور المستهدف، ثم نحدد الرسالة المركزية وقنواتها وترتيب ظهورها، وننتج المواد داخلياً، وندير النشر بإيقاع منضبط وقياس مستمر."
      },
      {
        q: "هل تعملون مع الجهات الحكومية والمنظمات الدولية؟",
        a: "نعم. الاتصال المؤسسي جزء أساسي من خبرتنا، بما يتطلبه من دقة ولغة رسمية وعمل بلغتين."
      },
      {
        q: "كيف يبدأ التعاون معكم؟",
        a: "بجلسة عمل نفهم فيها ما تريد مؤسستك أن يفهمه جمهورها، ثم نقدّم اتجاهاً استراتيجياً واضحاً قبل إنتاج أي مادة."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما ينبغي أن يُفهم، ونصمم نحن كيفية وصوله.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: { label: "العلاقات العامة في ليبيا", href: "/ar/services/pr-agency-libya" },
    langSwitch: {
      label: "Read this page in English",
      href: "/services/strategic-communications-libya"
    },
    serviceType: "Strategic communications",
    breadcrumb: { home: "الرئيسية", label: "الاتصال الاستراتيجي في ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Marketing Agency (Tripoli)                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "marketing-agency-tripoli",
    locale: "en",
    path: "/services/marketing-agency-tripoli",
    counterpartPath: "/ar/services/marketing-agency-tripoli",
    title: "Marketing Agency in Tripoli, Libya — Strategy First | Pattrix",
    metaDescription:
      "Need a marketing agency in Tripoli? Pattrix pairs marketing execution with strategic communications — campaigns, content, social, and events that hold together.",
    ogTitle: "Marketing Agency in Tripoli, Libya — Pattrix",
    ogDescription:
      "Campaigns, content, social media, and events built on clear strategy — a strategy-first marketing agency in Tripoli, Libya.",
    eyebrow: "Services — Marketing & Campaigns",
    h1: "A strategy-first marketing agency in Tripoli",
    intro:
      "If you are searching for a marketing agency in Tripoli, Libya, here is the honest version of what Pattrix is: a strategic communications and PR agency with full production capability. We deliver what a marketing agency delivers — campaigns, content, social media, events — but we refuse to start with tactics. Strategy comes first, because attention is never won by volume; it is won by pattern.",
    sections: [
      {
        heading: "How Pattrix differs from a typical marketing agency",
        paragraphs: [
          "A typical marketing agency sells activity: posts, designs, a monthly calendar, a burst of visibility. The harder question — what should this company say, to whom, and in what order — often never gets asked, and budgets turn into noise.",
          "We work in the opposite direction. Every engagement begins with positioning and message architecture, and only then do we produce. Strategy owns production: we make what the strategy needs, never content for its own sake. The result is marketing that holds together — every campaign, post, and event moving in the same direction."
        ]
      },
      {
        heading: "What the marketing work includes",
        bullets: [
          {
            title: "Campaigns",
            text: "Campaign development, message architecture, and audience and channel planning — one central idea carried across every channel."
          },
          {
            title: "Social & digital",
            text: "Platform strategy, page management, reels and short-form digital content, and influencer coordination — always-on presence with editorial discipline."
          },
          {
            title: "Brand & identity",
            text: "Brand identity, design systems, and brand language — designed to be used and repeated, not admired once."
          },
          {
            title: "Production",
            text: "Film, photography, and post-production, all in-house and built to campaign discipline."
          },
          {
            title: "Events & experiences",
            text: "Business events from concept to execution — forums, panels, and large-scale gatherings, with media coverage built in."
          }
        ]
      },
      {
        heading: "Marketing or communications — which do you need?",
        paragraphs: [
          "If you need commercial campaigns, a disciplined social presence, or a branded retail environment, that is marketing — and we deliver it end to end. Our work for Hyundai Libya covered showroom identity and the campaign visuals connecting the space to the market; for Albaraka Insurance we set the commercial visual direction and produced the campaign system across digital and print.",
          "If your challenge is public trust, reputation, or being understood by institutions and audiences, that is communications — the work described on our strategic communications and PR pages. Many engagements need both, and the advantage of one agency holding both is simple: your marketing and your public voice never contradict each other."
        ]
      }
    ],
    proofHeading: "Selected commercial work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["hyundai-libya-showroom-identity", "albaraka-insurance-campaigns"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "Are you a marketing agency or a PR agency?",
        a: "Both, in a specific order. Pattrix is a strategic communications and PR agency in Tripoli, Libya, with full production capability; marketing execution — campaigns, social media, content, and events — is delivered through the same discipline. The difference from a typical marketing agency is where we start: strategy first, then execution."
      },
      {
        q: "What budgets do you work with?",
        a: "Our publicly listed project range runs from $500 to $10,000, depending on scope. Where an engagement lands within that range is agreed before work begins, along with the scope and deliverables it covers."
      },
      {
        q: "Do you run ad campaigns?",
        a: "Our campaigns are built as complete systems on the strategy, creative, and organic side: campaign development, message architecture, audience and channel planning, content and reels, social media management, and influencer coordination. Paid media buying is not on our published service list — every campaign we take on starts from positioning and a clear central message, not from ad spend."
      },
      {
        q: "Do you only work with large organizations?",
        a: "No. Our client roster spans international institutions and regional market leaders alongside local businesses — automotive, insurance, business networks, real estate, energy equipment, and retail. The discipline is the same at every scale."
      },
      {
        q: "How do we start?",
        a: "With a working session where we understand what your business needs its audience to understand. We then present a clear strategic direction — and only after that is agreed do we produce anything."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your market needs to understand, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    related: {
      label: "Strategic communications in Libya",
      href: "/services/strategic-communications-libya"
    },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/services/marketing-agency-tripoli"
    },
    serviceType: "Marketing",
    breadcrumb: { home: "Home", label: "Marketing Agency in Tripoli, Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — وكالة التسويق (طرابلس)                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "marketing-agency-tripoli",
    locale: "ar",
    path: "/ar/services/marketing-agency-tripoli",
    counterpartPath: "/services/marketing-agency-tripoli",
    title: "وكالة تسويق في طرابلس، ليبيا — استراتيجية قبل التنفيذ | باتريكس",
    metaDescription:
      "باتريكس وكالة تسويق واتصال في طرابلس، ليبيا: حملات، محتوى، سوشيال ميديا وفعاليات — مبنية على استراتيجية واضحة لا على الضجيج.",
    ogTitle: "وكالة تسويق في طرابلس، ليبيا — باتريكس",
    ogDescription:
      "حملات ومحتوى وسوشيال ميديا وفعاليات مبنية على استراتيجية واضحة — وكالة تسويق تبدأ من الاستراتيجية في طرابلس، ليبيا.",
    eyebrow: "الخدمات — التسويق والحملات",
    h1: "وكالة تسويق في طرابلس تبدأ من الاستراتيجية",
    intro:
      "من يبحث عن وكالة تسويق في طرابلس يجد عروضاً كثيرة، ومعظمها يبيع النشاط نفسه: منشورات وتصاميم وضجيجاً شهرياً. باتريكس شركة اتصال استراتيجي وعلاقات عامة بقدرات إنتاج كاملة داخل الشركة، تقدّم ما تقدّمه شركة تسويق في ليبيا — حملات ومحتوى وسوشيال ميديا وفعاليات — لكنها ترفض أن تبدأ من التكتيك. نبدأ من الاستراتيجية، لأن الانتباه لا يُكسب بالكثرة بل بالنمط.",
    sections: [
      {
        heading: "كيف نختلف عن وكالة التسويق التقليدية",
        paragraphs: [
          "يُختزل التسويق في ليبيا كثيراً في كمّ النشاط: تقويم نشر شهري، وتصاميم متفرقة، وموجة ظهور سرعان ما تنطفئ. أما السؤال الأهم — ماذا ينبغي أن تقول الشركة، ولمن، وبأي ترتيب؟ — فقلّما يُطرح أصلاً، فتتحول الميزانيات إلى ضجيج.",
          "نعمل بالاتجاه المعاكس: يبدأ كل تعاون بتحديد التموضع وهندسة الرسائل، ثم يأتي الإنتاج بعد ذلك. الاستراتيجية عندنا تقود الإنتاج — ننتج ما تحتاجه الخطة، لا محتوى لأجل المحتوى — فيخرج التسويق متماسكاً: كل حملة ومنشور وفعالية تعمل في اتجاه واحد."
        ]
      },
      {
        heading: "خريطة الخدمات التسويقية",
        bullets: [
          {
            title: "الحملات",
            text: "تطوير الحملات، هندسة الرسائل، وتخطيط الجمهور والقنوات — فكرة مركزية واحدة تمتد عبر كل قناة."
          },
          {
            title: "السوشيال ميديا والمحتوى الرقمي",
            text: "استراتيجية المنصات وإدارة الصفحات، الريلز والمحتوى القصير، وتنسيق المؤثرين — حضور دائم بانضباط تحريري."
          },
          {
            title: "الهوية والعلامة التجارية",
            text: "هوية بصرية وأنظمة تصميم ولغة للعلامة التجارية، صُممت لتُستخدم وتتكرر، لا لتُعرض مرة واحدة."
          },
          {
            title: "الإنتاج",
            text: "أفلام وتصوير فوتوغرافي ومونتاج، تُنفَّذ كلها داخل الشركة وبمعايير الحملات نفسها."
          },
          {
            title: "الفعاليات والتجارب",
            text: "فعاليات أعمال من الفكرة إلى التنفيذ — منتديات وحوارات وتجمعات كبرى، بتغطية إعلامية مرافقة."
          }
        ]
      },
      {
        heading: "متى تحتاج تسويقاً، ومتى تحتاج اتصالاً؟",
        paragraphs: [
          "إن كانت حاجتك حملات تجارية، أو حضوراً منضبطاً على السوشيال ميديا، أو بيئة بيع تحمل علامتك — فهذا تسويق، وننفذه من أوله إلى آخره. عملنا مع هيونداي ليبيا شمل هوية صالات العرض والمواد البصرية التي تربط المكان بالسوق، ومع البركة للتأمين وضعنا الاتجاه البصري التجاري وأنتجنا نظام الحملة عبر القنوات الرقمية والمطبوعة.",
          "أما إن كان التحدي هو الثقة العامة والسمعة وأن تُفهم مؤسستك — فهذا اتصال، وهو ما تفصّله صفحتا الاتصال الاستراتيجي والعلاقات العامة لدينا. كثير من المشاريع يحتاج الاثنين معاً، وميزة أن تجمعهما جهة واحدة بسيطة: تسويقك وصوتك العام لا يتناقضان أبداً."
        ]
      }
    ],
    proofHeading: "أعمال تجارية موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["hyundai-libya-showroom-identity", "albaraka-insurance-campaigns"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "هل أنتم وكالة تسويق أم شركة علاقات عامة؟",
        a: "الاثنان معاً، وبترتيب محدد. باتريكس شركة اتصال استراتيجي وعلاقات عامة في طرابلس، ليبيا، بقدرات إنتاج كاملة داخل الشركة، وننفذ التسويق — حملات وسوشيال ميديا ومحتوى وفعاليات — بالانضباط نفسه. الفرق عن وكالة التسويق التقليدية هو نقطة البداية: الاستراتيجية أولاً، ثم التنفيذ."
      },
      {
        q: "ما حجم الميزانيات التي تعملون بها؟",
        a: "نطاق مشاريعنا المعلن يتراوح من 500 إلى 10,000 دولار بحسب حجم العمل. نتفق على موقع مشروعك ضمن هذا النطاق وعلى نطاق العمل والمخرجات قبل البدء."
      },
      {
        q: "هل تديرون إعلانات ممولة؟",
        a: "إدارة الإعلانات الممولة ليست ضمن قائمة خدماتنا المعلنة. ما نقدّمه هو بناء الحملة كنظام متكامل على مستوى الاستراتيجية والإبداع والمحتوى: تطوير الحملة، هندسة الرسائل، تخطيط الجمهور والقنوات، المحتوى والريلز، إدارة منصات التواصل، وتنسيق المؤثرين — وكل حملة نتولاها تبدأ من التموضع ورسالة مركزية واضحة، لا من الإنفاق الإعلاني."
      },
      {
        q: "هل تعملون مع الشركات الصغيرة أم المؤسسات الكبيرة فقط؟",
        a: "لا. قائمة عملائنا تمتد من المنظمات الدولية والعلامات الرائدة في السوق إلى الأعمال المحلية — سيارات وتأمين وشبكات أعمال وعقارات ومعدات طاقة وتجارة تجزئة. والانضباط واحد في كل الأحجام."
      },
      {
        q: "كيف يبدأ التعاون معكم؟",
        a: "بجلسة عمل نفهم فيها ما تريد أن يفهمه جمهورك عن نشاطك، ثم نقدّم اتجاهاً استراتيجياً واضحاً — ولا ننتج أي مادة قبل الاتفاق عليه."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما يحتاج سوقك أن يفهمه، ونصمم نحن كيفية وصوله.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: {
      label: "الاتصال الاستراتيجي والحملات الإعلامية",
      href: "/ar/services/strategic-communications-libya"
    },
    langSwitch: {
      label: "Read this page in English",
      href: "/services/marketing-agency-tripoli"
    },
    serviceType: "Marketing",
    breadcrumb: { home: "الرئيسية", label: "وكالة تسويق في طرابلس، ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Social Media Management                                        */
  /* NOTE(merge-order): related.href targets                             */
  /* /services/content-production-libya (AR: /ar/...), which ships in    */
  /* content-production-libya.fragment.ts. Merge that fragment in the    */
  /* same commit as this one (or before deploy) or the link 404s.        */
  /* ------------------------------------------------------------------ */
  {
    slug: "social-media-management-libya",
    locale: "en",
    path: "/services/social-media-management-libya",
    counterpartPath: "/ar/services/social-media-management-libya",
    title: "Social Media Management in Libya — Strategy & Content | Pattrix",
    metaDescription:
      "Social media management for companies in Libya: platform strategy, page management, and short-form content — run to campaign standards in Arabic and English.",
    ogTitle: "Social Media Management in Libya — Pattrix",
    ogDescription:
      "Platform strategy, channel management, and short-form content for companies and institutions in Libya — run to campaign standards from Tripoli.",
    eyebrow: "Services — Social & Digital",
    h1: "Social media management in Libya, with editorial discipline",
    intro:
      "Pattrix manages social media the way it manages campaigns. From our base in Tripoli, Libya, we run social channels for companies and institutions with editorial discipline: a platform strategy that knows where the audience's attention actually lives, a publishing rhythm that holds, and short-form content produced in-house in Arabic and English. Always-on presence is not posting for its own sake — it is a pattern your audience learns to recognize.",
    sections: [
      {
        heading: "Always-on, with a strategy behind it",
        paragraphs: [
          "Most social channels fail the same way: content is produced first, and the reason for it is invented later. We work in the opposite order. The strategy defines what the channel is for, who it addresses, and what pattern it should build — then content is produced to serve that, never to fill a calendar.",
          "That is what editorial discipline means in practice: a channel with a recognizable voice, a steady rhythm, and posts that each have a job to do."
        ]
      },
      {
        heading: "What the social media system includes",
        bullets: [
          {
            title: "Platform strategy",
            text: "Which platforms carry your message, to which audience, and at what rhythm — decided before anything is published."
          },
          {
            title: "Page & channel management",
            text: "Running the organization's channels day to day: the editorial plan, publishing, and the consistency that makes a feed recognizable."
          },
          {
            title: "Reels & digital content",
            text: "Short-form video and digital content shot and edited in-house, to the same standard as our campaign work."
          },
          {
            title: "Influencer coordination",
            text: "Choosing voices that fit the brand and coordinating their participation so the message stays consistent."
          },
          {
            title: "Reporting & course correction",
            text: "Realistic indicators agreed before work begins, reviewed at a regular rhythm and used to adjust the plan — not to decorate a slide."
          }
        ]
      },
      {
        heading: "Arabic and English, one voice on every feed",
        paragraphs: [
          "We write and produce natively in both languages from a single desk, so an organization's Arabic feed is never a translation of its English one — and the message never drifts between the two.",
          "The bilingual social media systems we produced for the United Nations Support Mission in Libya were built on exactly that discipline, and the same standard runs through our commercial work — from an optics retailer's in-store reels to an insurer's digital campaigns."
        ]
      }
    ],
    proofHeading: "Selected social & digital work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["tripoli-optics-reels", "albaraka-insurance-campaigns"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "Which platforms matter most in Libya?",
        a: "There is no single answer — it depends on who your audience is. We plan channels by where your audience's attention actually lives in the Libyan context, then concentrate effort on the platforms that serve the objective instead of keeping a token presence everywhere."
      },
      {
        q: "Do you produce the content, or only schedule it?",
        a: "We produce it. Reels, photography, design, and copy are made in-house to campaign standards — scheduling is the last step of the system, not the service itself."
      },
      {
        q: "Can you manage Arabic and English channels together?",
        a: "Yes. We write natively in both languages and keep the message consistent between them, so bilingual organizations speak with one voice across every feed."
      },
      {
        q: "What does reporting look like?",
        a: "Realistic indicators agreed before work begins — the consistency of the message, the quality of presence, and how the audience responds — reviewed at a regular rhythm and used to adjust the plan."
      },
      {
        q: "Do you coordinate with influencers?",
        a: "Yes, as part of the wider system: we select voices that fit the brand, brief them to the campaign message, and keep the output consistent with the channel's editorial line."
      },
      {
        q: "Are you a social media agency or a communications agency?",
        a: "Both, deliberately. Pattrix is a strategic communications and PR agency, and our social media management carries that discipline — channels are run as part of one communication system, not as a separate stream of posts."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your audience needs to understand, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    related: {
      label: "Content & video production in Libya",
      href: "/services/content-production-libya"
    },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/services/social-media-management-libya"
    },
    serviceType: "Social media management",
    breadcrumb: { home: "Home", label: "Social Media Management in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — إدارة السوشيال ميديا                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "social-media-management-libya",
    locale: "ar",
    path: "/ar/services/social-media-management-libya",
    counterpartPath: "/services/social-media-management-libya",
    title: "إدارة صفحات التواصل الاجتماعي في ليبيا | باتريكس",
    metaDescription:
      "إدارة احترافية لصفحات التواصل الاجتماعي للشركات والمؤسسات في ليبيا: استراتيجية المنصات، المحتوى القصير، والتقارير — بالعربية والإنجليزية.",
    ogTitle: "إدارة السوشيال ميديا في ليبيا — باتريكس",
    ogDescription:
      "استراتيجية المنصات، إدارة الصفحات، والمحتوى القصير للشركات والمؤسسات في ليبيا — بمعايير الحملات، من طرابلس.",
    eyebrow: "الخدمات — السوشيال ميديا والمحتوى الرقمي",
    h1: "إدارة سوشيال ميديا في ليبيا بانضباط تحريري",
    intro:
      "تدير باتريكس صفحات التواصل الاجتماعي للشركات والمؤسسات في ليبيا بالمنطق نفسه الذي تُدار به الحملات، من مقرّها في طرابلس، ليبيا: استراتيجية واضحة لكل منصة، وإيقاع نشر ثابت، ومحتوى قصير يُنتَج داخلياً بالعربية والإنجليزية. فالحضور الدائم على المنصات ليس نشراً يومياً بلا غاية، بل نمط تحريري يعرف ماذا يقول، ولمن، ولماذا.",
    sections: [
      {
        heading: "إدارة تبدأ من الاستراتيجية لا من الجدولة",
        paragraphs: [
          "تفشل أغلب الصفحات بالطريقة نفسها: يُنتَج المحتوى أولاً، ثم يُخترَع مبرره لاحقاً. نحن نعمل بالترتيب المعاكس؛ تحدد الاستراتيجية وظيفة القناة وجمهورها والنمط الذي ينبغي أن تبنيه، ثم يُنتَج المحتوى ليخدم ذلك — لا ليملأ جدول النشر.",
          "هذا هو الانضباط التحريري عملياً: صوت واحد يُعرَف به الحساب، وإيقاع ثابت، ومنشورات لكل منها مهمة واضحة."
        ]
      },
      {
        heading: "ماذا تشمل خدمة إدارة السوشيال ميديا",
        bullets: [
          {
            title: "استراتيجية المنصات",
            text: "أي المنصات تحمل رسالتك، لأي جمهور، وبأي إيقاع — قرارات تُتخذ قبل نشر أي منشور."
          },
          {
            title: "إدارة الصفحات والحسابات",
            text: "التشغيل اليومي لقنوات المؤسسة: الخطة التحريرية، والنشر، والاتساق الذي يجعل الحساب معروفاً بصوته."
          },
          {
            title: "الريلز والمحتوى الرقمي",
            text: "محتوى قصير يُصوَّر ويُحرَّر داخلياً بالمعيار نفسه الذي ننتج به حملاتنا."
          },
          {
            title: "التنسيق مع المؤثرين",
            text: "اختيار الأصوات التي تناسب العلامة، وتنسيق مشاركتها بما يحفظ اتساق الرسالة."
          },
          {
            title: "التقارير والقياس",
            text: "مؤشرات واقعية نتفق عليها قبل بدء العمل، تُراجَع بإيقاع منتظم وتُستخدم لتعديل الخطة — لا لتزيين العروض التقديمية."
          }
        ]
      },
      {
        heading: "محتوى ثنائي اللغة من مكتب واحد",
        paragraphs: [
          "نكتب وننتج باللغتين العربية والإنجليزية داخلياً، فلا تكون الصفحة العربية ترجمة للصفحة الإنجليزية، ولا تنحرف الرسالة بين اللغتين.",
          "على هذا الانضباط بُنيت أنظمة السوشيال ميديا ثنائية اللغة التي أنتجناها لبعثة الأمم المتحدة للدعم في ليبيا، وبالمعيار نفسه ننفّذ أعمالنا التجارية — من ريلز متجر نظارات في طرابلس إلى الحملات الرقمية لشركة تأمين ليبية."
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["tripoli-optics-reels", "albaraka-insurance-campaigns"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "ما المنصات الأهم للشركات في ليبيا؟",
        a: "لا توجد إجابة واحدة تصلح للجميع. نحدد المنصات وفق جمهور كل مؤسسة وأين يتركز انتباهه فعلاً في السياق الليبي، ثم نركّز الجهد على القنوات التي تخدم الهدف بدل حضور شكلي في كل مكان."
      },
      {
        q: "هل تنتجون المحتوى أم تكتفون بالجدولة؟",
        a: "ننتجه داخلياً: ريلز وتصوير وتصميم ونصوص بمعايير الحملات. الجدولة آخر خطوة في النظام، لا الخدمة نفسها."
      },
      {
        q: "هل تديرون الصفحات بالعربية والإنجليزية معاً؟",
        a: "نعم. نكتب باللغتين كتابة أصلية لا ترجمة، وننسّق الرسالة بينهما حتى تتحدث المؤسسة بصوت واحد على كل قنواتها."
      },
      {
        q: "كيف تكون التقارير؟",
        a: "مؤشرات واقعية نتفق عليها قبل بدء العمل — اتساق الرسالة، وجودة الحضور، وتفاعل الجمهور — تُراجَع بإيقاع منتظم وتُستخدم لتعديل الخطة."
      },
      {
        q: "هل تشمل الخدمة التنسيق مع المؤثرين؟",
        a: "نعم. ننسّق مشاركة المؤثرين ضمن النظام الأوسع: اختيار الأصوات المناسبة للعلامة، وتزويدها برسالة الحملة، والحفاظ على اتساق ما يُنشر مع الخط التحريري للحساب."
      },
      {
        q: "هل باتريكس شركة سوشيال ميديا في ليبيا أم شركة اتصال؟",
        a: "الاثنان معاً، وعن قصد. باتريكس شركة اتصال استراتيجي وعلاقات عامة، وتدير السوشيال ميديا بانضباط الحملات نفسه: تُدار القنوات بوصفها جزءاً من نظام اتصال واحد، لا كمنشورات يومية متفرقة."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن يفهمه جمهورك، ونصمم نحن كيفية وصوله.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: {
      label: "إنتاج المحتوى والفيديو في ليبيا",
      href: "/ar/services/content-production-libya"
    },
    langSwitch: {
      label: "Read this page in English",
      href: "/services/social-media-management-libya"
    },
    serviceType: "Social media management",
    breadcrumb: { home: "الرئيسية", label: "إدارة السوشيال ميديا في ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Event Coverage                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "event-coverage-tripoli",
    locale: "en",
    path: "/services/event-coverage-tripoli",
    counterpartPath: "/ar/services/event-coverage-tripoli",
    title: "Event Coverage in Tripoli, Libya — Photo, Video & Media | Pattrix",
    metaDescription:
      "Photography, film, and media coverage for forums, conferences, and business events in Tripoli, Libya — planned, produced, and published by Pattrix.",
    ogTitle: "Event Coverage in Tripoli, Libya — Pattrix",
    ogDescription:
      "Full event planning, institutional coordination, and media coverage for forums, panels, and business gatherings — from Tripoli, Libya.",
    eyebrow: "Services — Events & Experiences",
    h1: "Event coverage in Tripoli, Libya — delivered end-to-end",
    intro:
      "Pattrix plans, manages, and covers institutional events from Tripoli, Libya — executive forums, international panels, and large-scale business gatherings, taken from concept to flawless execution. Event coverage, as we practice it, is not a photographer booked for the day: it is one system that starts before the room opens — planning, coordination, speaker and program management — and ends with photography, film, and publishable material that carries the event to the audience that was not in it.",
    sections: [
      {
        heading: "What the events system includes",
        paragraphs: [
          "We deliver an event and its coverage as one connected system. The team that plans the room is the team that records it — so no moment that matters goes unrecorded, and nothing recorded is produced without a purpose."
        ],
        bullets: [
          {
            title: "Full event planning",
            text: "Concept, program, and execution designed end-to-end — the event treated as a communication instrument, not just an occasion."
          },
          {
            title: "Institutional coordination",
            text: "The coordination that events with official guests and partner organizations demand, handled with institutional precision."
          },
          {
            title: "Speaker & program management",
            text: "Managing speakers, sessions, and the running order so the program holds on the day."
          },
          {
            title: "Media & coverage execution",
            text: "Photography, film, and media presence managed as part of the event itself — planned before, executed during, delivered after."
          },
          {
            title: "In-house photography & film",
            text: "Shot and edited by the same in-house production team that serves our campaigns, to the same discipline."
          },
          {
            title: "Publishable material",
            text: "The event turned into precise material in Arabic and English — for the media and for the organization's own channels."
          }
        ]
      },
      {
        heading: "The rooms we deliver",
        paragraphs: [
          "Our event work centers on the rooms where communication carries real weight — executive forums, international panels, and large-scale business gatherings — and we cover conferences and business events to the same discipline, in Tripoli and across Libya.",
          "Our published event photography is the clearest evidence: public rooms delivered end-to-end, from the podium of an executive forum to a business gathering filling a grand hall. That includes our work around the MUSIAD business network in Libya — event branding, program media, and coverage of its business gatherings."
        ]
      },
      {
        heading: "Before, during, and after",
        bullets: [
          {
            title: "Before the event",
            text: "Coverage is planned with the program: the moments that matter, the shots that prove them, and the publishing plan for what follows — all agreed before the room opens."
          },
          {
            title: "During the event",
            text: "Photography and film run alongside the program, and the media presence is managed as part of the event — never an afterthought at the edge of it."
          },
          {
            title: "After the event",
            text: "Editing, post-production, and delivery: material for the media, for the organization's channels, and for the record — in Arabic and English, in the formats and on the timelines agreed before the event."
          }
        ]
      }
    ],
    proofHeading: "Selected event work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["musiad-institutional-media-events"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "What is included in event media coverage?",
        a: "As much of the system as your event needs: planning and institutional coordination where required, speaker and program management, and the coverage itself — photography, film, and publishable material in Arabic and English. You can engage the full system or the coverage layer alone."
      },
      {
        q: "Do you offer event management in Libya, or only coverage?",
        a: "Both. Our events system runs from full event planning and institutional coordination through speaker and program management to media and coverage execution — one team from concept to execution. If your event already has an organizer, we deliver the coverage."
      },
      {
        q: "How fast are deliverables ready?",
        a: "On the timeline agreed before the event — deliverables, formats, and dates are fixed as part of the coverage plan, not negotiated afterwards. Because shooting and post-production are in-house, the schedule stays in our hands."
      },
      {
        q: "Do you publish during the event or after it?",
        a: "Publishing is part of the plan, not a decision made in the room. Before the event we agree what gets published, where, and when — to the media or to the organization's channels — in whatever rhythm suits the program."
      },
      {
        q: "Do you cover events outside Tripoli?",
        a: "We are based in Tripoli and cover events across Libya, and we deliver work beyond Libya when engagements require it."
      },
      {
        q: "Do you deliver material in Arabic and English?",
        a: "Yes. We write and produce in both languages in-house, so the event reaches its local and international audiences with one voice."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your event needs to say — and to whom — and we'll deliver the room and its record.",
      buttonLabel: "Start a project"
    },
    related: { label: "Public relations in Libya", href: "/services/pr-agency-libya" },
    langSwitch: { label: "اقرأ هذه الصفحة بالعربية", href: "/ar/services/event-coverage-tripoli" },
    serviceType: "Event coverage",
    breadcrumb: { home: "Home", label: "Event Coverage in Tripoli, Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — تغطية الفعاليات                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "event-coverage-tripoli",
    locale: "ar",
    path: "/ar/services/event-coverage-tripoli",
    counterpartPath: "/services/event-coverage-tripoli",
    title: "تغطية فعاليات في طرابلس، ليبيا — تصوير وفيديو وإعلام | باتريكس",
    metaDescription:
      "تغطية إعلامية متكاملة للمؤتمرات والمنتديات وفعاليات الأعمال في طرابلس، ليبيا: تخطيط الفعاليات وتنظيمها، تصوير فوتوغرافي وفيديو، ونشر احترافي.",
    ogTitle: "تغطية الفعاليات في طرابلس، ليبيا — باتريكس",
    ogDescription:
      "تخطيط وتنسيق وتغطية إعلامية للمنتديات التنفيذية والجلسات النقاشية الدولية وتجمعات الأعمال الكبرى — من طرابلس، ليبيا.",
    eyebrow: "الخدمات — الفعاليات والتجارب",
    h1: "تغطية الفعاليات في طرابلس، ليبيا — من التخطيط إلى النشر",
    intro:
      "من قاعة المنتدى إلى قنوات النشر، تنظّم باتريكس الفعاليات المؤسسية وتديرها وتغطيها من طرابلس، ليبيا: تخطيط كامل للفعالية، تنسيق مؤسسي، إدارة للمتحدثين والبرنامج، وتنفيذ للتغطية الإعلامية بالتصوير الفوتوغرافي والفيديو. لا نختزل التغطية الإعلامية للفعاليات في مصوّر يُستدعى يوم الحدث، بل نتعامل معها كنظام واحد يبدأ قبل أن تُفتح القاعة، وينتهي بمادة منشورة تحمل الفعالية إلى جمهور لم يحضرها.",
    sections: [
      {
        heading: "ماذا يشمل نظام الفعاليات لدينا",
        paragraphs: [
          "نقدّم الفعالية وتغطيتها كنظام واحد متصل: الفريق الذي يخطط الفعالية هو نفسه الذي يوثّقها، فلا تفوته لحظة مهمة، ولا يُنتج مادة بلا غاية."
        ],
        bullets: [
          {
            title: "تخطيط الفعالية وتنظيمها بالكامل",
            text: "من الفكرة إلى التنفيذ: تصميم الفعالية بوصفها أداة اتصال، لا مجرد مناسبة."
          },
          {
            title: "التنسيق المؤسسي",
            text: "التنسيق الذي تتطلبه الفعاليات ذات الضيوف الرسميين والجهات الشريكة، مُداراً بدقة مؤسسية."
          },
          {
            title: "إدارة المتحدثين والبرنامج",
            text: "إدارة المتحدثين والجلسات وترتيب الفقرات حتى يصمد البرنامج يوم الحدث."
          },
          {
            title: "تنفيذ التغطية الإعلامية",
            text: "تصوير فوتوغرافي وفيديو وحضور إعلامي يُدار كجزء من الفعالية نفسها: يُخطط قبلها، ويُنفذ أثناءها، ويُسلَّم بعدها."
          },
          {
            title: "إنتاج داخلي",
            text: "يتولى التصويرَ والمونتاج فريقُ الإنتاج الداخلي نفسه الذي ينفذ حملاتنا، وبالمعيار نفسه."
          },
          {
            title: "مادة قابلة للنشر",
            text: "تحويل الفعالية إلى مادة دقيقة بالعربية والإنجليزية، لوسائل الإعلام ولقنوات المؤسسة."
          }
        ]
      },
      {
        heading: "أنواع الفعاليات التي نغطيها",
        paragraphs: [
          "تتركز أعمالنا في الفعاليات التي يحمل فيها الاتصال وزناً حقيقياً: المنتديات التنفيذية، والجلسات النقاشية الدولية، وتجمعات الأعمال الكبرى — ونغطي المؤتمرات وفعاليات الأعمال بالانضباط نفسه، في طرابلس وعموم ليبيا.",
          "وتصويرنا المنشور للفعاليات هو أوضح دليل: فعاليات عامة نفّذناها كاملة من الفكرة إلى النشر، من منصة منتدى تنفيذي إلى تجمع أعمال كبير في قاعة فسيحة — ومن ذلك عملنا مع شبكة أعمال موصياد في ليبيا: هوية الفعاليات، ومواد البرامج، وتغطية تجمعات الأعمال نفسها."
        ]
      },
      {
        heading: "قبل الفعالية وأثناءها وبعدها",
        bullets: [
          {
            title: "قبل الفعالية",
            text: "تُخطط التغطية مع البرنامج نفسه: اللحظات المهمة، واللقطات التي تثبتها، وخطة النشر لما بعدها — يُتفق على ذلك كله قبل أن تُفتح القاعة."
          },
          {
            title: "أثناء الفعالية",
            text: "يواكب التصويرُ الفوتوغرافي والفيديو البرنامجَ فقرةً فقرة، ويُدار الحضور الإعلامي كجزء من الفعالية لا كطارئ على هامشها."
          },
          {
            title: "بعد الفعالية",
            text: "مونتاج ومعالجة وتسليم: مادة لوسائل الإعلام، ولقنوات المؤسسة، وللأرشيف — بالعربية والإنجليزية، وفق الصيغ والمواعيد المتفق عليها قبل الحدث."
          }
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["musiad-institutional-media-events"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "ماذا تشمل التغطية الإعلامية للفعاليات؟",
        a: "بقدر ما تحتاجه فعاليتك من النظام: التخطيط والتنسيق المؤسسي عند الحاجة، وإدارة المتحدثين والبرنامج، ثم التغطية نفسها — تصوير فوتوغرافي وفيديو ومادة قابلة للنشر بالعربية والإنجليزية. ويمكن التعاقد على النظام كاملاً أو على التغطية وحدها."
      },
      {
        q: "هل تقدمون خدمة تنظيم فعاليات في ليبيا أم التغطية فقط؟",
        a: "الاثنين معاً. يمتد نظام الفعاليات لدينا من التخطيط الكامل والتنسيق المؤسسي إلى إدارة المتحدثين والبرنامج وتنفيذ التغطية الإعلامية — فريق واحد من الفكرة إلى التنفيذ. وإذا كان لفعاليتك منظّمٌ بالفعل، تولّينا التغطية وحدها."
      },
      {
        q: "متى تُسلَّم المواد بعد الفعالية؟",
        a: "وفق ما يُتفق عليه قبل الحدث: نثبّت الصيغ ومواعيد التسليم ضمن خطة التغطية نفسها لا بعدها. ولأن التصوير والمونتاج يتمان داخلياً، يبقى الالتزام بالمواعيد بأيدينا لا بيد طرف ثالث."
      },
      {
        q: "هل تنشرون أثناء الفعالية أم بعدها؟",
        a: "النشر جزء من الخطة لا قرار لحظي في القاعة: نتفق قبل الفعالية على ما يُنشر وأين ومتى — لوسائل الإعلام أو لقنوات المؤسسة — بالإيقاع الذي يناسب طبيعة البرنامج."
      },
      {
        q: "هل تغطون فعاليات خارج طرابلس؟",
        a: "مقرّنا طرابلس ونغطي الفعاليات في عموم ليبيا، وننفّذ أعمالاً خارجها عندما يتطلب التعاون ذلك."
      },
      {
        q: "هل تُسلَّم المواد بالعربية والإنجليزية؟",
        a: "نعم. نكتب وننتج باللغتين داخلياً، حتى تصل فعاليتك إلى جمهورها المحلي والدولي بصوت واحد."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن تقوله فعاليتك ولمن، ونتولى نحن الفعالية وتوثيقها.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: { label: "العلاقات العامة في ليبيا", href: "/ar/services/pr-agency-libya" },
    langSwitch: { label: "Read this page in English", href: "/services/event-coverage-tripoli" },
    serviceType: "Event coverage",
    breadcrumb: { home: "الرئيسية", label: "تغطية الفعاليات في طرابلس، ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Content & Video Production                                     */
  /* SHIP-ORDER: merge in the same commit/batch as                       */
  /* social-media-management-libya.fragment.ts — related.href in both    */
  /* locales points to that page and 404s if this ships first.           */
  /* ------------------------------------------------------------------ */
  {
    slug: "content-production-libya",
    locale: "en",
    path: "/services/content-production-libya",
    counterpartPath: "/ar/services/content-production-libya",
    title: "Content & Video Production in Libya | Pattrix",
    metaDescription:
      "Film, photography, and digital content produced in-house in Tripoli, Libya. Pattrix produces what the strategy needs — from reels to institutional films.",
    ogTitle: "Content & Video Production in Libya — Pattrix",
    ogDescription:
      "Film, photography, reels, and post-production — produced in-house from Tripoli, Libya to campaign discipline, for brands and institutions.",
    eyebrow: "Services — Production",
    h1: "In-house content and video production in Libya, built to campaign discipline",
    intro:
      "Most video production in Libya begins with a camera. Ours begins with a question: what does the strategy need this material to prove? Pattrix produces film, photography, and digital content in-house in Tripoli, Libya — the proof layer of every message we build — so nothing is shot for its own sake, and everything holds together from strategy to screen.",
    sections: [
      {
        heading: "Strategy owns production",
        paragraphs: [
          "A production house asks what you want to shoot. We ask what your campaign needs to prove. At Pattrix, production is one of six named systems — the proof layer of every message — and it answers to strategy, never the other way around. We produce what the strategy needs; we do not produce content for its own sake.",
          "That order matters because content production without a message is just output. When film, photography, and short-form content are derived from one central message, every frame works in the same direction as every statement, post, and event around it."
        ]
      },
      {
        heading: "What we produce in-house",
        bullets: [
          {
            title: "Film & video",
            text: "Brand commercials and event films, shot and edited in-house — including cinematic commercial work produced in 4K."
          },
          {
            title: "Photography",
            text: "Product photography and art-directed studio sessions — from set design to final retouch — alongside the event photography that documents public rooms."
          },
          {
            title: "Reels & short-form content",
            text: "Product-led reels with editorial pacing, produced as running series so a brand's social presence stays consistent rather than occasional."
          },
          {
            title: "Post-production",
            text: "Edit, retouch, and motion graphics finished to one standard, so campaign material reads as one system wherever it appears."
          }
        ]
      },
      {
        heading: "Producing for brands and institutions",
        paragraphs: [
          "The discipline is the same; the stakes differ. A retailer carrying premium eyewear needs reels that sell without cheapening the brands on its shelves — the thinking behind our Tripoli Optics series, where product-led shooting meets editorial pacing. A global automotive brand like Hyundai's Libyan operation needs campaign visuals that carry the same discipline as the branded environments they connect to.",
          "And because we write and produce in Arabic and English in-house, the material speaks both languages without splitting into two voices — which is what organizations addressing local and international audiences at once actually need."
        ]
      }
    ],
    proofHeading: "Selected production work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["tripoli-optics-reels", "hyundai-libya-showroom-identity"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "Do you have in-house crews and equipment?",
        a: "Yes — production at Pattrix is in-house: film, photography, and post-production under one roof in Tripoli, Libya. That is not a logistics detail; it is what lets strategy own production, keeps quality to one standard, and keeps material moving at campaign rhythm."
      },
      {
        q: "What formats do you produce?",
        a: "Brand commercials, product reels and short-form social content, art-directed product photography, event films and event photography, and motion graphics — each finished in post-production to the same standard. The format follows the message, never the other way around."
      },
      {
        q: "Can production be booked without a full campaign?",
        a: "Yes. Production is one of our six systems and can be engaged on its own — a reel series, a photo session, an event film. Even standalone, it is produced to campaign discipline: we agree what the material needs to achieve before anything is shot."
      },
      {
        q: "How do revisions work?",
        a: "Deliverables and review rounds are agreed before production begins. Because every piece is derived from an agreed direction, revisions are judged against that direction rather than taste alone — which keeps feedback fast and the result coherent."
      },
      {
        q: "How is Pattrix different from a media production company in Tripoli, Libya?",
        a: "A production house delivers footage; we deliver the proof layer of a message. Pattrix is a strategic communications and PR agency with full production capability, so what we shoot is decided by positioning and campaign architecture — and holds together from strategy to screen."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your audience needs to see and believe, and we'll produce the material that proves it.",
      buttonLabel: "Start a project"
    },
    related: {
      label: "Social media management in Libya",
      href: "/services/social-media-management-libya"
    },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/services/content-production-libya"
    },
    serviceType: "Content production",
    breadcrumb: { home: "Home", label: "Content & Video Production in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — إنتاج المحتوى والفيديو                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "content-production-libya",
    locale: "ar",
    path: "/ar/services/content-production-libya",
    counterpartPath: "/services/content-production-libya",
    title: "إنتاج محتوى وفيديو في ليبيا | باتريكس",
    metaDescription:
      "إنتاج فيديو ومحتوى في ليبيا: أفلام، تصوير، ومحتوى رقمي يُنتج داخلياً في طرابلس، ليبيا — من الريلز إلى الأفلام المؤسسية، وفق ما تتطلبه الاستراتيجية.",
    ogTitle: "إنتاج محتوى وفيديو في ليبيا — باتريكس",
    ogDescription:
      "أفلام وتصوير وريلز وأعمال ما بعد الإنتاج، تُنتج داخلياً من طرابلس، ليبيا، بانضباط الحملات ووفق ما تتطلبه الاستراتيجية.",
    eyebrow: "الخدمات — الإنتاج",
    h1: "إنتاج محتوى وفيديو في ليبيا بمعايير الحملات",
    intro:
      "كثير من إنتاج الفيديو في ليبيا يبدأ من الكاميرا؛ ونحن نبدأ من سؤال مختلف: ما الذي تحتاج الاستراتيجية أن تثبته هذه المادة؟ في باتريكس نُنتج الأفلام والتصوير والمحتوى الرقمي داخلياً في طرابلس، ليبيا، بوصف ذلك كله طبقة الإثبات في كل رسالة نبنيها — فلا يُصوَّر شيء لذاته، وتتماسك كل مادة من الاستراتيجية إلى الشاشة.",
    sections: [
      {
        heading: "الاستراتيجية تقود الإنتاج",
        paragraphs: [
          "تسألك شركات الإنتاج عمّا تريد تصويره، ونسألك نحن عمّا تحتاج حملتك إلى إثباته. الإنتاج عندنا أحد أنظمتنا الستة — طبقة الإثبات في كل رسالة — وهو يتبع الاستراتيجية لا العكس: ننتج ما تتطلبه الاستراتيجية، ولا ننتج محتوى لمجرد الإنتاج.",
          "وهذا الترتيب هو الفارق كله، فإنتاج المحتوى بلا رسالة مجرد مخرجات. أما حين تُشتق الأفلام والتصوير والمحتوى القصير من رسالة مركزية واحدة، فيعمل كل إطار في الاتجاه نفسه الذي يعمل فيه كل بيان ومنشور وفعالية."
        ]
      },
      {
        heading: "ما الذي ننتجه داخلياً",
        bullets: [
          {
            title: "الأفلام والفيديو",
            text: "إعلانات تجارية وأفلام فعاليات تُصوَّر ويُنفَّذ مونتاجها داخلياً — ومن أعمالنا إنتاج تجاري سينمائي بدقة 4K."
          },
          {
            title: "التصوير الفوتوغرافي",
            text: "تصوير منتجات وجلسات استوديو بإدارة فنية كاملة، من تصميم المشهد إلى الروتوش الأخير، إلى جانب توثيق الفعاليات والمناسبات المؤسسية."
          },
          {
            title: "الريلز والمحتوى القصير",
            text: "سلاسل ريلز بإيقاع تحريري تُبنى على المنتج نفسه، فتحافظ على حضور رقمي متّسق لا موسمي."
          },
          {
            title: "ما بعد الإنتاج",
            text: "مونتاج وروتوش وموشن جرافيك تُنجز بمعيار واحد، فتظهر مواد الحملة كنظام واحد أينما ظهرت."
          }
        ]
      },
      {
        heading: "إنتاج للعلامات التجارية والمؤسسات",
        paragraphs: [
          "الانضباط واحد وإن اختلفت الرهانات. متجر يعرض علامات نظارات فاخرة يحتاج ريلز تبيع دون أن تحطّ من قيمة ما على رفوفه — وهذا ما قام عليه عملنا مع تريبولي أوبتكس، حيث يلتقي التصوير المبني على المنتج بالإيقاع التحريري. وعلامة عالمية مثل هيونداي في ليبيا تحتاج مواد حملات تحمل الانضباط البصري نفسه الذي تحمله بيئاتها من صالة العرض إلى السوق.",
          "ولأننا نكتب وننتج بالعربية والإنجليزية من مكتب واحد، تخرج المواد بلغتين وصوت واحد — وهو ما يحتاجه من يخاطب جمهوراً محلياً ودولياً في آن واحد."
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["tripoli-optics-reels", "hyundai-libya-showroom-identity"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "هل لديكم فرق ومعدات إنتاج داخلية؟",
        a: "نعم، الإنتاج في باتريكس داخلي: الأفلام والتصوير وما بعد الإنتاج تحت سقف واحد في طرابلس، ليبيا. وهذا ليس تفصيلاً لوجستياً، بل هو ما يتيح للاستراتيجية أن تقود الإنتاج، ويحفظ الجودة بمعيار واحد، ويُبقي العمل على إيقاع الحملة."
      },
      {
        q: "ما الصيغ والمواد التي تنتجونها؟",
        a: "إعلانات تجارية، وريلز ومحتوى قصير للمنصات، وتصوير منتجات بإدارة فنية، وتصوير وأفلام فعاليات، وموشن جرافيك — وتُنهى جميعها في مرحلة ما بعد الإنتاج بمعيار واحد. الصيغة تتبع الرسالة، لا العكس."
      },
      {
        q: "هل يمكن حجز الإنتاج وحده دون حملة كاملة؟",
        a: "يمكن ذلك. الإنتاج أحد أنظمتنا الستة ويُتعاقد عليه منفرداً — سلسلة ريلز، أو جلسة تصوير، أو فيلم فعالية. وحتى منفرداً يبقى محكوماً بانضباط الحملات: نتفق أولاً على ما ينبغي أن تحققه المادة، ثم نصوّر."
      },
      {
        q: "بماذا تختلفون عن شركة إنتاج إعلامي في طرابلس؟",
        a: "شركة الإنتاج تسلّمك مادة مصوَّرة، ونحن نسلّمك طبقة الإثبات لرسالتك. باتريكس وكالة اتصال استراتيجي وعلاقات عامة بقدرة إنتاج كاملة، فما نصوّره يقرره التموضع وبناء الحملة، ويتماسك من الاستراتيجية إلى الشاشة."
      },
      {
        q: "كيف تُدار المراجعات والتعديلات؟",
        a: "نتفق على التسليمات وجولات المراجعة قبل بدء الإنتاج. ولأن كل مادة تُشتق من اتجاه متفق عليه، تُقاس التعديلات على ذلك الاتجاه لا على الذوق وحده — فيبقى القرار سريعاً والنتيجة متماسكة."
      },
      {
        q: "هل تنفذون إنتاج فيديو وتصوير خارج طرابلس؟",
        a: "مقرّنا طرابلس ونعمل في عموم ليبيا، وننفّذ أعمالاً لعملاء خارج ليبيا عندما يتطلب الأمر."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن يراه جمهورك ويصدّقه، ونتولى نحن إنتاجه.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: {
      label: "إدارة صفحات التواصل الاجتماعي في ليبيا",
      href: "/ar/services/social-media-management-libya"
    },
    langSwitch: {
      label: "Read this page in English",
      href: "/services/content-production-libya"
    },
    serviceType: "Content production",
    breadcrumb: { home: "الرئيسية", label: "إنتاج المحتوى والفيديو في ليبيا" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Market & Media Analysis                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "market-analysis-libya",
    locale: "en",
    path: "/services/market-analysis-libya",
    counterpartPath: "/ar/services/market-analysis-libya",
    title: "Market & Media Analysis in Libya — Audience & Campaigns | Pattrix",
    metaDescription:
      "Market, media, and audience analysis from Tripoli, Libya. Pattrix reads the media landscape, audiences, and campaign response — the layer under every strategy.",
    ogTitle: "Market & Media Analysis in Libya — Pattrix",
    ogDescription:
      "Media-landscape, audience, and positioning analysis from Tripoli, Libya — the reading layer under every Pattrix strategy and campaign.",
    eyebrow: "Services — Market & Media Analysis",
    h1: "Market and media analysis for brands and institutions in Libya",
    intro:
      "Market and media analysis is where every Pattrix engagement begins. Before a strategy is set or a budget is spent, we read the context: how Libya's media landscape behaves, where audience attention actually lives, and what position an organization can credibly hold. Pattrix is a strategic communications and PR agency based in Tripoli, Libya — and analysis is the layer under everything we do.",
    sections: [
      {
        heading: "Why analysis comes before spending",
        paragraphs: [
          "Budgets turn into noise when they are spent before the context is read. A message launched into the wrong channel, at the wrong moment, in the wrong language does not fail loudly — it simply never arrives. That is why we treat analysis not as a report to file away, but as the discipline that decides everything downstream.",
          "Working from Tripoli taught us that precision. In Libya's media environment, attention is split between traditional channels and social platforms — and between Arabic and English audiences — and no assumption survives that split unexamined. Analysis is how we establish, before anything is spent, which channels carry real weight for a subject and where its audience actually is."
        ]
      },
      {
        heading: "What the analysis layer includes",
        paragraphs: [
          "Our analysis is communications analysis — the working layer under our strategy and campaign systems, not survey research or economic consulting."
        ],
        bullets: [
          {
            title: "Media-landscape analysis",
            text: "How Libya's media environment behaves around your subject — which channels carry real weight, and how attention moves between them."
          },
          {
            title: "Audience & channel analysis",
            text: "Who the organization is addressing, and where that audience's attention actually lives — the groundwork of audience and channel planning."
          },
          {
            title: "Positioning analysis",
            text: "The place an organization currently holds in its audience's mind, and what genuinely distinguishes it from what surrounds it."
          },
          {
            title: "Message development",
            text: "Building the central message on what the analysis shows — one clear message from which materials are derived, never the other way around."
          },
          {
            title: "Campaign readouts",
            text: "A disciplined reading of what a live campaign's response actually shows, so course corrections are made on the response — not on habit."
          }
        ]
      },
      {
        heading: "How analysis feeds strategy and campaigns",
        paragraphs: [
          "Analysis at Pattrix never ends as a document. It feeds directly into positioning, message architecture, and audience and channel planning — the strategy system that decides what should be said, to whom, and in what order. During a campaign the same discipline continues: we manage it through its phases and adjust course by what the response shows.",
          "Measurement follows the same honesty. We work with realistic indicators agreed before work begins — whether the message appears in coverage, how consistently it holds across channels, and how stable the narrative stays over time — not inflated numbers.",
          "That is how our institutional and commercial work alike is built: from the bilingual media reading behind our work with the United Nations Support Mission in Libya to the positioning that shaped Albaraka Insurance's commercial campaigns."
        ]
      }
    ],
    proofHeading: "Selected analysis-led work",
    proofLead: "Our proof is published work, not promises.",
    proofProjects: ["unsmil-strategic-communications", "albaraka-insurance-campaigns"],
    proofCtaLabel: "Read the case study",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "What does market and media analysis at Pattrix include?",
        a: "Media-landscape analysis, audience and channel analysis, positioning analysis, message development, and campaign readouts. It is the working layer under our strategy and campaign systems — the reading that decides what should be said, to whom, and in what order."
      },
      {
        q: "Do you run surveys or field research?",
        a: "No — and we will not pretend otherwise. Our analysis is communications analysis: reading Libya's media landscape, audience attention, and an organization's position from the channels themselves and from how campaigns actually perform. We are not a survey house or an economic consultancy, and we do not sell statistical products."
      },
      {
        q: "Can analysis be commissioned on its own?",
        a: "Analysis is built into every engagement as its first phase, and it is most valuable when it feeds a strategy or a campaign. That first phase produces the reading everything else stands on: how the media landscape behaves around your subject, where your audience's attention lives, and what position you can credibly hold — so the strategic direction that follows is built on evidence, not assumption."
      },
      {
        q: "How do you analyze campaign results?",
        a: "Through campaign readouts: a disciplined reading of the response, phase by phase, against indicators agreed before work begins. Each readout looks at what the response actually shows rather than what habit expects, and it is where course corrections are decided — which channels are carrying the message, what to adjust, and in what order."
      },
      {
        q: "Do you analyze Arabic and English media?",
        a: "Yes. We work in both languages from a single desk, so the analysis reads Arabic and English media as one picture — which is what institutions addressing local and international audiences at the same time require."
      }
    ],
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your audience needs to understand — we'll start by reading the context it lives in.",
      buttonLabel: "Start a project"
    },
    related: {
      label: "Strategic communications in Libya",
      href: "/services/strategic-communications-libya"
    },
    langSwitch: { label: "اقرأ هذه الصفحة بالعربية", href: "/ar/services/market-analysis-libya" },
    serviceType: "Market and media analysis",
    breadcrumb: { home: "Home", label: "Market & Media Analysis in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* AR — تحليل السوق والإعلام                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "market-analysis-libya",
    locale: "ar",
    path: "/ar/services/market-analysis-libya",
    counterpartPath: "/services/market-analysis-libya",
    title: "تحليل السوق والإعلام في ليبيا — دراسة الجمهور والحملات | باتريكس",
    metaDescription:
      "تحليل السوق والمشهد الإعلامي ودراسة الجمهور في ليبيا من طرابلس. باتريكس تقرأ السياق قبل أي إنفاق: القنوات، والتموضع، وتحليل الحملات — كطبقة أولى لكل استراتيجية.",
    ogTitle: "تحليل السوق والإعلام في ليبيا — باتريكس",
    ogDescription:
      "تحليل المشهد الإعلامي، ودراسة الجمهور والقنوات، وتحليل التموضع والحملات للمؤسسات والعلامات التجارية — من طرابلس، ليبيا.",
    eyebrow: "الخدمات — تحليل السوق والإعلام",
    h1: "تحليل السوق والإعلام للمؤسسات والعلامات التجارية في ليبيا",
    intro:
      "قبل أن تُصاغ استراتيجية أو تُنفق ميزانية، يبدأ عملنا في باتريكس من قراءة السياق: تحليل السوق والمشهد الإعلامي في ليبيا، ودراسة الجمهور والقنوات التي يتركز فيها انتباهه فعلاً، والموقع الذي يمكن للمؤسسة أن تحتله بصدق في ذهنه. من طرابلس، ليبيا، نجعل هذا التحليل الطبقة الأولى التي يقوم عليها كل ما نقدمه من استراتيجية وحملات.",
    sections: [
      {
        heading: "لماذا يسبق التحليل الإنفاق؟",
        paragraphs: [
          "الميزانية التي تُنفق قبل قراءة السياق تتحول إلى ضجيج. فالرسالة التي تُطلق في القناة الخطأ أو التوقيت الخطأ أو اللغة الخطأ لا تفشل بصوت مسموع — هي ببساطة لا تصل. لذلك لا نتعامل مع التحليل كتقرير يُحفظ في درج، بل كالانضباط الذي يقرر كل ما يأتي بعده.",
          "علّمنا العمل من طرابلس هذه الدقة. ففي البيئة الإعلامية الليبية يتوزع الانتباه بين القنوات التقليدية ومنصات التواصل، وبين جمهورين بالعربية والإنجليزية، ولا يصمد افتراض مسبق أمام هذا التوزع. لذلك يتولى التحليل أن يثبت — قبل أي إنفاق — أي القنوات لها وزن فعلي في موضوعك، وأين يتركز انتباه جمهورك فعلاً."
        ]
      },
      {
        heading: "ماذا تشمل طبقة التحليل لدينا",
        paragraphs: [
          "تحليلنا تحليل اتصالي — الطبقة التحليلية التي تقوم عليها أنظمة الاستراتيجية والحملات لدينا، لا بحوث ميدانية ولا استشارات اقتصادية."
        ],
        bullets: [
          {
            title: "تحليل المشهد الإعلامي",
            text: "كيف يتعامل الإعلام في ليبيا مع موضوعك: أي القنوات لها وزن فعلي، وكيف ينتقل الانتباه بينها."
          },
          {
            title: "دراسة الجمهور والقنوات",
            text: "من تخاطبه المؤسسة، وأين يتركز انتباه جمهورها فعلاً — وهو الأساس الذي يقوم عليه تخطيط الجمهور والقنوات."
          },
          {
            title: "تحليل التموضع",
            text: "الموقع الذي تحتله المؤسسة اليوم في ذهن جمهورها، وما يميزها حقاً عمّا حولها."
          },
          {
            title: "تطوير الرسالة",
            text: "بناء الرسالة المركزية على ما يظهره التحليل — رسالة واحدة واضحة تتفرع عنها المواد، لا العكس."
          },
          {
            title: "تحليل الحملات",
            text: "قراءة منضبطة لما تظهره استجابة الحملة أثناء تنفيذها، حتى تُعدَّل المسارات بناءً على الأثر الفعلي لا على العادة."
          }
        ]
      },
      {
        heading: "كيف يغذي التحليل الاستراتيجية والحملات",
        paragraphs: [
          "لا ينتهي التحليل عندنا إلى وثيقة تُنسى، بل يصب مباشرة في التموضع وهندسة الرسائل وتخطيط الجمهور والقنوات — أي في نظام الاستراتيجية الذي يجيب عن الأسئلة الثلاثة: ماذا نقول؟ ولمن؟ وبأي ترتيب؟ وأثناء الحملة يستمر الانضباط نفسه: نديرها عبر مراحلها ونعدّل مسارها وفق ما تظهره الاستجابة.",
          "وفي القياس نلتزم الصدق نفسه: مؤشرات واقعية نتفق عليها قبل بدء العمل — حضور الرسالة في التغطية، واتساقها عبر القنوات، وثبات السردية بمرور الوقت — لا أرقام مضخّمة.",
          "وعلى هذا الأساس بُني عملنا المؤسسي والتجاري على السواء: من القراءة الإعلامية ثنائية اللغة التي قام عليها عملنا مع بعثة الأمم المتحدة للدعم في ليبيا، إلى التموضع الذي شكّل الحملات التجارية لشركة البركة للتأمين."
        ]
      }
    ],
    proofHeading: "أعمال موثّقة",
    proofLead: "إثباتنا أعمال منشورة، لا وعود.",
    proofProjects: ["unsmil-strategic-communications", "albaraka-insurance-campaigns"],
    proofCtaLabel: "اقرأ دراسة الحالة",
    faqHeading: "أسئلة شائعة",
    faqs: [
      {
        q: "ماذا يشمل تحليل السوق والإعلام لدى باتريكس؟",
        a: "تحليل المشهد الإعلامي، ودراسة الجمهور والقنوات، وتحليل التموضع، وتطوير الرسالة، وتحليل الحملات. هذه هي الطبقة التحليلية التي تقوم عليها أنظمة الاستراتيجية والحملات لدينا — القراءة التي تقرر ماذا يُقال، ولمن، وبأي ترتيب."
      },
      {
        q: "هل تجرون استطلاعات رأي أو بحوثاً ميدانية؟",
        a: "لا، ولا ندّعي غير ذلك. تحليلنا تحليل اتصالي: نقرأ المشهد الإعلامي الليبي وانتباه الجمهور وموقع المؤسسة من القنوات نفسها ومن الأداء الفعلي للحملات. لسنا شركة استطلاعات رأي ولا جهة استشارات اقتصادية، ولا نبيع منتجات إحصائية."
      },
      {
        q: "هل يمكن طلب التحليل وحده؟",
        a: "التحليل مرحلة أولى في كل تعاون معنا، وقيمته الكبرى حين يغذي استراتيجية أو حملة. تُنتج هذه المرحلة الأولى القراءة التي يقوم عليها كل ما بعدها: كيف يتعامل المشهد الإعلامي مع موضوعك، وأين يتركز انتباه جمهورك، وأي موقع يمكن لمؤسستك أن تحتله بصدق — فيُبنى الاتجاه الاستراتيجي الذي يليها على قراءة موثّقة لا على افتراض."
      },
      {
        q: "كيف تحللون نتائج الحملات؟",
        a: "عبر تحليل الحملات: قراءة منضبطة للاستجابة، مرحلة بعد مرحلة، على ضوء مؤشرات نتفق عليها قبل بدء العمل. تنظر كل قراءة في ما تظهره الاستجابة فعلاً لا في ما تتوقعه العادة، وفيها تُتّخذ قرارات تصحيح المسار: أي القنوات تحمل الرسالة، وما الذي يُعدَّل، وبأي ترتيب."
      },
      {
        q: "هل تحللون الإعلام بالعربية والإنجليزية؟",
        a: "نعم. نعمل باللغتين من مكتب واحد، فيقرأ التحليل الإعلام العربي والإنجليزي كصورة واحدة — وهو ما تحتاجه المؤسسات التي تخاطب جمهوراً محلياً ودولياً في آن واحد."
      }
    ],
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن يفهمه جمهورك، ونبدأ نحن بقراءة السياق الذي يعيش فيه.",
      buttonLabel: "ابدأ مشروعاً"
    },
    related: {
      label: "الاتصال الاستراتيجي والحملات الإعلامية",
      href: "/ar/services/strategic-communications-libya"
    },
    langSwitch: { label: "Read this page in English", href: "/services/market-analysis-libya" },
    serviceType: "Market and media analysis",
    breadcrumb: { home: "الرئيسية", label: "تحليل السوق والإعلام في ليبيا" }
  },
];

export function getServicePage(slug: string, locale: ServiceLocale): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug && p.locale === locale);
}
