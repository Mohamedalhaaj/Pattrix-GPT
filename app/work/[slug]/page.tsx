import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { PatternCover } from "@/components/work/pattern-cover";

interface CaseStudyParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Unique per page, built only from published project data (no invented facts).
  const description = `${project.premise} A Pattrix case study — ${project.category}, ${project.year}.`;
  const path = `/work/${project.slug}`;
  const socialTitle = `${project.title} — ${site.name}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      type: "article",
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description
    }
  };
}

export default async function CaseStudyPage({ params }: CaseStudyParams) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { label: "The challenge", body: project.challenge },
    { label: "The approach", body: project.approach },
    { label: "What it became", body: project.outcome }
  ];

  const videos = project.videos ?? [];
  const featuredVideos = videos.filter((v) => v.featured);
  const restVideos = videos.filter((v) => !v.featured);
  const restAllPortrait = restVideos.length > 0 && restVideos.every((v) => v.h > v.w);
  const restGridClass =
    restVideos.length <= 1
      ? "mx-auto max-w-3xl"
      : restAllPortrait
        ? "grid grid-cols-2 gap-6 md:grid-cols-3"
        : "grid gap-6 md:grid-cols-2";

  return (
    <>
      <Header />
      <main id="main" className="content-layer">
        <article>
          <header className="container-x pt-32 md:pt-40">
            <p className="eyebrow flex flex-wrap items-center gap-3 text-ink-3">
              <Link href="/#work" className="text-ink-2 transition-colors duration-200 hover:text-blue">
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-blue">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </p>
            <h1 className="display mt-8 max-w-[12em] text-[clamp(2.5rem,6.5vw,5.8rem)]">{project.title}</h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-2">{project.premise}</p>
          </header>

          <div className="container-x mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-hairline">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={project.coverAlt ?? `${project.title} — selected work`}
                  width={project.coverW ?? 1600}
                  height={project.coverH ?? 1000}
                  priority
                  sizes="(min-width: 1440px) 1360px, 100vw"
                  className="w-full"
                />
              ) : (
                <PatternCover
                  slug={project.slug}
                  accent={project.accent}
                  title={project.title}
                  variant={(index % 3) as 0 | 1 | 2}
                  className="aspect-[21/9] w-full"
                />
              )}
            </div>
            {project.coverAlt ? (
              <p className="mt-3 text-xs text-ink-3">{project.coverAlt}</p>
            ) : (
              <p className="mt-3 text-xs text-ink-3">
                Signature pattern — generated identity for this engagement. Campaign photography available on request.
              </p>
            )}
          </div>

          <div className="container-x section-y grid gap-16 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <p className="eyebrow text-ink-3">Systems used</p>
              <ul className="mt-5 flex flex-col gap-2">
                {project.services.map((s) => (
                  <li key={s} className="text-sm font-medium text-ink-2">
                    {s}
                  </li>
                ))}
              </ul>
            </aside>
            <div className="flex flex-col gap-14 lg:col-span-7 lg:col-start-5">
              {sections.map((s) => (
                <section key={s.label} aria-label={s.label}>
                  <h2 className="eyebrow text-blue">{s.label}</h2>
                  <p className="prose-measure mt-5 text-lg leading-relaxed text-ink">{s.body}</p>
                </section>
              ))}
            </div>
          </div>

          {videos.length > 0 ? (
            <div className="container-x pb-20">
              <p className="eyebrow mb-6 text-ink-3">In motion</p>
              <div className="flex flex-col gap-6">
                {featuredVideos.map((video) => (
                  <figure key={video.src} className={video.h > video.w ? "mx-auto w-full max-w-sm" : "w-full"}>
                    <video
                      controls
                      preload="none"
                      playsInline
                      poster={video.poster}
                      width={video.w}
                      height={video.h}
                      className="w-full rounded-2xl border border-hairline bg-navy"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                    <figcaption className="mt-3 text-xs leading-relaxed text-ink-3">{video.label}</figcaption>
                  </figure>
                ))}
                {restVideos.length > 0 ? (
                  <div className={`items-start ${restGridClass}`}>
                    {restVideos.map((video) => (
                      <figure key={video.src}>
                        <video
                          controls
                          preload="none"
                          playsInline
                          poster={video.poster}
                          width={video.w}
                          height={video.h}
                          className="w-full rounded-2xl border border-hairline bg-navy"
                        >
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support embedded video.
                        </video>
                        <figcaption className="mt-3 text-xs leading-relaxed text-ink-3">{video.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {project.gallery && project.gallery.length > 0 ? (
            <div className="container-x pb-24">
              <p className="eyebrow mb-6 text-ink-3">From the engagement</p>
              <div className="grid items-start gap-6 md:grid-cols-2">
                {project.gallery.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-2xl border border-hairline">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="w-full"
                    />
                  </figure>
                ))}
              </div>
            </div>
          ) : null}

          <div className="border-t border-hairline">
            <div className="container-x flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="eyebrow text-ink-3">Next case</p>
                <p className="display-sub mt-3 text-2xl md:text-3xl">{next.title}</p>
              </div>
              <CtaLink href={`/work/${next.slug}`}>Read next</CtaLink>
            </div>
          </div>
        </article>
      </main>
      <div className="content-layer">
        <Footer />
      </div>
    </>
  );
}
