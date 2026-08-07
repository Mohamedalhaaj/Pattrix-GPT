"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { arHome } from "@/content/index-pages";
import { services } from "@/content/services";
import { setField } from "@/components/field/store";
import { FieldTrigger } from "@/components/field/field-trigger";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * The six service systems as an editorial accordion — the Arabic counterpart
 * of components/chapters/services.tsx, which the Arabic home used to flatten
 * into a static six-card grid. Opening a system retunes the Pattern Field to
 * that system's formation, exactly as on the English home.
 *
 * Differences from the English component are deliberate, not drift:
 * - Copy comes from arName/arSummary/arIncludes/arHrefLabel and links carry
 *   the /ar prefix.
 * - The section keeps the Arabic home's eyebrow+display heading pattern
 *   rather than ChapterMarker, matching its sibling chapters.
 * - Spacing/alignment utilities are LOGICAL (text-start, ps-*) so the whole
 *   row mirrors under the (ar) root layout's dir="rtl" with no RTL classes.
 * - Field origins mirror the English x-positions (0.78 → 0.28), the same way
 *   the Arabic hero mirrors the English hero's field origin.
 */
export function ServicesAr() {
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  const toggle = (i: number) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next >= 0) {
      setField({
        formation: services[next].formation,
        ox: 0.28,
        oy: 0.42,
        energy: 0.9,
        dim: 0.85,
        theme: "light"
      });
    }
  };

  return (
    <section
      id="ar-services"
      aria-labelledby="ar-services-heading"
      className="section-y relative scroll-mt-20"
    >
      <FieldTrigger formation="signal" ox={0.28} oy={0.42} energy={0.9} dim={0.85} theme="light" />
      <div className="container-x">
        <p className="eyebrow text-blue-ink">{arHome.servicesHeading}</p>
        <h2
          id="ar-services-heading"
          className="display mt-8 max-w-[15em] text-[clamp(2rem,5vw,4.2rem)]"
        >
          {arHome.servicesSub}
        </h2>
        <p className="prose-measure mt-8 text-base leading-relaxed text-ink-2">
          {arHome.servicesLine}
        </p>

        <ul className="mt-14 border-t border-hairline">
          {services.map((service, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={service.arName} className="border-b border-hairline">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="grid w-full grid-cols-[3rem_1fr_2.5rem] items-center gap-4 py-7 text-start transition-colors duration-200 hover:text-blue md:grid-cols-[5rem_1fr_2.5rem] md:py-9"
                  >
                    <span className={`eyebrow ${isOpen ? "text-blue-ink" : "text-ink-3"}`}>
                      {service.index}
                    </span>
                    <span
                      className={`display-sub text-2xl md:text-4xl ${isOpen ? "text-blue" : "text-ink"}`}
                    >
                      {service.arName}
                    </span>
                    <span
                      aria-hidden="true"
                      /* Explicit property list — see the note in cta-link.tsx.
                         The open state changes exactly these three. */
                      className={`grid h-10 w-10 place-items-center justify-self-end rounded-full border transition-[transform,border-color,color] duration-300 ease-out-quart ${
                        isOpen ? "rotate-45 border-blue text-blue" : "border-ink/15 text-ink-2"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  // inert keeps the panel's link out of tab order while visually collapsed
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-500 ease-in-out-cubic"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 pe-4 ps-[4rem] md:grid-cols-12 md:ps-[6rem]">
                      <div className="md:col-span-6">
                        <p className="prose-measure text-base leading-relaxed text-ink-2">
                          {service.arSummary}
                        </p>
                        {service.href && service.arHrefLabel ? (
                          <CtaLink href={`/ar${service.href}`} className="mt-7">
                            {service.arHrefLabel}
                          </CtaLink>
                        ) : null}
                      </div>
                      <ul className="flex flex-col gap-2 md:col-span-5 md:col-start-8">
                        {service.arIncludes.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 text-sm text-ink-2">
                            <span
                              className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-blue"
                              aria-hidden="true"
                            />
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

        <Link
          href="/ar/services"
          className="mt-10 inline-block text-sm text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-blue hover:underline"
        >
          {arHome.allServices}
        </Link>
      </div>
    </section>
  );
}
