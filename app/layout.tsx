import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"]
});

// Italic only — the editorial voice is exclusively italic asides; shipping the
// upright cuts would add unused font data.
const editorialSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial",
  style: ["italic"],
  axes: ["opsz"]
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.metaTitle,
    template: `%s — ${site.name}`
  },
  description: site.metaDescription,
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription
  },
  robots: { index: true, follow: true }
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
    <html lang="en" className={`${archivo.variable} ${editorialSerif.variable}`}>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
