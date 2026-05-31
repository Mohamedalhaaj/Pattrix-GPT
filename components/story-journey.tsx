"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { campaignFlow, credibility, divisions, regionalSignals } from "@/lib/content";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Image from "next/image";
import { MouseEvent, useRef } from "react";

const chapters = [
  {
    eyebrow: "01 / Introduction",
    title: "Attention is not bought. It is directed.",
    copy: "Pattrix builds the language, timing, production, and public rhythm that make campaigns easier to notice, trust, and remember.",
    note: "Visibility"
  },
  {
    eyebrow: "02 / Authority",
    title: "A Tripoli agency with institutional range.",
    copy: "From local market intelligence to public-facing reputation systems, the work is built for organizations that cannot afford unclear communication.",
    note: "Trust"
  },
  {
    eyebrow: "03 / Systems",
    title: "Six divisions move as one campaign room.",
    copy: "Strategic communication, PR, social, campaign strategy, content production, and digital presence are sequenced into one operating system.",
    note: "Architecture"
  },
  {
    eyebrow: "04 / Campaigns",
    title: "Every public moment is staged before it is seen.",
    copy: "Insight becomes strategy. Strategy becomes production. Production becomes distribution. Measurement sharpens the next wave.",
    note: "Momentum"
  },
  {
    eyebrow: "05 / Region",
    title: "From Tripoli outward, the signal travels.",
    copy: "The ambition is regional. The advantage is proximity: culture, institutions, audiences, and the public moments that shape perception.",
    note: "Presence"
  }
];

