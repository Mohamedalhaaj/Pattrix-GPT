interface ChapterMarkerProps {
  index: string;
  name: string;
  tone?: "light" | "dark";
}

/** Editorial chapter label: "01 — The pattern" with a hairline rule. */
export function ChapterMarker({ index, name, tone = "light" }: ChapterMarkerProps) {
  const isDark = tone === "dark";
  return (
    <p className={`eyebrow flex items-center gap-4 ${isDark ? "text-navy-ink/70" : "text-ink-2"}`}>
      <span className="text-blue" aria-hidden="true">
        {index}
      </span>
      <span className={`h-px w-10 ${isDark ? "bg-navy-hairline" : "bg-hairline"}`} aria-hidden="true" />
      <span>{name}</span>
    </p>
  );
}
