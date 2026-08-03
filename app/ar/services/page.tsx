import type { Metadata } from "next";
import Link from "next/link";
import { arServicesIndex } from "@/content/index-pages";
import { servicePages } from "@/content/service-pages";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: arServicesIndex.metaTitle },
  description: arServicesIndex.metaDescription,
  alternates: {
    canonical: "/ar/services",
    languages: { en: "/services", ar: "/ar/services", "x-default": "/services" }
  },
  openGraph: {
    title: arServicesIndex.metaTitle,
    description: arServicesIndex.metaDescription,
    url: "/ar/services",
    siteName: site.name,
    type: "website",
    locale: "ar_AR",
    // Root opengraph-image.tsx doesn't cascade to nested segments.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

function ArServicesHubJsonLd({ pages }: { pages: typeof servicePages }) {
  const url = `${site.url}/ar/services`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: arServicesIndex.h1,
        url,
        inLanguage: "ar",
        isPartOf: { "@id": `${site.url}/#website` },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: pages.length,
          itemListElement: pages.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.breadcrumb.label,
            url: `${site.url}${p.path}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: arServicesIndex.eyebrow, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/**
 * Arabic services index. The RTL wrapper sits on <main>'s inner content rather
 * than the whole subtree, so the shared Header/Footer keep their designed LTR
 * layout — the same constraint documented in app/ar/layout.tsx.
 */
export default function ArServicesIndex() {
  const ar = servicePages.filter((p) => p.locale === "ar");

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <div lang="ar" dir="rtl" className="font-arabic">
          <header className="container-x pt-32 md:pt-40">
            <p className="eyebrow text-blue">{arServicesIndex.eyebrow}</p>
            <h1 className="display mt-8 max-w-[16em] text-[clamp(2.2rem,5.5vw,4.6rem)]">
              {arServicesIndex.h1}
            </h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
              {arServicesIndex.intro}
            </p>
          </header>

          <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
            <div className="grid items-start gap-8 md:grid-cols-2">
              {ar.map((p) => (
                <Link
                  key={p.path}
                  href={p.path}
                  className="group block rounded-2xl border border-hairline bg-surface p-8 transition-colors duration-200 hover:border-blue/40 md:p-10"
                >
                  <p className="eyebrow text-ink-3">{p.eyebrow}</p>
                  <h2 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                    {p.breadcrumb.label}
                  </h2>
                  <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                    {p.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="container-x mt-16 md:mt-20">
          <Link
            href="/services"
            className="inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
          >
            English
          </Link>
        </div>
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
      <ArServicesHubJsonLd pages={ar} />
    </>
  );
}
