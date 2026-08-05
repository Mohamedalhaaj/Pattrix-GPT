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
  // Both crumb ancestors must stay in the article's own locale. Emitting the
  // English home and English hub for an Arabic article contradicts the page's
  // own hreflang cluster and asks Google to file /ar/insights/* under the
  // English tree. Mirrors the same branch in service-json-ld.tsx.
  const isAr = article.locale === "ar";
  const homeUrl = isAr ? `${site.url}/ar` : site.url;
  const hubUrl = `${site.url}${isAr ? "/ar/insights" : "/insights"}`;
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
          { "@type": "ListItem", position: 1, name: article.breadcrumb.home, item: homeUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: article.breadcrumb.hub,
            item: hubUrl
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
