"use client";

import { useId, useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { setField } from "@/components/field/store";
import { FieldTrigger } from "@/components/field/field-trigger";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { Reveal } from "@/components/ui/reveal";

/**
 * Chapter 03 — the six service systems as an editorial accordion.
 * Opening a system retunes the Pattern Field to that system's formation,
 * so the background literally demonstrates each service.
 */
export function Services() {
  const c = site.services;
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  const toggle = (i: number) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next >= 0) {
      setField({ formation: services[next].formation, ox: 0.78, oy: 0.42, energy: 0.9, dim: 0.85, theme: "light" });
    }
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y relative scroll-mt-20">
      <FieldTrigger formation="signal" ox={0.78} oy={0.42} energy={0.9} dim={0.85} theme="light" />
      <div className="container-x">
        <Reveal>
          <ChapterMarker index={c.chapter} name={c.chapterName} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="services-heading" className="display text-[clamp(2.2rem,5.5vw,4.6rem)] lg:col-span-7">
              {c.statement}
            </h2>
            <p className="prose-measure text-base leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-9">
              {c.sub}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-hairline">
          <ul>
            {services.map((service, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <li key={service.name} className="border-b border-hairline">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="grid w-full grid-cols-[3rem_1fr_2.5rem] items-center gap-4 py-7 text-left transition-colors duration-200 hover:text-blue md:grid-cols-[5rem_1fr_2.5rem] md:py-9"
                    >
                      <span className={`eyebrow ${isOpen ? "text-blue" : "text-ink-3"}`}>{service.index}</span>
                      <span className={`display-sub text-2xl md:text-4xl ${isOpen ? "text-blue" : "text-ink"}`}>
                        {service.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-10 w-10 place-items-center justify-self-end rounded-full border transition-all duration-300 ease-out-quart ${
                          isOpen ? "rotate-45 border-blue text-blue" : "border-ink/15 text-ink-2"
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out-cubic"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pb-10 pl-[4rem] pr-4 md:grid-cols-12 md:pl-[6rem]">
                        <p className="prose-measure text-base leading-relaxed text-ink-2 md:col-span-6">
                          {service.summary}
                        </p>
                        <ul className="flex flex-col gap-2 md:col-span-5 md:col-start-8">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-baseline gap-3 text-sm text-ink-2">
                              <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-blue" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
