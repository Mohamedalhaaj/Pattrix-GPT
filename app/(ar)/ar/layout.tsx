import { Tajawal } from "next/font/google";
import { arSite } from "@/content/index-pages";

/**
 * Arabic segment layout — owns the Arabic typeface.
 *
 * This file exists purely to scope the font. next/font preloads the fonts of a
 * ROOT layout across every route in the build, so declaring the Arabic face in
 * app/(ar)/layout.tsx (which became a root layout when /ar moved into its own
 * route group) put the Arabic weights on the critical path of English pages
 * too. Declaring it in a nested layout instead scopes the preload to /ar/* —
 * the only routes that render Arabic.
 *
 * Tajawal — Mohamed's typeface decision (2026-08-07), replacing IBM Plex Sans
 * Arabic for every Arabic surface. Tajawal ships no 600 cut, so the weights
 * below are chosen for the CSS weights the pages actually request: 400 body,
 * 500 for font-medium, and 700 — which the font-matching algorithm resolves
 * every heavier request to (the .display 640, .display-sub 600 and .eyebrow
 * 560 in globals.css, plus font-semibold). The "latin" subset stays dropped:
 * Latin runs on these pages are short (brand name, phone numbers, the
 * language switch) and fall through the `font-arabic` stack to Archivo.
 *
 * The skip link lives here rather than in the root layout because it is Arabic
 * text and needs this font scope; the root layout above keeps <html>/<body>.
 */
const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-arabic"
});

export default function ArabicSegmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${arabic.variable} font-arabic`}>
      <a href="#main" className="skip-link">
        {arSite.skipToContent}
      </a>
      {children}
    </div>
  );
}
