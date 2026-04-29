'use client';

// ProductCardWave — simplified Braille diagonal-sweep canvas for ProductCard.
// Derived from FooterAtmosphereReactive but with:
//   • No mouse forcefield
//   • No ResizeObserver (card size is stable)
//   • IO-pause when offscreen
//   • prefers-reduced-motion: static frame only
//   • Hard-coded teal dot color (dark bg, no CSS var needed)

import { useEffect, useRef } from 'react';

const CELL_W = 24;
const CELL_H = 34;
const COL_X = [6, 18];
const ROW_Y = [6, 17, 28];
const DOT_R = 1.2;

const WAVE_BAND = 400;
const WAVE_PERIOD_MS = 8000;
const WAVE_BASE_A = 0;
// Light-mode: peak alpha lower than footer variant so dots read as
// texture on cream, not as a glow on dark. Matches HeroAtmosphere style.
const WAVE_PEAK_A = 0.32;
const SQRT2 = Math.SQRT2;

// Teal on cream bg — same hue as footer but lower alpha ceiling above.
const DOT_R_CH = 1;
const DOT_G_CH = 122;
const DOT_B_CH = 106;

interface Dot {
  bx: number;
  by: number;
}

function buildDots(width: number, height: number): Dot[] {
  const next: Dot[] = [];
  const cols = Math.ceil(width / CELL_W) + 1;
  const rows = Math.ceil(height / CELL_H) + 1;
  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      const ox = ci * CELL_W;
      const oy = ri * CELL_H;
      for (const cx of COL_X) {
        for (const cy of ROW_Y) {
          next.push({ bx: ox + cx, by: oy + cy });
        }
      }
    }
  }
  return next;
}

export function ProductCardWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const wrapEl = wrap;
    const canvasEl = canvas;
    const context = ctx;

    // Size canvas to container — card size is stable, no ResizeObserver needed
    const rect = wrapEl.getBoundingClientRect();
    const cssW = rect.width > 0 ? rect.width : 320;
    const cssH = rect.height > 0 ? rect.height : 200;
    canvasEl.width = Math.round(cssW * dpr);
    canvasEl.height = Math.round(cssH * dpr);
    canvasEl.style.width = `${cssW}px`;
    canvasEl.style.height = `${cssH}px`;

    const dots = buildDots(cssW, cssH);

    if (reduced) {
      // Static frame — dots at base alpha
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);
      context.fillStyle = `rgba(${DOT_R_CH}, ${DOT_G_CH}, ${DOT_B_CH}, 0.20)`;
      for (const d of dots) {
        context.beginPath();
        context.arc(d.bx, d.by, DOT_R, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
      return;
    }

    let raf = 0;
    const waveStart = performance.now();

    function tick(now: number) {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);

      const phase = ((now - waveStart) % WAVE_PERIOD_MS) / WAVE_PERIOD_MS;
      const projMax = (cssW + cssH) / SQRT2;
      const wavePos = -WAVE_BAND + phase * (projMax + WAVE_BAND * 2);

      for (const d of dots) {
        const proj = (d.bx + d.by) / SQRT2;
        const ax = Math.abs(proj - wavePos);
        if (ax >= WAVE_BAND) continue;
        const t = 1 - ax / WAVE_BAND;
        const eased = (1 - Math.cos(t * Math.PI)) * 0.5;
        const alpha = WAVE_BASE_A + (WAVE_PEAK_A - WAVE_BASE_A) * eased;
        if (alpha < 0.02) continue;
        context.fillStyle = `rgba(${DOT_R_CH}, ${DOT_G_CH}, ${DOT_B_CH}, ${alpha})`;
        context.beginPath();
        context.arc(d.bx, d.by, DOT_R, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0.01 },
      );
      io.observe(wrapEl);
    } else {
      start();
    }

    return () => {
      stop();
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          contain: 'layout paint',
        }}
      />
    </div>
  );
}
