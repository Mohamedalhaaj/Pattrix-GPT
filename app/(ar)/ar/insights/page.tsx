import type { Metadata } from "next";
import Link from "next/link";
import { arInsightsIndex } from "@/content/index-pages";
import { insights } from "@/content/insights";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: arInsightsIndex.metaTitle },
  description: arInsightsIndex.metaDescription,
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights", "x-default": "/insights" }
  },
  openGraph: {
    title: arInsightsIndex.metaTitle,
    description: arInsightsIndex.metaDescription,
    url: "/ar/insights",
    siteName: site.name,
    type: "website",
    locale: "ar_AR",
    // Root opengraph-image.tsx doesn't cascade to nested segments.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

function ArInsightsHubJsonLd({ articles }: { articles: typeof insights }) {
  const url = `${site.url}/ar/insights`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: arInsightsIndex.h1,
        url,
        inLanguage: "ar",
        isPartOf: { "@id": `${site.url}/#website` },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.h1,
            url: `${site.url}${a.path}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: arInsightsIndex.eyebrow, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** Arabic insights index — RTL wrapper on the content only, per app/ar/layout.tsx. */
export default function ArInsightsIndex() {
  const ar = insights.filter((a) => a.locale === "ar");
  const dateLabel = (iso: string) =>
    new Intl.DateTimeFormat("ar", { dateStyle: "long" }).format(new Date(iso));

  return (
    <>
      <Header locale="ar" />
      <main id="main" className="content-layer">
        <div lang="ar" dir="rtl" className="font-arabic">
          <header className="container-x pt-32 md:pt-40">
            <p className="eyebrow text-blue">{arInsightsIndex.eyebrow}</p>
            <h1 className="display mt-8 max-w-[16em] text-[clamp(2.2rem,5.5vw,4.6rem)]">
              {arInsightsIndex.h1}
            </h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
              {arInsightsIndex.intro}
            </p>
          </header>

          <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
            <div className="grid items-start gap-8 md:grid-cols-2">
              {ar.map((a) => (
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
                    <time dateTime={a.datePublished}>{dateLabel(a.datePublished)}</time>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="container-x mt-16 md:mt-20">
          <Link
            href="/insights"
            className="inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
          >
            English
          </Link>
        </div>
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer locale="ar" />
      </div>
      <ArInsightsHubJsonLd articles={ar} />
    </>
  );
}
