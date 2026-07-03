"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { MM, gsap, useGSAP } from "@/lib/gsap";
import { setField } from "@/components/field/store";

const NAVY = "#0A1220";
const PAPER = "#F7F8FA";

/**
 * The single dark cinematic beat. With JS + motion: the section goes
 * transparent, the page background sinks to navy, the field scatters into
 * chaotic noise and three scrubbed statements pass; the last one snaps the
 * field back into order. Without JS (or with reduced motion) it renders as a
 * static opaque navy block with all three lines readable.
 */
export function Interlude() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const lines = gsap.utils.toArray<HTMLElement>("[data-interlude-line]", section);
      const mm = gsap.matchMedia();

      mm.add(MM.motionOk, () => {
        // Enhanced mode: the fixed field shows through; body carries the navy.
        gsap.set(section, { backgroundColor: "transparent" });

        const darken = () => {
          setField({ theme: "dark", formation: "noise", energy: 1.5, dim: 1 });
          gsap.to(document.body, { backgroundColor: NAVY, duration: 0.9, ease: "power2.inOut", overwrite: "auto" });
        };
        const lighten = () => {
          gsap.to(document.body, { backgroundColor: PAPER, duration: 0.9, ease: "power2.inOut", overwrite: "auto" });
        };

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 60%",
            onEnter: darken,
            onEnterBack: darken,
            onLeave: lighten,
            onLeaveBack: lighten
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6
          }
        });
        lines.forEach((line, i) => {
          tl.fromTo(line, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" });
          if (i < lines.length - 1) {
            tl.to(line, { autoAlpha: 0, y: -40, duration: 0.8, ease: "power2.in" }, "+=0.45");
          }
        });
        // The final line snaps chaos into order — the thesis of the site.
        tl.call(
          () => setField({ formation: "signal", ox: 0.5, oy: 0.5, theme: "dark", energy: 1, dim: 1 }),
          [],
          "-=0.5"
        );

        return () => {
          st.kill();
          tl.kill();
          gsap.set(document.body, { backgroundColor: PAPER });
        };
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-label="Why pattern matters"
      className="relative bg-navy motion-safe:h-[260vh]"
    >
      <div className="sticky top-0 flex min-h-[60vh] items-center motion-safe:h-screen">
        <div className="container-x flex flex-col items-center justify-center gap-12 py-20 text-center motion-safe:relative motion-safe:py-0">
          {site.interlude.lines.map((line, i) =>
            i === site.interlude.lines.length - 1 ? (
              <p
                key={line}
                data-interlude-line
                className="display-sub mx-auto max-w-[16em] font-editorial text-[clamp(1.9rem,4.8vw,4.1rem)] italic text-navy-ink"
              >
                Our work is what <span className="text-[#5FA8F0]">survives</span> the filter.
              </p>
            ) : (
              <p
                key={line}
                data-interlude-line
                className="display-sub mx-auto max-w-[16em] text-[clamp(1.9rem,4.8vw,4.1rem)] text-navy-ink"
              >
                {line}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
