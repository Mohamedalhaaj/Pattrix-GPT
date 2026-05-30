import { Reveal } from "@/components/motion-primitives";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <Reveal
      className={`mx-auto max-w-7xl px-5 sm:px-8 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p className={`mb-5 text-xs font-semibold uppercase ${isDark ? "text-white/[0.48]" : "text-ocean"}`}>
        {eyebrow}
      </p>
      <div
        className={`grid gap-6 lg:grid-cols-[1.05fr_0.65fr] lg:items-end ${
          align === "center" ? "lg:grid-cols-1" : ""
        }`}
      >
        <h2 className={`max-w-4xl font-display text-[clamp(2.6rem,6.4vw,6.4rem)] font-semibold leading-[0.9] text-balance ${isDark ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
        {copy ? (
          <p
            className={`max-w-xl text-base leading-7 sm:text-lg ${
              isDark ? "text-white/[0.58]" : "text-ink/[0.58]"
            } ${
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
