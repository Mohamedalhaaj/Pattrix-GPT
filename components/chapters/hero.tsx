"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { MM, gsap, useGSAP } from "@/lib/gsap";
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
        // The ENTIRE hero entrance now runs on CSS keyframes (globals.css), not
        // here. GSAP keeps only the field, which is genuinely scroll/time-driven.
        //
        // Moving just the H1 was not enough, and the half-measure was worse than
        // the original: PageSpeed on a real Moto G reported the LCP element as
        // the hero SUB-paragraph with 20ms TTFB and 4,020ms of element render
        // delay, dropping mobile Performance from 98 to 85. `from(autoAlpha: 0)`
        // is immediateRender, so on a slow device the sub was written invisible
        // before it ever painted and stayed that way until its beat at 0.99s
        // plus an 0.8s fade. Fixing the H1 alone just moved the LCP element onto
        // the next thing GSAP was still hiding.
        //
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
        {/* The H1's entrance is the one reveal on the site that CSS owns rather
            than GSAP (AGENTS.md otherwise gives GSAP all reveal motion).
            Measured reason: as a GSAP `from(autoAlpha: 0)` it could not start
            until hydration, so on a throttled mobile profile the headline
            painted from server markup at 668ms, was blanked again at 826ms as
            soon as GSAP woke up, stayed blank for 378ms, and only became fully
            readable at 2038ms. A CSS keyframe starts at first paint instead, so
            the headline is never blanked at all.
            The rule still holds for every scroll-triggered reveal; this is a
            load animation, not a scroll one. See `hero-line-in` in globals.css
            for why the reveal is transform-only rather than a fade. */}
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
              {/* prefetch off: this CTA is a same-page anchor ("/#work"), so
                  next/link would prefetch the RSC payload of the page the
                  visitor is already looking at. */}
              <CtaLink href={site.hero.primaryCta.href} prefetch={false}>
                {site.hero.primaryCta.label}
              </CtaLink>
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
