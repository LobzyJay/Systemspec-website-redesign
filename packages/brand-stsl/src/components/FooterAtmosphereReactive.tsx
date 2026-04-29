'use client';

// FooterAtmosphereReactive — same canvas-based Braille forcefield as
// HeroAtmosphereReactive, painted on the espresso (--bg-inverse)
// surface so the dots glow against the dark footer.
//
// Behaviour mirrors the hero variant:
//   • Ambient — dots sit at base positions, ~22% accent teal alpha
//   • Cursor in field — dots within the radius push outward, falloff
//     proportional to distance from cursor
//   • Cursor leaves — dots spring back to base, damping smooths return
//   • Reduced-motion — physics off, static frame only
//
// Adds a top blend veil so the footer hands off cleanly from the section
// above (same trick as the prior FooterAtmosphere).

import { useEffect, useRef } from 'react';

const CELL_W = 24;
const CELL_H = 34;
const COL_X  = [6, 18];
const ROW_Y  = [6, 17, 28];
const DOT_R  = 1.2;

const FIELD_RADIUS = 130;
const FIELD_PUSH   = 38;
const SPRING       = 0.075;
const DAMPING      = 0.82;

interface Dot {
  bx: number;
  by: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
}

function readToken(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m || m.length < 3) return [1, 122, 106];
  return [
    parseInt(m[0] ?? '00', 16),
    parseInt(m[1] ?? '00', 16),
    parseInt(m[2] ?? '00', 16),
  ];
}

export function FooterAtmosphereReactive() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [r, g, b] = hexToRgb(readToken('--accent-default', '#017A6A'));

    const wrapEl = wrap;
    const canvasEl = canvas;
    const context = ctx;

    let dots: Dot[] = [];
    let cssW = 0;
    let cssH = 0;

    function buildDots(width: number, height: number) {
      const next: Dot[] = [];
      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * CELL_W;
          const oy = r * CELL_H;
          for (const cx of COL_X) {
            for (const cy of ROW_Y) {
              const x = ox + cx;
              const y = oy + cy;
              next.push({ bx: x, by: y, cx: x, cy: y, vx: 0, vy: 0 });
            }
          }
        }
      }
      return next;
    }

    function resize() {
      const rect = wrapEl.getBoundingClientRect();
      cssW = rect.width > 0 ? rect.width : 480;
      cssH = rect.height > 0 ? rect.height : 480;
      canvasEl.width = Math.round(cssW * dpr);
      canvasEl.height = Math.round(cssH * dpr);
      canvasEl.style.width  = `${cssW}px`;
      canvasEl.style.height = `${cssH}px`;
      dots = buildDots(cssW, cssH);
    }
    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize());
      ro.observe(wrapEl);
    }

    let mouseX = -1000;
    let mouseY = -1000;

    function onMove(e: MouseEvent) {
      const rect = wrapEl.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function onLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }

    // Listen on the parent <footer> so the cursor anywhere in the footer
    // engages the forcefield (canvas overlay is pointer-events:none).
    const root = (wrapEl.closest('footer') ?? wrapEl.parentElement ?? wrapEl) as HTMLElement;
    root.addEventListener('mousemove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);

    function drawStatic() {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);
      context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.20)`;
      for (const d of dots) {
        context.beginPath();
        context.arc(d.bx, d.by, DOT_R, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    }

    if (reduced) {
      drawStatic();
      return () => {
        root.removeEventListener('mousemove', onMove);
        root.removeEventListener('mouseleave', onLeave);
        if (ro) ro.disconnect();
      };
    }

    let raf = 0;
    let inView = true;
    // Ambient wave — diagonal 45° sweep band. Travelling along the
    // (1,1) axis means the wave covers more "ground" before exiting
    // the canvas (top-left to bottom-right), so each cycle dwells
    // longer in view than the horizontal version did. Each dot's
    // distance to the wave is the perpendicular distance to a line
    // perpendicular to the sweep direction (a 45° line).
    //
    // Period bumped to 14s to match the longer travel distance and
    // keep the sweep speed visually consistent with the prior version.
    const WAVE_PERIOD_MS = 14000;
    const WAVE_BAND      = 520;  // px — width of the brightness band
    const WAVE_BASE_A    = 0;    // outside the wave — dots invisible
    const WAVE_PEAK_A    = 0.62; // peak at the wave center
    const SQRT2          = Math.SQRT2;
    let waveStart = performance.now();

    function tick(now: number) {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);

      const fieldR2 = FIELD_RADIUS * FIELD_RADIUS;

      // Diagonal wave position — projected onto the (1,1)/√2 axis so
      // every dot's progression along the sweep is `(cx + cy)/√2`. The
      // wave traverses from -WAVE_BAND through (cssW + cssH)/√2 +
      // WAVE_BAND so the band glides on and off corner-to-corner
      // without popping at the edges.
      const phase    = ((now - waveStart) % WAVE_PERIOD_MS) / WAVE_PERIOD_MS;
      const projMax  = (cssW + cssH) / SQRT2;
      const wavePos  = -WAVE_BAND + phase * (projMax + WAVE_BAND * 2);

      for (const d of dots) {
        if (mouseX > -500) {
          const dx = d.cx - mouseX;
          const dy = d.cy - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < fieldR2 && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            const falloff = 1 - dist / FIELD_RADIUS;
            const push = FIELD_PUSH * falloff;
            const nx = dx / dist;
            const ny = dy / dist;
            const tx = d.bx + nx * push;
            const ty = d.by + ny * push;
            d.vx += (tx - d.cx) * 0.18;
            d.vy += (ty - d.cy) * 0.18;
          } else {
            d.vx += (d.bx - d.cx) * SPRING;
            d.vy += (d.by - d.cy) * SPRING;
          }
        } else {
          d.vx += (d.bx - d.cx) * SPRING;
          d.vy += (d.by - d.cy) * SPRING;
        }

        d.vx *= DAMPING;
        d.vy *= DAMPING;
        d.cx += d.vx;
        d.cy += d.vy;
      }

      // Per-dot alpha — wave brightness peaks at band center and falls
      // off cosine-smooth to either edge. Distance is the dot's
      // projection on the diagonal (1,1)/√2 axis minus the wave's
      // current position on the same axis. Dots outside the band skip
      // rendering entirely since BASE_A is 0.
      for (const d of dots) {
        const proj = (d.cx + d.cy) / SQRT2;
        const ax = Math.abs(proj - wavePos);
        if (ax >= WAVE_BAND) continue;
        const t = 1 - ax / WAVE_BAND;
        const eased = (1 - Math.cos(t * Math.PI)) * 0.5;
        const alpha = WAVE_BASE_A + (WAVE_PEAK_A - WAVE_BASE_A) * eased;
        if (alpha < 0.02) continue;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.beginPath();
        context.arc(d.cx, d.cy, DOT_R, 0, Math.PI * 2);
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
            inView = e.isIntersecting;
            if (inView) start();
            else stop();
          }
        },
        { threshold: 0.01 },
      );
      io.observe(wrapEl);
    }

    if (inView) start();

    return () => {
      stop();
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Espresso base — anchored to the inverse token so theme swaps
          carry through. Sits behind the canvas. */}
      <div className="absolute inset-0 bg-bg-inverse" />

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

      {/* Top + bottom veils removed — the moving wave sweep is now the
          only visible motion (dots are pure-black outside the band) so
          the gradient fades had nothing meaningful to dissolve. The
          squircle's own rounded corners + overflow:hidden handle the
          edge clipping cleanly. */}
    </div>
  );
}
