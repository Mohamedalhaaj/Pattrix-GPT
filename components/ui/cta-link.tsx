import Link from "next/link";
import type { ReactNode } from "react";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark" | "blue";
  className?: string;
}

/** Signature call-to-action: underlined label + circled arrow that fills on hover. */
export function CtaLink({ href, children, tone = "light", className = "" }: CtaLinkProps) {
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
      className={`group inline-flex items-center gap-3 text-sm font-semibold tracking-wide ${text} ${className}`}
    >
      <span className="underline decoration-1 underline-offset-8 decoration-current/30 transition-colors duration-200 group-hover:decoration-current">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 ease-out-quart ${circle}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
          <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
