import { site } from "@/content/site";
import type { InsightArticle } from "@/content/insights";

/**
 * Per-article structured data: an Article node whose author/publisher
 * reference the site-wide Organization by @id (never duplicating it), plus a
 * three-level BreadcrumbList (Home → Insights → article). dateModified tracks
 * datePublished until an article is genuinely revised.
 */
export function InsightJsonLd({ article }: { article: InsightArticle }) {
  const url = `${site.url}${article.path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.h1,
        description: article.metaDescription,
        url,
        mainEntityOfPage: url,
        datePublished: article.datePublished,
        dateModified: article.datePublished,
        inLanguage: article.locale,
        image: `${site.url}/opengraph-image`,
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: article.breadcrumb.home, item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: article.breadcrumb.hub,
            item: `${site.url}/insights`
          },
          { "@type": "ListItem", position: 3, name: article.breadcrumb.label, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
