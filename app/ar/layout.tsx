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
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic"
});

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <div className={arabic.variable}>{children}</div>;
}
