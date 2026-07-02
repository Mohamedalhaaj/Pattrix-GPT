"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { FieldState } from "./engine";
import { setField } from "./store";

/**
 * Invisible marker that retunes the Pattern Field when its parent section
 * enters the viewport (scrolling in either direction). Keeps chapter sections
 * as server components — only this 1-element marker is client-side.
 */
export function FieldTrigger(props: Partial<FieldState>) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = ref.current?.parentElement;
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 62%",
        end: "bottom 45%",
        onEnter: () => setField(props),
        onEnterBack: () => setField(props)
      });
    },
    { scope: ref }
  );

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute" />;
}
