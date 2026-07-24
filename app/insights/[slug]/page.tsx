import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/content/insights";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { InsightArticleBody } from "@/components/insights/insight-article";
import { InsightJsonLd } from "@/components/seo/insight-json-ld";

interface InsightParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return insights.filter((a) => a.locale === "en").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: InsightParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug, "en");
  if (!article) return {};
  return {
    title: { absolute: article.title },
    description: article.metaDescription,
    alternates: {
      canonical: article.path,
      ...(article.counterpartPath
        ? {
            languages: {
              en: article.path,
              ar: article.counterpartPath,
              "x-default": article.path
            }
          }
        : {})
    },
    openGraph: {
      title: article.ogTitle,
      description: article.ogDescription,
      url: article.path,
      siteName: site.name,
      type: "article",
      publishedTime: article.datePublished,
      locale: "en_US",
      // Root opengraph-image.tsx doesn't cascade to nested segments.
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.ogTitle,
      description: article.ogDescription
    }
  };
}

export default async function InsightPageEn({ params }: InsightParams) {
  const { slug } = await params;
  const article = getInsight(slug, "en");
  if (!article) notFound();

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <InsightArticleBody article={article} />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
      <InsightJsonLd article={article} />
    </>
  );
}
