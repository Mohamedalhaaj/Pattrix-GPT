"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { alreadyPastTrigger, useLazyGsap } from "@/lib/gsap-lazy";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children with a stagger instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

/** Where the reveal fires, as a fraction of viewport height. */
const START_RATIO = 0.82;

/**
 * Once-only scroll reveal. Content is visible by default (no-JS safe);
 * with motion allowed, it enters from below when scrolled into view.
 * Under prefers-reduced-motion nothing animates.
 *
 * GSAP is now loaded lazily (lib/gsap-lazy.ts), so this has to cope with
 * arriving after the visitor may already have scrolled — hence the guard.
 */
export function Reveal({ children, as: Tag = "div", className, stagger = false, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLazyGsap(({ EASE, MM, gsap }) => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MM.motionOk, () => {
      // Already on screen by the time GSAP arrived: leave it alone. Creating the
      // tween now would fire its trigger immediately and blink visible content
      // out and back in — the same defect that cost the hero 4s of LCP.
      if (alreadyPastTrigger(el, START_RATIO)) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 0.8,
        delay,
        ease: EASE.reveal,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: `top ${START_RATIO * 100}%`, once: true }
      });
    });
    return () => mm.revert();
  }, ref);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
