/**
 * Insights articles — single source of truth for /insights/* and
 * /ar/insights/*. Editorial support content for the Libya SEO plan
 * (docs/SEO_LIBYA_CONTENT_PLAN.md). Copy rules are the same as service
 * pages: no invented clients, stats, rankings, or claims; guidance is
 * professional advice, not fabricated research. Arabic is written natively
 * in professional Modern Standard Arabic — never as literal translation.
 */

export type InsightLocale = "en" | "ar";

export interface InsightSection {
  heading: string;
  paragraphs?: string[];
  bullets?: { title: string; text: string }[];
}

export interface InsightArticle {
  slug: string;
  locale: InsightLocale;
  /** Route path, also used for canonical (resolved against metadataBase). */
  path: string;
  /** Path of the same article in the other language; omit when no pair exists. */
  counterpartPath?: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  eyebrow: string;
  h1: string;
  /** ISO publication date — the date the article actually went live. */
  datePublished: string;
  intro: string;
  sections: InsightSection[];
  /** The service page this article supports (internal link target). */
  relatedService: { label: string; href: string };
  langSwitch?: { label: string; href: string };
  cta: { heading: string; text: string; buttonLabel: string };
  breadcrumb: { home: string; hub: string; label: string };
}

export const insights: InsightArticle[] = [
  /* ------------------------------------------------------------------ */
  /* EN — How to choose a PR agency in Libya                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "how-to-choose-pr-agency-libya",
    locale: "en",
    path: "/insights/how-to-choose-pr-agency-libya",
    counterpartPath: "/ar/insights/how-to-choose-pr-agency-libya",
    title: "How to Choose a PR Agency in Libya (What to Ask First) | Pattrix",
    metaDescription:
      "How to choose a PR agency in Libya: media relationships, bilingual capability, production discipline, and the questions to ask before signing.",
    ogTitle: "How to Choose a PR Agency in Libya — Pattrix",
    ogDescription:
      "A buyer's checklist for choosing a PR partner in Libya: what PR actually covers, what to evaluate, the questions to ask, and the red flags to walk away from.",
    eyebrow: "Insights — Public Relations",
    h1: "How to choose a PR agency in Libya",
    datePublished: "2026-07-23",
    intro:
      "Choosing a PR agency in Libya is a decision most organizations make once, under pressure, with little to compare against. The promises sound alike; the differences only show later, in public. This guide is a buyer's checklist: what public relations actually covers, what to evaluate before signing, the questions worth asking in a first meeting, and the red flags that should end the conversation early.",
    sections: [
      {
        heading: "Why the choice is harder in Libya",
        paragraphs: [
          "Libya's media landscape is fragmented. Attention is split between television, radio, a shifting press, and the social platforms where much of the country's public conversation actually happens. A message that lands on one channel can vanish on another, and no single outlet reaches everyone. An agency working here cannot run a fixed media playbook — it has to read the landscape continuously and place each message where it will actually be seen.",
          "There is a second complication: many organizations in Libya address two audiences at once — a local audience in Arabic and an international one in English. The agency you choose has to hold one message steady across both languages. That is a craft in itself, not a translation task."
        ]
      },
      {
        heading: "What public relations actually covers",
        paragraphs: [
          "Before comparing agencies, be precise about what you are buying. Public relations is not advertising, and it is not posting. Done properly, it is one connected system:"
        ],
        bullets: [
          {
            title: "Press relations",
            text: "Working relationships with newsrooms and editors, sustained by material that is accurate enough to publish."
          },
          {
            title: "Media coordination",
            text: "Managing how your organization appears in the media before, during, and after its announcements and events."
          },
          {
            title: "News coverage",
            text: "Turning your real activity into precise, publishable material — not press releases nobody runs."
          },
          {
            title: "Official statements",
            text: "Institutional language that can withstand public questioning, not just launch-day applause."
          },
          {
            title: "Campaign support",
            text: "Connecting PR to the wider campaign so every statement, post, and appearance moves in one direction."
          }
        ]
      },
      {
        heading: "Six things to evaluate before you sign",
        bullets: [
          {
            title: "Published work you can inspect",
            text: "Ask for work that is public and attributable. A portfolio you cannot find in the wild is a claim, not proof."
          },
          {
            title: "Native bilingual capability",
            text: "Arabic written natively by people who write it professionally — not translated English. Read their Arabic before you sign; audiences can tell instantly."
          },
          {
            title: "A method you can follow",
            text: "You should be able to repeat their process back in one sentence: read the context, build one central message, place it, repeat it with discipline. If the method is vague, the work will be too."
          },
          {
            title: "Media relationships built on material",
            text: "Real press relations rest on giving newsrooms accurate, usable material. Relationships that depend on favors do not survive a difficult story."
          },
          {
            title: "Production under one standard",
            text: "Statements need design, photography, and video around them. Ask who produces those materials and to what standard — handoffs between scattered vendors are where messages drift."
          },
          {
            title: "Honest measurement",
            text: "Realistic indicators agreed before work starts: presence of the message in coverage, consistency across channels, quality of appearances. Anyone promising precise, impressive numbers up front is inventing them."
          }
        ]
      },
      {
        heading: "Questions to ask in the first meeting",
        paragraphs: [
          "A first meeting tells you more than a proposal does. Ask questions that cannot be answered with a slide:"
        ],
        bullets: [
          {
            title: "“What would you advise us not to say?”",
            text: "A serious partner subtracts before adding. If every idea you float is a great idea, you are talking to a vendor, not an advisor."
          },
          {
            title: "“Who writes our Arabic, and who writes our English?”",
            text: "Names and roles, not departments. Both languages coming from one desk, carrying one message, is the strongest answer."
          },
          {
            title: "“How will we know it worked?”",
            text: "Listen for realistic indicators, not guarantees. The honest answer also names what cannot be measured."
          },
          {
            title: "“Show us a message you kept consistent for months.”",
            text: "Discipline over time is the hardest thing in this craft — and the easiest to verify in published work."
          },
          {
            title: "“Who exactly will work on our account?”",
            text: "The people in the pitch are not always the people on the work."
          }
        ]
      },
      {
        heading: "Red flags that should end the conversation",
        bullets: [
          {
            title: "Invented numbers",
            text: "Precise statistics about reach or sentiment with no verifiable source. An agency that invents numbers to win you will invent numbers to keep you."
          },
          {
            title: "No published work",
            text: "Confidentiality explains one missing case study. It does not explain an empty public record."
          },
          {
            title: "No native bilingual capability",
            text: "Translation-flavored copy in either language means your message will not hold across both audiences."
          },
          {
            title: "Volume as strategy",
            text: "“We will make you visible everywhere” is noise, not a plan. The right question is what gets repeated, and why."
          },
          {
            title: "Guaranteed coverage",
            text: "No one controls independent newsrooms. An agency that guarantees placement is describing paid content — or misleading you."
          }
        ]
      },
      {
        heading: "How to judge proof",
        paragraphs: [
          "Proof, in this craft, is published work: material you can find, read, and attribute. Judge a body of work, not a single piece — does one organization sound like itself across months of statements and posts? Judge the standards behind it — has the agency worked with clients whose rules force precision, such as international institutions? And put the two languages side by side before you decide.",
          "Pattrix is a public relations and strategic communications agency in Tripoli, Libya, working in Arabic and English from a single desk. Our published work includes the United Nations Support Mission in Libya and the MUSIAD business network — and we would rather you judge it against this checklist than take our word for it."
        ]
      }
    ],
    relatedService: {
      label: "Public relations in Libya",
      href: "/services/pr-agency-libya"
    },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/insights/how-to-choose-pr-agency-libya"
    },
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your audience needs to understand, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    breadcrumb: {
      home: "Home",
      hub: "Insights",
      label: "How to Choose a PR Agency in Libya"
    }
  },

  /* ------------------------------------------------------------------ */
  /* AR — كيف تختار شركة علاقات عامة في ليبيا                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "how-to-choose-pr-agency-libya",
    locale: "ar",
    path: "/ar/insights/how-to-choose-pr-agency-libya",
    counterpartPath: "/insights/how-to-choose-pr-agency-libya",
    title: "كيف تختار شركة علاقات عامة في ليبيا؟ | باتريكس",
    metaDescription:
      "معايير عملية لاختيار شركة علاقات عامة في ليبيا: العلاقات الإعلامية، العمل بلغتين، جودة الإنتاج، وإشارات التحذير، والأسئلة التي يجب طرحها قبل التعاقد.",
    ogTitle: "كيف تختار شركة علاقات عامة في ليبيا؟ — باتريكس",
    ogDescription:
      "قائمة تحقق عملية للمفاضلة بين شركات العلاقات العامة في ليبيا: ما الذي تشتريه فعلاً، وما الأسئلة التي تكشف الجدية، ومتى ينبغي أن تنسحب.",
    eyebrow: "المقالات — العلاقات العامة",
    h1: "كيف تختار شركة علاقات عامة في ليبيا؟",
    datePublished: "2026-07-23",
    intro:
      "حين تبحث المؤسسات عن أفضل شركة علاقات عامة تناسبها، تتشابه العروض في الظاهر وتتباين النتائج في الميدان — والفرق لا يظهر في العرض التقديمي، بل بعد أشهر من العمل، أمام الجمهور. هذا الدليل قائمة تحقق عملية لمن يفاضل بين شركات العلاقات العامة في ليبيا: ما الذي تشتريه فعلاً، وبأي معايير تقيّم، وما الأسئلة التي تكشف الجدية من أول اجتماع، ومتى ينبغي أن تنسحب من التفاوض.",
    sections: [
      {
        heading: "لماذا يصعب الاختيار في السوق الليبي؟",
        paragraphs: [
          "المشهد الإعلامي في ليبيا موزّع بطبيعته: قنوات فضائية وإذاعات وصحافة متغيرة، ومنصات تواصل يجري عليها الجزء الأكبر من النقاش العام. لا توجد وسيلة واحدة تصل إلى الجميع، والرسالة التي تنجح في قناة قد لا تُلاحظ في أخرى. لذلك لا تنفع الوصفات الجاهزة؛ المطلوب شريك يقرأ المشهد باستمرار ويضع كل رسالة حيث تُرى فعلاً.",
          "يضاف إلى ذلك أن كثيراً من المؤسسات العاملة في ليبيا تخاطب جمهورين في وقت واحد: جمهوراً محلياً بالعربية وجمهوراً دولياً بالإنجليزية. وأي شركة علاقات عامة في ليبيا لا تحفظ اتساق الرسالة بين اللغتين ستضعك عاجلاً أمام روايتين مختلفتين عن مؤسستك."
        ]
      },
      {
        heading: "ما الذي تشتريه فعلاً من شركة العلاقات العامة؟",
        paragraphs: [
          "قبل المفاضلة بين الأسماء، حدّد ما تشتريه. العلاقات العامة ليست إعلاناً ولا إدارة منشورات، بل نظام متصل يشمل:"
        ],
        bullets: [
          {
            title: "العلاقات الإعلامية",
            text: "صلات مهنية مع غرف الأخبار والمحررين، تقوم على مواد دقيقة تستحق النشر لا على المجاملات."
          },
          {
            title: "التنسيق الإعلامي",
            text: "إدارة ظهور مؤسستك في وسائل الإعلام قبل مناسباتها وإعلاناتها وأثناءها وبعدها."
          },
          {
            title: "التغطية الإخبارية",
            text: "تحويل نشاطك الحقيقي إلى مادة إخبارية دقيقة قابلة للنشر، لا بيانات لا يلتقطها أحد."
          },
          {
            title: "البيانات الرسمية",
            text: "صياغة مؤسسية تحتمل المساءلة العامة، لا لغة احتفالية تصلح ليوم الإطلاق وحده."
          },
          {
            title: "دعم الحملات",
            text: "ربط العلاقات العامة بالحملة الأوسع حتى يتحرك كل بيان ومنشور وظهور في اتجاه واحد."
          }
        ]
      },
      {
        heading: "معايير التقييم قبل التوقيع",
        bullets: [
          {
            title: "أعمال منشورة يمكن فحصها",
            text: "اطلب أعمالاً متاحة للعموم ومنسوبة لأصحابها. الملف الذي لا تجد له أثراً منشوراً ادعاءٌ لا دليل."
          },
          {
            title: "كتابة عربية أصيلة",
            text: "اقرأ عربيّتهم قبل التوقيع. اللغة المترجمة تفضح نفسها من السطر الأول، والجمهور يلتقطها فوراً."
          },
          {
            title: "منهج يمكن تتبعه",
            text: "ينبغي أن تستطيع إعادة سرد طريقة عملهم بجملة واحدة: قراءة السياق، ثم رسالة مركزية واحدة، ثم نشر وتكرار منضبط. الغموض في المنهج ينعكس غموضاً في العمل."
          },
          {
            title: "علاقات إعلامية قوامها المادة لا المجاملة",
            text: "العلاقة مع غرفة الأخبار تستمر ما دامت المواد دقيقة وقابلة للنشر؛ أما العلاقات القائمة على الخدمات المتبادلة فلا تصمد أمام قصة صعبة."
          },
          {
            title: "قدرة إنتاجية بمعيار واحد",
            text: "البيان يحتاج حوله تصميماً وصورة وفيديو. اسأل من ينتج هذه المواد وبأي معيار؛ فتوزّع العمل بين موردين متفرقين هو الموضع الذي تنحرف فيه الرسالة."
          },
          {
            title: "قياس صادق",
            text: "مؤشرات واقعية يُتفق عليها قبل بدء العمل: حضور الرسالة في التغطية، واتساقها عبر القنوات، وجودة الظهور الإعلامي. من يعدك بأرقام دقيقة مبهرة قبل أن يبدأ، فهو يخترعها."
          }
        ]
      },
      {
        heading: "أسئلة تطرحها في الاجتماع الأول",
        paragraphs: [
          "الاجتماع الأول يكشف أكثر مما يكشفه العرض المكتوب. اطرح أسئلة لا تُجاب بشريحة جاهزة:"
        ],
        bullets: [
          {
            title: "«ما الذي تنصحوننا بألا نقوله؟»",
            text: "الشريك الجاد يحذف قبل أن يضيف. إذا كانت كل أفكارك ممتازة في نظرهم فأنت أمام منفّذ لا مستشار."
          },
          {
            title: "«من يكتب موادنا بالعربية ومن يكتبها بالإنجليزية؟»",
            text: "أسماء وأدوار محددة، لا أقسام. وأقوى إجابة أن اللغتين تخرجان من مكتب واحد برسالة واحدة."
          },
          {
            title: "«كيف سنعرف أن العمل نجح؟»",
            text: "أنصت للمؤشرات الواقعية لا للضمانات. الإجابة الأمينة تذكر أيضاً ما لا يمكن قياسه."
          },
          {
            title: "«أرونا رسالة حافظتم على اتساقها شهوراً»",
            text: "الانضباط عبر الزمن أصعب ما في هذه المهنة، وأسهل ما يمكن التحقق منه في الأعمال المنشورة."
          },
          {
            title: "«من سيعمل على حسابنا تحديداً؟»",
            text: "الفريق الذي يقدّم العرض ليس دائماً الفريق الذي ينفّذ العمل."
          }
        ]
      },
      {
        heading: "إشارات تحذير تُنهي التفاوض",
        bullets: [
          {
            title: "أرقام مخترعة",
            text: "إحصاءات دقيقة عن الوصول أو الانطباع دون مصدر يمكن التحقق منه. من يخترع الأرقام ليكسبك سيخترعها ليحتفظ بك."
          },
          {
            title: "لا أعمال منشورة",
            text: "السرية قد تفسّر غياب دراسة حالة واحدة، لكنها لا تفسّر سجلاً عاماً فارغاً."
          },
          {
            title: "غياب العمل بلغتين",
            text: "لغة ركيكة أو مترجمة في أي من اللغتين تعني أن رسالتك لن تصمد أمام الجمهورين معاً."
          },
          {
            title: "الضجيج بوصفه خطة",
            text: "«سنجعلكم حاضرين في كل مكان» ليست استراتيجية. السؤال الصحيح: ما الرسالة التي ستتكرر، ولماذا؟"
          },
          {
            title: "ضمان النشر",
            text: "لا أحد يملك قرار غرف الأخبار المستقلة. من يضمن لك التغطية يصف محتوى مدفوعاً — أو يضللك."
          }
        ]
      },
      {
        heading: "كيف تحكم على الإثبات؟",
        paragraphs: [
          "الإثبات في هذه المهنة عمل منشور: مواد تجدها بنفسك وتقرؤها وتعرف صاحبها. انظر في مجمل الأعمال لا في قطعة واحدة: هل تبدو المؤسسة الواحدة بصوت واحد عبر شهور من البيانات والمنشورات؟ وهل عملت الشركة مع جهات تفرض معاييرُها الدقةَ، كالمنظمات الدولية؟ ثم ضع اللغتين جنباً إلى جنب واحكم بنفسك.",
          "باتريكس شركة علاقات عامة واتصال استراتيجي مقرّها طرابلس، ليبيا، تعمل بالعربية والإنجليزية من مكتب واحد، ومن أعمالها المنشورة عملها مع بعثة الأمم المتحدة للدعم في ليبيا وشبكة أعمال موصياد. ونفضّل أن تُقاس أعمالنا بهذه القائمة نفسها: فإثباتنا أعمال منشورة، لا وعود."
        ]
      }
    ],
    relatedService: {
      label: "العلاقات العامة في ليبيا",
      href: "/ar/services/pr-agency-libya"
    },
    langSwitch: {
      label: "Read this page in English",
      href: "/insights/how-to-choose-pr-agency-libya"
    },
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بما تريد أن يفهمه جمهورك، ونصمم نحن كيفية وصوله.",
      buttonLabel: "ابدأ مشروعاً"
    },
    breadcrumb: {
      home: "الرئيسية",
      hub: "المقالات",
      label: "كيف تختار شركة علاقات عامة في ليبيا"
    }
  },

  /* ------------------------------------------------------------------ */
  /* EN — What strategic communications means for Libyan institutions    */
  /* ------------------------------------------------------------------ */
  {
    slug: "strategic-communications-libyan-institutions",
    locale: "en",
    path: "/insights/strategic-communications-libyan-institutions",
    title: "What Strategic Communications Means for Libyan Institutions | Pattrix",
    metaDescription:
      "What strategic communications means for Libyan institutions: message architecture, channel order, and the discipline that turns publishing into strategy.",
    ogTitle: "Strategic Communications for Libyan Institutions — Pattrix",
    ogDescription:
      "What separates strategic communications from ad-hoc publicity: message architecture, channel order, and consistency under scrutiny.",
    eyebrow: "Insights — Strategic Communications",
    h1: "What strategic communications means for Libyan institutions",
    datePublished: "2026-07-23",
    intro:
      "Most institutions in Libya do not lack communication activity. Ministries publish statements, missions post updates, organizations run pages. What is often missing is the system behind the activity — a reason each statement exists, an order in which messages appear, and a discipline that keeps them consistent. That system is what strategic communications means, and for institutions whose words carry consequence, it is the difference between being understood and being filtered out as noise.",
    sections: [
      {
        heading: "Publicity reacts. Strategy decides.",
        paragraphs: [
          "Ad-hoc publicity is easy to recognize: a statement when something happens, a post when there is a photo, a burst of activity around an event, then silence. Each item may be well produced, but nothing connects them. The audience is left to assemble the institution's story on its own — and audiences do not do that work.",
          "Strategic communications inverts the order. It answers three questions before any material is produced: what should be said, to whom, and in what sequence. Once those answers exist, every statement, post, and appearance becomes an instance of the same message rather than a new improvisation. Attention is never won by volume; it is won by pattern — a clear message, repeated with discipline, until it becomes memory."
        ]
      },
      {
        heading: "Message architecture comes first",
        bullets: [
          {
            title: "One central message",
            text: "A single sentence the institution needs its audience to retain. If it cannot be stated plainly, no volume of publishing will compensate for it."
          },
          {
            title: "Derived messages, not parallel ones",
            text: "Channel and audience variants are derived from the central message — never invented alongside it. This is what prevents drift between what leadership says, what the pages publish, and what appears in coverage."
          },
          {
            title: "Language that withstands accountability",
            text: "Institutional language is quoted, screenshotted, and challenged. Every public sentence should be written as if it will be read back to the institution — because it will be."
          }
        ]
      },
      {
        heading: "Channel order in Libya matters more than channel count",
        paragraphs: [
          "In Libya's media environment, attention is split between traditional channels and social platforms, and no institution can be present everywhere at equal strength. The practical question is not how many channels to run but in what order a message travels: where it is stated first as the official record, where it is explained, and where it is repeated.",
          "Sequence signals seriousness. When an announcement appears on an institution's official channel before it circulates elsewhere, the institution owns its own record. When the order is reversed — when audiences learn of a decision from commentary before they hear it from the institution itself — the correction costs more effort than the original message would have."
        ]
      },
      {
        heading: "Consistency under scrutiny",
        paragraphs: [
          "Institutions carry requirements commercial campaigns never meet: precision in detail, official language, and consistency between what is said in Arabic and what is said in English. A gap between the two versions of a statement is not a translation problem; publics read it as a difference in intent.",
          "This is why Arabic material should be written natively rather than translated, with the message held constant across languages. Our work with the United Nations Support Mission in Libya was built on that requirement — bilingual institutional media across governance dialogues, official announcements, and public discussion formats, produced to one disciplined visual language."
        ]
      },
      {
        heading: "What a strategic communication system includes",
        bullets: [
          {
            title: "Positioning",
            text: "The place the institution holds in its audience's mind, defined before any campaign — and what genuinely distinguishes it."
          },
          {
            title: "Message architecture",
            text: "The central message and its derived variants for each channel and audience, documented so anyone speaking for the institution draws from the same source."
          },
          {
            title: "Audience and channel planning",
            text: "Who is being addressed, where their attention actually lives in the Libyan context, and the order in which channels carry each announcement."
          },
          {
            title: "A publishing rhythm",
            text: "A steady, sustainable cadence — not bursts around events followed by silence. Regularity itself communicates stability."
          },
          {
            title: "Realistic measurement",
            text: "Indicators agreed before work begins: whether the message appears in coverage, how consistently it holds across channels, and how stable the institutional narrative stays over time."
          }
        ]
      },
      {
        heading: "Where to begin",
        paragraphs: [
          "None of this requires a large department to start. It requires a decision to stop treating communication as a series of reactions. A useful first exercise: write the one sentence your institution needs its public to retain this year, then audit the last month of published material against it. Count how many items carry that sentence in any form. The gap between those two numbers is the distance between activity and strategy.",
          "Pattrix is a strategic communications and PR agency based in Tripoli, Libya, working with institutions, brands, and international organizations across the country and beyond. If the system described here is the one your institution is missing, our strategic communications page explains how we build it."
        ]
      }
    ],
    relatedService: {
      label: "Strategic communications in Libya",
      href: "/services/strategic-communications-libya"
    },
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your institution needs its audience to understand, and we'll design how it travels.",
      buttonLabel: "Start a project"
    },
    breadcrumb: {
      home: "Home",
      hub: "Insights",
      label: "Strategic Communications for Libyan Institutions"
    }
  },

  /* ------------------------------------------------------------------ */
  /* EN — PR vs Marketing: What Businesses in Libya Actually Need        */
  /* ------------------------------------------------------------------ */
  {
    slug: "pr-vs-marketing-libya",
    locale: "en",
    path: "/insights/pr-vs-marketing-libya",
    title: "PR vs Marketing: What Businesses in Libya Actually Need | Pattrix",
    metaDescription:
      "PR builds trust; marketing builds demand. A practical guide to when a business in Libya needs one, the other, or both working under one strategy.",
    ogTitle: "PR vs Marketing in Libya — Pattrix",
    ogDescription:
      "When a business in Libya needs marketing execution, when it needs public relations, and when it needs both under one strategy — an honest decision guide.",
    eyebrow: "Insights — Decision Guide",
    h1: "PR vs marketing: what businesses in Libya actually need",
    datePublished: "2026-07-23",
    intro:
      "Businesses in Libya looking for outside help usually search for one of two things: a marketing agency or a PR agency. The terms get used interchangeably, but they are different instruments doing different jobs — and hiring the wrong one spends budget on the wrong problem. This guide states the difference between public relations and marketing in Libya plainly, walks through the situations Libyan businesses actually face, and offers an honest way to decide what you need: marketing execution, public relations, or both working under one strategy.",
    sections: [
      {
        heading: "Two different jobs, in plain terms",
        paragraphs: [
          "Marketing builds demand. It puts a product, service, or offer in front of the people most likely to act on it, and gives them a clear reason to act now. Campaigns, social media content, launch promotion, retail material — all of it answers one question: why should someone choose you this month?",
          "Public relations builds trust. It manages how your organization appears when it speaks in public — media presence, announcements, the way you respond when something goes wrong. It answers a different question: why should the public believe you at all?",
          "Neither is superior, and neither replaces the other. But they fail the same way: as noise. A promotion nobody was prepared to trust, or a press presence with nothing behind it to buy, is volume without pattern — and attention is never won by volume."
        ]
      },
      {
        heading: "Three situations businesses in Libya actually face",
        bullets: [
          {
            title: "Launching a product or offer",
            text: "This is mostly a marketing job: define the audience, build the campaign, produce the content, publish at a disciplined rhythm. PR supports it only if the launch says something about the organization itself that the public needs to hear."
          },
          {
            title: "Entering the market",
            text: "A new company, or an international organization arriving in Libya, needs to be understood before it can be promoted. That is positioning and public relations first: who you are, why you are here, and why your word can be trusted. Marketing spend before that answer exists tends to buy reach without recognition."
          },
          {
            title: "A moment of public scrutiny",
            text: "A complaint spreading online, a dispute becoming public, a decision that needs explaining — this is public relations territory. Marketing louder through it makes it worse; what the moment demands is a precise statement, a clear spokesperson, and consistency until the questions stop."
          }
        ]
      },
      {
        heading: "A short decision guide",
        paragraphs: [
          "Before choosing an agency, answer four questions honestly. They tell you more than any pitch will."
        ],
        bullets: [
          {
            title: "Is the problem demand or trust?",
            text: "If people know you and believe you but are not buying, you need marketing. If people would buy but hesitate to believe you — or do not know what you stand for — you need public relations in Libya first."
          },
          {
            title: "How expensive is a public mistake?",
            text: "If a wrong word in public would cost real standing — as it does for financial institutions, health providers, and organizations with international partners — you need PR discipline in place before any campaign runs."
          },
          {
            title: "What will you measure?",
            text: "Sales, inquiries, and footfall this quarter point to marketing. The stability of your reputation over years points to public relations. Be honest about which number your business actually depends on."
          },
          {
            title: "Who is the audience?",
            text: "Consumers choosing between offers are a marketing audience. Media, institutions, partners, and regulators are a PR audience. Most established businesses in Libya are speaking to both — which is where the next section matters."
          }
        ]
      },
      {
        heading: "Why the honest answer is often both — under one strategy",
        paragraphs: [
          "The division between PR and marketing is real at the level of execution, but the strategy above them must be one. A campaign that promises what the public record contradicts undermines both; a reputation with no commercial offer behind it earns respect and no revenue. What holds them together is message discipline: one clear central message, from which both the campaign material and the public statements are derived — never the other way around.",
          "In Libya's media environment, where attention is split between traditional channels and social platforms, this matters more, not less. Audiences see your promotion and your public conduct in the same feed, minutes apart. If they do not match, the audience resolves the contradiction for you — usually against you.",
          "Our own work shows the dependency clearly. When we produced commercial campaigns for Albaraka Insurance — app promotion, direct offers, branded print — the demand-side work only functioned because it carried the same visual and editorial discipline as everything else the institution published. Demand work rests on trust work, even when nobody labels it that way."
        ]
      },
      {
        heading: "Where Pattrix stands",
        paragraphs: [
          "Pattrix is a strategic communications and PR agency in Tripoli, Libya, with full production capability, working with brands, institutions, and international organizations across Libya and beyond. In practice that means the strategy defines the message, and then marketing campaigns, public relations, social media, and content production carry it out — in Arabic and English, from one desk.",
          "We take marketing engagements, PR engagements, and combined ones. Which you need is exactly the question we start every engagement with — and if the honest answer is that you only need one of the two, that is the answer you will get."
        ]
      }
    ],
    relatedService: {
      label: "Marketing agency in Tripoli, Libya",
      href: "/services/marketing-agency-tripoli"
    },
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us what your business needs — demand, trust, or both — and we'll design the system that delivers it.",
      buttonLabel: "Start a project"
    },
    breadcrumb: { home: "Home", hub: "Insights", label: "PR vs Marketing in Libya" }
  },

  /* ------------------------------------------------------------------ */
  /* EN — Market & media analysis before campaigns                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "analysis-before-campaigns-libya",
    locale: "en",
    path: "/insights/analysis-before-campaigns-libya",
    counterpartPath: "/ar/insights/analysis-before-campaigns-libya",
    title: "Market & Media Analysis in Libya: Why Campaigns Fail | Pattrix",
    metaDescription:
      "What a serious analysis layer looks like before any campaign in Libya: media landscape, audience reading, positioning, agreed indicators — and its honest limits.",
    ogTitle: "Market & Media Analysis in Libya — Pattrix",
    ogDescription:
      "Why campaigns fail without analysis: media landscape, audience and channel reading, positioning, and agreed indicators — before anything is produced.",
    eyebrow: "Insights — Analysis & Strategy",
    h1: "Market and media analysis in Libya: why campaigns fail without it",
    datePublished: "2026-07-23",
    intro:
      "Most campaigns that fail in Libya do not fail at the production stage. The films are competent, the designs are clean, the budget was fully spent. They fail earlier — at the moment someone decided what to say and where to say it without first reading the market, the media, or the audience. Analysis is the unglamorous layer under every campaign that works: it never appears in the final material, but its absence always does.",
    sections: [
      {
        heading: "Why campaigns fail before they launch",
        paragraphs: [
          "The most common briefing mistake is a brief that opens with deliverables — a video, a set of posts, a launch event — before anyone has answered the questions underneath: who must be reached, what do they currently believe, and through which channels do they actually pay attention? When those questions are skipped, the campaign becomes noise: activity without a pattern.",
          "Skipping analysis rarely feels like a mistake at the time. It feels like speed. The cost appears later — a message aimed at an audience that behaves differently than assumed, channels chosen by habit rather than evidence, and no agreed way to judge, after launch, whether any of it worked."
        ]
      },
      {
        heading: "Reading the media landscape",
        paragraphs: [
          "Media analysis in Libya starts from a simple fact: attention is fragmented. It is split between television, radio, the press, and social platforms — and it is distributed differently for every audience. A serious media reading is therefore specific, not general."
        ],
        bullets: [
          {
            title: "Channel mapping",
            text: "Which channels your specific audience actually follows — not which channels exist. A ministry's audience and a retail audience live in different media worlds."
          },
          {
            title: "Credibility mapping",
            text: "Which outlets and voices carry weight with that audience — because a message travels on borrowed trust before it earns its own."
          },
          {
            title: "Rhythm and timing",
            text: "When attention is available, what competes for it, and how long a message realistically holds before it needs reinforcement."
          },
          {
            title: "Competitor communication",
            text: "What others in your space are saying, where, and how often — so your message occupies ground that is actually free."
          }
        ]
      },
      {
        heading: "Audience analysis: who you are actually addressing",
        paragraphs: [
          "Audience analysis is where most assumptions die. The audience in the brief is usually an average; the audience in reality is specific."
        ],
        bullets: [
          {
            title: "Behavior over demographics",
            text: "Age and city describe people; they do not predict what those people watch, trust, or share. Define segments by how they actually behave."
          },
          {
            title: "Language reality",
            text: "Arabic-first for the public, bilingual for institutional and international audiences — and the message must hold identical meaning in both."
          },
          {
            title: "The existing belief",
            text: "Every audience already believes something about you or your category. Analysis names that belief, because the campaign either builds on it or must move it."
          },
          {
            title: "The question they are asking",
            text: "The strongest campaigns answer a question the audience already has, rather than shouting an answer nobody asked for."
          }
        ]
      },
      {
        heading: "Positioning and message before production",
        paragraphs: [
          "Analysis has one destination: positioning. Once the media landscape and the audience are read, an organization can decide what place it holds in its audience's mind and what genuinely distinguishes it. From that position comes one central message — and from that message everything else is derived: channel messages, materials, sequence.",
          "This order matters. When production comes first, analysis is retrofitted to justify what was already made. When analysis comes first, production becomes easier, faster, and cheaper — because every asset has a job it was designed to do."
        ]
      },
      {
        heading: "Agree the indicators before launch — then read the results",
        paragraphs: [
          "The measurement conversation belongs before the campaign, not after it. Agreeing on indicators in advance — presence of the message in coverage, consistency across channels, quality of media presence, movement on the specific behavior the campaign exists to change — protects everyone from the two classic failures: declaring victory with vanity numbers, or declaring failure against a target nobody ever set.",
          "After launch, the same analysis layer produces the campaign readout: what the response actually showed, which channels carried the message and which did not, and what should change in the next phase. A campaign that is never read teaches nothing; the next one starts from zero."
        ]
      },
      {
        heading: "The honest limits of analysis",
        paragraphs: [
          "Analysis should be trusted for what it is, not sold as what it is not. In a market where reliable public data is scarce, honest market analysis in Libya is a structured reading of what is observable — the media landscape, channel behavior, published communication, an organization's own channel performance — combined with judgment built from working in this environment. A precise-looking number from a weak source is worse than an honest range.",
          "And analysis informs judgment; it does not replace it. It narrows the options, exposes the weak assumptions, and raises the quality of the decision — but someone still has to decide. At Pattrix, a strategic communications and PR agency in Tripoli, Libya, this analysis layer sits underneath our strategy and positioning work: every engagement begins by reading the context, because the right message in the wrong context does not arrive."
        ]
      }
    ],
    relatedService: {
      label: "Market & Media Analysis in Libya",
      href: "/services/market-analysis-libya"
    },
    langSwitch: {
      label: "اقرأ هذه الصفحة بالعربية",
      href: "/ar/insights/analysis-before-campaigns-libya"
    },
    cta: {
      heading: "Let's make the next pattern.",
      text: "Tell us the decision you are facing, and we'll read the context before anything is produced.",
      buttonLabel: "Start a project"
    },
    breadcrumb: {
      home: "Home",
      hub: "Insights",
      label: "Market and Media Analysis in Libya"
    }
  },

  /* ------------------------------------------------------------------ */
  /* AR — تحليل السوق والإعلام قبل الحملات                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "analysis-before-campaigns-libya",
    locale: "ar",
    path: "/ar/insights/analysis-before-campaigns-libya",
    counterpartPath: "/insights/analysis-before-campaigns-libya",
    title: "تحليل السوق والإعلام في ليبيا: لماذا تفشل الحملات بدونه؟ | باتريكس",
    metaDescription:
      "ما الذي يعنيه تحليل السوق والإعلام في ليبيا قبل إطلاق أي حملة: قراءة المشهد الإعلامي، دراسة الجمهور، التموضع، ومؤشرات متفق عليها — وحدود التحليل الصادقة.",
    ogTitle: "تحليل السوق والإعلام في ليبيا — باتريكس",
    ogDescription:
      "الحملات لا تفشل عند الإنتاج بل قبله: كيف تُقرأ السوق والإعلام والجمهور قبل صرف أي ميزانية.",
    eyebrow: "المقالات — التحليل والاستراتيجية",
    h1: "تحليل السوق والإعلام في ليبيا: لماذا تفشل الحملات بدونه؟",
    datePublished: "2026-07-23",
    intro:
      "أغلب الحملات التي تفشل في ليبيا لا تفشل عند مرحلة الإنتاج؛ فالفيديو مُتقن، والتصاميم نظيفة، والميزانية صُرفت كاملة. الفشل يقع قبل ذلك: في اللحظة التي تقرر فيها جهة ما ماذا تقول وأين تقوله، دون قراءة مسبقة للسوق والإعلام والجمهور. التحليل هو الطبقة غير المرئية تحت كل حملة ناجحة: لا يظهر في المادة النهائية، لكن غيابه يظهر دائماً.",
    sections: [
      {
        heading: "لماذا تفشل الحملات قبل انطلاقها؟",
        paragraphs: [
          "أكثر الأخطاء شيوعاً أن يبدأ التكليف من المخرجات — فيديو، سلسلة منشورات، فعالية إطلاق — قبل الإجابة عن الأسئلة التي تحتها: من الجمهور الذي يجب الوصول إليه؟ وماذا يعتقد اليوم؟ وعبر أي قنوات ينتبه فعلاً؟ حين تُتجاوز هذه الأسئلة تتحول الحملة إلى ضجيج: نشاط بلا نمط.",
          "تجاوز التحليل لا يبدو خطأً في حينه، بل يبدو سرعة. غير أن الثمن يظهر لاحقاً: رسالة موجهة إلى جمهور يتصرف بخلاف ما افتُرض، وقنوات اختيرت بالعادة لا بالدليل، ولا معيار متفقاً عليه للحكم على النتيجة بعد الإطلاق."
        ]
      },
      {
        heading: "قراءة المشهد الإعلامي",
        paragraphs: [
          "يبدأ تحليل الإعلام في ليبيا من حقيقة بسيطة: الانتباه موزّع بين التلفزيون والإذاعة والصحافة ومنصات التواصل، ويتوزع بصورة مختلفة لكل جمهور. لذلك تكون القراءة الجادة للمشهد قراءة محددة لا عامة."
        ],
        bullets: [
          {
            title: "خريطة القنوات",
            text: "أي القنوات يتابعها جمهورك تحديداً — لا أي القنوات موجودة. جمهور المؤسسة الرسمية وجمهور متجر التجزئة يعيشان في عالمين إعلاميين مختلفين."
          },
          {
            title: "خريطة المصداقية",
            text: "أي المنابر والأصوات تحمل وزناً عند هذا الجمهور، لأن الرسالة تصل أولاً محمولةً على ثقة مستعارة قبل أن تكسب ثقتها الخاصة."
          },
          {
            title: "الإيقاع والتوقيت",
            text: "متى يتوفر الانتباه، وما الذي ينافس عليه، وكم تصمد الرسالة واقعياً قبل أن تحتاج إلى تعزيز."
          },
          {
            title: "اتصال المنافسين",
            text: "ماذا يقول الآخرون في المجال نفسه، وأين، وبأي وتيرة — حتى تحتل رسالتك مساحة شاغرة فعلاً."
          }
        ]
      },
      {
        heading: "دراسة الجمهور: من تخاطب فعلاً؟",
        paragraphs: [
          "دراسة الجمهور هي المرحلة التي تسقط فيها أغلب الافتراضات؛ فالجمهور في التكليف متوسط حسابي، أما الجمهور في الواقع فمحدد الملامح."
        ],
        bullets: [
          {
            title: "السلوك قبل الديموغرافيا",
            text: "العمر والمدينة يصفان الناس، لكنهما لا يتنبآن بما يشاهدونه ويثقون به ويشاركونه. عرّف الشرائح بسلوكها الفعلي."
          },
          {
            title: "واقع اللغة",
            text: "العربية أولاً للجمهور العام، ولغتان للجمهور المؤسسي والدولي — على أن تحمل الرسالة المعنى نفسه في اللغتين."
          },
          {
            title: "الاعتقاد القائم",
            text: "كل جمهور يعتقد شيئاً مسبقاً عنك أو عن مجالك. التحليل يسمّي هذا الاعتقاد، لأن الحملة إما أن تبني عليه وإما أن تضطر إلى تحريكه."
          },
          {
            title: "السؤال الحاضر",
            text: "أقوى الحملات تجيب عن سؤال يطرحه الجمهور أصلاً، بدل أن تصرخ بإجابة لم يسأل عنها أحد."
          }
        ]
      },
      {
        heading: "التموضع والرسالة قبل الإنتاج",
        paragraphs: [
          "للتحليل وجهة واحدة: التموضع. بعد قراءة المشهد الإعلامي ودراسة الجمهور تستطيع المؤسسة أن تحدد المكانة التي تريد أن تحتلها في ذهن جمهورها، وما يميزها فعلاً عمّا سواها. من هذا التموضع تُشتق رسالة مركزية واحدة، ومن الرسالة يُشتق كل ما عداها: رسائل القنوات، والمواد، وترتيب الظهور.",
          "هذا الترتيب جوهري. حين يسبق الإنتاجُ التحليلَ يتحول التحليل إلى تبرير لما أُنتج سلفاً؛ وحين يسبق التحليلُ الإنتاجَ يصبح الإنتاج أسهل وأسرع وأقل كلفة، لأن لكل مادة مهمة صُممت لأجلها."
        ]
      },
      {
        heading: "مؤشرات قبل الإطلاق، وقراءة بعده",
        paragraphs: [
          "حديث القياس مكانه قبل الحملة لا بعدها. الاتفاق المسبق على المؤشرات — حضور الرسالة في التغطية، واتساقها عبر القنوات، وجودة الظهور الإعلامي، وتحرك السلوك المحدد الذي وُجدت الحملة لتغييره — يحمي الجميع من خطأين معروفين: إعلان النصر بأرقام شكلية، أو إعلان الفشل قياساً على هدف لم يضعه أحد.",
          "بعد الإطلاق تُنتج طبقة التحليل نفسها قراءة الحملة: ماذا أظهرت الاستجابة فعلاً، وأي القنوات حملت الرسالة وأيها لم يحملها، وما الذي ينبغي تعديله في المرحلة التالية. الحملة التي لا تُقرأ لا تعلّم شيئاً، والحملة التالية تبدأ من الصفر."
        ]
      },
      {
        heading: "حدود التحليل الصادقة",
        paragraphs: [
          "ينبغي أن يُؤخذ التحليل على حقيقته، لا على ما يُسوَّق به أحياناً. في سوق تندر فيها البيانات العامة الموثوقة، يكون تحليل السوق في ليبيا قراءة منهجية لما يمكن ملاحظته — المشهد الإعلامي، وسلوك القنوات، والاتصال المنشور، وأداء قنوات المؤسسة نفسها — مقرونة بخبرة العمل في هذه البيئة. فالرقم الدقيق الشكل من مصدر ضعيف أسوأ من نطاق صادق.",
          "ثم إن التحليل يُنير القرار ولا يحل محله: يضيّق الخيارات، ويكشف الافتراضات الضعيفة، ويرفع جودة القرار — لكن أحداً ما يظل عليه أن يقرر. في باتريكس، وهي شركة اتصال استراتيجي وعلاقات عامة مقرّها طرابلس، ليبيا، هذه الطبقة التحليلية هي الأساس الذي يقوم عليه عملنا في الاستراتيجية والتموضع: كل تعاون يبدأ بقراءة السياق، لأن الرسالة الصحيحة في السياق الخطأ لا تصل."
        ]
      }
    ],
    relatedService: {
      label: "تحليل السوق والإعلام في ليبيا",
      href: "/ar/services/market-analysis-libya"
    },
    langSwitch: {
      label: "Read this page in English",
      href: "/insights/analysis-before-campaigns-libya"
    },
    cta: {
      heading: "لنصنع النمط التالي.",
      text: "أخبرنا بالقرار الذي تواجهه، ونتولى نحن قراءة السياق قبل إنتاج أي مادة.",
      buttonLabel: "ابدأ مشروعاً"
    },
    breadcrumb: {
      home: "الرئيسية",
      hub: "المقالات",
      label: "تحليل السوق والإعلام في ليبيا"
    }
  },
];

export function getInsight(slug: string, locale: InsightLocale): InsightArticle | undefined {
  return insights.find((a) => a.slug === slug && a.locale === locale);
}
