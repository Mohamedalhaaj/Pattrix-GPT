import type { Metadata } from "next";
import Link from "next/link";
import { ar404, arSite } from "@/content/index-pages";

/**
 * Arabic 404 — the not-found boundary for everything under /ar/*.
 *
 * Rendered for every notFound() thrown inside the (ar) group: unknown
 * case-study, service, and insight slugs, plus every completely unmatched
 * /ar URL via the [...rest] catch-all beside this file. Unlike the global
 * app/not-found.tsx (which owns dead URLs outside /ar and renders its own
 * <html lang="en">), this one renders inside the (ar) root layout, so the
 * document keeps lang="ar" dir="rtl" and the Arabic typeface.
 *
 * Mirrors the English 404's structure: the four indexable Arabic entry
 * points recover the visitor, and the language link crosses to the English
 * site the same way the English page's العربية link crosses here.
 */
// `absolute`, so the (ar) layout's `%s — ${site.name}` template does not
// append the Latin "Pattrix" — the same rule every Arabic route follows.
export const metadata: Metadata = {
  title: { absolute: `${ar404.title} — ${arSite.arName}` }
};

export default function ArNotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center py-24">
      <div className="container-x">
        <p className="eyebrow text-blue-ink">404</p>
        <h1 className="display mt-8 max-w-[13em] text-[clamp(2.5rem,7vw,5rem)]">
          {ar404.headline}
        </h1>
        <p className="prose-measure mt-6 text-base leading-relaxed text-ink-2 md:text-lg">
          {ar404.body}
        </p>

        <nav aria-label={ar404.navLabel} className="mt-14 border-t border-hairline pt-10">
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-10">
            {ar404.destinations.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group inline-flex items-center gap-3 text-lg font-semibold text-ink transition-colors duration-200 hover:text-blue"
                >
                  {d.label}
                  {/* ← rather than →, and the hover nudge negated with it:
                      forward is leftward in RTL, and translate-x is physical. */}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out-quart group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-12 text-sm text-ink-2">
          <Link
            href={ar404.langSwitch.href}
            lang="en"
            hrefLang="en"
            dir="ltr"
            className="underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-ink"
          >
            {ar404.langSwitch.label}
          </Link>
        </p>
      </div>
    </main>
  );
}
