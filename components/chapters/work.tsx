import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { FieldTrigger } from "@/components/field/field-trigger";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Reveal } from "@/components/ui/reveal";
import { PatternCover } from "@/components/work/pattern-cover";

/** Chapter 02 — selected work. Each project is a crystallized pattern. */
export function Work() {
  const c = site.work;
  return (
    <section id="work" aria-labelledby="work-heading" className="section-y relative scroll-mt-20">
      <FieldTrigger formation="interference" ox={0.5} oy={0.5} energy={0.6} dim={0.35} theme="light" />
      <div className="container-x">
        <Reveal>
          <ChapterMarker index={c.chapter} name={c.chapterName} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="work-heading" className="display text-[clamp(2.2rem,5.5vw,4.6rem)] lg:col-span-7">
              {c.statement}
            </h2>
            <p className="prose-measure text-base leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-9">
              {c.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <Reveal key={project.slug} as="article" className="group">
              <Link
                href={`/work/${project.slug}`}
                className="grid items-center gap-8 lg:grid-cols-12"
                aria-label={`${project.title} — read the case study`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-hairline lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  {project.cover ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={project.coverAlt ?? `${project.title} — selected work`}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <PatternCover
                      slug={project.slug}
                      accent={project.accent}
                      title={project.title}
                      variant={(i % 3) as 0 | 1 | 2}
                      className="aspect-[16/10] w-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                  <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
                    <span className="text-blue">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </p>
                  <h3 className="display-sub mt-5 text-3xl transition-colors duration-200 group-hover:text-blue md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="prose-measure mt-4 text-sm leading-relaxed text-ink-2">{project.premise}</p>
                  <p className="mt-6 text-xs font-medium uppercase tracking-eyebrow text-ink-3">
                    {project.services.join("  ·  ")}
                  </p>
                  <span className="mt-8 inline-block">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-ink">
                      <span className="underline decoration-1 underline-offset-8 decoration-ink/20 transition-colors duration-200 group-hover:decoration-blue group-hover:text-blue">
                        Read the case
                      </span>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 border-t border-hairline pt-10">
          <p className="prose-measure text-sm leading-relaxed text-ink-3">
            Case studies describe our approach and scope of work. We do not publish client-confidential
            figures or invented results.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
