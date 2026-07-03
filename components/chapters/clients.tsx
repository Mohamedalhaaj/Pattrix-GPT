import Image from "next/image";
import { clients, sectors } from "@/content/clients";
import { site } from "@/content/site";
import { FieldTrigger } from "@/components/field/field-trigger";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Reveal } from "@/components/ui/reveal";

/**
 * Chapter 04 — reach. Clients render as a premium text-set wall; when a real
 * logo file is added in content/clients.ts it replaces the text automatically.
 */
export function Clients() {
  const c = site.clients;
  return (
    <section id="clients" aria-labelledby="clients-heading" className="section-y relative scroll-mt-20">
      <FieldTrigger formation="constellation" ox={0.5} oy={0.45} energy={0.8} dim={0.8} theme="light" />
      <div className="container-x">
        <Reveal>
          <ChapterMarker index={c.chapter} name={c.chapterName} />
          <h2 id="clients-heading" className="display-sub mt-12 max-w-[18em] text-[clamp(1.9rem,4.2vw,3.4rem)]">
            {c.statement}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3 lg:grid-cols-4">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group flex min-h-36 flex-col items-center justify-center gap-2 bg-paper px-6 py-10 text-center"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={140}
                  height={48}
                  className="opacity-60 grayscale transition-opacity duration-200 group-hover:opacity-100"
                />
              ) : (
                <span className="text-sm font-semibold uppercase tracking-eyebrow text-ink-2 transition-colors duration-200 group-hover:text-blue">
                  {client.name}
                </span>
              )}
              <span className="text-[0.6875rem] text-ink-3">{client.sector}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="text-xs leading-relaxed text-ink-3">
            {c.note} · Sectors: {sectors.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
