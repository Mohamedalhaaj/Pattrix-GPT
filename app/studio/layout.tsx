import type { Metadata } from "next";

// The Studio page itself is a client component, so the noindex directive has
// to live here. robots.ts also disallows /studio; this covers direct links.
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false }
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
