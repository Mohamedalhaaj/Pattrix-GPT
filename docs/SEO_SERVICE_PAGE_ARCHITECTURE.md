# SEO Service Page Architecture — Pattrix (Libya)

> Status: **IMPLEMENTED AND LIVE.** Prepared 2026-07-05 as a plan; approved and
> shipped since. All 14 pages (7 EN + 7 AR) are live and in the sitemap, driven
> by `content/service-pages.ts`. Companion to `SEO_LIBYA_KEYWORD_MAP.md`.
>
> This file is now a **record of what shipped**, not a proposal. The copy below
> was reconciled against `content/service-pages.ts` on 2026-08-05; where the two
> disagreed, the code was treated as the source of truth, because it is what
> Google has crawled. Change the code first, then update this file to match.

## Architecture principles

1. **One route group:** `app/services/[slug]` (EN) and `app/ar/services/[slug]`
   (AR), content-driven from `content/services-pages.ts` — same pattern as
   `content/projects.ts` → `/work/[slug]`. No hardcoded copy in components.
2. **Same Pattrix identity.** Service pages reuse the existing design system
   (Pattern Field aesthetic, chapter typography, existing components). No new
   visual language; this is an SEO/content architecture, not a redesign.
3. **Not doorway pages.** Each page must carry genuinely different content:
   its own service explanation, named systems, relevant case-study proof,
   process, and FAQs. Thin lookalike pages would hurt more than help.
4. **Tripoli, Libya disambiguation** on every page (title + H1 or first
   paragraph) because "Tripoli" alone often means Lebanon in SERPs.
   **Refined in implementation (7ae90b9), and this is the rule to follow:** the
   constraint was only ever that *Tripoli* is ambiguous — not that *Libya*
   belongs everywhere. Carrying "Libya" in the title AND the H1 of every
   page read as keyword stuffing. So:
   - **Titles always keep the geo.** That is the search-result surface and the
     geo-intent signal.
   - **An H1 that says "Tripoli" keeps "Tripoli, Libya"** — that is the actual
     disambiguation doing real work.
   - **An H1 that does not say "Tripoli" drops "Libya"** — the title already
     carries it, and the H1 is what a human reads.
   Applied to EN and AR alike. Do not reintroduce geo into an H1 without
   revisiting this; several H1s below were revised specifically to satisfy it.
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
- **H1:** `Strategic communications for brands and institutions`
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
- **H1:** `Event coverage in Tripoli, Libya — delivered end-to-end`
- **Meta description:** `Photography, film, and media coverage for forums, conferences, and business events in Tripoli, Libya — planned, produced, and published by Pattrix.`
- **Outline:** End-to-end coverage (pre-event planning → shooting → edit → publishing) → Event types (forums, panels, business gatherings) → Real proof (MUSIAD, executive forums — existing photography) → Deliverables & turnaround → FAQ → CTA
- **FAQs:** What's included in event coverage? · How fast are deliverables ready? · Do you livestream or publish same-day? · Do you cover events outside Tripoli?
- **Internal links:** ← homepage About proof images; → MUSIAD case study, production page, contact
- **Priority:** AR pair high value — local event bookers search Arabic

### 5. `/services/content-production-libya`
- **Target keyword:** content production Libya (+ video production Tripoli)
- **Title:** `Content & Video Production in Libya | Pattrix`
- **H1:** `In-house content and video production, built to campaign discipline`
  - _Revision (2026-07-24, review pass) — **approved 2026-08-05.** H1 extended
    from "In-house production, built to campaign discipline" to carry the target
    keyword. Its geo clause ("in Libya") was superseded by the geo rule in
    principle 4: this H1 does not say "Tripoli", so the title carries the geo
    instead. The keyword — "content and video production" — was the revision's
    main point and is live._
- **Meta description:** `Film, photography, and digital content produced in-house in Tripoli, Libya. Pattrix produces what the strategy needs — from reels to institutional films.`
- **Outline:** Strategy owns production (differentiator vs production houses) → Capabilities (film, photography, reels, post) → Producing for institutions vs brands → Proof (Tripoli Optics, Hyundai) → FAQ → CTA
- **FAQs:** Do you have in-house crews and equipment? · What formats do you produce? · Can production be booked without a full campaign? · How do revisions work?
- **Internal links:** ← social + event pages; → Tripoli Optics + Hyundai case studies, contact
- **Priority:** EN P3; AR pair P3-AR

