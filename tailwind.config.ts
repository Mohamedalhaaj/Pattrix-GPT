import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#101623",
        "ink-2": "rgba(16,22,35,0.70)",
        // 0.62, not 0.58: over the #F7F8FA paper, 0.58 composites to #71757D —
        // 4.35:1, which fails WCAG AA for the 11px eyebrows and 12px footer
        // legal line that use it. 0.62 gives #686C75 at 4.95:1. (ink-2 at 0.70
        // was already fine at 6.52:1.)
        "ink-3": "rgba(16,22,35,0.62)",
        hairline: "rgba(16,22,35,0.10)",
        blue: "#0171DD",
        // Text-only sibling of `blue`. The brand blue is 4.484:1 on the paper
        // background — it clears AA for large text (the hero H1 word, the open
        // service title) but not for the 11px eyebrows and 14px labels that
        // also use it. `blue-ink` is a 5% darkening to 4.898:1 that is
        // indistinguishable side by side. Never use it for fills or borders:
        // `bg-blue`/`border-blue` must stay #0171DD (AGENTS.md — the blue is
        // structural).
        "blue-ink": "#016BD2",
        "blue-deep": "#0A50A8",
        "blue-tint": "#E9F2FC",
        navy: "#0A1220",
        "navy-ink": "#E9EEF6",
        "navy-hairline": "rgba(233,238,246,0.14)"
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        // IBM Plex Sans Arabic — the variable is defined only under /ar, by
        // app/(ar)/ar/layout.tsx, which owns the face so next/font scopes its
        // preload to Arabic routes. The Archivo entry is load-bearing, not a
        // formality: the Arabic face ships the "arabic" subset only, so every
        // Latin run on an Arabic page (email, social links, the EN switch)
        // renders through it.
        arabic: ["var(--font-arabic)", "var(--font-archivo)", "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      maxWidth: {
        site: "85rem"
      },
      letterSpacing: {
        eyebrow: "0.16em"
      }
    }
  },
  plugins: []
};

export default config;
