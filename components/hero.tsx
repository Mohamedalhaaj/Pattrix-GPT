"use client";

import { MagneticButton } from "@/components/magnetic-button";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const lightX = useMotionValue(62);
  const lightY = useMotionValue(32);
  const reducedMotion = useReducedMotion();
  const x = useSpring(mx, { stiffness: 90, damping: 24, mass: 0.5 });
  const y = useSpring(my, { stiffness: 90, damping: 24, mass: 0.5 });
  const lightSpringX = useSpring(lightX, { stiffness: 55, damping: 22, mass: 0.7 });
  const lightSpringY = useSpring(lightY, { stiffness: 55, damping: 22, mass: 0.7 });
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.24], [1.05, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.32], [0, 56]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -34]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.36]);
  const counterX = useTransform(x, (value) => value * -0.7);
  const counterY = useTransform(y, (value) => value * -0.7);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${lightSpringX}% ${lightSpringY}%, rgba(1,113,221,0.32), transparent 28%)`;

  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left - rect.width / 2) * 0.025);
    my.set((event.clientY - rect.top - rect.height / 2) * 0.025);
    lightX.set(((event.clientX - rect.left) / rect.width) * 100);
    lightY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-white"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src="/images/cinematic-studio.png"
          alt="Cinematic glass studio environment"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.74]"
        />
      </motion.div>
      <motion.div
        style={{ background: reducedMotion ? undefined : spotlight }}
        className="absolute inset-0 opacity-80"
      />
      <motion.div
        animate={reducedMotion ? undefined : { opacity: [0.42, 0.72, 0.42], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[48%] top-[14%] h-[38rem] w-[38rem] rounded-full bg-ocean/[0.14] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_74%,rgba(245,247,250,0.1),transparent_24%),linear-gradient(90deg,rgba(11,16,32,0.97),rgba(11,16,32,0.74)_48%,rgba(11,16,32,0.25))]" />
      <div className="absolute inset-0 bg-fine-noise bg-[length:18px_18px] opacity-[0.14]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink via-ink/[0.76] to-transparent" />

      <motion.div
        style={{ x, y }}
        className="absolute right-[8vw] top-[25vh] hidden h-48 w-36 rounded-[2rem] border border-white/[0.15] bg-white/10 backdrop-blur-2xl shadow-[0_38px_120px_rgba(1,113,221,0.18)] lg:block"
      />
      <motion.div
        style={{ x: counterX, y: counterY }}
        className="absolute bottom-[16vh] right-[18vw] hidden h-24 w-64 rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-2xl lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-12 pt-32 sm:px-8 lg:pb-14 lg:pt-36">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } }
          }}
          className="max-w-[74rem]"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="mb-5 max-w-[22rem] border-l border-ocean/70 pl-4 text-[11px] font-semibold uppercase leading-5 text-white/[0.68] sm:max-w-none"
          >
            Tripoli / Marketing / PR / Public Perception
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 44 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="w-full max-w-[73rem] font-display text-[clamp(2.15rem,9vw,8.75rem)] font-semibold leading-[0.95] text-balance sm:text-[clamp(3.05rem,7.65vw,8.75rem)] sm:leading-[0.9]"
          >
            <span className="block sm:inline">We shape how </span>
            <span className="block sm:inline">brands are seen, </span>
            <span className="block sm:inline">remembered, and </span>
            <span className="block sm:inline">talked about.</span>
          </motion.h1>
        </motion.div>

        <div className="mt-8 grid gap-7 border-t border-white/[0.14] pt-7 md:grid-cols-[0.72fr_1fr] md:items-end lg:mt-10">
          <div>
            <MagneticButton href="#work" variant="light">
              View campaign systems
            </MagneticButton>
          </div>
          <div className="grid gap-5 md:ml-auto md:max-w-2xl">
            <p className="text-pretty text-base leading-7 text-white/[0.72] sm:text-lg">
              Pattrix is a premium Marketing & PR agency based in Tripoli, building communication systems for visibility, trust, and regional attention.
            </p>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-xs uppercase text-white/[0.54] sm:grid-cols-3">
              {["Reputation", "Campaigns", "Public trust"].map((item) => (
                <span key={item} className="bg-ink/40 px-3 py-3 text-center">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
