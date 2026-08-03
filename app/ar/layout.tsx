import { IBM_Plex_Sans_Arabic } from "next/font/google";

/**
 * Arabic route group. Loads IBM Plex Sans Arabic ONLY for /ar/* so English
 * pages carry zero extra font weight; the `--font-arabic` variable feeds the
 * `font-arabic` Tailwind family.
 *
 * Constraint, documented: Next.js allows a single root layout, so <html>
 * keeps lang="en" site-wide. Arabic content therefore declares lang="ar"
 * dir="rtl" on its <article> wrapper (see ServiceArticle) rather than here —
 * wrapping the whole subtree would also flip the shared Header/Footer, which
 * must keep their designed LTR layout. Revisit with locale route groups if
 * the site ever becomes fully bilingual.
 */
// Weights are exactly the three the Arabic articles render (regular,
// font-medium, font-semibold) — 700 was shipped but never used. The "latin"
// subset is dropped too: the `font-arabic` family falls through to Archivo for
// Latin glyphs (see tailwind.config.ts), so those cuts were pure duplication.
// Together this takes the family from 8 files / ~194KB to 3 files / ~101KB.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-arabic"
});

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <div className={arabic.variable}>{children}</div>;
}