export function StoryJourney() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const x = useSpring(mx, { stiffness: 80, damping: 26, mass: 0.6 });
  const y = useSpring(my, { stiffness: 80, damping: 26, mass: 0.6 });
  const counterX = useTransform(x, (value) => value * -0.8);
  const counterY = useTransform(y, (value) => value * -0.8);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const cameraScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.08, 1.18, 1.03]);
  const cameraY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.34, 0.72, 1], [0.2, 0.58, 0.34, 0.72]);
  const blueGlow = useTransform(scrollYProgress, [0, 0.5, 1], [18, 62, 38]);
  const glow = useMotionTemplate`radial-gradient(circle at ${blueGlow}% 42%, rgba(1,113,221,0.26), transparent 32%)`;

  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left - rect.width / 2) * 0.018);
    my.set((event.clientY - rect.top - rect.height / 2) * 0.018);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative h-[560vh] bg-ink text-white sm:h-[620vh]"
    >
      <span id="systems" className="absolute top-[250vh] h-px w-px" />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ y: cameraY, scale: cameraScale }} className="absolute inset-0">
          <Image
            src="/images/cinematic-studio.png"
            alt="Layered Pattrix campaign environment"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.56]"
          />
        </motion.div>
        <motion.div style={{ background: reducedMotion ? undefined : glow }} className="absolute inset-0" />
        <motion.div
          style={{ opacity: fogOpacity }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,16,32,0.98),rgba(11,16,32,0.78)_46%,rgba(11,16,32,0.42)),radial-gradient(circle_at_50%_100%,rgba(245,247,250,0.14),transparent_30%)]"
        />
        <div className="absolute inset-0 bg-fine-noise bg-[length:18px_18px] opacity-[0.13]" />
        <motion.div
          style={{ x, y }}
          className="absolute right-[8vw] top-[26vh] hidden h-64 w-44 rounded-[2.5rem] border border-white/10 bg-white/[0.08] shadow-[0_50px_140px_rgba(1,113,221,0.16)] backdrop-blur-2xl lg:block"
        />
        <motion.div
          style={{ x: counterX, y: counterY }}
          className="absolute bottom-[10vh] right-[20vw] hidden h-24 w-80 rounded-full border border-white/10 bg-white/[0.07] backdrop-blur-2xl lg:block"
        />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pt-24">
          <div className="relative flex h-[38svh] min-h-[19rem] items-end pb-5 sm:h-[48svh] sm:min-h-[25rem] sm:items-center sm:pb-0 lg:h-auto lg:min-h-[34rem]">
            {chapters.map((chapter, index) => (
              <ChapterCopy
                key={chapter.title}
                chapter={chapter}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className="relative grid min-h-[38svh] content-start sm:min-h-[40svh] sm:content-center lg:min-h-[38rem]">
            <DivisionScene progress={scrollYProgress} />
            <FlowScene progress={scrollYProgress} />
            <TrustScene progress={scrollYProgress} />
            <RegionalScene progress={scrollYProgress} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 mx-auto hidden max-w-7xl sm:inset-x-8 sm:block">
          <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-2 backdrop-blur-2xl sm:grid-cols-5">
            {chapters.map((chapter, index) => (
              <ProgressPill
                key={chapter.note}
                index={index}
                label={chapter.note}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterCopy({
  chapter,
  index,
  progress
}: {
  chapter: (typeof chapters)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const center = index * 0.22;
  const start = index === 0 ? -0.08 : center - 0.12;
  const hold = index === 0 ? 0 : center;
  const end = index === chapters.length - 1 ? 1.08 : center + 0.18;
  const opacity = useTransform(progress, [start, hold, end], [0, 1, 0]);
  const y = useTransform(progress, [start, hold, end], [28, 0, -28]);
  const blur = useTransform(progress, [start, hold, end], [10, 0, 10]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div style={{ opacity, y, filter }} className="absolute inset-x-0">
      <p className="mb-5 border-l border-ocean pl-4 text-[11px] font-semibold uppercase tracking-normal text-white/[0.55]">
        {chapter.eyebrow}
      </p>
      <h2 className="max-w-4xl font-display text-[clamp(2.25rem,12vw,6.8rem)] font-semibold leading-[0.9] text-balance sm:text-[clamp(2.55rem,7.4vw,6.8rem)]">
        {chapter.title}
      </h2>
      <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-white/[0.64] sm:mt-7 sm:text-lg sm:leading-8">
        {chapter.copy}
      </p>
      {index === 0 ? (
        <div className="pointer-events-auto mt-6 sm:mt-8">
          <MagneticButton href="#work" variant="light">
            Enter the campaign room
          </MagneticButton>
        </div>
      ) : null}
    </motion.div>
  );
}

function DivisionScene({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, [0.22, 0.34, 0.6], [0, 1, 0]);
  const y = useTransform(progress, [0.22, 0.38, 0.6], [46, 0, -26]);
  const active = useTransform(progress, [0.34, 0.52], [0, divisions.length - 1]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0">
      <div className="grid max-h-[38svh] gap-2 overflow-hidden sm:max-h-none sm:gap-3">
        {divisions.map((division, index) => {
          return (
            <DivisionRow
              key={division.title}
              division={division}
              index={index}
              active={active}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function FlowScene({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, [0.46, 0.58, 0.82], [0, 1, 0]);
  const scale = useTransform(progress, [0.46, 0.58, 0.82], [0.96, 1, 0.98]);
  const active = useTransform(progress, [0.55, 0.72], [0, campaignFlow.length - 1]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-x-0">
      <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase text-white/[0.46] sm:mb-7 sm:text-xs">
          <span>Campaign system</span>
          <span>Insight to measurement</span>
        </div>
        <div className="grid gap-3">
          {campaignFlow.map((step, index) => {
            return (
              <FlowStep
                key={step.title}
                step={step}
                index={index}
                active={active}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function TrustScene({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, [0.02, 0.14, 0.36], [0, 1, 0]);
  const y = useTransform(progress, [0.02, 0.14, 0.36], [42, 0, -18]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0">
      <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl sm:rounded-[2rem] sm:p-7">
        <p className="mb-4 text-[10px] font-semibold uppercase text-white/[0.42] sm:mb-5 sm:text-xs">Trusted campaign sectors</p>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10">
          {credibility.metrics.map((item) => (
            <div key={item.label} className="bg-ink/[0.48] p-3 sm:p-5">
              <p className="font-display text-xl font-semibold sm:text-5xl">{item.value}</p>
              <p className="mt-2 text-[9px] uppercase leading-tight text-white/[0.42] sm:text-xs">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 hidden flex-wrap gap-2 sm:flex">
          {credibility.sectors.map((sector) => (
            <span key={sector} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs text-white/[0.62]">
              {sector}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RegionalScene({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, [0.7, 0.82, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.7, 0.82, 1], [42, 0, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0">
      <div className="grid gap-3 sm:gap-4">
        {regionalSignals.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ocean text-white sm:h-11 sm:w-11">
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-xl font-semibold sm:text-2xl">{item.title}</h3>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/[0.58] sm:mt-4 sm:text-sm sm:leading-6">{item.copy}</p>
            </article>
          );
        })}
      </div>
    </motion.div>
  );
}

function DivisionRow({
  division,
  index,
  active
}: {
  division: (typeof divisions)[number];
  index: number;
  active: MotionValue<number>;
}) {
  const Icon = division.icon;
  const rowOpacity = useTransform(active, [index - 1, index, index + 1], [0.34, 1, 0.34]);
  const rowX = useTransform(active, [index - 1, index, index + 1], [0, 18, 0]);

  return (
    <motion.article
      style={{ opacity: rowOpacity, x: rowX }}
      className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl sm:grid-cols-[auto_0.8fr_1fr] sm:items-center sm:gap-4 sm:p-4"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white sm:h-11 sm:w-11">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase text-ocean">{division.signal}</p>
        <h3 className="font-display text-lg font-semibold leading-none sm:text-2xl">{division.title}</h3>
      </div>
      <p className="col-span-2 hidden text-sm leading-6 text-white/[0.58] sm:col-span-1 sm:block">{division.copy}</p>
    </motion.article>
  );
}

function FlowStep({
  step,
  index,
  active
}: {
  step: (typeof campaignFlow)[number];
  index: number;
  active: MotionValue<number>;
}) {
  const Icon = step.icon;
  const stepOpacity = useTransform(active, [index - 1, index, index + 1], [0.38, 1, 0.38]);
  const stepScale = useTransform(active, [index - 1, index, index + 1], [0.98, 1.02, 0.98]);

  return (
    <motion.article
      style={{ opacity: stepOpacity, scale: stepScale }}
      className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-ink/[0.44] p-3 sm:gap-4 sm:p-4"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white sm:h-12 sm:w-12">
        <Icon size={18} />
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold leading-none sm:text-3xl">{step.title}</h3>
        <p className="mt-2 hidden text-sm leading-6 text-white/[0.58] sm:block">{step.copy}</p>
      </div>
    </motion.article>
  );
}

function ProgressPill({
  index,
  label,
  progress
}: {
  index: number;
  label: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index * 0.18;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start - 0.06, start, end, end + 0.06], [0.36, 1, 1, 0.36]);
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="relative overflow-hidden rounded-xl bg-white/[0.04] px-3 py-2 text-center">
      <motion.span style={{ scaleX }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-ocean" />
      <span className="text-[10px] font-semibold uppercase text-white/[0.64]">{label}</span>
    </motion.div>
  );
}
