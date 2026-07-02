import { site } from "@/content/site";
import { FieldTrigger } from "@/components/field/field-trigger";

/**
 * Chapter 06 — the field converges on the call to action.
 * A confident Pattrix-blue band: the one place the brand color owns the screen.
 */
export function Contact() {
  const c = site.contactSection;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative scroll-mt-20">
      <FieldTrigger formation="converge" ox={0.5} oy={0.4} energy={1} dim={0.9} theme="light" />
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl bg-blue px-6 py-20 text-white shadow-[0_40px_120px_-40px_rgba(1,113,221,0.55)] md:px-16 md:py-28">
          <p className="eyebrow flex items-center gap-4 text-white/85">
            <span>{c.chapter}</span>
            <span className="h-px w-10 bg-white/30" aria-hidden="true" />
            <span>{c.chapterName}</span>
          </p>
          <h2 id="contact-heading" className="display mt-10 max-w-[10em] text-[clamp(2.6rem,7vw,6rem)]">
            {c.statement}
          </h2>
          <p className="prose-measure mt-6 text-base font-medium text-white md:text-lg">{c.sub}</p>

          <div className="mt-14 flex flex-col gap-8 border-t border-white/20 pt-10 md:flex-row md:items-center md:justify-between">
            <a
              href={`mailto:${site.contact.email}`}
              className="group inline-flex flex-wrap items-center gap-4 text-xl font-semibold underline decoration-white/40 decoration-1 underline-offset-8 transition-colors duration-200 hover:decoration-white md:text-3xl"
            >
              {site.contact.email}
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-all duration-200 ease-out-quart group-hover:bg-white group-hover:text-blue"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <p className="text-sm font-semibold text-white/90">{site.contact.location}</p>
          </div>
        </div>
      </div>
      <div className="h-[clamp(4rem,8vw,8rem)]" aria-hidden="true" />
    </section>
  );
}
