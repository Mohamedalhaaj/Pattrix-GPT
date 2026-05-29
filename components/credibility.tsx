"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { credibility } from "@/lib/content";
import { motion } from "framer-motion";

export function Credibility() {
  return (
    <section id="trust" className="relative overflow-hidden bg-ink px-5 py-8 text-white sm:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,32,0),rgba(245,247,250,0.05)),radial-gradient(circle_at_80%_0%,rgba(1,113,221,0.2),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase text-white/42">
              Trusted campaign sectors
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-[0.95] sm:text-5xl">
              Built for organizations that cannot afford unclear communication.
            </h2>
          </Reveal>

          <div className="space-y-7">
            <Stagger className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10">
              {credibility.metrics.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="bg-ink/48 p-5">
                    <p className="font-display text-3xl font-semibold sm:text-5xl">{item.value}</p>
                    <p className="mt-2 text-xs uppercase text-white/42">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="overflow-hidden border-y border-white/10 py-4">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="flex w-max items-center gap-8 whitespace-nowrap"
              >
                {[...credibility.clients, ...credibility.clients].map((client, index) => (
                  <span
                    key={`${client}-${index}`}
                    className="font-display text-2xl font-semibold text-white/74 sm:text-4xl"
                  >
                    {client}
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-2">
              {credibility.sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-medium text-white/58"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
