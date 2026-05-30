"use client";

import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { divisions } from "@/lib/content";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section id="services" className="bg-ink py-24 text-white sm:py-32">
      <SectionHeading
        eyebrow="What we do"
        title="Six divisions. One communication system."
        copy="Each division can operate independently, but the strongest work happens when they move together as one campaign architecture."
        tone="dark"
      />
      <Stagger className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        {divisions.map((service) => {
          const Icon = service.icon;

          return (
            <StaggerItem key={service.title}>
              <motion.article
                whileHover={{ x: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid gap-6 overflow-hidden border-t border-white/10 py-7 last:border-b sm:grid-cols-[0.18fr_0.62fr_1fr] sm:items-center sm:py-8"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_24%_50%,rgba(1,113,221,0.18),transparent_32%)]" />
                <div className="relative flex items-center gap-4">
                  <span className="text-xs font-semibold text-white/[0.34]">{service.eyebrow}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-500 group-hover:bg-ocean">
                    <Icon size={18} />
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-3xl font-semibold leading-none sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs font-semibold uppercase text-ocean">{service.signal}</p>
                </div>
                <p className="relative max-w-2xl text-base leading-7 text-white/[0.58] sm:ml-auto">
                  {service.copy}
                </p>
              </motion.article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
