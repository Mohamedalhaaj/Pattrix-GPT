import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { arSite } from "@/content/index-pages";
import { site } from "@/content/site";
import "../globals.css";

/**
 * Arabic root layout.
 *
 * Next.js allows exactly one root layout per route group, so /ar/* lives in its
 * own group and gets a real `<html lang="ar" dir="rtl">`. Previously the whole
 * site shared a single lang="en" root and Arabic pages could only declare
 * lang/dir on an inner wrapper — which left the shared Header and Footer in
 * English, and the document itself mislabelled for search engines and screen
 * readers.
 *
 * Because dir="rtl" now sits on <html>, every logical-property utility mirrors
 * itself: no RTL-specific classes are needed anywhere below.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"]
});

// Weights are exactly the three the Arabic pages render (regular, font-medium,
// font-semibold). The "latin" subset is dropped: the `font-arabic` family falls
// through to Archivo for Latin glyphs (see tailwind.config.ts), so those cuts
// would be pure duplication.
//
// preload:false is load-bearing, not an oversight. next/font preloads a root
// layout's fonts across the whole build, and this file became a ROOT layout when
// /ar moved into its own route group — which put all three Arabic weights
// (~103KB) on the critical path of every ENGLISH page, reintroducing the exact
// regression 1175b9a fixed, and at higher priority than before. Verified by
// diffing the <link rel=preload> set on / against /ar. Source Serif is excluded
// the same way for the same reason. `display: swap` keeps Arabic text readable
// while the face loads at normal priority on /ar routes.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-arabic"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.metaTitle,
    template: `%s — ${site.name}`
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
  width: "device-width",
  initialScale: 1
};

export default function ArabicRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${archivo.variable} ${arabic.variable}`}>
      <body className="font-arabic">
        <a href="#main" className="skip-link">
          {arSite.skipToContent}
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
