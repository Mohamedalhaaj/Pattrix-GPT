import { site } from "@/content/site";
import type { ServicePage } from "@/content/service-pages";

/**
 * Per-service-page structured data: a Service node referencing the site-wide
 * Organization by @id (never duplicating it), plus a two-level BreadcrumbList
 * (Home → page — there is no /services index route yet, and a middle crumb
 * without a URL would be invalid). No FAQPage markup by design: Google limits
 * FAQ rich results to government/health sites, so FAQs stay content-only.
 */
export function ServiceJsonLd({ page }: { page: ServicePage }) {
  const url = `${site.url}${page.path}`;
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
          { "@type": "ListItem", position: 1, name: page.breadcrumb.home, item: site.url },
          { "@type": "ListItem", position: 2, name: page.breadcrumb.label, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