### 6. `/services/marketing-agency-tripoli`
- **Target keyword:** marketing agency Tripoli (+ marketing agency Libya)
- **Title:** `Marketing Agency in Tripoli, Libya — Strategy First | Pattrix`
- **H1:** `A strategy-first marketing agency in Tripoli, Libya`
- **Meta description:** `Looking for a marketing agency in Tripoli? Pattrix pairs marketing execution with strategic communications — campaigns, content, social, and events that hold together.`
- **Outline:** How Pattrix differs from a typical marketing agency (pattern/strategy positioning — honest bridge, no bait-and-switch) → Services map (campaigns, social, production, events) → When you need marketing vs communications → Proof (Hyundai, Albaraka) → FAQ → CTA
- **FAQs:** Are you a marketing agency or a PR agency? · What budgets do you work with? (answer references the public $500–$10,000 range) · Do you run ad campaigns? · How do we start?
- **Internal links:** ← homepage; → PR page, strategic-communications page, commercial case studies, contact
- **Priority:** P2 — after both P1 pairs

### 7. `/services/market-analysis-libya`
- **Target keyword:** market analysis Libya (+ media analysis Libya, audience research Libya)
- **Title:** `Market & Media Analysis in Libya — Audience & Campaigns | Pattrix`
- **H1:** `Market and media analysis for brands and institutions`
- **Meta description:** `Market, media, and audience analysis from Tripoli, Libya. Pattrix reads the media landscape, audiences, and campaign response — the layer under every strategy.`
- **Outline:** Why analysis comes before spending → What the analysis layer includes → How analysis feeds strategy and campaigns → CTA
- **FAQs:** What does market and media analysis at Pattrix include? · Do you run surveys or field research? · Can analysis be commissioned on its own? · How do you analyze campaign results? · Do you analyze Arabic and English media?
- **Proof:** UNSMIL, Albaraka insurance campaigns
- **Internal links:** → strategic-communications page; ← `/insights/analysis-before-campaigns-libya`
- **Priority:** shipped in Phase 2 alongside the insights cluster

---

## Arabic pages (`/ar/services/…`)

Same seven-page structure; each mirrors its English sibling's outline but is
written natively in Arabic (never machine-translated), RTL, with Arabic FAQs
phrased the way Libyans actually search. hreflang pairs bind each EN/AR pair.

### 8. `/ar/services/pr-agency-libya` — شركة علاقات عامة
- **Target:** شركة علاقات عامة في ليبيا / في طرابلس · **Priority: P1-AR (ship right after EN P1)**
- **Title:** `شركة علاقات عامة في طرابلس، ليبيا — باتريكس (Pattrix)`
- **H1:** `شركة علاقات عامة في طرابلس، ليبيا`
- **Meta:** `باتريكس شركة علاقات عامة واتصال استراتيجي في طرابلس، ليبيا. علاقات إعلامية، تغطية إخبارية، وحملات اتصال للمؤسسات والعلامات التجارية.`
- **Outline:** ما الذي تقدمه شركة علاقات عامة → لمن نعمل (مؤسسات، منظمات دولية، علامات تجارية) → طريقة العمل → أعمال موثقة (UNSMIL بالعربية والإنجليزية) → أسئلة شائعة → تواصل
- **FAQs:** ماذا تفعل شركة العلاقات العامة تحديداً؟ · هل تعملون بالعربية والإنجليزية؟ · هل تتعاملون مع مؤسسات دولية؟ · كيف تقاس نتائج العلاقات العامة؟
- **Internal links:** → دراسة حالة UNSMIL، صفحة الاتصال الاستراتيجي AR، تواصل

