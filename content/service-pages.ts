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
  }
];

export function getServicePage(slug: string, locale: ServiceLocale): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug && p.locale === locale);
}
