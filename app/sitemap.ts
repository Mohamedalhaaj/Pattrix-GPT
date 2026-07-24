import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable per deploy: the site is fully static, so build time is the honest
  // last-modified signal for every route.
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
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
