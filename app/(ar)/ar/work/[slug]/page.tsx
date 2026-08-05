import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { arCaseStudy } from "@/content/index-pages";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { PatternCover } from "@/components/work/pattern-cover";

interface CaseStudyParams {
  params: Promise<{ slug: string }>;
}

/** Only projects with an Arabic block get a route — never a half-English page. */
const arProjects = projects.filter((p) => p.ar);

export function generateStaticParams() {
  return arProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.ar) return {};
  // Built only from published project data (no invented facts), same as the
  // English case study.
  const description = `${project.ar.premise} دراسة حالة من باتريكس — ${project.ar.category}، ${project.year}.`;
  const path = `/ar/work/${project.slug}`;
  const socialTitle = `${project.ar.title} — ${site.name}`;
  return {
    title: project.ar.title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `/work/${project.slug}`,
        ar: path,
        "x-default": `/work/${project.slug}`
      }
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      type: "article",
      locale: "ar_AR",
      // Root opengraph-image.tsx doesn't cascade to nested segments, so it is
      // named explicitly. Mirrors the English case study: the project's own
      // cover when it has one, brand card otherwise.
      images: project.cover
        ? [{ url: project.cover }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }]
    },
    twitter: { card: "summary_large_image", title: socialTitle, description }
  };
}

/**
 * Arabic case study. Mirrors the English page's structure and JSON-LD, but
 * carries only the narrative: the gallery and video blocks stay on the English
 * page because their alt text and captions exist only in English, and shipping
 * half-translated UI would be worse than linking across. `datePublished` is
 * deliberately absent — `year` is the year of the engagement, not of
 * publication (see components/seo/project-json-ld.tsx).
 */
function ArProjectJsonLd({ project }: { project: (typeof arProjects)[number] }) {
  const url = `${site.url}/ar/work/${project.slug}`;
  const image = project.cover ? `${site.url}${project.cover}` : `${site.url}/opengraph-image`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.ar!.title,
        headline: project.ar!.title,
        description: project.ar!.premise,
        url,
        mainEntityOfPage: url,
        inLanguage: "ar",
        image,
        genre: project.ar!.category,
        keywords: project.ar!.services,
        creator: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          // Crumb 2 already points at /ar/work; crumb 1 pointed at the English
          // home, rooting the Arabic trail outside its own locale.
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/ar` },
          { "@type": "ListItem", position: 2, name: "أعمالنا", item: `${site.url}/ar/work` },
          { "@type": "ListItem", position: 3, name: project.ar!.title, item: url }
        ]
      }
    ]
  };
  // `<` is escaped so content can never close the script tag (same pattern as json-ld.tsx).
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export default async function ArCaseStudyPage({ params }: CaseStudyParams) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.ar) notFound();

  const ar = project.ar;
  const index = arProjects.findIndex((p) => p.slug === project.slug);
  const next = arProjects[(index + 1) % arProjects.length];

  const sections = [
    { label: arCaseStudy.challenge, body: ar.challenge },
    { label: arCaseStudy.approach, body: ar.approach },
    { label: arCaseStudy.outcome, body: ar.outcome }
  ];

  return (
    <>
      <Header locale="ar" />
      <main id="main" className="content-layer">
        <article>
          <header className="container-x pt-32 md:pt-40">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
              <span className="text-blue-ink">{ar.category}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{project.year}</span>
            </p>
            <h1 className="display mt-8 max-w-[13em] text-[clamp(2.2rem,5.5vw,4.8rem)]">
              {ar.title}
            </h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">{ar.premise}</p>
          </header>

          <div className="container-x mt-14 md:mt-20">
            <div className="relative overflow-hidden rounded-2xl border border-hairline">
              {project.cover ? (
                <div
                  className={`relative aspect-[3/2] w-full overflow-hidden ${
                    project.coverFit === "contain" ? "bg-white" : ""
                  }`}
                >
                  <Image
                    src={project.cover}
                    alt={ar.coverAlt ?? ar.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className={project.coverFit === "contain" ? "object-contain p-2" : "object-cover"}
                  />
                </div>
              ) : (
                <PatternCover
                  slug={project.slug}
                  accent={project.accent}
                  title={ar.title}
                  className="aspect-[16/10] w-full"
                />
              )}
            </div>
          </div>

          <div className="container-x mt-16 md:mt-24">
            <div className="grid gap-12 md:grid-cols-3">
              {sections.map((s) => (
                <section key={s.label}>
                  <h2 className="eyebrow text-blue-ink">{s.label}</h2>
                  <p className="prose-measure mt-4 text-base leading-relaxed text-ink-2">{s.body}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="container-x mt-16 border-t border-hairline pt-10 md:mt-20">
            <p className="eyebrow text-ink-3">{arCaseStudy.servicesLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              {ar.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </article>

        <nav
          aria-label={arCaseStudy.backToWork}
          className="container-x mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-10 md:mt-28"
        >
          <Link
            href="/ar/work"
            className="text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
          >
            {arCaseStudy.backToWork}
          </Link>
          {next.slug !== project.slug ? (
            <Link
              href={`/ar/work/${next.slug}`}
              className="display-sub text-lg transition-colors duration-200 hover:text-blue md:text-xl"
            >
              {next.ar!.title}
            </Link>
          ) : null}
        </nav>
        <div className="pb-24" />
      </main>
      <div className="content-layer">
        <Footer locale="ar" />
      </div>
      <ArProjectJsonLd project={project} />
    </>
  );
}
