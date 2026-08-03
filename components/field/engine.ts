/**
 * Pattern Field engine — Canvas 2D, no dependencies.
 * One instance renders the fixed background field for the whole journey.
 * Chapters change its state through the field store (see store.ts);
 * the engine morphs particles between formations with a per-particle stagger.
 */

import { mulberry32 } from "@/lib/seed";
import { formations, type FormationInput, type FormationName, type ParticleAttrs } from "./formations";

export interface FieldTheme {
  /** Particle color as "r,g,b". */
  dot: string;
  /** Accent color for emphasized particles. */
  accent: string;
  /** Link stroke for constellation lines. */
  link: string;
}

const LIGHT: FieldTheme = { dot: "1,113,221", accent: "16,22,35", link: "1,113,221" };
const DARK: FieldTheme = { dot: "138,180,240", accent: "233,238,246", link: "138,180,240" };

export interface FieldState {
  formation: FormationName;
  ox: number;
  oy: number;
  energy: number;
  theme: "light" | "dark";
  /** Global opacity multiplier (used to quiet the field behind dense text). */
  dim: number;
}

interface Particle extends ParticleAttrs {
  x: number;
  y: number;
  size: number;
  alpha: number;
  /** Transition stagger offset 0..1. */
  d: number;
  cluster: number;
}

const MORPH_SECONDS = 1.4;
const TAU = Math.PI * 2;

/**
 * Alpha quantization for batched painting. Every particle is bucketed by
 * rounded opacity so the whole field is drawn with ~2×STEPS `fillStyle`
 * assignments per frame instead of one per particle. At 28 steps the largest
 * opacity error is under 1.5% — invisible on 1–3px dots, and it removes the
 * per-particle colour-string allocation that dominated the render loop.
 */
const ALPHA_STEPS = 28;
const MAX_ALPHA = 0.85;

/** Steady-state frame budget. The field only morphs on chapter changes; the
 *  rest of the time it is a slow ambient drift that reads identically at 30fps
 *  and costs half as much main thread. Morphs still run at full rate. */
const IDLE_FRAME_MS = 1000 / 30;

