import Image from "next/image";
import { site } from "@/content/site";
import { FieldTrigger } from "@/components/field/field-trigger";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Reveal } from "@/components/ui/reveal";

/** Chapter 05 — origin. Tripoli, and the discipline it taught. */
export function About() {
  const c = site.about;
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y relative scroll-mt-20">
      <FieldTrigger formation="radiate" ox={0.22} oy={0.55} energy={0.9} dim={0.7} theme="light" />
      <div className="container-x">
        <Reveal>
          <ChapterMarker index={c.chapter} name={c.chapterName} />
        </Reveal>
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 id="about-heading" className="display text-[clamp(2.4rem,6vw,5.2rem)]">
              {c.statement}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="prose-measure text-base leading-relaxed text-ink-2 md:text-lg">{c.body}</p>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-hairline">
          {c.philosophy.map((item, i) => (
            <Reveal key={item.title} className="grid gap-4 border-b border-hairline py-8 md:grid-cols-12 md:items-baseline md:py-10">
              <p className="eyebrow text-blue md:col-span-1">0{i + 1}</p>
              <h3 className="display-sub text-2xl md:col-span-4 md:text-3xl">{item.title}</h3>
              <p className="prose-measure text-sm leading-relaxed text-ink-2 md:col-span-5 md:col-start-7">
                {item.copy}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Real rooms — event photography from the agency profile. */}
        <Reveal className="mt-20">
          <div className="grid gap-4 md:grid-cols-3">
            {c.proof.images.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-2xl border border-hairline">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-ink-3">{c.proof.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
