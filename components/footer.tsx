"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/motion-primitives";
import { ArrowIcon } from "@/lib/content";
import { motion } from "framer-motion";
import Link from "next/link";

const links = ["Instagram", "LinkedIn", "Behance"];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(1,113,221,0.24),transparent_32%),linear-gradient(180deg,rgba(245,247,250,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-8 text-xs font-semibold uppercase text-white/48">Contact</p>
          <h2 className="max-w-6xl font-display text-[clamp(3.8rem,11vw,11rem)] font-semibold leading-[0.84] text-balance">
            Make the next launch impossible to ignore.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-white/14 pt-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <MagneticButton href="mailto:studio@pattrix.com" variant="light">
              studio@pattrix.com
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.12} className="lg:ml-auto">
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-3 text-sm text-white/68 transition duration-300 hover:border-white/36 hover:text-white"
                >
                  {link}
                  <motion.span
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.28 }}
                    className="inline-flex"
                  >
                    <ArrowIcon size={15} />
                  </motion.span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Pattrix Creative Agency</span>
          <span>Strategy, production, social, digital experiences</span>
        </div>
      </div>
    </footer>
  );
}
