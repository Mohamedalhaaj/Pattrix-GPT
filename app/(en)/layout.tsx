import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import "../globals.css";

// Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (see
// docs/SEO_CHECKLIST.md) after creating the property. Never hardcode a token.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"]
});

// Italic only — the editorial voice is exclusively italic asides; shipping the
// upright cuts would add unused font data.
//
// preload:false is deliberate. This face styles two short asides on the home
// page and nothing at all on service, insight, and case-study pages, yet a
// preload put its ~127KB on the critical path of every route — more than a
// quarter of the home page's total transfer, competing with Archivo (which
// does render the H1). It now loads at normal priority, after the text that
// matters. `display: swap` already guarantees the asides stay readable.
// The `opsz` axis is deliberately NOT requested. Asking for it makes Google
// serve the full variable italic — 129,940 B, the single largest asset on the
// site and larger than Archivo, which actually renders the H1. Dropping it
// leaves a weight-variable italic that is a fraction of the size and renders
// these two asides identically: optical sizing only retunes stroke contrast
// across a display-vs-caption size range this site never spans.
// `optional`, not `swap`. Measured on PageSpeed (mobile, Slow 4G): this face was
// being fetched at VeryHigh priority and finishing at 927ms — right on top of
// Archivo, which finishes at 917ms and which the LCP element waits for. 52KB of
// bandwidth was going to two decorative italic asides while the headline the
// visitor is actually reading queued behind them.
//
// `optional` gives it a ~100ms window and, if it misses, keeps the fallback for
// that page view instead of swapping. That is the right trade for this face
// specifically: it styles two short asides, one of them below the fold, so a
// visitor on a slow connection reading them in Georgia loses nothing, and no
// swap means no late reflow either. Archivo is a different case — it renders
// the whole page and stays on `swap`.
const editorialSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "optional",
  preload: false,
  variable: "--font-editorial",
  style: ["italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.metaTitle,
    template: `%s — ${site.name}`
  },
  description: site.metaDescription,
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    // Declared explicitly rather than relying on app/opengraph-image.tsx being
    // picked up: file-based metadata does not cascade into nested segments, and
    // any page that declares its own `openGraph` replaces this object wholesale
    // — so every such page repeats it. Without this the English pages shipped
    // with no og:image at all (verified on the live site).
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription
  },
  robots: { index: true, follow: true },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {})
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${archivo.variable} ${editorialSerif.variable}`}>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
