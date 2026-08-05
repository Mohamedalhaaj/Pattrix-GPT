"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpartOf } from "@/content/locale-map";

/**
 * Language switch.
 *
 * Deliberately NOT a globe: AGENTS.md rules out globes along with mountains,
 * blobs, and icon grids, and the field is the site's only metaphor. The
 * icon here is typographic instead — the two-letter code of the language you
 * would switch TO, inside the same circled affordance CtaLink already uses, so
 * it reads as part of the system rather than a borrowed UI convention.
 *
 * It resolves the actual counterpart route (/services -> /ar/services), not just
 * the home page, and falls back to the other side's home when a page has no
 * counterpart — only 2 of 4 insights and 5 of 5 projects are translated, so a
 * blind /ar prefix would 404.
 *
 * prefetch={false} is load-bearing: prefetching an /ar route from an English
 * page pulls the Arabic font CSS.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { href, targetLocale } = counterpartOf(pathname);
  const isTargetArabic = targetLocale === "ar";

  return (
    <Link
      href={href}
      prefetch={false}
      lang={targetLocale}
      hrefLang={targetLocale}
      // The accessible name must LEAD with the visible "AR"/"EN" text. With the
      // description alone the two disagreed, which fails WCAG 2.5.3 Label in
      // Name (Lighthouse: label-content-name-mismatch) and leaves a speech-input
      // user unable to activate the control by saying what they can see.
      aria-label={isTargetArabic ? "AR — التبديل إلى العربية" : "EN — Switch to English"}
      title={isTargetArabic ? "العربية" : "English"}
      className={`group/lang grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-[0.6875rem] font-semibold tracking-wider text-ink-2 transition-colors duration-200 hover:border-blue hover:bg-blue hover:text-white ${className}`}
    >
      {/* dir is pinned: these are Latin codes either way, so they must not
          reorder inside the RTL document. */}
      <span dir="ltr">{isTargetArabic ? "AR" : "EN"}</span>
    </Link>
  );
}
