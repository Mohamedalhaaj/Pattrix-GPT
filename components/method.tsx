"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal, SectionProgress, Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { campaignFlow } from "@/lib/content";
import { motion } from "framer-motion";

export function Method() {
  return (
    <section id="systems" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/[0.08] to-transparent" />
      <SectionHeading
        eyebrow="Campaign systems"
        title="Insight to measurement, built as one directed rhythm."
        copy="Campaigns fail when strategy, production, distribution, and reporting behave like separate rooms. Pattrix connects them into one operating sequence."
      />
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[2rem] border border-ink/[0.08] bg-white p-7 shadow-[0_24px_90px_rgba(11,16,32,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase text-ocean">Operating rhythm</p>
              <h3 className="mt-12 font-display text-5xl font-semibold leading-none sm:text-6xl">
                One brief. Five movements.
              </h3>
              <p className="mt-6 text-pretty text-base leading-7 text-ink/[0.58]">
                A campaign becomes memorable when every public touchpoint is sequenced, measured, and made to reinforce the same perception.
              </p>
              <div className="mt-9">
                <MagneticButton href="#contact">Plan a campaign</MagneticButton>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid gap-4">
            {campaignFlow.map((item, index) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title}>
                  <SectionProgress>
                    {(visible) => (
                      <motion.article
                        animate={{
                          opacity: visible ? 1 : 0.66,
                          x: visible ? 0 : 18
                        }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="grid gap-5 rounded-[1.4rem] border border-ink/[0.08] bg-white/[0.72] p-5 backdrop-blur-xl sm:grid-cols-[0.18fr_1fr] sm:rounded-[2rem] sm:p-7"
                      >
                        <div className="flex items-center gap-4 sm:block">
                          <span className="text-sm font-semibold text-ink/[0.32]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="mt-0 grid h-12 w-12 place-items-center rounded-full bg-ink text-white sm:mt-10">
                            <Icon size={18} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-display text-3xl font-semibold leading-none sm:text-5xl">
                            {item.title}
                          </h3>
                          <p className="mt-5 max-w-xl text-base leading-7 text-ink/[0.58]">{item.copy}</p>
                        </div>
                      </motion.article>
                    )}
                  </SectionProgress>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