export class FieldEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private prev: FieldState;
  private next: FieldState;
  /** 0..1 morph progress between prev and next. */
  private blend = 1;
  private themeMix = 0; // 0 = light, 1 = dark
  private raf = 0;
  private start = performance.now();
  private running = false;
  private reduced: boolean;
  private w = 0;
  private h = 0;
  /** Reused across every formation call — the old code allocated two input
   *  objects per particle per frame (240k allocations/second at 2000 dots). */
  private input: FormationInput;
  /** Reused per-frame draw buckets: [dot 0..STEPS-1, accent 0..STEPS-1]. */
  private buckets: Particle[][] = [];
  /** Colour strings for the current theme mix, rebuilt only when it moves. */
  private palette: string[] = [];
  private paletteMix = -1;
  private onVisibility = () => (document.hidden ? this.pause() : this.resume());
  private onResize = () => this.fit();

  constructor(canvas: HTMLCanvasElement, reducedMotion: boolean) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.reduced = reducedMotion;
    const initial: FieldState = { formation: "noise", ox: 0.5, oy: 0.42, energy: 1, theme: "light", dim: 1 };
    this.prev = initial;
    this.next = initial;
    this.input = { i: 0, n: 0, w: 0, h: 0, t: 0, a: { r1: 0, r2: 0, r3: 0, r4: 0 }, ox: 0, oy: 0, energy: 1 };
    this.buckets = Array.from({ length: ALPHA_STEPS * 2 }, () => []);
    this.fit();
    this.seed();
    window.addEventListener("resize", this.onResize);
    document.addEventListener("visibilitychange", this.onVisibility);
    if (this.reduced) {
      this.renderFrame(0); // single static frame
    } else {
      this.resume();
    }
  }

  destroy() {
    this.pause();
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibility);
  }

  set(state: Partial<FieldState>) {
    const target: FieldState = { ...this.next, ...state };
    if (
      target.formation === this.next.formation &&
      target.ox === this.next.ox &&
      target.oy === this.next.oy &&
      target.theme === this.next.theme &&
      target.energy === this.next.energy &&
      target.dim === this.next.dim
    ) {
      return;
    }
    // Snapshot current interpolated state as the new "prev" so morphs can be interrupted smoothly.
    this.prev = { ...this.next };
    this.next = target;
    this.blend = 0;
    if (this.reduced) this.renderFrame(0);
  }

  private seed() {
    const rand = mulberry32(20260702);
    const count = this.budget();
    this.particles = Array.from({ length: count }, () => {
      const r1 = rand();
      const r2 = rand();
      const r3 = rand();
      const r4 = rand();
      return {
        r1,
        r2,
        r3,
        r4,
        x: r1 * this.w,
        y: r2 * this.h,
        size: 1,
        alpha: 0,
        d: rand(),
        cluster: Math.floor(r3 * 7)
      };
    });
  }

  private budget() {
    const base = this.w < 640 ? 650 : this.w < 1024 ? 1100 : 2000;
    // A wide viewport does not imply a fast machine. Low core counts (budget
    // laptops, mid-range Android in desktop mode) get the smaller field rather
    // than a 15fps version of the large one.
    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 4) return Math.round(base * 0.55);
    if (cores <= 6) return Math.round(base * 0.8);
    return base;
  }

  private fit() {
    // The field is decorative 1–3px dots: rendering it at 1.5× covers retina
    // adequately while cutting the per-frame pixel count by ~44% against 2×.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.particles.length && this.particles.length !== this.budget()) this.seed();
    if (this.reduced) this.renderFrame(0);
  }

  private pause() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private resume() {
    if (this.running || this.reduced) return;
    this.running = true;
    let last = performance.now();
    let painted = 0;
    const loop = (now: number) => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      // Full rate while morphing between formations; 30fps once settled.
      if (this.blend >= 1 && now - painted < IDLE_FRAME_MS) return;
      painted = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      this.step(dt);
      this.renderFrame((now - this.start) / 1000);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private step(dt: number) {
    if (this.blend < 1) this.blend = Math.min(1, this.blend + dt / MORPH_SECONDS);
    const targetMix = this.next.theme === "dark" ? 1 : 0;
    this.themeMix += (targetMix - this.themeMix) * Math.min(1, dt * 2.4);
  }

  /** Rebuild the quantized colour table when the light↔dark mix has moved. */
  private syncPalette(themeA: FieldTheme) {
    if (Math.abs(this.themeMix - this.paletteMix) < 0.004 && this.palette.length) return;
    this.paletteMix = this.themeMix;
    const table: string[] = new Array(ALPHA_STEPS * 2);
    for (let s = 0; s < ALPHA_STEPS; s++) {
      const a = ((s + 1) / ALPHA_STEPS) * MAX_ALPHA;
      table[s] = `rgba(${themeA.dot},${a.toFixed(3)})`;
      table[ALPHA_STEPS + s] = `rgba(${themeA.accent},${a.toFixed(3)})`;
    }
    this.palette = table;
  }

  private renderFrame(t: number) {
    const { ctx, input, buckets } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    const themeA = mixTheme(LIGHT, DARK, this.themeMix);
    this.syncPalette(themeA);
    const fPrev = formations[this.prev.formation];
    const fNext = formations[this.next.formation];
    const blend = this.blend;
    // Once a morph completes both sides resolve to the same formation and the
    // same state, so the second evaluation is pure waste — skip it entirely.
    const morphing = blend < 1;
    const dim = this.prev.dim + (this.next.dim - this.prev.dim) * blend;
    const n = this.particles.length;

    input.n = n;
    input.w = this.w;
    input.h = this.h;
    input.t = t;

    // constellation links (drawn beneath dots)
    const isConst = this.next.formation === "constellation" && blend > 0.5;
    const linkPts: Particle[] = [];

    for (let i = 0; i < n; i++) {
      const p = this.particles[i];
      input.i = i;
      input.a = p;
      input.ox = this.next.ox;
      input.oy = this.next.oy;
      input.energy = this.next.energy;
      const inNext = fNext(input);

      if (morphing) {
        // per-particle staggered blend
        const v = clamp01((blend - p.d * 0.35) / 0.65);
        const local = 1 - (1 - v) * (1 - v) * (1 - v);
        input.ox = this.prev.ox;
        input.oy = this.prev.oy;
        input.energy = this.prev.energy;
        const inPrev = fPrev(input);
        p.x = inPrev.x + (inNext.x - inPrev.x) * local;
        p.y = inPrev.y + (inNext.y - inPrev.y) * local;
        p.size = inPrev.size + (inNext.size - inPrev.size) * local;
        p.alpha = (inPrev.alpha + (inNext.alpha - inPrev.alpha) * local) * dim;
      } else {
        p.x = inNext.x;
        p.y = inNext.y;
        p.size = inNext.size;
        p.alpha = inNext.alpha * dim;
      }

      if (isConst && p.r4 > 0.72 && linkPts.length < 220) linkPts.push(p);
    }

    if (isConst) this.drawLinks(linkPts, themeA, dim);

    // ---- batched dot pass ----
    for (let b = 0; b < buckets.length; b++) buckets[b].length = 0;
    for (let i = 0; i < n; i++) {
      const p = this.particles[i];
      if (p.alpha <= 0.01) continue;
      const a = p.alpha < MAX_ALPHA ? p.alpha : MAX_ALPHA;
      let step = Math.ceil((a / MAX_ALPHA) * ALPHA_STEPS) - 1;
      if (step < 0) step = 0;
      buckets[(p.r3 > 0.94 ? ALPHA_STEPS : 0) + step].push(p);
    }
    for (let b = 0; b < buckets.length; b++) {
      const bucket = buckets[b];
      if (bucket.length === 0) continue;
      ctx.fillStyle = this.palette[b];
      ctx.beginPath();
      for (let k = 0; k < bucket.length; k++) {
        const p = bucket[k];
        const s = p.size;
        if (s < 1.4) {
          ctx.rect(p.x - s / 2, p.y - s / 2, s, s);
        } else {
          ctx.moveTo(p.x + s, p.y);
          ctx.arc(p.x, p.y, s, 0, TAU);
        }
      }
      ctx.fill();
    }
  }

  /** Constellation strokes, batched by quantized opacity like the dot pass. */
  private drawLinks(pts: Particle[], themeA: FieldTheme, dim: number) {
    const { ctx } = this;
    const lanes: Array<[number, number, number, number][]> = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        if (a.cluster !== b.cluster) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= 5200) continue;
        const strength = 1 - d2 / 5200;
        let lane = Math.ceil(strength * 8) - 1;
        if (lane < 0) lane = 0;
        (lanes[lane] ??= []).push([a.x, a.y, b.x, b.y]);
      }
    }
    ctx.lineWidth = 0.5;
    for (let lane = 0; lane < lanes.length; lane++) {
      const segs = lanes[lane];
      if (!segs || segs.length === 0) continue;
      ctx.strokeStyle = `rgba(${themeA.link},${(0.16 * ((lane + 1) / 8) * dim).toFixed(3)})`;
      ctx.beginPath();
      for (let k = 0; k < segs.length; k++) {
        const s = segs[k];
        ctx.moveTo(s[0], s[1]);
        ctx.lineTo(s[2], s[3]);
      }
      ctx.stroke();
    }
  }

  /** Fitted formation index for external progress display. */
  get state() {
    return this.next;
  }
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function mixTheme(a: FieldTheme, b: FieldTheme, m: number): FieldTheme {
  if (m <= 0.01) return a;
  if (m >= 0.99) return b;
  const mixRgb = (x: string, y: string) => {
    const xa = x.split(",").map(Number);
    const ya = y.split(",").map(Number);
    return xa.map((v, i) => Math.round(v + (ya[i] - v) * m)).join(",");
  };
  return { dot: mixRgb(a.dot, b.dot), accent: mixRgb(a.accent, b.accent), link: mixRgb(a.link, b.link) };
}
