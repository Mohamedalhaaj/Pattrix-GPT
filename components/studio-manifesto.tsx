"use client";

import { Reveal } from "@/components/motion-primitives";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StudioManifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} id="studio" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(1,113,221,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(89,111,98,0.22),transparent_28%)]" />
      <div className="absolute inset-0 bg-fine-noise bg-[length:18px_18px] opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-8 text-xs font-semibold uppercase text-white/50">Agency position</p>
          <h2 className="max-w-6xl font-display text-[clamp(3.5rem,10vw,10rem)] font-semibold leading-[0.86] text-balance">
            From Tripoli to the region, we build campaigns people remember.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal className="dark-glass rounded-[2rem] p-6 sm:p-8">
            <p className="font-editorial text-2xl leading-snug text-white/[0.82] sm:text-3xl">
              Great marketing is not noise. It is public meaning, timed well, repeated clearly, and trusted by the right audience.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-white/[0.62] lg:ml-auto">
              Pattrix combines communication strategy, PR discipline, social media systems, production, and digital presence into one calm operating system for visibility and reputation.
            </p>
          </Reveal>
        </div>
      </div>
      <motion.div
        style={{ x }}
        aria-hidden
        className="relative mt-20 flex whitespace-nowrap font-display text-[20vw] font-semibold leading-none text-white/[0.035]"
      >
        <span>PATTRIX / STRATEGIC VISIBILITY / PUBLIC PERCEPTION / </span>
        <span>PATTRIX / STRATEGIC VISIBILITY / PUBLIC PERCEPTION / </span>
      </motion.div>
    </section>
  );
}
