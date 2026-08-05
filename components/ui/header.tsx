"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { arSite } from "@/content/index-pages";
import { site } from "@/content/site";
import { LangSwitch } from "@/components/ui/lang-switch";

/**
 * Fixed header: quiet over the hero, gains a hairline + blur after scroll,
 * hides on long scroll-down and returns on scroll-up. Mobile: overlay menu.
 *
 * `locale` swaps the nav, CTA, and accessible labels for their Arabic
 * counterparts and points the logo at /ar. Direction is not handled here — the
 * Arabic root layout sets dir="rtl" on <html>, so the flex rows below mirror
 * themselves without any RTL-specific classes.
 */
export function Header({ locale = "en" }: { locale?: "en" | "ar" }) {
  const isArabic = locale === "ar";
  const nav = isArabic ? arSite.nav : site.nav;
  const ctaLabel = isArabic ? arSite.ctaLabel : "Start a project";
  const homeHref = isArabic ? "/ar" : "/";
  const pathname = usePathname() ?? "/";

  /**
   * Every header nav entry is a same-page anchor ("/#work", "/#services", …),
   * so on the home page all five plus the logo resolve to "/" — the page the
   * visitor is already on. next/link still prefetched it, costing four RSC
   * round-trips (~8.7KB, measured) at load on the site's most important route,
   * competing with the fonts for bandwidth. Off the home page the same links
   * are real cross-page navigations, so prefetch stays on there.
   */
  const selfLink = (href: string) => (href.split("#")[0] || "/") === pathname;

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  /**
   * Modal behaviour for the mobile overlay.
   *
   * The panel is a full-screen opaque layer, but focus was never contained in
   * it: tabbing past the last link walked into the page behind — links the user
   * cannot see and which are covered by the overlay — and Escape closed the
   * panel while dropping focus onto <body>, so a keyboard user landed nowhere
   * and had to tab from the top of the document again.
   *
   * Tab is cycled within the panel, and focus is returned to the toggle that
   * opened it on close (the standard dialog contract).
   */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    // Captured now rather than read in cleanup: the toggle never unmounts, but
    // reading a ref during teardown is the pattern the exhaustive-deps rule
    // warns about, and the captured node is what we actually want to restore to.
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
      ).filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);

    /**
     * Focus the first item, but not until the panel is actually visible.
     *
     * The panel transitions `visibility` (so it can stay on screen through the
     * fade-OUT), which means that for the first frames after opening it is
     * still computed `visibility: hidden` — and `.focus()` on a descendant of a
     * hidden subtree is silently a no-op. The original one-shot `first?.focus()`
     * therefore never moved focus at all: opening the menu with the keyboard
     * left focus stranded on <body> behind the overlay. Retry per frame until
     * it takes, with a bounded budget so this can never spin.
     */
    let raf = 0;
    let framesLeft = 40;
    const focusFirst = () => {
      if (framesLeft-- <= 0) return;
      if (getComputedStyle(panel!).visibility !== "visible") {
        raf = requestAnimationFrame(focusFirst);
        return;
      }
      const first = focusables()[0];
      first?.focus();
      // Guard against the same hidden-subtree no-op on the focus call itself.
      if (first && document.activeElement !== first) raf = requestAnimationFrame(focusFirst);
    };
    raf = requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      // Also catches focus already sitting outside the panel (e.g. on the
      // toggle button, which lives outside it) and pulls it back in.
      if (e.shiftKey && (active === first || !panel?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel?.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      // Only steal focus back if it is still inside the panel being torn down;
      // otherwise a click elsewhere would be yanked back to the toggle.
      if (panel?.contains(document.activeElement)) toggle?.focus();
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
            href={homeHref}
            prefetch={selfLink(homeHref) ? false : undefined}
            aria-label={isArabic ? arSite.logoAriaLabel : "Pattrix — home"}
            onClick={() => setOpen(false)}
          >
            {/* width/height describe the RENDERED box (~90px wide), not the
                source file. Passing the source's 2335×561 made Next request
                /_next/image?w=3840 — a 3840px render of a wordmark shown at
                90px, preloaded at high priority on every page. */}
            <Image
              src="/brand/logo-dark.png"
              alt="Pattrix"
              width={187}
              height={45}
              priority
              className="h-[1.15rem] w-auto md:h-[1.35rem]"
            />
          </Link>

          <nav
            aria-label={isArabic ? arSite.primaryNavLabel : "Primary"}
            className="hidden items-center gap-8 md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={selfLink(item.href) ? false : undefined}
                className="text-[0.8125rem] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <LangSwitch />
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-full bg-ink px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-blue"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-50 -me-2 grid h-11 w-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              isArabic
                ? open
                  ? arSite.closeMenu
                  : arSite.openMenu
                : open
                  ? "Close menu"
                  : "Open menu"
            }
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
        // role/aria-modal state what the overlay already behaves like: a modal
        // surface covering the page, with focus contained (see the effect above).
        role="dialog"
        aria-modal={open}
        aria-label={isArabic ? arSite.mobileNavLabel : "Mobile"}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          aria-label={isArabic ? arSite.mobileNavLabel : "Mobile"}
          className="flex flex-col gap-2"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={selfLink(item.href) ? false : undefined}
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
            {ctaLabel}
          </a>
          <div className="flex justify-center" onClick={() => setOpen(false)}>
            <LangSwitch />
          </div>
          <p className="text-center text-xs text-ink-3">
            {isArabic ? arSite.location : site.contact.location}
          </p>
        </div>
      </div>
    </header>
  );
}
