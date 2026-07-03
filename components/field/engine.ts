/**
 * Pattern Field engine — Canvas 2D, no dependencies.
 * One instance renders the fixed background field for the whole journey.
 * Chapters change its state through the field store (see store.ts);
 * the engine morphs particles between formations with a per-particle stagger.
 */

import { mulberry32 } from "@/lib/seed";
import { formations, type FormationName, type ParticleAttrs } from "./formations";

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
    if (this.w < 640) return 650;
    if (this.w < 1024) return 1100;
    return 2000;
  }

  private fit() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    const loop = (now: number) => {
      if (!this.running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      this.step(dt);
      this.renderFrame((now - this.start) / 1000);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private step(dt: number) {
    if (this.blend < 1) this.blend = Math.min(1, this.blend + dt / MORPH_SECONDS);
    const targetMix = this.next.theme === "dark" ? 1 : 0;
    this.themeMix += (targetMix - this.themeMix) * Math.min(1, dt * 2.4);
  }

  private renderFrame(t: number) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    const ease = (v: number) => 1 - Math.pow(1 - v, 3);
    const themeA = mixTheme(LIGHT, DARK, this.themeMix);
    const fPrev = formations[this.prev.formation];
    const fNext = formations[this.next.formation];
    const dim = this.prev.dim + (this.next.dim - this.prev.dim) * this.blend;

    // constellation links (drawn beneath dots)
    const isConst = this.next.formation === "constellation" && this.blend > 0.5;
    const linkPts: { x: number; y: number; cluster: number }[] = [];

    for (const p of this.particles) {
      // per-particle staggered blend
      const local = ease(clamp01((this.blend - p.d * 0.35) / 0.65));
      const inPrev = fPrev({ i: 0, n: this.particles.length, w: this.w, h: this.h, t, a: p, ox: this.prev.ox, oy: this.prev.oy, energy: this.prev.energy });
      const inNext = fNext({ i: 0, n: this.particles.length, w: this.w, h: this.h, t, a: p, ox: this.next.ox, oy: this.next.oy, energy: this.next.energy });
      p.x = inPrev.x + (inNext.x - inPrev.x) * local;
      p.y = inPrev.y + (inNext.y - inPrev.y) * local;
      p.size = inPrev.size + (inNext.size - inPrev.size) * local;
      p.alpha = (inPrev.alpha + (inNext.alpha - inPrev.alpha) * local) * dim;

      if (isConst && p.r4 > 0.72 && linkPts.length < 220) linkPts.push({ x: p.x, y: p.y, cluster: p.cluster });
    }

    if (isConst) {
      ctx.lineWidth = 0.5;
      for (let i = 0; i < linkPts.length; i++) {
        for (let j = i + 1; j < linkPts.length; j++) {
          const a = linkPts[i];
          const b = linkPts[j];
          if (a.cluster !== b.cluster) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 5200) {
            ctx.strokeStyle = `rgba(${themeA.link},${(0.16 * (1 - d2 / 5200) * dim).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    for (const p of this.particles) {
      if (p.alpha <= 0.01) continue;
      const accent = p.r3 > 0.94;
      ctx.fillStyle = `rgba(${accent ? themeA.accent : themeA.dot},${Math.min(p.alpha, 0.85).toFixed(3)})`;
      const s = p.size;
      if (s < 1.4) {
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fill();
      }
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
