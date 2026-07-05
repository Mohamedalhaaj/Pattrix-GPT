import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { ServiceArticle } from "@/components/services/service-article";
import { ServiceJsonLd } from "@/components/seo/service-json-ld";

interface ServiceParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicePages.filter((p) => p.locale === "ar").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ServiceParams): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug, "ar");
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: {
      canonical: page.path,
      languages: {
        en: page.counterpartPath,
        ar: page.path,
        "x-default": page.counterpartPath
      }
    },
    openGraph: {
      title: page.ogTitle,
      description: page.ogDescription,
      url: page.path,
      siteName: site.name,
      type: "website",
      locale: "ar_AR",
      // Root opengraph-image.tsx doesn't cascade to nested segments.
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle,
      description: page.ogDescription
    }
  };
}

export default async function ServicePageAr({ params }: ServiceParams) {
  const { slug } = await params;
  const page = getServicePage(slug, "ar");
  if (!page) notFound();

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <ServiceArticle page={page} />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
      <ServiceJsonLd page={page} />
    </>
  );
}
