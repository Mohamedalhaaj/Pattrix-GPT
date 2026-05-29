"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Portfolio() {
  return (
    <section id="work" className="section-pad bg-paper">
      <SectionHeading
        eyebrow="Selected work"
        title="Portfolio storytelling with the pacing of a film."
        copy="Each engagement is treated like a world: a visual system, a launch rhythm, and a set of digital moments that hold attention."
      />
      <Stagger className="mx-auto mt-16 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </Stagger>
    </section>
  );
}

function ProjectCard({
  project,
  index
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 ? 32 : 0, index % 2 ? -42 : -18]);

  return (
    <StaggerItem>
      <motion.article
        ref={ref}
        style={{ y }}
        className="group relative min-h-[560px] overflow-hidden rounded-[2rem] bg-ink p-5 text-white shadow-glass"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.palette} opacity-60`} />
        <Image
          src={project.image}
          alt={`${project.title} project visual`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover opacity-[0.42] mix-blend-luminosity transition duration-700 ease-luxury group-hover:scale-105 group-hover:opacity-[0.58]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/34 to-transparent" />
        <div className="relative flex h-full min-h-[520px] flex-col justify-between">
          <div className="flex items-center justify-between text-xs uppercase text-white/62">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
              {project.metric}
            </p>
            <h3 className="font-display text-4xl font-semibold leading-none sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/64">{project.copy}</p>
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export function PortfolioCta() {
  return (
    <Reveal className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
      <MagneticButton href="#contact">Plan a launch</MagneticButton>
    </Reveal>
  );
}
