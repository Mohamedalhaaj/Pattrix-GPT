import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Sanity Studio plus reserved private prefixes; public pages stay crawlable.
      disallow: ["/studio", "/api/", "/admin", "/draft", "/preview"]
    },
    sitemap: `${site.url}/sitemap.xml`
  };
}
