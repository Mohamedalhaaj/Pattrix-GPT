import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { enToAr } from "@/content/locale-map";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

/**
 * hreflang alternates for a path, when a counterpart genuinely exists.
 *
 * The pairing is already declared per page via `alternates.languages` in each
 * route's metadata; repeating it here is what lets Google discover both sides
 * of a pair from the sitemap alone rather than having to fetch and parse each
 * page first. Derived from content/locale-map.ts so the two can never disagree.
 *
 * Deliberately omitted for unpaired routes — currently the two English insights
 * with no Arabic version. Declaring an alternate that 404s is worse than
 * declaring none. x-default points at the English side, matching what every
 * page already sends.
 */
function alternatesFor(enPath: string) {
  const arPath = enToAr[enPath];
  if (!arPath) return undefined;
  const en = `${site.url}${enPath === "/" ? "" : enPath}`;
  return { languages: { en, ar: `${site.url}${arPath}`, "x-default": en } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable per deploy: the site is fully static, so build time is the honest
  // last-modified signal for every route.
  const lastModified = new Date();
  const arInsights = insights.filter((a) => a.locale === "ar");
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1, alternates: alternatesFor("/") },
    // Arabic home page — the entry point for the Arabic-first market.
    {
      url: `${site.url}/ar`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: alternatesFor("/")
    },
    // Hub routes. These also carry the middle crumb of every service and
    // case-study BreadcrumbList, so they must be crawlable.
    {
      url: `${site.url}/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternatesFor("/services")
    },
    {
      url: `${site.url}/ar/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternatesFor("/services")
    },
    {
      url: `${site.url}/work`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternatesFor("/work")
    },
    {
      url: `${site.url}/ar/work`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternatesFor("/work")
    },
    ...(arInsights.length > 0
      ? [
          {
            url: `${site.url}/ar/insights`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
            alternates: alternatesFor("/insights")
          }
        ]
      : []),
    ...servicePages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      // Both locales of a service page resolve to the same EN key.
      alternates: alternatesFor(p.locale === "ar" ? p.path.slice(3) : p.path)
    })),
    ...(insights.length > 0
      ? [
          {
            url: `${site.url}/insights`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
            alternates: alternatesFor("/insights")
          }
        ]
      : []),
    ...insights.map((a) => ({
      url: `${site.url}${a.path}`,
      lastModified: new Date(a.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: alternatesFor(a.locale === "ar" ? a.path.slice(3) : a.path)
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: alternatesFor(`/work/${p.slug}`)
    })),
    // Arabic case studies exist only for projects carrying an `ar` block.
    ...projects
      .filter((p) => p.ar)
      .map((p) => ({
        url: `${site.url}/ar/work/${p.slug}`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.7,
        alternates: alternatesFor(`/work/${p.slug}`)
      }))
  ];
}
