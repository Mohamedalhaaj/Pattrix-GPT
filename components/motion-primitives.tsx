"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 42, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};

const group: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08
    }
  }
};

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const variants: Variants = {
    hidden: reveal.hidden,
    visible: {
      ...(reveal.visible as object),
      transition: {
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={reveal} className={className}>
      {children}
    </motion.div>
  );
}

export function SectionProgress({
  children,
  className
}: {
  children: (visible: boolean) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-28% 0px -28% 0px" });

  return (
    <div ref={ref} className={className}>
      {children(visible)}
    </div>
  );
}
