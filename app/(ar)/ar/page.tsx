import type { Metadata } from "next";
import Link from "next/link";
import { arHome } from "@/content/index-pages";
import { insights } from "@/content/insights";
import { servicePages } from "@/content/service-pages";
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
  const services = servicePages.filter((p) => p.locale === "ar");
  const articles = insights.filter((a) => a.locale === "ar");

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
              <div className="mt-14 grid items-start gap-8 md:grid-cols-2">
                {services.map((p) => (
                  <Link
                    key={p.path}
                    href={p.path}
                    className="group block rounded-2xl border border-hairline bg-surface p-8 transition-colors duration-200 hover:border-blue/40 md:p-10"
                  >
                    <p className="eyebrow text-ink-3">{p.eyebrow}</p>
                    <h3 className="display-sub mt-4 text-xl transition-colors duration-200 group-hover:text-blue md:text-2xl">
                      {p.breadcrumb.label}
                    </h3>
                    <p className="prose-measure mt-3 text-sm leading-relaxed text-ink-2">
                      {p.metaDescription}
                    </p>
                  </Link>
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
