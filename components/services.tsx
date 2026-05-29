"use client";

import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section id="services" className="section-pad bg-platinum">
      <SectionHeading
        eyebrow="Capabilities"
        title="Communication, PR, campaign, and content systems under one direction."
        copy="Pattrix connects strategy with execution so public language, media presence, social rhythm, events, and production move as one disciplined system."
      />
      <Stagger className="mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-[2rem] bg-ink/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <StaggerItem key={service.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-h-[300px] overflow-hidden bg-paper p-7 transition duration-500 hover:bg-white sm:min-h-[344px] sm:p-8"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_75%_18%,rgba(1,113,221,0.13),transparent_34%)]" />
                <div className="mb-16 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink/[0.35]">{service.eyebrow}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition duration-500 group-hover:bg-ocean">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="font-display text-3xl font-semibold leading-none">{service.title}</h3>
                <p className="mt-5 text-sm leading-6 text-ink/[0.56]">{service.copy}</p>
              </motion.article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
