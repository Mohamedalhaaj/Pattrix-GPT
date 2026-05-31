"use client";

import { navItems } from "@/lib/content";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrollToSection = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);

    if (!target) return;

    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });
    setOpen(false);
  };

  return (
    <header className="fixed left-4 top-4 z-50 w-[calc(100vw-2rem)] sm:left-6 sm:w-[calc(100vw-3rem)]">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex min-h-16 w-auto max-w-7xl items-center justify-between rounded-[2rem] border border-white/[0.55] bg-white/[0.78] px-4 py-3 shadow-glass backdrop-blur-2xl sm:rounded-full sm:px-6 lg:mx-auto lg:flex lg:w-full"
      >
        <Link href="#top" className="leading-none text-ink">
          <span className="block font-display text-sm font-semibold">Pattrix</span>
          <span className="mt-1 hidden text-[10px] font-medium text-ink/[0.46] sm:block">
            Marketing & PR Agency
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full bg-ink/[0.06] p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={scrollToSection(item.toLowerCase())}
              className="rounded-full px-4 py-2 text-xs font-medium text-ink/[0.62] transition duration-300 hover:bg-white hover:text-ink"
            >
              {item}
            </Link>
          ))}
        </nav>
        <Link
          href="#contact"
          className="hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition duration-300 hover:bg-ocean lg:inline-flex"
        >
          Get in touch
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="ml-3 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white shadow-blue transition duration-300 hover:bg-ocean lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.6rem] border border-white/[0.45] bg-white/[0.82] p-2 shadow-glass backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={scrollToSection(item.toLowerCase())}
                  className="rounded-[1.15rem] px-4 py-4 text-sm font-semibold text-ink/[0.72] transition duration-300 hover:bg-ink hover:text-white"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-[1.15rem] bg-ink px-4 py-4 text-sm font-semibold text-white"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        style={{ scaleX }}
        className="mx-auto mt-3 h-px max-w-7xl origin-left bg-ocean/60"
      />
    </header>
  );
}
