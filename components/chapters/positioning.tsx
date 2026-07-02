import { site } from "@/content/site";
import { FieldTrigger } from "@/components/field/field-trigger";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Reveal } from "@/components/ui/reveal";

/** Chapter 01 — what Pattrix believes and does. */
export function Positioning() {
  const c = site.positioning;
  return (
    <section id="positioning" aria-labelledby="positioning-heading" className="section-y relative">
      <FieldTrigger formation="interference" ox={0.5} oy={0.5} energy={0.8} dim={0.7} theme="light" />
      <div className="container-x">
        <Reveal>
          <ChapterMarker index={c.chapter} name={c.chapterName} />
        </Reveal>
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="positioning-heading" className="display-sub text-[clamp(1.9rem,4.2vw,3.6rem)]">
              {c.statement}
            </h2>
            <p className="mt-6 font-editorial text-xl italic text-ink-2 md:text-2xl">{c.editorialAside}</p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pt-2">
            <p className="prose-measure text-base leading-relaxed text-ink-2">{c.body}</p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-20 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
          {c.pillars.map((pillar, i) => (
            <div key={pillar.title} className="bg-paper p-8 md:p-10">
              <p className="eyebrow text-blue">0{i + 1}</p>
              <h3 className="display-sub mt-6 text-2xl">{pillar.title}</h3>
              <p className="prose-measure mt-4 text-sm leading-relaxed text-ink-2">{pillar.copy}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
