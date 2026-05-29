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
        eyebrow="Campaign dossiers"
        title="Strategic visibility, composed like a campaign film."
        copy="The showcase is framed around real communication problems: reputation, public clarity, launch attention, and regional audience memory."
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
        className="group relative min-h-[640px] overflow-hidden rounded-[2rem] bg-ink p-5 text-white shadow-glass"
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
        <div className="relative flex h-full min-h-[600px] flex-col justify-between">
          <div className="flex items-center justify-between text-xs uppercase text-white/62">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
              {project.metric}
            </p>
            <h3 className="max-w-sm font-display text-4xl font-semibold leading-none sm:text-5xl">
              {project.title}
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-6 text-white/64">
              <p>
                <span className="text-white/38">Challenge: </span>
                {project.challenge}
              </p>
              <p>
                <span className="text-white/38">Strategy: </span>
                {project.strategy}
              </p>
              <p>
                <span className="text-white/38">Impact: </span>
                {project.impact}
              </p>
            </div>
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
