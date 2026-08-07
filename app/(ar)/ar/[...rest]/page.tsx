import { notFound } from "next/navigation";

/**
 * Catch-all that routes every unmatched /ar/* URL to the ARABIC 404.
 *
 * Completely unmatched URLs never enter a route group's tree: Next renders
 * the root app/not-found.tsx for them, which is the English page — so a dead
 * Arabic URL used to answer an Arabic visitor in English. This route makes
 * every dead /ar URL match something inside the (ar) group instead; the
 * notFound() it throws renders the not-found.tsx boundary beside it with a
 * 404 status. Real routes always beat a catch-all in the App Router, so this
 * can never shadow a page.
 *
 * Honest limits, verified against the production build: a request-time
 * notFound() from a dynamic segment is served as Next's minimal error shell
 * (built-in noindex meta, no lang/dir on <html>) whose body hydrates into
 * the Arabic 404 client-side — identical to how every dynamic 404 on the
 * ENGLISH side (/services/<bad>, /work/<bad>) has always been served, so
 * this is the platform's behavior, not a regression. The 404 status code is
 * the crawl signal that matters. A metadata export HERE would be dropped for
 * the same reason; the <title> is contributed by not-found.tsx instead,
 * which the error document does honor.
 */
export default function ArCatchAll() {
  notFound();
}
