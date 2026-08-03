import { site } from "@/content/site";
import type { Project } from "@/content/projects";

/**
 * Per-case-study structured data. Case studies were the only page type
 * shipping without page-level markup — service and insight pages already
 * carry a primary node plus breadcrumbs, so search engines had no way to read
 * a /work/<slug> URL as anything but a generic page.
 *
 * CreativeWork (not Article) because a case study describes delivered work
 * rather than reporting news. Every value is read straight from
 * content/projects.ts — no invented dates, results, or client claims, per
 * AGENTS.md. `datePublished` is deliberately absent: `year` is the year of the
 * engagement, not of publication, and inventing a precise date to satisfy a
 * schema field would be a fabricated fact.
 *
 * Three crumbs (Home → Work → case study). This was two until /work existed —
 * a middle crumb without a URL would have been invalid — same reasoning as
 * service-json-ld.tsx.
 */
export function ProjectJsonLd({ project }: { project: Project }) {
  const url = `${site.url}/work/${project.slug}`;
  const image = project.cover ? `${site.url}${project.cover}` : `${site.url}/opengraph-image`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.title,
        headline: project.title,
        description: project.premise,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        image,
        genre: project.category,
        keywords: project.services,
        creator: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
        about: {
          "@type": "Service",
          name: project.category,
          provider: { "@id": `${site.url}/#organization` }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
