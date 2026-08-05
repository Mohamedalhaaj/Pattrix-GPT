import Link from "next/link";
import type { ReactNode } from "react";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark" | "blue";
  className?: string;
  /**
   * Pass `false` when the target resolves to the page the CTA is already on —
   * a same-page anchor such as the hero's "/#work". next/link otherwise
   * prefetches the RSC payload of the current route, which is pure waste.
   */
  prefetch?: boolean;
}

/** Signature call-to-action: underlined label + circled arrow that fills on hover. */
export function CtaLink({ href, children, tone = "light", className = "", prefetch }: CtaLinkProps) {
  const text =
    tone === "dark" ? "text-navy-ink" : tone === "blue" ? "text-white" : "text-ink";
  const circle =
    tone === "dark"
      ? "border-navy-hairline group-hover:border-navy-ink group-hover:bg-navy-ink group-hover:text-navy"
      : tone === "blue"
        ? "border-white/40 group-hover:bg-white group-hover:text-blue"
        : "border-ink/20 group-hover:border-blue group-hover:bg-blue group-hover:text-white";
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`group inline-flex items-center gap-3 text-sm font-semibold tracking-wide ${text} ${className}`}
    >
      <span className="underline decoration-1 underline-offset-8 decoration-current/30 transition-colors duration-200 group-hover:decoration-current">
        {children}
      </span>
      <span
        aria-hidden="true"
        /* Explicit property list rather than Tailwind's catch-all transition
           utility. That utility resolves to `transition-property: all`, which
           includes `visibility` — a property the compositor cannot animate — so
           the browser ran this hover on the main thread. Lighthouse counted
           this circle among 12 "non-composited animations", every one of them
           for that same reason. Listed below are the only properties the hover
           states actually change.
           (Do not write the utility's literal class name in a comment: the
           Tailwind content scanner reads comments too, and would regenerate the
           dead rule it was removed to avoid.) */
        className={`grid h-9 w-9 place-items-center rounded-full border transition-[background-color,border-color,color] duration-200 ease-out-quart ${circle}`}
      >
        {/* SVG geometry does not mirror under dir="rtl" the way layout does, so
            the arrow is flipped explicitly — otherwise it points away from the
            reading direction on every Arabic page. The hover nudge is flipped
            with it (translate-x is physical, so rtl: negates it). */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
        >
          <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
