"use client";

import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section className="section-pad bg-platinum">
      <SectionHeading
        eyebrow="Capabilities"
        title="One studio system across strategy, image, and interaction."
        copy="The work is intentionally integrated so brand decisions can move cleanly through production, social cadence, and digital experience."
      />
      <Stagger className="mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-[2rem] bg-ink/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <StaggerItem key={service.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group min-h-[360px] bg-paper p-7 transition duration-500 hover:bg-white sm:p-8"
              >
                <div className="mb-16 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink/35">{service.eyebrow}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition duration-500 group-hover:bg-ocean">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="font-display text-3xl font-semibold leading-none">{service.title}</h3>
                <p className="mt-5 text-sm leading-6 text-ink/56">{service.copy}</p>
              </motion.article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
