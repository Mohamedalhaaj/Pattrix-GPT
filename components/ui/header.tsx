"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/**
 * Fixed header: quiet over the hero, gains a hairline + blur after scroll,
 * hides on long scroll-down and returns on scroll-up. Mobile: overlay menu.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 600 && y > lastY.current);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // NOTE: the header itself must never carry a transform — a transformed
    // ancestor would turn the fixed mobile overlay into an absolutely
    // positioned child of the 64px bar. Only the inner bar translates.
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 transition-[transform,background-color,border-color] duration-300 ease-out-quart ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open ? "border-b border-hairline bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="eyebrow !text-[0.8125rem] font-bold text-ink"
            aria-label="Pattrix — home"
            onClick={() => setOpen(false)}
          >
            Pattrix
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8125rem] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-full bg-ink px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-blue"
            >
              Start a project
            </a>
          </nav>

          <button
            type="button"
            className="relative z-50 -mr-2 grid h-11 w-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300 ease-out-quart ${
                  open ? "top-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-300 ease-out-quart ${
                  open ? "bottom-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="display border-b border-hairline py-4 text-4xl text-ink"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${site.contact.email}`}
            tabIndex={open ? 0 : -1}
            className="rounded-full bg-ink px-6 py-4 text-center text-sm font-semibold text-white"
          >
            Start a project
          </a>
          <p className="text-center text-xs text-ink-3">{site.contact.location}</p>
        </div>
      </div>
    </header>
  );
}
