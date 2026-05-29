"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal, SectionProgress } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { method } from "@/lib/content";
import { motion } from "framer-motion";

export function Method() {
  return (
    <section id="method" className="section-pad bg-paper">
      <SectionHeading
        eyebrow="Method"
        title="Scroll-paced craft, built as a production engine."
        copy="Every phase has a clear role: clarify the center, build the atmosphere, systemize the output, then tune the finish."
      />
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <Reveal className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase text-ocean">Operating rhythm</p>
              <h3 className="mt-12 font-display text-5xl font-semibold leading-none sm:text-6xl">
                From signal to system.
              </h3>
              <p className="mt-6 text-pretty text-base leading-7 text-ink/58">
                Pattrix moves like an editorial room and ships like a product team. The outcome is expressive, but the process stays exact.
              </p>
              <div className="mt-9">
                <MagneticButton href="#contact">Reserve a sprint</MagneticButton>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {method.map((item, index) => {
              const Icon = item.icon;

              return (
                <SectionProgress key={item.title}>
                  {(visible) => (
                    <motion.article
                      animate={{
                        opacity: visible ? 1 : 0.58,
                        scale: visible ? 1 : 0.985
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="grid gap-8 rounded-[2rem] border border-ink/[0.08] bg-white/[0.72] p-6 backdrop-blur-xl sm:p-8 md:grid-cols-[0.25fr_1fr]"
                    >
                      <div className="flex items-center gap-4 md:block">
                        <span className="text-sm font-semibold text-ink/32">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="mt-0 grid h-12 w-12 place-items-center rounded-full bg-ink text-white md:mt-10">
                          <Icon size={18} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-4xl font-semibold leading-none sm:text-5xl">
                          {item.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-base leading-7 text-ink/58">{item.copy}</p>
                      </div>
                    </motion.article>
                  )}
                </SectionProgress>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
