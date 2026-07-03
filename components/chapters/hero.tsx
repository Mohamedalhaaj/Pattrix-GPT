"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { EASE, MM, gsap, useGSAP } from "@/lib/gsap";
import { setField } from "@/components/field/store";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Chapter 00 — the signal begins.
 * The field opens as scattered noise and organizes into the Pattrix signal
 * while the statement settles in. H1 is server-markup and visible without JS.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Field: noise → signal shortly after first paint (also under reduced
      // motion, where the engine renders the formation statically).
      const toSignal = () => setField({ formation: "signal", ox: 0.72, oy: 0.38, energy: 1, dim: 1, theme: "light" });
      const timer = setTimeout(toSignal, 900);

      const mm = gsap.matchMedia();
      mm.add(MM.motionOk, () => {
        gsap
          .timeline({ defaults: { ease: EASE.reveal } })
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 18, duration: 0.7, delay: 0.15 })
          .from("[data-hero-line]", { autoAlpha: 0, y: 42, duration: 0.9, stagger: 0.12 }, "-=0.45")
          .from("[data-hero-sub]", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.55")
          .from("[data-hero-cta]", { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.08 }, "-=0.5")
          .from("[data-hero-hint]", { autoAlpha: 0, duration: 0.9 }, "-=0.3");

        // Re-tune the field when scrolling back up to the top.
        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom 55%",
            onEnterBack: toSignal
          }
        });
      });

      return () => clearTimeout(timer);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="hero-heading" className="relative flex min-h-[100svh] items-end pb-24 pt-32 md:items-center md:pb-28">
      <div className="container-x">
        <p data-hero-eyebrow className="eyebrow text-ink-2">
          {site.hero.eyebrow}
        </p>
        <h1 id="hero-heading" className="display mt-8 max-w-[11em] text-[clamp(2.75rem,7.5vw,6rem)]">
          <span data-hero-line className="block">
            We turn noise into
          </span>
          <span data-hero-line className="block text-blue">
            patterns
          </span>
          <span data-hero-line className="block">
            people remember.
          </span>
        </h1>
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-hero-sub className="prose-measure text-base leading-relaxed text-ink-2 md:col-span-5 md:text-lg">
            {site.hero.sub}
          </p>
          <div className="flex flex-wrap items-center gap-8 md:col-span-7 md:justify-end">
            <span data-hero-cta>
              <CtaLink href={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</CtaLink>
            </span>
            <a
              data-hero-cta
              href={site.hero.secondaryCta.href}
              className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue"
            >
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <div data-hero-hint className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-ink-3">{site.hero.scrollHint}</span>
        <span className="scroll-line block h-10 w-px bg-ink/20" aria-hidden="true" />
      </div>
    </section>
  );
}
