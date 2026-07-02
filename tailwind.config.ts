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
        "ink-2": "rgba(16,22,35,0.62)",
        "ink-3": "rgba(16,22,35,0.40)",
        hairline: "rgba(16,22,35,0.10)",
        blue: "#0171DD",
        "blue-deep": "#0A50A8",
        "blue-tint": "#E9F2FC",
        navy: "#0A1220",
        "navy-ink": "#E9EEF6",
        "navy-hairline": "rgba(233,238,246,0.14)"
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ["var(--font-newsreader)", "Georgia", "serif"]
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
