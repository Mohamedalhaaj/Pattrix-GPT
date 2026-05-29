"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 24, mass: 0.5 });
  const y = useSpring(my, { stiffness: 90, damping: 24, mass: 0.5 });
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.22], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, 92]);
  const titleY = useTransform(scrollYProgress, [0, 0.26], [0, -70]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.18]);
  const counterX = useTransform(x, (value) => value * -0.7);
  const counterY = useTransform(y, (value) => value * -0.7);

  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left - rect.width / 2) * 0.025);
    my.set((event.clientY - rect.top - rect.height / 2) * 0.025);
  }

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative min-h-[104svh] overflow-hidden bg-ink text-white"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(1,113,221,0.28),transparent_28%),linear-gradient(90deg,rgba(11,16,32,0.95),rgba(11,16,32,0.56)_44%,rgba(11,16,32,0.12))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={{ x, y }}
        className="absolute right-[8vw] top-[24vh] hidden h-52 w-40 rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl lg:block"
      />
      <motion.div
        style={{ x: counterX, y: counterY }}
        className="absolute bottom-[18vh] right-[18vw] hidden h-28 w-72 rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-2xl lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-[104svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 sm:px-8 lg:pb-16">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } }
          }}
          className="max-w-6xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="mb-7 text-xs font-semibold uppercase text-white/68"
          >
            Strategy / Production / Social / Digital
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 54, filter: "blur(16px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="max-w-6xl font-display text-[clamp(4rem,13vw,13rem)] font-semibold leading-[0.82] text-balance"
          >
            Pattrix shapes desire into digital cinema.
          </motion.h1>
        </motion.div>

        <div className="mt-10 grid gap-8 border-t border-white/14 pt-8 md:grid-cols-[0.72fr_1fr] md:items-end">
          <MagneticButton href="#work" variant="light">
            View selected work
          </MagneticButton>
          <p className="max-w-2xl text-pretty text-base leading-7 text-white/68 sm:text-lg md:ml-auto">
            A luxury creative agency building brand systems, campaign worlds, and interactive experiences with cinematic restraint.
          </p>
        </div>
      </div>
    </section>
  );
}
