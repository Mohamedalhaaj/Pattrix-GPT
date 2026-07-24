import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/content/insights";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: "Insights on Marketing, PR & Analysis in Libya | Pattrix" },
  description:
    "Practical guides on marketing, public relations, strategic communications, and media analysis in Libya — written by Pattrix in Tripoli, in English and Arabic.",
  alternates: { canonical: "/insights" }
};

/**
 * Insights hub — a typographic index of articles in both languages.
 * Server-rendered; existing design tokens only (no new visual systems).
 */
export default function InsightsIndex() {
  const en = insights.filter((a) => a.locale === "en");
  const ar = insights.filter((a) => a.locale === "ar");
  const dateLabel = (iso: string, locale: "en" | "ar") =>
    new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", { dateStyle: "long" }).format(
      new Date(iso)
    );

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <header className="container-x pt-32 md:pt-40">
          <p className="eyebrow text-blue">Insights</p>
          <h1 className="display mt-8 max-w-[14em] text-[clamp(2.4rem,6vw,5.2rem)]">
            Notes on communication that works in Libya
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
            Practical guides on marketing, public relations, strategic communications, and media
            analysis — written from Tripoli, in English and Arabic, for organizations that need
            their message to hold.
          </p>
        </header>

        <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
          <div className="grid items-start gap-8 md:grid-cols-2">
            {en.map((a) => (
              <Link
                key={a.path}
                href={a.path}
                className="group block rounded-2xl border border-hairline bg-surface p-8 transition-colors duration-200 hover:border-blue/40 md:p-10"
              >
                <p className="eyebrow text-ink-3">{a.eyebrow}</p>
                <h2 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                  {a.h1}
                </h2>
                <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                  {a.metaDescription}
                </p>
                <p className="mt-5 text-xs text-ink-3">
                  <time dateTime={a.datePublished}>{dateLabel(a.datePublished, "en")}</time>
                </p>
              </Link>
            ))}
          </div>
        </div>

        {ar.length > 0 ? (
          <div className="container-x mt-16 md:mt-20">
            <h2 className="display-sub font-arabic text-2xl md:text-3xl" lang="ar" dir="rtl">
              مقالات بالعربية
            </h2>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
              {ar.map((a) => (
                <Link
                  key={a.path}
                  href={a.path}
                  lang="ar"
                  dir="rtl"
                  className="group block rounded-2xl border border-hairline bg-surface p-8 font-arabic transition-colors duration-200 hover:border-blue/40 md:p-10"
                >
                  <p className="eyebrow text-ink-3">{a.eyebrow}</p>
                  <h3 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                    {a.h1}
                  </h3>
                  <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                    {a.metaDescription}
                  </p>
                  <p className="mt-5 text-xs text-ink-3">
                    <time dateTime={a.datePublished}>{dateLabel(a.datePublished, "ar")}</time>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
    </>
  );
}
