import Image from "next/image";
import Link from "next/link";
import { arSite } from "@/content/index-pages";
import { site } from "@/content/site";

/**
 * `locale` swaps the nav, headings, and standing text for their Arabic
 * counterparts. Direction is not handled here — the Arabic root layout sets
 * dir="rtl" on <html>, so the grid mirrors itself.
 */
export function Footer({ locale = "en" }: { locale?: "en" | "ar" }) {
  const year = new Date().getFullYear();
  const isArabic = locale === "ar";
  const links = isArabic ? arSite.nav : [...site.nav, ...site.footerServices];

  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div>
          {/* Rendered box, not source dimensions — see the note in header.tsx. */}
          <Image src="/brand/logo-dark.png" alt="Pattrix" width={187} height={45} className="h-5 w-auto" />
          <p className="prose-measure mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
            {isArabic ? arSite.footerLine : site.footer.line}
          </p>
        </div>
        <nav aria-label={isArabic ? arSite.footerNavLabel : "Footer"}>
          <p className="eyebrow mb-5 text-ink-3">
            {isArabic ? arSite.navigateHeading : "Navigate"}
          </p>
          <ul className="flex flex-col gap-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-2 transition-colors duration-200 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            {/* prefetch is off: prefetching /ar pulls its font CSS, which
                downloads the whole Arabic family on every English page — the
                exact regression fixed in the language switchers. */}
            <li>
              <Link
                href={isArabic ? arSite.langSwitch.href : "/ar"}
                prefetch={false}
                lang={isArabic ? "en" : "ar"}
                className="text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {isArabic ? arSite.langSwitch.label : "العربية"}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-5 text-ink-3">{isArabic ? arSite.contactHeading : "Contact"}</p>
          <ul className="flex flex-col gap-3 text-sm text-ink-2">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors duration-200 hover:text-ink">
                {site.contact.email}
              </a>
            </li>
            {site.contact.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="inline-block transition-colors duration-200 hover:text-ink"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>{isArabic ? arSite.location : site.contact.location}</li>
            {site.contact.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. {isArabic ? arSite.rightsReserved : "All rights reserved."}
          </span>
          <span>{isArabic ? arSite.location : site.footer.builtIn}</span>
        </div>
      </div>
    </footer>
  );
}
