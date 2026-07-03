/**
 * Tiny module-level bus connecting chapter components to the field engine.
 * Chapters call setField(...) from ScrollTrigger callbacks; the canvas
 * component subscribes. No React context, no re-renders.
 */

import type { FieldState } from "./engine";

type Listener = (state: Partial<FieldState>) => void;

let listener: Listener | null = null;
let lastState: Partial<FieldState> | null = null;

export function setField(state: Partial<FieldState>) {
  lastState = { ...lastState, ...state };
  listener?.(state);
}

export function bindField(fn: Listener): () => void {
  listener = fn;
  // Replay the latest requested state so late-mounting canvas catches up.
  if (lastState) fn(lastState);
  return () => {
    if (listener === fn) listener = null;
  };
}
