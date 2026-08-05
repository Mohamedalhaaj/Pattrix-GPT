import { site } from "@/content/site";
import { arServicesIndex } from "@/content/index-pages";
import type { ServicePage } from "@/content/service-pages";

/**
 * Per-service-page structured data: a Service node referencing the site-wide
 * Organization by @id (never duplicating it), plus a three-level BreadcrumbList
 * (Home → Services → page). The middle crumb was previously omitted because no
 * /services index route existed and a crumb without a URL would be invalid;
 * /services and /ar/services now exist, so the real hierarchy is expressed.
 * No FAQPage markup by design: Google limits FAQ rich results to
 * government/health sites, so FAQs stay content-only.
 */
export function ServiceJsonLd({ page }: { page: ServicePage }) {
  const url = `${site.url}${page.path}`;
  const isArabic = page.locale === "ar";
  const indexUrl = `${site.url}${isArabic ? "/ar/services" : "/services"}`;
  const indexLabel = isArabic ? arServicesIndex.eyebrow : "Services";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.breadcrumb.label,
        description: page.metaDescription,
        url,
        serviceType: page.serviceType,
        areaServed: ["Tripoli", "Libya", "Global"],
        inLanguage: page.locale,
        provider: { "@id": `${site.url}/#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          // Crumb 2 was already localised via indexUrl; crumb 1 was not, which
          // rooted every Arabic trail at the English home page.
          {
            "@type": "ListItem",
            position: 1,
            name: page.breadcrumb.home,
            item: isArabic ? `${site.url}/ar` : site.url
          },
          { "@type": "ListItem", position: 2, name: indexLabel, item: indexUrl },
          { "@type": "ListItem", position: 3, name: page.breadcrumb.label, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
