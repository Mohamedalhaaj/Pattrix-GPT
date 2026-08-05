import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { arSite } from "@/content/index-pages";

/**
 * Arabic segment layout — owns the Arabic typeface.
 *
 * This file exists purely to scope the font. next/font preloads the fonts of a
 * ROOT layout across every route in the build, so declaring IBM Plex Sans
 * Arabic in app/(ar)/layout.tsx (which became a root layout when /ar moved into
 * its own route group) put the Arabic weights on the critical path of English
 * pages too. The previous fix was `preload: false`, which stopped the leak but
 * also meant the typeface that renders EVERY glyph on /ar was never preloaded
 * at all — measured: 89 of 89 visible text nodes on /ar render in IBM Plex Sans
 * Arabic, and all five of its files were discovered late, from CSS.
 *
 * Declaring it in a nested layout instead scopes the preload to /ar/* — the
 * only routes that render Arabic — which is what was wanted all along.
 *
 * The skip link lives here rather than in the root layout because it is Arabic
 * text and needs this font scope; the root layout above keeps <html>/<body>.
 */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  // Exactly the three cuts the Arabic pages render (regular, medium, semibold).
  // The "latin" subset stays dropped: Latin runs on these pages are short
  // (brand name, phone numbers, the language switch) and fall through the
  // `font-arabic` stack to Archivo.
  weight: ["400", "500", "600"],
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
