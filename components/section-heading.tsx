import { Reveal } from "@/components/motion-primitives";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`mx-auto max-w-7xl px-5 sm:px-8 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p className="mb-5 text-xs font-semibold uppercase text-ocean">{eyebrow}</p>
      <div
        className={`grid gap-6 lg:grid-cols-[1.05fr_0.65fr] lg:items-end ${
          align === "center" ? "lg:grid-cols-1" : ""
        }`}
      >
        <h2 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,6.7rem)] font-semibold leading-[0.9] text-balance">
          {title}
        </h2>
        {copy ? (
          <p
            className={`max-w-xl text-base leading-7 text-ink/[0.58] sm:text-lg ${
              align === "center" ? "mx-auto" : "lg:ml-auto"
            }`}
          >
            {copy}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
