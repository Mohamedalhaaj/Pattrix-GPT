"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function MagneticButton({
  href,
  children,
  variant = "dark"
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 });
  const iconX = useTransform(springX, [-20, 20], [-4, 4]);
  const iconY = useTransform(springY, [-20, 20], [-4, 4]);

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const theme =
    variant === "dark"
      ? "bg-ink text-white shadow-blue"
      : "border border-white/40 bg-white/12 text-white backdrop-blur-xl";

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex">
      <Link
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-6 text-sm font-medium ${theme}`}
      >
        <span className="absolute inset-0 translate-y-full bg-ocean transition-transform duration-500 ease-luxury group-hover:translate-y-0" />
        <span className="relative">{children}</span>
        <motion.span style={{ x: iconX, y: iconY }} className="relative">
          <ArrowUpRight size={17} />
        </motion.span>
      </Link>
    </motion.div>
  );
}
