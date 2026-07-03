import { hashString, mulberry32 } from "@/lib/seed";

interface PatternCoverProps {
  slug: string;
  accent: string;
  title: string;
  className?: string;
  /** Force a pattern family (0 rings / 1 rays / 2 interference); defaults to hash of slug. */
  variant?: 0 | 1 | 2;
}

/**
 * Deterministic generative cover: each project gets a unique arrangement of
 * the Pattern Field motif (rings, rays, or interference rows) seeded from its
 * slug. Pure SVG — no image assets required.
 */
export function PatternCover({ slug, accent, title, className = "", variant: forced }: PatternCoverProps) {
  const seed = hashString(slug);
  const rand = mulberry32(seed);
  const variant = forced ?? seed % 3;
  const W = 800;
  const H = 500;
  const dots: { x: number; y: number; r: number; o: number; accent: boolean }[] = [];

  if (variant === 0) {
    // Concentric signal rings from an off-center origin.
    const ox = W * (0.3 + rand() * 0.4);
    const oy = H * (0.35 + rand() * 0.3);
    const rings = 11;
    for (let ring = 1; ring <= rings; ring++) {
      const radius = ring * 34 + rand() * 8;
      const count = Math.floor(ring * 9 + rand() * 6);
      for (let k = 0; k < count; k++) {
        const a = (k / count) * Math.PI * 2 + rand() * 0.05;
        dots.push({
          x: ox + Math.cos(a) * radius,
          y: oy + Math.sin(a) * radius * 0.82,
          r: 1.2 + rand() * 1.6,
          o: 0.16 + (1 - ring / rings) * 0.5,
          accent: rand() > 0.92
        });
      }
    }
  } else if (variant === 1) {
    // Radiating rays.
    const ox = W * (0.2 + rand() * 0.25);
    const oy = H * (0.4 + rand() * 0.3);
    const rays = 22;
    for (let ray = 0; ray < rays; ray++) {
      const a = (ray / rays) * Math.PI * 2;
      const steps = 14 + Math.floor(rand() * 8);
      for (let s = 2; s < steps; s++) {
        const d = s * 26 + rand() * 10;
        dots.push({
          x: ox + Math.cos(a) * d,
          y: oy + Math.sin(a) * d * 0.85,
          r: 1 + (1 - s / steps) * 2.2,
          o: (1 - s / steps) * 0.55 + 0.08,
          accent: s === 2
        });
      }
    }
  } else {
    // Interference rows.
    const rows = 16;
    const cols = 42;
    const phase = rand() * Math.PI * 2;
    const freq = 0.09 + rand() * 0.05;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = ((c + 0.5) / cols) * W;
        const wave = Math.sin(c * freq * 3 + r * 0.55 + phase) * 16;
        const y = ((r + 0.5) / rows) * H + wave;
        const bright = Math.abs(Math.sin(c * freq + r * 0.8 + phase));
        dots.push({ x, y, r: 1 + bright * 1.6, o: 0.1 + bright * 0.4, accent: bright > 0.965 });
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Generative pattern cover for ${title}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDF3FB" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#bg-${seed})`} />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x.toFixed(1)}
          cy={d.y.toFixed(1)}
          r={d.r.toFixed(2)}
          fill={d.accent ? "#101623" : accent}
          opacity={d.o.toFixed(3)}
        />
      ))}
    </svg>
  );
}
