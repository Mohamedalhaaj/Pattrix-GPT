# SEO Service Page Architecture — Pattrix (Libya)

> Status: **PLANNING ONLY.** Do not implement without Mohamed's explicit
> approval. Prepared 2026-07-05. Companion to `SEO_LIBYA_KEYWORD_MAP.md`.

## Architecture principles

1. **One route group:** `app/services/[slug]` (EN) and `app/ar/services/[slug]`
   (AR), content-driven from `content/services-pages.ts` — same pattern as
   `content/projects.ts` → `/work/[slug]`. No hardcoded copy in components.
2. **Same Pattrix identity.** Service pages reuse the existing design system
   (Pattern Field aesthetic, chapter typography, existing components). No new
   visual language; this is an SEO/content architecture, not a redesign.
3. **Not doorway pages.** Each page must carry genuinely different content:
   its own service explanation, named systems, relevant case-study proof,
   process, and FAQs. Six thin lookalike pages would hurt more than help.
4. **Tripoli, Libya disambiguation** on every page (title + H1 or first
   paragraph) because "Tripoli" alone often means Lebanon in SERPs.
5. **Arabic is a first-class version, not a translation afterthought.**
   `/ar/` pages need `dir="rtl"`, `lang="ar"`, native Arabic copy (no machine
   translation), and `hreflang` pairs (`en` ↔ `ar` + `x-default` → EN).
6. **Every page gets:** unique title/meta/canonical (existing metadata
   pattern), breadcrumbs, `Service` JSON-LD referencing
   `https://pattrix.co/#organization` as `provider`, and a contact CTA.
7. **Sitemap + internal linking:** add routes to `app/sitemap.ts`; link from
   the homepage services section (each of the six existing service cards
   links to its page) and from the footer. Case studies link back to the
   relevant service page ("Systems used" → service pages).

## Language priority

**Arabic-first for PR/strategic communications; English-first for
institutional/international audiences.** Practical order: ship EN P1 pages
first (fast, site is EN today), then immediately the AR P1 pair before any
P2 English page. Local buyers search Arabic; UNSMIL-type clients search
English. Both matter, in that order per cluster (see keyword map rollout).

---

## English pages

### 1. `/services/pr-agency-libya`
- **Target keyword:** PR agency Libya (+ public relations agency Libya, PR agency Tripoli)
- **Title:** `PR Agency in Libya — Public Relations & Media | Pattrix`
- **H1:** `A public relations agency in Tripoli, Libya`
- **Meta description:** `Pattrix is a PR agency in Tripoli, Libya. Public relations, media coordination, and news coverage for brands, institutions, and international organizations.`
- **Outline:** What we do (PR & media system) → Who it's for (institutions, international orgs, market leaders) → How we work (press relations, coordinated coverage, scrutiny-proof communication) → Proof (UNSMIL, MUSIAD) → Process → FAQ → CTA
- **FAQs:** What does a PR agency in Libya actually do? · Do you work in Arabic and English? · Do you work with international organizations? · How do you measure PR results? · Do you cover events outside Tripoli?
- **Internal links:** ← homepage services card, footer; → UNSMIL + MUSIAD case studies, strategic-communications page, contact
- **Priority:** EN first (institutional buyers), AR pair immediately after

### 2. `/services/strategic-communications-libya`
- **Target keyword:** strategic communications Libya (+ communications agency Libya, brand communication Libya, campaign strategy Libya)
- **Title:** `Strategic Communications Agency in Libya | Pattrix`
- **H1:** `Strategic communications for brands and institutions in Libya`
- **Meta description:** `Strategy, positioning, and campaign architecture from Tripoli, Libya. Pattrix builds communication systems institutions and audiences actually respond to.`
- **Outline:** What strategic communications means (pattern > volume) → Strategy system (positioning, message architecture, channel planning) → Campaign architecture → Institutional communication expertise → Proof (UNSMIL) → FAQ → CTA
- **FAQs:** What's the difference between PR and strategic communications? · How do you build a campaign for the Libyan media environment? · Do you work with government/international institutions? · What does an engagement look like?
- **Internal links:** ← homepage hero/eyebrow region, PR page; → UNSMIL case study, campaign-planning article, contact
- **Priority:** EN first — flagship page

