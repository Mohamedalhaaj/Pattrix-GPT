import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
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
// Archivo is genuinely used on /ar, despite the pages being Arabic: the Arabic
// face is requested with the "arabic" subset only, so it carries no Latin
// glyphs, and every Latin run on these pages — the email address, the social
// links, the EN language switch — falls through `font-arabic` to Archivo.
// Verified on the built site: its FontFace activates, and eight visible Latin
// runs resolve through it. So it is a real font here, not a leftover, and is
// left to preload.
// `optional` — see the note on the same call in app/(en)/layout.tsx.
const archivo = Archivo({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-archivo",
  axes: ["wdth"]
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
    // The Arabic face and the skip link now live in app/(ar)/ar/layout.tsx so
    // next/font scopes the preload to /ar/* instead of the whole build.
    <html lang="ar" dir="rtl" className={archivo.variable}>
      <body>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
