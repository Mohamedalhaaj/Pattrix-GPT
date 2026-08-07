import { insights } from "./insights";
import { projects } from "./projects";
import { servicePages } from "./service-pages";

/**
 * Bidirectional EN <-> AR route map for the language switch.
 *
 * Every Arabic route is its English counterpart under an /ar prefix, so the
 * mapping is mechanical — but it is built from the content files rather than
 * assumed, because the two sides are not GUARANTEED symmetrical: only insights
 * with an Arabic entry and projects carrying an `ar` block have Arabic versions
 * (all of them do today; new content starts unpaired until translated).
 * Switching language on a page whose counterpart does not exist would land on
 * a 404, so the switch falls back to the other side's home page instead (see
 * components/ui/lang-switch.tsx).
 */
const arPaths = new Set<string>([
  "/ar",
  "/ar/services",
  "/ar/insights",
  "/ar/work",
  ...servicePages.filter((p) => p.locale === "ar").map((p) => p.path),
  ...insights.filter((a) => a.locale === "ar").map((a) => a.path),
  ...projects.filter((p) => p.ar).map((p) => `/ar/work/${p.slug}`)
]);

/** "/services/x" -> "/ar/services/x", "/" -> "/ar". Empty when no counterpart. */
export const enToAr: Record<string, string> = {};
/** The inverse. */
export const arToEn: Record<string, string> = {};

for (const ar of arPaths) {
  const en = ar === "/ar" ? "/" : ar.slice(3);
  enToAr[en] = ar;
  arToEn[ar] = en;
}

/**
 * Counterpart for a path. When the exact counterpart does not exist, walk UP to
 * the nearest ancestor that does before giving up on the home page.
 *
 * Every insight and project is paired today, but any content added on one side
 * first starts unpaired, and the exact lookup misses for it. Sending its reader
 * to the other HOME page would discard everything the click expressed — someone
 * reading an article who asked for Arabic should land on /ar/insights (which
 * exists, and lists the Arabic articles), the honest nearest match. Same in
 * reverse.
 *
 * Trailing slashes are normalised so /services/ and /services agree.
 */
export function counterpartOf(pathname: string): { href: string; targetLocale: "en" | "ar" } {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const isArabic = path === "/ar" || path.startsWith("/ar/");
  const map = isArabic ? arToEn : enToAr;
  const targetLocale = isArabic ? "en" : "ar";
  const home = isArabic ? "/" : "/ar";

  const exact = map[path];
  if (exact) return { href: exact, targetLocale };

  // Drop one trailing segment at a time: /insights/x -> /insights -> (home).
  const segments = path.split("/").filter(Boolean);
  for (let i = segments.length - 1; i > 0; i--) {
    const ancestor = "/" + segments.slice(0, i).join("/");
    const hit = map[ancestor];
    if (hit) return { href: hit, targetLocale };
  }

  return { href: home, targetLocale };
}