### 3. `/services/social-media-management-libya`
- **Target keyword:** social media management Libya (+ social media agency Libya)
- **Title:** `Social Media Management in Libya | Pattrix`
- **H1:** `Social media management with editorial discipline`
- **Meta description:** `Platform strategy, page management, and short-form content for companies in Libya. Pattrix runs social channels to campaign standards — in Arabic and English.`
- **Outline:** Always-on with a strategy (not posts for their own sake) → What's included (platform strategy, management, reels/short-form, reporting) → Bilingual content → Proof (Tripoli Optics reels, Albaraka) → FAQ → CTA
- **FAQs:** Which platforms matter most in Libya? · Do you produce the content or only schedule it? · Can you manage Arabic and English channels? · What does reporting look like?
- **Internal links:** ← homepage services card; → Tripoli Optics + Albaraka case studies, content-production page, contact
- **Priority:** AR version equally important (see AR-4) — ship as a pair

### 4. `/services/event-coverage-tripoli`
- **Target keyword:** event coverage Tripoli (+ event coverage Libya)
- **Title:** `Event Coverage in Tripoli, Libya — Photo, Video & Media | Pattrix`
- **H1:** `Event coverage in Tripoli, delivered end-to-end`
- **Meta description:** `Photography, film, and media coverage for forums, conferences, and business events in Tripoli, Libya — planned, produced, and published by Pattrix.`
- **Outline:** End-to-end coverage (pre-event planning → shooting → edit → publishing) → Event types (forums, panels, business gatherings) → Real proof (MUSIAD, executive forums — existing photography) → Deliverables & turnaround → FAQ → CTA
- **FAQs:** What's included in event coverage? · How fast are deliverables ready? · Do you livestream or publish same-day? · Do you cover events outside Tripoli?
- **Internal links:** ← homepage About proof images; → MUSIAD case study, production page, contact
- **Priority:** AR pair high value — local event bookers search Arabic

### 5. `/services/content-production-libya`
- **Target keyword:** content production Libya (+ video production Tripoli)
- **Title:** `Content & Video Production in Libya | Pattrix`
- **H1:** `In-house production, built to campaign discipline`
- **Meta description:** `Film, photography, and digital content produced in-house in Tripoli, Libya. Pattrix produces what the strategy needs — from reels to institutional films.`
- **Outline:** Strategy owns production (differentiator vs production houses) → Capabilities (film, photography, reels, post) → Producing for institutions vs brands → Proof (Tripoli Optics, Hyundai) → FAQ → CTA
- **FAQs:** Do you have in-house crews and equipment? · What formats do you produce? · Can production be booked without a full campaign? · How do revisions work?
- **Internal links:** ← social + event pages; → Tripoli Optics + Hyundai case studies, contact
- **Priority:** EN P3; AR pair P3-AR

### 6. `/services/marketing-agency-tripoli`
- **Target keyword:** marketing agency Tripoli (+ marketing agency Libya)
- **Title:** `Marketing Agency in Tripoli, Libya — Strategy First | Pattrix`
- **H1:** `A strategy-first marketing agency in Tripoli`
- **Meta description:** `Looking for a marketing agency in Tripoli? Pattrix pairs marketing execution with strategic communications — campaigns, content, social, and events that hold together.`
- **Outline:** How Pattrix differs from a typical marketing agency (pattern/strategy positioning — honest bridge, no bait-and-switch) → Services map (campaigns, social, production, events) → When you need marketing vs communications → Proof (Hyundai, Albaraka) → FAQ → CTA
- **FAQs:** Are you a marketing agency or a PR agency? · What budgets do you work with? (answer references the public $500–$10,000 range) · Do you run ad campaigns? · How do we start?
- **Internal links:** ← homepage; → PR page, strategic-communications page, commercial case studies, contact
- **Priority:** P2 — after both P1 pairs

