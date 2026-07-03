"use client";

import { useEffect, useRef } from "react";
import { FieldEngine } from "./engine";
import { bindField } from "./store";

/**
 * The fixed background canvas hosting the Pattern Field.
 * Decorative only: aria-hidden, pointer-events none, content renders above it.
 * Fades in (direct DOM style, no re-render) so the H1 stays the LCP element.
 */
export function FieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let engine: FieldEngine;
    try {
      engine = new FieldEngine(canvas, reduced);
    } catch {
      return; // canvas unavailable — site remains fully usable without the field
    }
    const unbind = bindField((state) => engine.set(state));
    canvas.style.opacity = "1";
    return () => {
      unbind();
      engine.destroy();
    };
  }, []);

  return (
    <div className="field-layer" aria-hidden="true">
      <canvas ref={ref} className="opacity-0 transition-opacity duration-1000 ease-out" />
    </div>
  );
}
