/**
 * Formation math for the Pattern Field.
 * Pure functions: particle index + seeded attributes + time → target state.
 * Every chapter of the site is one of these arrangements of the same field.
 */

export type FormationName =
  | "noise"
  | "signal"
  | "interference"
  | "lattice"
  | "stream"
  | "orbit"
  | "weave"
  | "constellation"
  | "radiate"
  | "converge";

/** Per-particle stable randoms in [0,1), assigned once from the seed. */
export interface ParticleAttrs {
  r1: number;
  r2: number;
  r3: number;
  r4: number;
}

export interface FormationInput {
  i: number;
  n: number;
  /** CSS-pixel canvas size. */
  w: number;
  h: number;
  /** Seconds since engine start. */
  t: number;
  a: ParticleAttrs;
  /** Normalized focal point (0..1). */
  ox: number;
  oy: number;
  /** 0..~1.5 — drift/twinkle multiplier. */
  energy: number;
}

export interface FormationOutput {
  x: number;
  y: number;
  /** Dot radius in CSS px. */
  size: number;
  /** 0..1 */
  alpha: number;
}

const TAU = Math.PI * 2;

export const formations: Record<FormationName, (p: FormationInput) => FormationOutput> = {
  /** Scattered market noise — slow, uneasy drift. */
  noise({ w, h, t, a, energy }) {
    const dx = Math.sin(t * 0.22 + a.r3 * TAU) * 26 * energy;
    const dy = Math.cos(t * 0.17 + a.r4 * TAU) * 22 * energy;
    return {
      x: a.r1 * w + dx,
      y: a.r2 * h + dy,
      size: 0.8 + a.r3 * 1.8,
      alpha: 0.12 + a.r4 * 0.4 + Math.sin(t * 0.9 + a.r1 * TAU) * 0.06 * energy
    };
  },

  /** Concentric waves emitting from the origin — the Pattrix signal. */
  signal({ w, h, t, a, ox, oy, energy }) {
    const rings = 16;
    const ring = Math.floor(a.r1 * rings);
    const spacing = Math.min(w, h) * 0.055;
    const wave = Math.sin(t * 1.1 - ring * 0.62) * 5 * energy;
    const radius = (ring + 1.2) * spacing + wave;
    const angle = a.r2 * TAU + t * 0.035 * (ring % 2 === 0 ? 1 : -1);
    const front = (Math.sin(t * 1.1 - ring * 0.62) + 1) / 2;
    return {
      x: ox * w + Math.cos(angle) * radius,
      y: oy * h + Math.sin(angle) * radius * 0.86,
      size: 1 + a.r3 * 1.6,
      alpha: 0.1 + front * 0.38 + a.r4 * 0.14
    };
  },

  /** Two wave sources settling into a calm interference weave. */
  interference({ i, n, w, h, t, energy, a }) {
    const cols = Math.ceil(Math.sqrt(n * (w / Math.max(h, 1))));
    const rows = Math.ceil(n / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = ((col + 0.5) / cols) * w;
    const baseY = ((row + 0.5) / rows) * h;
    const w1 = Math.sin(x * 0.011 + t * 0.6) * 14;
    const w2 = Math.sin(x * 0.006 - t * 0.42 + row * 0.5) * 10;
    return {
      x,
      y: baseY + (w1 + w2) * energy,
      size: 0.9 + a.r3 * 1.2,
      alpha: 0.1 + Math.abs(Math.sin(x * 0.008 + row * 0.7 + t * 0.25)) * 0.3
    };
  },

  /** Ordered grid — identity systems. */
  lattice({ i, n, w, h, t, a }) {
    const cols = Math.ceil(Math.sqrt(n * (w / Math.max(h, 1))));
    const col = i % cols;
    const row = Math.floor(i / cols);
    const breathe = Math.sin(t * 0.5 + (col + row) * 0.35) * 1.5;
    return {
      x: ((col + 0.5) / cols) * w,
      y: ((row + 0.5) / (Math.ceil(n / cols))) * h + breathe,
      size: (col + row) % 4 === 0 ? 1.8 : 1,
      alpha: (col + row) % 4 === 0 ? 0.4 : 0.14 + a.r4 * 0.08
    };
  },

  /** Lanes flowing left→right — cadence and momentum. */
  stream({ w, h, t, a }) {
    const lane = Math.floor(a.r2 * 14);
    const speed = 0.014 + a.r3 * 0.02;
    const prog = (a.r1 + t * speed) % 1.15;
    const x = (prog - 0.075) * w;
    const y = ((lane + 0.5) / 14) * h + Math.sin(x * 0.004 + lane * 1.7) * 24;
    const fade = Math.min(1, Math.min(prog / 0.08, (1.15 - prog) / 0.08));
    return { x, y, size: 0.9 + a.r4 * 1.5, alpha: (0.1 + a.r3 * 0.32) * Math.max(0, fade) };
  },

  /** Bodies in relation — coordinated media orbits. */
  orbit({ w, h, t, a, ox, oy }) {
    const band = Math.floor(a.r1 * 6);
    const radius = (band + 1.4) * Math.min(w, h) * 0.075;
    const speed = 0.14 / (band * 0.6 + 1);
    const angle = a.r2 * TAU + t * speed * (band % 2 === 0 ? 1 : -1);
    return {
      x: ox * w + Math.cos(angle) * radius * 1.15,
      y: oy * h + Math.sin(angle) * radius * 0.72,
      size: 1 + a.r3 * 1.7,
      alpha: 0.14 + a.r4 * 0.3
    };
  },

  /** Crosshatch of two diagonal thread families — production. */
  weave({ i, w, h, t, a }) {
    const family = i % 2;
    const threads = 12;
    const thread = Math.floor(a.r1 * threads);
    const along = (a.r2 + t * 0.012 * (family === 0 ? 1 : -1)) % 1;
    const x = along * w;
    const off = ((thread + 0.5) / threads) * (w + h);
    const y = family === 0 ? off - x * 0.55 : h - off + x * 0.55;
    return {
      x,
      y: y + Math.sin(t * 0.7 + thread) * 3,
      size: 0.9 + a.r3 * 1.2,
      alpha: y > -20 && y < h + 20 ? 0.1 + a.r4 * 0.26 : 0
    };
  },

  /** Clustered nodes — a constellation of relationships. */
  constellation({ w, h, t, a }) {
    const clusters = 7;
    const c = Math.floor(a.r3 * clusters);
    const cx = (0.14 + ((c * 0.61803) % 1) * 0.72) * w;
    const cy = (0.18 + ((c * 0.38196 + 0.21) % 1) * 0.62) * h;
    const angle = a.r1 * TAU;
    const dist = Math.pow(a.r2, 1.6) * Math.min(w, h) * 0.16;
    return {
      x: cx + Math.cos(angle) * dist + Math.sin(t * 0.4 + a.r4 * TAU) * 4,
      y: cy + Math.sin(angle) * dist * 0.8 + Math.cos(t * 0.33 + a.r1 * TAU) * 4,
      size: a.r4 > 0.9 ? 2.4 : 1 + a.r3,
      alpha: a.r4 > 0.9 ? 0.5 : 0.12 + a.r2 * 0.24
    };
  },

  /** Rays bursting from one origin — Tripoli, outward. */
  radiate({ w, h, t, a, ox, oy }) {
    const rays = 26;
    const ray = Math.floor(a.r1 * rays);
    const angle = (ray / rays) * TAU + (a.r3 - 0.5) * 0.06;
    const maxR = Math.hypot(w, h) * 0.42;
    const prog = (a.r2 + t * 0.03) % 1;
    const radius = Math.pow(prog, 0.8) * maxR;
    return {
      x: ox * w + Math.cos(angle) * radius,
      y: oy * h + Math.sin(angle) * radius * 0.9,
      size: 1 + (1 - prog) * 1.6,
      alpha: (1 - prog) * 0.42 + 0.05
    };
  },

  /** Everything pulls toward the focal point — the call to action. */
  converge({ w, h, t, a, ox, oy }) {
    const angle = a.r1 * TAU + t * 0.05;
    const dist = Math.pow(a.r2, 2.2) * Math.min(w, h) * 0.34 + 12;
    const pulse = 1 + Math.sin(t * 0.9 + a.r3 * TAU) * 0.04;
    return {
      x: ox * w + Math.cos(angle) * dist * pulse,
      y: oy * h + Math.sin(angle) * dist * 0.75 * pulse,
      size: 1 + (1 - a.r2) * 1.8,
      alpha: 0.12 + (1 - a.r2) * 0.36
    };
  }
};
