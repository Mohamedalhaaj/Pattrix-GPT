import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { arCaseStudy, arHome } from "@/content/index-pages";
import { clients } from "@/content/clients";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { FieldCanvas } from "@/components/field/field-canvas";
import { FieldTrigger } from "@/components/field/field-trigger";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: { absolute: arHome.metaTitle },
  description: arHome.metaDescription,
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", "x-default": "/" }
  },
  openGraph: {
    title: arHome.metaTitle,
    description: arHome.metaDescription,
    url: "/ar",
    siteName: site.name,
    type: "website",
    locale: "ar_AR",
    // Root opengraph-image.tsx doesn't cascade to nested segments.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

/**
 * Arabic home page structured data. The Organization node is declared once
 * site-wide (components/seo/json-ld.tsx) and referenced by @id here rather than
 * duplicated — a second Organization would compete with the canonical one.
 */
function ArHomeJsonLd() {
  const url = `${site.url}/ar`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: arHome.metaTitle,
        description: arHome.metaDescription,
        url,
        inLanguage: "ar",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: "العربية", item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/**
 * Arabic home page — the entry point that did not exist. Reuses the Pattern
 * Field and the shipped design tokens; no new visual systems, and every claim
 * comes from copy already approved in content/index-pages.ts.
 *
 * `lang="ar" dir="rtl"` wraps the page content only, not the whole subtree, so
 * the shared Header/Footer keep their designed LTR layout — the constraint
 * documented in app/ar/layout.tsx.
 */
export default function ArabicHome() {
  const articles = insights.filter((a) => a.locale === "ar");
  const arProjects = projects.filter((p) => p.ar);

  return (
    <>
      <FieldCanvas />
      <Header locale="ar" />
      <main id="main" className="content-layer">
        <div lang="ar" dir="rtl" className="font-arabic">
          {/* Hero */}
          <section className="section-y relative" aria-labelledby="ar-hero-heading">
            <FieldTrigger
              formation="signal"
              ox={0.28}
              oy={0.38}
              energy={1}
              dim={1}
              theme="light"
            />
            <div className="container-x pt-24 md:pt-32">
              <p className="eyebrow text-blue-ink">{arHome.eyebrow}</p>
              <h1
                id="ar-hero-heading"
                className="display mt-8 max-w-[13em] text-[clamp(2.4rem,6vw,5.2rem)]"
              >
                {arHome.headline}
              </h1>
              <p className="prose-measure mt-8 text-lg leading-relaxed text-ink-2">{arHome.sub}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/ar/services"
                  className="rounded-full bg-blue px-7 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  {arHome.servicesHeading}
                </Link>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
                >
                  {arHome.contactCta}
                </a>
              </div>
            </div>
          </section>

          {/* Positioning */}
          <section className="section-y relative" aria-labelledby="ar-positioning-heading">
            <FieldTrigger
              formation="interference"
              ox={0.5}
              oy={0.5}
              energy={0.8}
              dim={0.7}
              theme="light"
            />
            <div className="container-x">
              <p className="eyebrow text-blue-ink">{arHome.positioningHeading}</p>
              <h2
                id="ar-positioning-heading"
                className="display mt-8 max-w-[15em] text-[clamp(2rem,5vw,4.2rem)]"
              >
                {arHome.statement}
              </h2>
              <p className="prose-measure mt-8 text-base leading-relaxed text-ink-2">
                {arHome.body}
              </p>
              <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
                {arHome.pillars.map((pillar, i) => (
                  <div key={pillar.title} className="bg-surface p-8 md:p-10">
                    <p className="eyebrow text-blue-ink">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display-sub mt-4 text-xl md:text-2xl">{pillar.title}</h3>
                    <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                      {pillar.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* Selected work — mirrors the English home's chapter 02. */}
          <section className="section-y relative" aria-labelledby="ar-work-heading">
            <FieldTrigger formation="orbit" ox={0.3} oy={0.45} energy={0.9} dim={0.85} theme="light" />
            <div className="container-x">
              <p className="eyebrow text-blue-ink">{arHome.workHeading}</p>
              <h2
                id="ar-work-heading"
                className="display mt-8 max-w-[15em] text-[clamp(2rem,5vw,4.2rem)]"
              >
                {arHome.workStatement}
              </h2>
              <p className="prose-measure mt-8 text-base leading-relaxed text-ink-2">
                {arHome.workSub}
              </p>
              <div className="mt-14 grid items-start gap-8 md:grid-cols-2">
                {arProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/ar/work/${project.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors duration-200 hover:border-blue/40"
                  >
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
                    ) : null}
                    <div className="p-8">
                      <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
                        <span className="text-blue-ink">{project.ar!.category}</span>
                        <span aria-hidden="true">·</span>
                        <span dir="ltr">{project.year}</span>
                      </p>
                      <h3 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                        {project.ar!.title}
                      </h3>
                      <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                        {project.ar!.premise}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-blue-ink">{arCaseStudy.readCase}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/ar/work"
                className="mt-10 inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
              >
                {arHome.allWork}
              </Link>
            </div>
          </section>

          {/* Services */}
          <section className="section-y relative" aria-labelledby="ar-services-heading">
            <FieldTrigger
              formation="lattice"
              ox={0.72}
              oy={0.42}
              energy={0.9}
              dim={0.85}
              theme="light"
            />
            <div className="container-x">
              <p className="eyebrow text-blue-ink">{arHome.servicesHeading}</p>
              <h2
                id="ar-services-heading"
                className="display mt-8 max-w-[15em] text-[clamp(2rem,5vw,4.2rem)]"
              >
                {arHome.servicesSub}
              </h2>
              {/* The six systems, exactly as the English home presents them —
                  names and summaries, no geography. This grid used to show the
                  seven SEO page titles ("… في ليبيا/طرابلس" on every card),
                  which put ~20 geo mentions in one section and contradicted
                  the heading above it ("ستة أنظمة"). The geo-targeted titles
                  belong to the /ar/services hub and the pages themselves. */}
              <div className="mt-14 grid items-start gap-8 md:grid-cols-2">
                {services.map((system) =>
                  system.href ? (
                    <Link
                      key={system.index}
                      href={`/ar${system.href}`}
                      className="group block rounded-2xl border border-hairline bg-surface p-8 transition-colors duration-200 hover:border-blue/40 md:p-10"
                    >
                      <p className="eyebrow text-ink-3">{system.index}</p>
                      <h3 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                        {system.arName}
                      </h3>
                      <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                        {system.arSummary}
                      </p>
                    </Link>
                  ) : (
                    <div
                      key={system.index}
                      className="rounded-2xl border border-hairline bg-surface p-8 md:p-10"
                    >
                      <p className="eyebrow text-ink-3">{system.index}</p>
                      <h3 className="display-sub mt-4 text-xl md:text-2xl">{system.arName}</h3>
                      <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                        {system.arSummary}
                      </p>
                    </div>
                  )
                )}
              </div>
              <Link
                href="/ar/services"
                className="mt-10 inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
              >
                {arHome.allServices}
              </Link>
            </div>
          </section>


          {/* Clients — mirrors the English home's chapter 04 (Reach). */}
          <section className="section-y relative" aria-labelledby="ar-clients-heading">
            <FieldTrigger formation="constellation" ox={0.5} oy={0.45} energy={0.8} dim={0.8} theme="light" />
            <div className="container-x">
              <h2
                id="ar-clients-heading"
                className="display-sub max-w-[18em] text-[clamp(1.9rem,4.2vw,3.4rem)]"
              >
                {arHome.clientsStatement}
              </h2>
              <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3 lg:grid-cols-4">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="flex min-h-36 flex-col items-center justify-center gap-2 bg-paper px-6 py-10 text-center"
                  >
                    {/* Brand names stay in their own script and direction. */}
                    <span dir="ltr" className="text-sm font-semibold uppercase tracking-eyebrow text-ink-2">
                      {client.name}
                    </span>
                    <span className="text-[0.6875rem] text-ink-3">{client.arSector}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs leading-relaxed text-ink-3">{arHome.clientsNote}</p>
            </div>
          </section>

          {/* About — mirrors the English home's chapter 05 (Origin). */}
          <section className="section-y relative" aria-labelledby="ar-about-heading">
            <FieldTrigger formation="lattice" ox={0.7} oy={0.4} energy={0.8} dim={0.75} theme="light" />
            <div className="container-x">
              <p className="eyebrow text-blue-ink">{arHome.aboutHeading}</p>
              <h2
                id="ar-about-heading"
                className="display mt-8 max-w-[15em] text-[clamp(2rem,5vw,4.2rem)]"
              >
                {arHome.aboutStatement}
              </h2>
              <p className="prose-measure mt-8 text-base leading-relaxed text-ink-2">
                {arHome.aboutBody}
              </p>
              <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
                {arHome.aboutPillars.map((pillar, i) => (
                  <div key={pillar.title} className="bg-surface p-8 md:p-10">
                    <p className="eyebrow text-blue-ink">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display-sub mt-4 text-xl md:text-2xl">{pillar.title}</h3>
                    <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                      {pillar.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Insights */}
          {articles.length > 0 ? (
            <section className="section-y relative" aria-labelledby="ar-insights-heading">
              <FieldTrigger
                formation="weave"
                ox={0.5}
                oy={0.45}
                energy={0.7}
                dim={0.6}
                theme="light"
              />
              <div className="container-x">
                <p className="eyebrow text-blue-ink">{arHome.insightsHeading}</p>
                <h2
                  id="ar-insights-heading"
                  className="display-sub mt-8 max-w-[18em] text-[clamp(1.9rem,4.2vw,3.4rem)]"
                >
                  {arHome.insightsSub}
                </h2>
                <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
                  {articles.map((a) => (
                    <Link
                      key={a.path}
                      href={a.path}
                      className="group block rounded-2xl border border-hairline bg-surface p-8 transition-colors duration-200 hover:border-blue/40 md:p-10"
                    >
                      <p className="eyebrow text-ink-3">{a.eyebrow}</p>
                      <h3 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                        {a.h1}
                      </h3>
                      <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                        {a.metaDescription}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/ar/insights"
                  className="mt-10 inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
                >
                  {arHome.insightsMore}
                </Link>
              </div>
            </section>
          ) : null}

          {/* Contact */}
          <section className="section-y relative" aria-labelledby="ar-contact-heading">
            <FieldTrigger
              formation="converge"
              ox={0.5}
              oy={0.4}
              energy={1}
              dim={0.9}
              theme="light"
            />
            <div className="container-x">
              <h2
                id="ar-contact-heading"
                className="display max-w-[13em] text-[clamp(2.2rem,5.5vw,4.6rem)]"
              >
                {arHome.contactHeading}
              </h2>
              <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">
                {arHome.contactSub}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-blue-ink underline-offset-4 hover:underline"
                >
                  {site.contact.email}
                </a>
                {site.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    dir="ltr"
                    className="underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="container-x pb-24">
          <Link
            href={arHome.langSwitch.href}
            className="inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
          >
            {arHome.langSwitch.label}
          </Link>
        </div>
      </main>
      <div className="content-layer">
        <Footer locale="ar" />
      </div>
      <ArHomeJsonLd />
    </>
  );
}
