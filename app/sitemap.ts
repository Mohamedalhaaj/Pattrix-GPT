import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable per deploy: the site is fully static, so build time is the honest
  // last-modified signal for every route.
  const lastModified = new Date();
  const arInsights = insights.filter((a) => a.locale === "ar");
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    // Arabic home page — the entry point for the Arabic-first market.
    { url: `${site.url}/ar`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    // Hub routes. These also carry the middle crumb of every service and
    // case-study BreadcrumbList, so they must be crawlable.
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    {
      url: `${site.url}/ar/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    },
    { url: `${site.url}/work`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    ...(arInsights.length > 0
      ? [
          {
            url: `${site.url}/ar/insights`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6
          }
        ]
      : []),
    ...servicePages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...(insights.length > 0
      ? [
          {
            url: `${site.url}/insights`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6
          }
        ]
      : []),
    ...insights.map((a) => ({
      url: `${site.url}${a.path}`,
      lastModified: new Date(a.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7
    }))
  ];
}