---

## Arabic pages (`/ar/services/…`)

Same six-page structure; each mirrors its English sibling's outline but is
written natively in Arabic (never machine-translated), RTL, with Arabic FAQs
phrased the way Libyans actually search. hreflang pairs bind each EN/AR pair.

### 7. `/ar/services/pr-agency-libya` — شركة علاقات عامة
- **Target:** شركة علاقات عامة في ليبيا / في طرابلس · **Priority: P1-AR (ship right after EN P1)**
- **Title:** `شركة علاقات عامة في طرابلس، ليبيا — باتريكس (Pattrix)`
- **H1:** `شركة علاقات عامة في طرابلس، ليبيا`
- **Meta:** `باتريكس شركة علاقات عامة واتصال استراتيجي في طرابلس، ليبيا. علاقات إعلامية، تغطية إخبارية، وحملات اتصال للمؤسسات والعلامات التجارية.`
- **Outline:** ما الذي تقدمه شركة علاقات عامة → لمن نعمل (مؤسسات، منظمات دولية، علامات تجارية) → طريقة العمل → أعمال موثقة (UNSMIL بالعربية والإنجليزية) → أسئلة شائعة → تواصل
- **FAQs:** ماذا تفعل شركة العلاقات العامة تحديداً؟ · هل تعملون بالعربية والإنجليزية؟ · هل تتعاملون مع مؤسسات دولية؟ · كيف تقاس نتائج العلاقات العامة؟
- **Internal links:** → دراسة حالة UNSMIL، صفحة الاتصال الاستراتيجي AR، تواصل

### 8. `/ar/services/strategic-communications-libya` — الاتصال الاستراتيجي
- **Target:** اتصالات استراتيجية ليبيا · حملات إعلامية ليبيا · إدارة حملات إعلانية ليبيا · **Priority: P1-AR**
- **Title:** `الاتصال الاستراتيجي والحملات الإعلامية في ليبيا — باتريكس`
- **H1:** `اتصال استراتيجي وحملات إعلامية للمؤسسات في ليبيا`
- **Meta:** `استراتيجية الرسائل، بناء الحملات الإعلامية، وإدارتها باحترافية من طرابلس. باتريكس تصمم الاتصال الذي تفهمه الجماهير وتثق به المؤسسات.`
- **Outline:** معنى الاتصال الاستراتيجي → نظام الاستراتيجية → بناء الحملات وإدارتها → البيئة الإعلامية الليبية → أعمال → أسئلة شائعة → تواصل
- **FAQs:** ما الفرق بين العلاقات العامة والاتصال الاستراتيجي؟ · كيف تُبنى حملة إعلامية في ليبيا؟ · هل تديرون حملات إعلانية مدفوعة؟

### 9. `/ar/services/social-media-management-libya` — السوشيال ميديا
- **Target:** إدارة صفحات التواصل الاجتماعي ليبيا · إدارة السوشيال ميديا ليبيا · **Priority: P2-AR**
- **Title:** `إدارة صفحات التواصل الاجتماعي في ليبيا | باتريكس`
- **H1:** `إدارة سوشيال ميديا بانضباط تحريري`
- **Meta:** `إدارة احترافية لصفحات التواصل الاجتماعي للشركات والمؤسسات في ليبيا: استراتيجية المنصات، المحتوى القصير، والتقارير — بالعربية والإنجليزية.`
- **Outline:** الإدارة باستراتيجية → ماذا تشمل الخدمة → المحتوى ثنائي اللغة → أعمال (Tripoli Optics) → أسئلة شائعة → تواصل
- **FAQs:** ما المنصات الأهم في ليبيا؟ · هل تنتجون المحتوى أم تجدولونه فقط؟ · كيف تكون التقارير؟

