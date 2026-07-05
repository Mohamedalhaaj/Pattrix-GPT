import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/brand/logo-dark.png" alt="Pattrix" width={2335} height={561} className="h-5 w-auto" />
          <p className="prose-measure mt-4 max-w-xs text-sm leading-relaxed text-ink-2">{site.footer.line}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-5 text-ink-3">Navigate</p>
          <ul className="flex flex-col gap-3">
            {[...site.nav, ...site.footerServices].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-2 transition-colors duration-200 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-5 text-ink-3">Contact</p>
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
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>{site.contact.location}</li>
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
            © {year} {site.name}. All rights reserved.
          </span>
          <span>{site.footer.builtIn}</span>
        </div>
      </div>
    </footer>
  );
}