### 9. `/ar/services/strategic-communications-libya` — الاتصال الاستراتيجي
- **Target:** اتصالات استراتيجية ليبيا · حملات إعلامية ليبيا · إدارة حملات إعلانية ليبيا · **Priority: P1-AR**
- **Title:** `الاتصال الاستراتيجي والحملات الإعلامية في ليبيا — باتريكس`
- **H1:** `اتصال استراتيجي وحملات إعلامية للمؤسسات`
- **Meta:** `استراتيجية الرسائل، بناء الحملات الإعلامية، وإدارتها باحترافية من طرابلس. باتريكس تصمم الاتصال الذي تفهمه الجماهير وتثق به المؤسسات.`
- **Outline:** معنى الاتصال الاستراتيجي → نظام الاستراتيجية → بناء الحملات وإدارتها → البيئة الإعلامية الليبية → أعمال → أسئلة شائعة → تواصل
- **FAQs:** ما الفرق بين العلاقات العامة والاتصال الاستراتيجي؟ · كيف تُبنى حملة إعلامية في ليبيا؟ · هل تديرون حملات إعلانية مدفوعة؟

### 10. `/ar/services/social-media-management-libya` — السوشيال ميديا
- **Target:** إدارة صفحات التواصل الاجتماعي ليبيا · إدارة السوشيال ميديا ليبيا · **Priority: P2-AR**
- **Title:** `إدارة صفحات التواصل الاجتماعي في ليبيا | باتريكس`
- **H1:** `إدارة سوشيال ميديا بانضباط تحريري`
- **Meta:** `إدارة احترافية لصفحات التواصل الاجتماعي للشركات والمؤسسات في ليبيا: استراتيجية المنصات، المحتوى القصير، والتقارير — بالعربية والإنجليزية.`
- **Outline:** الإدارة باستراتيجية → ماذا تشمل الخدمة → المحتوى ثنائي اللغة → أعمال (Tripoli Optics) → أسئلة شائعة → تواصل
- **FAQs:** ما المنصات الأهم في ليبيا؟ · هل تنتجون المحتوى أم تجدولونه فقط؟ · كيف تكون التقارير؟

### 11. `/ar/services/event-coverage-tripoli` — تغطية الفعاليات
- **Target:** تغطية فعاليات طرابلس · **Priority: P2-AR**
- **Title:** `تغطية فعاليات في طرابلس — تصوير وفيديو وإعلام | باتريكس`
- **H1:** `تغطية الفعاليات في طرابلس، ليبيا — من التخطيط إلى النشر`
- **Meta:** `تغطية إعلامية متكاملة للمؤتمرات والمنتديات وفعاليات الأعمال في طرابلس: تصوير فوتوغرافي وفيديو ونشر احترافي.`
- **Outline:** تغطية متكاملة → أنواع الفعاليات → أعمال حقيقية (MUSIAD ومنتديات) → التسليمات والمدد → أسئلة شائعة → تواصل
- **FAQs:** ماذا تشمل التغطية؟ · متى تُسلَّم المواد؟ · هل تغطون فعاليات خارج طرابلس؟

### 12. `/ar/services/content-production-libya` — إنتاج المحتوى
- **Target:** إنتاج محتوى ليبيا · إنتاج فيديو طرابلس · **Priority: P3-AR**
- **Title:** `إنتاج محتوى وفيديو في ليبيا | باتريكس`
- **H1:** `إنتاج محتوى وفيديو بمعايير الحملات`
- **Meta:** `إنتاج فيديو ومحتوى في ليبيا: أفلام، تصوير، ومحتوى رقمي يُنتج داخلياً في طرابلس، ليبيا — من الريلز إلى الأفلام المؤسسية، وفق ما تتطلبه الاستراتيجية.`
  - _Revision (2026-07-24, review pass) — **approved 2026-08-05.** H1 extended
    from "إنتاج داخلي بمعايير الحملات" and the Meta lead-in added. The Meta is
    live as written; the H1 keeps the "إنتاج محتوى وفيديو" keyword but not
    "في ليبيا", per the geo rule in principle 4 — the title carries the geo._
- **Outline:** الاستراتيجية تقود الإنتاج → القدرات → أعمال → أسئلة شائعة → تواصل
- **FAQs:** هل لديكم فرق ومعدات داخلية؟ · ما الصيغ التي تنتجونها؟ · هل يمكن حجز الإنتاج فقط؟