### 10. `/ar/services/event-coverage-tripoli` — تغطية الفعاليات
- **Target:** تغطية فعاليات طرابلس · **Priority: P2-AR**
- **Title:** `تغطية فعاليات في طرابلس — تصوير وفيديو وإعلام | باتريكس`
- **H1:** `تغطية فعاليات في طرابلس من التخطيط إلى النشر`
- **Meta:** `تغطية إعلامية متكاملة للمؤتمرات والمنتديات وفعاليات الأعمال في طرابلس: تصوير فوتوغرافي وفيديو ونشر احترافي.`
- **Outline:** تغطية متكاملة → أنواع الفعاليات → أعمال حقيقية (MUSIAD ومنتديات) → التسليمات والمدد → أسئلة شائعة → تواصل
- **FAQs:** ماذا تشمل التغطية؟ · متى تُسلَّم المواد؟ · هل تغطون فعاليات خارج طرابلس؟

### 11. `/ar/services/content-production-libya` — إنتاج المحتوى
- **Target:** إنتاج محتوى ليبيا · إنتاج فيديو طرابلس · **Priority: P3-AR**
- **Title:** `إنتاج محتوى وفيديو في ليبيا | باتريكس`
- **H1:** `إنتاج داخلي بمعايير الحملات`
- **Meta:** `أفلام، تصوير، ومحتوى رقمي يُنتج داخلياً في طرابلس، ليبيا — من الريلز إلى الأفلام المؤسسية، وفق ما تتطلبه الاستراتيجية.`
- **Outline:** الاستراتيجية تقود الإنتاج → القدرات → أعمال → أسئلة شائعة → تواصل
- **FAQs:** هل لديكم فرق ومعدات داخلية؟ · ما الصيغ التي تنتجونها؟ · هل يمكن حجز الإنتاج فقط؟

### 12. `/ar/services/marketing-agency-tripoli` — وكالة تسويق
- **Target:** وكالة تسويق في ليبيا / في طرابلس · **Priority: P2-AR**
- **Title:** `وكالة تسويق في طرابلس، ليبيا — استراتيجية قبل التنفيذ | باتريكس`
- **H1:** `وكالة تسويق في طرابلس تبدأ من الاستراتيجية`
- **Meta:** `باتريكس وكالة تسويق واتصال في طرابلس، ليبيا: حملات، محتوى، سوشيال ميديا وفعاليات — مبنية على استراتيجية واضحة لا على الضجيج.`
- **Outline:** كيف نختلف عن وكالة التسويق التقليدية → خريطة الخدمات → متى تحتاج تسويقاً ومتى تحتاج اتصالاً → أعمال تجارية → أسئلة شائعة → تواصل
- **FAQs:** هل أنتم وكالة تسويق أم علاقات عامة؟ · ما حجم الميزانيات التي تعملون بها؟ · هل تديرون إعلانات ممولة؟

---

## Technical checklist for implementation (when approved)

- [ ] `content/services-pages.ts` (EN+AR content objects, one source of truth)
- [ ] `app/services/[slug]/page.tsx` + `app/ar/services/[slug]/page.tsx` with
      `generateStaticParams` + `generateMetadata` (canonical + hreflang alternates)
- [ ] `dir="rtl"` and `lang="ar"` handling for `/ar` (layout-level)
- [ ] Arabic font check (Archivo has no Arabic — needs an approved Arabic
      typeface decision before AR pages ship; do not improvise the brand's
      Arabic type)
- [ ] `Service` JSON-LD per page (provider → `#organization`)
- [ ] Add all routes to `app/sitemap.ts`; homepage service cards + footer links
- [ ] Playwright tests: each page 200, one H1, canonical/hreflang correct
- [ ] No changes to the existing homepage chapters beyond linking

**Requires Mohamed's approval before implementation:** the six EN pages, the
six AR pages, the Arabic typeface choice, and any nav/footer link additions.
