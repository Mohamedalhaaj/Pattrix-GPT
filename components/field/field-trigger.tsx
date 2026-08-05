"use client";

import { useRef } from "react";
import { useLazyGsap } from "@/lib/gsap-lazy";
import type { FieldState } from "./engine";
import { setField } from "./store";

/**
 * Invisible marker that retunes the Pattern Field when its parent section
 * enters the viewport (scrolling in either direction). Keeps chapter sections
 * as server components — only this 1-element marker is client-side.
 */
export function FieldTrigger(props: Partial<FieldState>) {
  const ref = useRef<HTMLDivElement>(null);

  // GSAP is lazy (lib/gsap-lazy.ts). Safe here without a guard: this creates
  // ScrollTriggers that only call setField, so a section already scrolled past
  // simply retunes the field on the next pass — nothing is hidden or revealed.
  useLazyGsap(
    ({ ScrollTrigger }) => {
      const section = ref.current?.parentElement;
      if (!section) return;
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 62%",
        end: "bottom 45%",
        onEnter: () => setField(props),
        onEnterBack: () => setField(props)
      });
      return () => st.kill();
    },
    ref
  );

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute" />;
}
