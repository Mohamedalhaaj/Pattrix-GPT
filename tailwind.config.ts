import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        ocean: "#0171DD",
        paper: "#F5F7FA",
        smoke: "#D8DFEA",
        platinum: "#ECEFF5",
        moss: "#596F62",
        graphite: "#161D2E"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        display: [
          "SF Pro Display",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        editorial: ["Georgia", "Times New Roman", "serif"]
      },
      boxShadow: {
        glass: "0 24px 80px rgba(11, 16, 32, 0.16)",
        blue: "0 18px 70px rgba(1, 113, 221, 0.22)"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      backgroundImage: {
        "fine-noise":
          "radial-gradient(circle at 1px 1px, rgba(11, 16, 32, 0.09) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