### 13. `/ar/services/marketing-agency-tripoli` — وكالة تسويق
- **Target:** وكالة تسويق في ليبيا / في طرابلس · **Priority: P2-AR**
- **Title:** `وكالة تسويق في طرابلس، ليبيا — استراتيجية قبل التنفيذ | باتريكس`
- **H1:** `وكالة تسويق في طرابلس، ليبيا تبدأ من الاستراتيجية`
- **Meta:** `باتريكس وكالة تسويق واتصال في طرابلس، ليبيا: حملات، محتوى، سوشيال ميديا وفعاليات — مبنية على استراتيجية واضحة لا على الضجيج.`
- **Outline:** كيف نختلف عن وكالة التسويق التقليدية → خريطة الخدمات → متى تحتاج تسويقاً ومتى تحتاج اتصالاً → أعمال تجارية → أسئلة شائعة → تواصل
- **FAQs:** هل أنتم وكالة تسويق أم علاقات عامة؟ · ما حجم الميزانيات التي تعملون بها؟ · هل تديرون إعلانات ممولة؟

### 14. `/ar/services/market-analysis-libya` — تحليل السوق والإعلام
- **Target:** تحليل السوق ليبيا · تحليل إعلامي ليبيا · دراسة الجمهور
- **Title:** `تحليل السوق والإعلام في ليبيا — دراسة الجمهور والحملات | باتريكس`
- **H1:** `تحليل السوق والإعلام للمؤسسات والعلامات التجارية`
- **Meta:** `تحليل السوق والمشهد الإعلامي ودراسة الجمهور في ليبيا من طرابلس. باتريكس تقرأ السياق قبل أي إنفاق: القنوات، والتموضع، وتحليل الحملات — كطبقة أولى لكل استراتيجية.`
- **Outline:** لماذا يسبق التحليل الإنفاق؟ → ماذا تشمل طبقة التحليل لدينا → كيف يغذي التحليل الاستراتيجية والحملات → تواصل
- **FAQs:** ماذا يشمل تحليل السوق والإعلام لدى باتريكس؟ · هل تجرون استطلاعات رأي أو بحوثاً ميدانية؟ · هل يمكن طلب التحليل وحده؟ · كيف تحللون نتائج الحملات؟ · هل تحللون الإعلام بالعربية والإنجليزية؟
- **Proof:** بعثة الأمم المتحدة للدعم في ليبيا، حملات البركة للتأمين
- **Internal links:** → صفحة الاتصال الاستراتيجي؛ ← `/ar/insights/analysis-before-campaigns-libya`
- **Priority:** شُحنت في المرحلة الثانية مع مجموعة المقالات

---

## Technical checklist — all shipped

- [x] `content/service-pages.ts` (EN+AR content objects, one source of truth).
      Note the filename: `service-pages.ts`, not `services-pages.ts` as planned above.
- [x] `app/(en)/services/[slug]/page.tsx` + `app/(ar)/ar/services/[slug]/page.tsx`
      with `generateStaticParams` + `generateMetadata` (canonical + hreflang alternates)
- [x] `dir="rtl"` and `lang="ar"` handling for `/ar` — resolved better than
      planned: `/ar` has its own **root layout** (`app/(ar)/layout.tsx`), so
      `dir`/`lang` sit on `<html>` itself rather than an inner wrapper
- [x] Arabic typeface: **IBM Plex Sans Arabic** (400/500/600, `arabic` subset),
      owned by `app/(ar)/ar/layout.tsx` so next/font scopes its preload to
      `/ar/*`. Latin runs on Arabic pages fall through to Archivo
- [x] `Service` JSON-LD per page (provider → `#organization`)
- [x] All routes in `app/sitemap.ts`, now with `hreflang` alternates; homepage
      service cards + footer links, in **both** locales
- [x] Playwright: each page 200, one H1, canonical/hreflang correct (71 tests)
- [x] No changes to the existing homepage chapters beyond linking

Beyond the original plan, since shipped:

- [x] Seventh pair added — `market-analysis-libya` (§7 / §14), with the
      `/insights` cluster linking into it
- [x] Service pages carry a **Related reading** block, derived by inverting each
      article's own `relatedService`, so the insights↔services linking runs both
      ways rather than only outward
- [x] Case studies link "Systems used" back to service pages, in both locales

## Open

- [ ] Captions (`<track>`) for the case-study videos. A Level A gap on the
      Arabic-language commercials; needs real transcription, so it is not
      something to generate — see the note in `app/(en)/work/[slug]/page.tsx`.
