import Image from "next/image";
import Link from "next/link";
import type { ServicePage } from "@/content/service-pages";
import { arServicesIndex } from "@/content/index-pages";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Shared body for /services/* and /ar/services/* so the two locales can never
 * drift structurally. Server-rendered, existing design tokens only.
 *
 * RTL scope: `dir="rtl"`/`lang="ar"` is applied on this <article>, NOT on a
 * layout wrapper — the shared Header/Footer must keep their designed LTR
 * layout on Arabic pages (wrapping them would visually flip the header).
 */
export function ServiceArticle({ page }: { page: ServicePage }) {
  const isAr = page.locale === "ar";
  // Same three values ServiceJsonLd computes, so the visible trail and the
  // structured data can never disagree.
  const homeHref = isAr ? "/ar" : "/";
  const hubHref = isAr ? "/ar/services" : "/services";
  const hubLabel = isAr ? arServicesIndex.eyebrow : "Services";
  const proof = page.proofProjects
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article
      lang={isAr ? "ar" : undefined}
      dir={isAr ? "rtl" : undefined}
      className={isAr ? "font-arabic" : undefined}
    >
      {/* ---- page header ---- */}
      <header className="container-x pt-32 md:pt-40">
        {/* Three crumbs, matching the BreadcrumbList in service-json-ld.tsx.
            The middle one was previously missing from the visible trail and the
            home crumb pointed at the English home even on Arabic pages, so an
            Arabic reader following "الرئيسية" left the locale entirely. */}
        <p className="eyebrow flex flex-wrap items-center gap-3 text-ink-3">
          <Link href={homeHref} className="text-ink-2 transition-colors duration-200 hover:text-blue">
            {page.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={hubHref} className="text-ink-2 transition-colors duration-200 hover:text-blue">
            {hubLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-blue-ink">{page.eyebrow}</span>
        </p>
        <h1 className="display mt-8 max-w-[14em] text-[clamp(2.4rem,6vw,5.2rem)]">{page.h1}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">{page.intro}</p>
        <p className="mt-8">
          {/* prefetch is off on purpose. Next prefetches in-viewport links, and
              prefetching the counterpart-language route pulled in its font CSS,
              which then matched the `font-arabic` class on this one link and
              downloaded the whole IBM Plex Sans Arabic family (~194KB) on every
              English page view. The switcher is a rare click; it can load on
              demand. */}
          <Link
            href={page.langSwitch.href}
            prefetch={false}
            lang={isAr ? "en" : "ar"}
            dir={isAr ? "ltr" : "rtl"}
            className={`text-sm font-medium text-ink-2 underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-blue ${isAr ? "" : "font-arabic"}`}
          >
            {page.langSwitch.label}
          </Link>
        </p>
      </header>

      {/* ---- content sections ---- */}
      <div className="container-x mt-20 flex flex-col gap-16 border-t border-hairline pt-16 md:mt-24 md:gap-20 md:pt-20">
        {page.sections.map((section) => (
          <section key={section.heading} className="grid gap-8 md:grid-cols-12">
            <h2 className="display-sub text-2xl md:col-span-4 md:text-3xl">{section.heading}</h2>
            <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
              {section.paragraphs?.map((text) => (
                <p key={text.slice(0, 32)} className="prose-measure text-base leading-relaxed text-ink-2 md:text-lg">
                  {text}
                </p>
              ))}
              {section.bullets ? (
                <ul className="flex flex-col gap-5">
                  {section.bullets.map((item) => (
                    <li key={item.title} className="flex items-baseline gap-3">
                      <span
                        className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-blue"
                        aria-hidden="true"
                      />
                      <p className="prose-measure text-base leading-relaxed text-ink-2">
                        <strong className="font-semibold text-ink">{item.title}</strong>
                        {isAr ? ": " : " — "}
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      {/* ---- proof: existing case studies only ---- */}
      {proof.length > 0 ? (
        <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
          <h2 className="display-sub text-2xl md:text-3xl">{page.proofHeading}</h2>
          <p className="prose-measure mt-4 text-base leading-relaxed text-ink-2">{page.proofLead}</p>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
            {proof.map((project) => {
              /**
               * An Arabic service page links to the Arabic case study and shows
               * the Arabic copy whenever that translation exists. Previously
               * every card on /ar/services/* pointed at /work/<slug> and
               * rendered the English title and premise under a hard
               * `dir="ltr" lang="en"`, so the strongest proof block on the page
               * dropped the reader out of the locale mid-page.
               *
               * Only some projects carry an `ar` block, and /ar/work/<slug>
               * exists only for those (see the route's generateStaticParams) —
               * so an untranslated project still links to its English study and
               * keeps the LTR override that its English copy genuinely needs.
               */
              const ar = isAr ? project.ar : undefined;
              const href = ar ? `/ar/work/${project.slug}` : `/work/${project.slug}`;
              const title = ar?.title ?? project.title;
              const premise = ar?.premise ?? project.premise;
              const copyIsArabic = Boolean(ar);
              return (
                <Link
                  key={project.slug}
                  href={href}
                  className="group block overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors duration-200 hover:border-blue/40"
                >
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt={
                        ar?.coverAlt ??
                        (copyIsArabic ? title : project.coverAlt ?? `${project.title} — selected work`)
                      }
                      width={project.coverW ?? 1600}
                      height={project.coverH ?? 1000}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="w-full"
                    />
                  ) : null}
                  <div
                    className="p-6"
                    dir={copyIsArabic ? "rtl" : "ltr"}
                    lang={copyIsArabic ? "ar" : "en"}
                  >
                    <p className="display-sub text-lg transition-colors duration-200 group-hover:text-blue md:text-xl">
                      {title}
                    </p>
                    <p className="prose-measure mt-2 text-sm leading-relaxed text-ink-2">{premise}</p>
                    <p className="mt-4 text-sm font-semibold text-blue-ink" dir={isAr ? "rtl" : "ltr"} lang={page.locale}>
                      {page.proofCtaLabel}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* ---- FAQ (content only — no FAQPage schema by design) ---- */}
      <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
        <h2 className="display-sub text-2xl md:text-3xl">{page.faqHeading}</h2>
        <dl className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="display-sub text-lg text-ink">{faq.q}</dt>
              <dd className="prose-measure mt-3 text-base leading-relaxed text-ink-2" style={{ marginInlineStart: 0 }}>
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---- CTA + related ---- */}
      <div className="container-x mb-8 mt-20 md:mt-24">
        <div className="flex flex-col gap-8 rounded-2xl border border-hairline bg-surface p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="display-sub text-2xl md:text-3xl">{page.cta.heading}</p>
            <p className="prose-measure mt-3 text-base leading-relaxed text-ink-2">{page.cta.text}</p>
          </div>
          <a
            href={`mailto:${site.contact.email}`}
            className="shrink-0 self-start rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue md:self-auto"
          >
            {page.cta.buttonLabel}
          </a>
        </div>
        <div className="flex justify-start py-10">
          <CtaLink href={page.related.href}>{page.related.label}</CtaLink>
        </div>
      </div>
    </article>
  );
}
