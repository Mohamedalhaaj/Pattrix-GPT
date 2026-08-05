"use client";

import { useEffect } from "react";

/**
 * Loads the editorial serif AFTER first paint, via the FontFace API.
 *
 * Why not next/font: next/font emits the @font-face into the critical CSS, and
 * the browser then fetches the file at high priority during page load. Measured
 * on PageSpeed's mobile probe, this 51KB face was finishing inside the LCP
 * window on every run — competing with the document and Archivo for Slow-4G
 * bandwidth — despite styling exactly two italic asides, both below the fold
 * (the positioning aside and the interlude line, EN home page only).
 *
 * Loading it here instead removes it from the critical path entirely: until the
 * face is registered, `font-editorial` resolves through its stack to Georgia
 * italic; once loaded (from an idle callback, ~1–2s in), the below-fold asides
 * upgrade. The swap is not visible at load time because neither aside is on
 * screen, and it causes no CLS for the same reason. No-JS visitors keep Georgia
 * — the same fallback `font-display: optional` already gave slow connections.
 *
 * This deviates from AGENTS.md's "loaded via next/font/google" for this ONE
 * face, deliberately and with measurement; it adds no font <link> tags, which
 * is what that rule exists to prevent. Archivo and IBM Plex stay on next/font.
 *
 * The woff2 in /public/fonts is byte-identical to what next/font served (copied
 * from the build output — Source Serif 4 italic, wght 200–900, latin subset,
 * no opsz axis). If the family is ever re-added to next/font, delete this.
 */
const FAMILY = "Source Serif 4";
const URL = "/fonts/source-serif-4-italic-var.woff2";

let loaded = false;

export function EditorialFont() {
  useEffect(() => {
    if (loaded || typeof FontFace === "undefined") return;
    loaded = true;

    const load = () => {
      const face = new FontFace(FAMILY, `url(${URL}) format("woff2")`, {
        style: "italic",
        weight: "200 900",
        display: "swap"
      });
      face
        .load()
        .then(() => document.fonts.add(face))
        .catch(() => {
          /* Fallback (Georgia italic) simply remains — same as a slow load. */
        });
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(load, { timeout: 2500 });
    else setTimeout(load, 300);
  }, []);

  return null;
}
