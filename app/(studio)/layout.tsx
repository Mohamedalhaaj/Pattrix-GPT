import type { Metadata } from "next";
import "../globals.css";

// The Studio page itself is a client component, so the noindex directive has
// to live here. robots.ts also disallows /studio; this covers direct links.
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false }
};

/**
 * Studio root layout. Sanity Studio renders its own full-page chrome, so this
 * is deliberately bare — no site fonts, header, footer, or JSON-LD. It exists
 * as a root layout because the site now has one per route group (see
 * app/(ar)/layout.tsx); Studio gets its own rather than inheriting the English
 * site's.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
