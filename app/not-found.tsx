import { Archivo } from "next/font/google";
import Link from "next/link";
import { site } from "@/content/site";
import "./globals.css";

// This route inherits no root layout, so it also inherits no font variable —
// without this the 404 rendered in the browser's default serif. Same call as
// the (en) root layout, so it resolves to the same cached font files rather
// than a second download.
// `optional` — see the note on the same call in app/(en)/layout.tsx.
const archivo = Archivo({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-archivo",
  axes: ["wdth"]
});

/**
 * Site-wide 404.
 *
 * Renders its own <html>/<body> for the same reason global-error.tsx does: the
 * site has one root layout per route group ((en), (ar), (studio)) and none of
 * them wraps a top-level not-found, so there is no chrome to inherit.
 *
 * This route earns its place — Search Console has been recording 404s against
 * this domain (see the two 301s in netlify.toml), and until now every one of
 * them landed on Next's unstyled default page with no way back into the site.
 * The links below are the four indexable entry points, so a dead URL recovers
 * the visitor instead of ending the session.
 *
 * Deliberately not indexed: Next serves this with a 404 status, which is the
 * correct signal on its own — no meta robots tag is needed or wanted.
 */
// metadataBase is repeated here because this route sits outside all three root
// layouts and so inherits none of theirs — without it the build falls back to
// http://localhost:3000 when resolving metadata URLs.
export const metadata = {
  metadataBase: new URL(site.url),
  title: "Page not found",
  robots: { index: false, follow: true }
};

const destinations = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Selected work" },
  { href: "/insights", label: "Insights" }
];

export default function NotFound() {
  return (
    <html lang="en" dir="ltr" className={archivo.variable}>
      <body className="bg-paper font-sans text-ink">
        <main className="flex min-h-screen items-center py-24">
          <div className="container-x">
            <p className="eyebrow text-blue-ink">404</p>
            <h1 className="display mt-8 max-w-[9em] text-[clamp(2.5rem,7vw,5rem)]">
              This page left the pattern.
            </h1>
            <p className="prose-measure mt-6 text-base leading-relaxed text-ink-2 md:text-lg">
              The link you followed is broken or the page has moved. Everything below is still where
              it should be.
            </p>

            <nav aria-label="Suggested pages" className="mt-14 border-t border-hairline pt-10">
              <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-10">
                {destinations.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="group inline-flex items-center gap-3 text-lg font-semibold text-ink transition-colors duration-200 hover:text-blue"
                    >
                      {d.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 ease-out-quart group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-12 text-sm text-ink-2">
              <Link
                href="/ar"
                lang="ar"
                hrefLang="ar"
                className="underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                العربية
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
