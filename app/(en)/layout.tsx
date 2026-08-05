import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import "../globals.css";

// Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (see
// docs/SEO_CHECKLIST.md) after creating the property. Never hardcode a token.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// `optional`, not `swap`. Measured on PageSpeed (mobile, emulated Moto G over
// Slow 4G): Archivo finished at 1378ms and the LCP element's render delay was
// 1488ms — the hero was waiting on this file, and it cost the last 3 points of
// the Performance score (LCP -2.25, Speed Index -0.80; FCP, TBT and CLS were
// already perfect).
//
// `optional` gives the browser ~100ms and otherwise paints in the
// metric-matched fallback for that page view, with no later swap. Mohamed chose
// this trade knowingly on 2026-08-05: connections fast enough to deliver
// Archivo in time still get it, and slower ones get a page that is readable
// immediately rather than one that holds its headline back.
//
// Known cost, do not "fix" it by reverting: the fallback is Arial-based and has
// no width axis, so on a fallback render the `font-stretch` on .display /
// .display-sub / .eyebrow does nothing and headings look narrower than
// designed. That is accepted, not a bug. CLS stays 0 either way because
// `optional` never swaps.
const archivo = Archivo({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-archivo",
  axes: ["wdth"]
});

// Italic only — the editorial voice is exclusively italic asides; shipping the
// upright cuts would add unused font data.
//
// Three deliberate settings here, all measured:
//
// preload:false — this face styles two short asides on the home page and
// nothing at all on service, insight, and case-study pages, yet preloading it
// put ~127KB on the critical path of every route, competing with Archivo, which
// renders the H1.
//
// No `opsz` axis — requesting it makes Google serve the full variable italic at
// 129,940 B, larger than Archivo itself. Without it the face is a fraction of
// the size and renders these asides identically: optical sizing only retunes
// stroke contrast across a display-vs-caption range this site never spans.
//
// display:optional — even unpreloaded it was fetched at VeryHigh priority and
// finished at 927ms, on top of Archivo at 917ms: 52KB of a slow-4G window spent
// on two decorative asides while the headline queued behind them. `optional`
// caps its window at ~100ms and otherwise keeps the fallback for that page view,
// so it neither competes nor reflows late. It also turned out to be the source
// of the site's CLS — 0.074 before this, 0 after.
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
