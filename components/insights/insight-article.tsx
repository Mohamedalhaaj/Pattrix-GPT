import Link from "next/link";
import type { InsightArticle as InsightArticleData } from "@/content/insights";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Shared body for /insights/* and /ar/insights/* — mirrors ServiceArticle's
 * layout system so the two article surfaces can never drift. Server-rendered,
 * existing design tokens only.
 *
 * RTL scope: `dir="rtl"`/`lang="ar"` is applied on this <article>, NOT on a
 * layout wrapper — the shared Header/Footer keep their designed LTR layout.
 */
export function InsightArticleBody({ article }: { article: InsightArticleData }) {
  const isAr = article.locale === "ar";
  const dateLabel = new Intl.DateTimeFormat(isAr ? "ar" : "en-GB", {
    dateStyle: "long"
  }).format(new Date(article.datePublished));

  return (
    <article
      lang={isAr ? "ar" : undefined}
      dir={isAr ? "rtl" : undefined}
      className={isAr ? "font-arabic" : undefined}
    >
      {/* ---- article header ---- */}
      <header className="container-x pt-32 md:pt-40">
        <p className="eyebrow flex flex-wrap items-center gap-3 text-ink-3">
          <Link href="/" className="text-ink-2 transition-colors duration-200 hover:text-blue">
            {article.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/insights" className="text-ink-2 transition-colors duration-200 hover:text-blue">
            {article.breadcrumb.hub}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-blue">{article.eyebrow}</span>
        </p>
        <h1 className="display mt-8 max-w-[16em] text-[clamp(2.2rem,5.5vw,4.6rem)]">{article.h1}</h1>
        <p className="mt-6 text-sm text-ink-3">
          <time dateTime={article.datePublished}>{dateLabel}</time>
        </p>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">{article.intro}</p>
        {article.langSwitch ? (
          <p className="mt-8">
            <Link
              href={article.langSwitch.href}
              lang={isAr ? "en" : "ar"}
              dir={isAr ? "ltr" : "rtl"}
              className={`text-sm font-medium text-ink-2 underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-blue ${isAr ? "" : "font-arabic"}`}
            >
              {article.langSwitch.label}
            </Link>
          </p>
        ) : null}
      </header>

      {/* ---- content sections ---- */}
      <div className="container-x mt-20 flex flex-col gap-16 border-t border-hairline pt-16 md:mt-24 md:gap-20 md:pt-20">
        {article.sections.map((section) => (
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

      {/* ---- CTA + related service ---- */}
      <div className="container-x mb-8 mt-20 md:mt-24">
        <div className="flex flex-col gap-8 rounded-2xl border border-hairline bg-surface p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="display-sub text-2xl md:text-3xl">{article.cta.heading}</p>
            <p className="prose-measure mt-3 text-base leading-relaxed text-ink-2">{article.cta.text}</p>
          </div>
          <a
            href={`mailto:${site.contact.email}`}
            className="shrink-0 self-start rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue md:self-auto"
          >
            {article.cta.buttonLabel}
          </a>
        </div>
        <div className="flex justify-start py-10">
          <CtaLink href={article.relatedService.href}>{article.relatedService.label}</CtaLink>
        </div>
      </div>
    </article>
  );
}
