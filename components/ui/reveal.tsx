"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MM, gsap, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children with a stagger instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

/**
 * Once-only scroll reveal. Content is visible by default (no-JS safe);
 * with motion allowed, it enters from below when scrolled into view.
 * Under prefers-reduced-motion nothing animates.
 */
export function Reveal({ children, as: Tag = "div", className, stagger = false, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MM.motionOk, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 0.8,
          delay,
          ease: EASE.reveal,
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: "top 82%", once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
