"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { regionalSignals } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function RegionalPresence() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const pulseScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1.08, 0.96]);
  const pulseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.24, 0.52, 0.28]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_38%,rgba(1,113,221,0.22),transparent_28%),linear-gradient(180deg,rgba(245,247,250,0.05),transparent_36%)]" />
      <div className="absolute inset-0 bg-fine-noise bg-[length:18px_18px] opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase text-white/[0.48]">
            Regional presence
          </p>
          <h2 className="max-w-5xl font-display text-[clamp(3rem,7.2vw,8rem)] font-semibold leading-[0.88] text-balance">
            Local authority with regional ambition.
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-white/[0.62]">
            Pattrix’s advantage is not distance from the market. It is proximity to the culture, the institutions, the audience, and the public moments that shape attention.
          </p>
        </Reveal>

        <div className="relative min-h-[25rem] rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8">
          <motion.div
            style={{ scale: pulseScale, opacity: pulseOpacity }}
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ocean bg-ocean/10 blur-sm"
          />
          <div className="absolute inset-x-8 top-1/2 h-px bg-white/12" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-white/12" />
          <div className="relative z-10 grid h-full gap-4">
            <Stagger className="grid gap-4">
              {regionalSignals.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <article className="group rounded-2xl border border-white/10 bg-ink/[0.46] p-5 transition duration-500 hover:border-ocean/50 hover:bg-white/[0.08]">
                      <div className="flex items-center gap-4">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white group-hover:bg-ocean">
                          <Icon size={18} />
                        </span>
                        <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/[0.58]">{item.copy}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
