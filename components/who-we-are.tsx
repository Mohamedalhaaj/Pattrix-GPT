"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const signals = [
  "Strategic communication",
  "Public perception",
  "Reputation architecture",
  "Campaign ecosystems"
];

export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section id="who" ref={ref} className="relative bg-paper py-24 sm:py-32">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-0 top-16 h-72 w-1/2 rounded-l-[4rem] bg-gradient-to-l from-ocean/[0.12] to-transparent blur-2xl"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase text-ocean">Who we are</p>
          <h2 className="max-w-3xl font-display text-[clamp(2.8rem,6.4vw,6.8rem)] font-semibold leading-[0.92] text-balance">
            A Marketing & PR agency for visibility, trust, and attention.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="lg:pb-2">
          <p className="max-w-2xl text-pretty text-xl leading-9 text-ink/[0.66] sm:text-2xl">
            Pattrix works from Tripoli with a regional lens, shaping how brands communicate with audiences, institutions, markets, and public moments.
          </p>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <StaggerItem key={signal}>
                <div className="rounded-2xl border border-ink/[0.08] bg-white px-5 py-4 text-sm font-semibold text-ink shadow-[0_18px_60px_rgba(11,16,32,0.06)]">
                  {signal}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
