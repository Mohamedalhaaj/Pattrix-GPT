import type { Metadata } from "next";
import Link from "next/link";
import { servicesIndex } from "@/content/index-pages";
import { servicePages } from "@/content/service-pages";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: servicesIndex.metaTitle },
  description: servicesIndex.metaDescription,
  alternates: {
    canonical: "/services",
    languages: { en: "/services", ar: "/ar/services", "x-default": "/services" }
  },
  // Without this the page inherits the root layout's og:url and would share as
  // the homepage.
  openGraph: {
    title: servicesIndex.metaTitle,
    description: servicesIndex.metaDescription,
    url: "/services",
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

/**
 * Hub-level structured data, mirroring the /insights hub: CollectionPage +
 * ItemList so the relationship between this index and the service pages is
 * explicit, plus its own two-level BreadcrumbList. Service pages themselves now
 * point their middle crumb here (see components/seo/service-json-ld.tsx).
 */
function ServicesHubJsonLd({ pages }: { pages: typeof servicePages }) {
  const url = `${site.url}/services`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: servicesIndex.h1,
        url,
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
          { "@type": "ListItem", position: 2, name: "Services", item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/**
 * Services index — a typographic list of the English service pages.
 * Server-rendered; existing design tokens only (no new visual systems).
 */
export default function ServicesIndex() {
  const en = servicePages.filter((p) => p.locale === "en");

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <header className="container-x pt-32 md:pt-40">
          <p className="eyebrow text-blue">{servicesIndex.eyebrow}</p>
          <h1 className="display mt-8 max-w-[14em] text-[clamp(2.4rem,6vw,5.2rem)]">
            {servicesIndex.h1}
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
            {servicesIndex.intro}
          </p>
        </header>

        <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
          <div className="grid items-start gap-8 md:grid-cols-2">
            {en.map((p) => (
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

        {/* prefetch is off: prefetching an /ar route pulls its font CSS, which
            downloads the whole Arabic family — and this page has no
            --font-arabic variable to render it with, so those bytes could never
            reach the screen. Same reasoning as the /insights hub. */}
        <div className="container-x mt-16 md:mt-20">
          <Link
            href="/ar/services"
            prefetch={false}
            lang="ar"
            dir="rtl"
            className="inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
          >
            الخدمات بالعربية
          </Link>
        </div>
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
      <ServicesHubJsonLd pages={en} />
    </>
  );
}
