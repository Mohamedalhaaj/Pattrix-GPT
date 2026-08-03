import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { arWorkIndex } from "@/content/index-pages";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { PatternCover } from "@/components/work/pattern-cover";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: arWorkIndex.metaTitle },
  description: arWorkIndex.metaDescription,
  alternates: {
    canonical: "/ar/work",
    languages: { en: "/work", ar: "/ar/work", "x-default": "/work" }
  },
  openGraph: {
    title: arWorkIndex.metaTitle,
    description: arWorkIndex.metaDescription,
    url: "/ar/work",
    siteName: site.name,
    type: "website",
    locale: "ar_AR",
    // Root opengraph-image.tsx doesn't cascade to nested segments.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

function ArWorkHubJsonLd({ items }: { items: typeof projects }) {
  const url = `${site.url}/ar/work`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: arWorkIndex.metaTitle,
        url,
        inLanguage: "ar",
        isPartOf: { "@id": `${site.url}/#website` },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: items.length,
          itemListElement: items.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.ar?.title ?? p.title,
            url: `${site.url}/ar/work/${p.slug}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: arWorkIndex.eyebrow, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** Arabic case-study index. Only projects with an `ar` block appear. */
export default function ArWorkIndex() {
  const items = projects.filter((p) => p.ar);

  return (
    <>
      <Header locale="ar" />
      <main id="main" className="content-layer">
        <header className="container-x pt-32 md:pt-40">
          <p className="eyebrow text-blue">{arWorkIndex.eyebrow}</p>
          <h1 className="display mt-8 max-w-[14em] text-[clamp(2.2rem,5.5vw,4.6rem)]">
            {arWorkIndex.h1}
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
            {arWorkIndex.intro}
          </p>
        </header>

        <div className="container-x mt-20 border-t border-hairline pt-16 md:mt-24 md:pt-20">
          <div className="grid items-start gap-10 md:grid-cols-2">
            {items.map((project, i) => (
              <article key={project.slug} className="group">
                <Link
                  href={`/ar/work/${project.slug}`}
                  className="block"
                  aria-label={project.ar!.title}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-hairline">
                    {project.cover ? (
                      <div
                        className={`relative aspect-[3/2] w-full overflow-hidden ${
                          project.coverFit === "contain" ? "bg-white" : ""
                        }`}
                      >
                        <Image
                          src={project.cover}
                          alt={project.ar!.coverAlt ?? project.ar!.title}
                          fill
                          sizes="(min-width: 768px) 46vw, 100vw"
                          className={`transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] ${
                            project.coverFit === "contain" ? "object-contain p-2" : "object-cover"
                          }`}
                        />
                      </div>
                    ) : (
                      <PatternCover
                        slug={project.slug}
                        accent={project.accent}
                        title={project.ar!.title}
                        variant={(i % 3) as 0 | 1 | 2}
                        className="aspect-[16/10] w-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="eyebrow mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
                    <span className="text-blue">{project.ar!.category}</span>
                    <span aria-hidden="true">·</span>
                    <span dir="ltr">{project.year}</span>
                  </p>
                  <h2 className="display-sub mt-3 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                    {project.ar!.title}
                  </h2>
                  <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                    {project.ar!.premise}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer locale="ar" />
      </div>
      <ArWorkHubJsonLd items={items} />
    </>
  );
}
