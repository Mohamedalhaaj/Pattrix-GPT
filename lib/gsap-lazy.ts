"use client";

import { useEffect, type RefObject } from "react";

type GsapApi = typeof import("@/lib/gsap");

/**
 * Run GSAP setup AFTER first paint, with GSAP itself loaded on demand.
 *
 * Every animation GSAP still owns here is scroll- or time-driven — the field,
 * the scroll reveals, the interlude scrub. None of it is needed to paint the
 * page, yet a static `import` from lib/gsap put the whole library plus
 * ScrollTrigger (~45KB of it unused) in the initial bundle, where PageSpeed
 * measured it as the site's only long main-thread tasks and attributed ~450ms
 * of LCP to it.
 *
 * Loading it from an idle callback moves it off the critical path entirely.
 * The `timeout` matters: it guarantees the work still happens on a busy main
 * thread rather than being starved indefinitely, so reveals never simply fail
 * to arrive.
 *
 * Cleanup goes through `gsap.context().revert()`, which restores every property
 * GSAP touched — the same guarantee `useGSAP` gives, which this replaces.
 */
export function useLazyGsap(
  setup: (api: GsapApi) => void | (() => void),
  scopeRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;
    let teardown: void | (() => void);

    const run = async () => {
      const api = await import("@/lib/gsap");
      if (cancelled) return;
      ctx = api.gsap.context(() => {
        teardown = setup(api);
      }, scopeRef?.current ?? undefined);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const usedIdle = typeof w.requestIdleCallback === "function";
    const handle = usedIdle
      ? w.requestIdleCallback!(run, { timeout: 1500 })
      : window.setTimeout(run, 200);

    return () => {
      cancelled = true;
      if (usedIdle) w.cancelIdleCallback?.(handle);
      else clearTimeout(handle);
      if (typeof teardown === "function") teardown();
      ctx?.revert();
    };
    // Setup is intentionally captured once: these are mount-time scene
    // definitions, not reactive effects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * True when `el` is already at or above its ScrollTrigger start line.
 *
 * Load-bearing for correctness, not perf. Because GSAP now arrives after paint,
 * a section the visitor has already scrolled past would have its
 * `from(autoAlpha: 0)` fire the instant ScrollTrigger is created — hiding
 * content that is on screen and fading it back in. That is exactly the bug that
 * cost the hero 4 seconds of LCP. Callers use this to skip the animation and
 * leave such content alone.
 */
export function alreadyPastTrigger(el: Element, startRatio = 0.82) {
  return el.getBoundingClientRect().top < window.innerHeight * startRatio;
}
