"use client";

import { navItems } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/45 bg-white/55 px-4 shadow-glass backdrop-blur-2xl sm:px-6"
      >
        <Link href="#top" className="font-display text-sm font-semibold text-ink">
          Pattrix
        </Link>
        <nav className="hidden items-center gap-1 rounded-full bg-ink/5 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-xs font-medium text-ink/62 transition duration-300 hover:bg-white hover:text-ink"
            >
              {item}
            </Link>
          ))}
        </nav>
        <Link
          href="#contact"
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition duration-300 hover:bg-ocean"
        >
          Begin
        </Link>
      </motion.div>
      <motion.div
        style={{ scaleX }}
        className="mx-auto mt-3 h-px max-w-7xl origin-left bg-ocean/60"
      />
    </header>
  );
}
