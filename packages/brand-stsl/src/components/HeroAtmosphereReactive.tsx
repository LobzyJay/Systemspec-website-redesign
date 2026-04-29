'use client';

// HeroAtmosphereReactive — canvas-based Braille dot field with cursor
// forcefield repulsion. Replaces the SVG pattern for the reactive
// variant because SVG patterns can't push individual dots; we need
// per-dot position state.
//
// Behaviour:
//   • Ambient — every dot sits at its base position. Reads as a quiet
//     Braille texture (3×2 cell grid, accent teal at low alpha).
//   • Cursor in field — every dot inside the forcefield radius gets
//     pushed outward, normalized by distance. Closer = stronger push.
//   • Cursor leaves — each dot's spring constant pulls it back to its
//     base position; damping smooths the return.
//   • Reduced-motion — physics off, dots render at base position only.
//
// Performance budget:
//   • ~600 dots on a 1000×800 hero (32×40 cell grid)
//   • Single RAF loop, simple integration math, sparse ctx state changes
//   • IO-paused when offscreen
//   • ~1-2% CPU on a modern laptop while interacting

import { useEffect, useRef } from 'react';

// Braille cell layout — same shape as the SVG variant (3 rows × 2 cols)
// scaled up so the canvas isn't drawing too many dots. Cell footprint
// is 24×34 px which gives ~200 cells on a 1000×800 hero ≈ 1200 dots.
const CELL_W = 24;
const CELL_H = 34;
const COL_X  = [6, 18];
const ROW_Y  = [6, 17, 28];
const DOT_R  = 1.2;

// Forcefield params
const FIELD_RADIUS = 130;     // px — repulsion sphere of influence
const FIELD_PUSH   = 38;      // px — peak displacement at cursor center
const SPRING       = 0.075;   // per-frame pull back to base position
const DAMPING      = 0.82;    // velocity damping per frame

interface Dot {
  bx: number;  // base x (anchor)
  by: number;  // base y (anchor)
  cx: number;  // current x
  cy: number;  // current y
  vx: number;  // velocity x
  vy: number;  // velocity y
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

export function HeroAtmosphereReactive() {
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

    let dots: Dot[] = [];
    let cssW = 0;
    let cssH = 0;
    const wrapEl = wrap;
    const canvasEl = canvas;
    const context = ctx;

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

    // Mouse position. -1,-1 = no cursor (forcefield off).
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

    // Listen on the parent <section> so the cursor anywhere in the hero
    // engages the forcefield (not just inside the canvas overlay which
    // is pointer-events:none).
    const root = (wrapEl.closest('section') ?? wrapEl.parentElement ?? wrap) as HTMLElement;
    root.addEventListener('mousemove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);

    function drawStatic() {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);
      context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.18)`;
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

    function tick() {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, cssW, cssH);

      const fieldR2 = FIELD_RADIUS * FIELD_RADIUS;

      for (const d of dots) {
        // Forcefield repulsion — only if cursor is inside influence radius.
        if (mouseX > -500) {
          const dx = d.cx - mouseX;
          const dy = d.cy - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < fieldR2 && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            // Falloff: linear from 1 at center to 0 at radius edge.
            const falloff = 1 - dist / FIELD_RADIUS;
            const push = FIELD_PUSH * falloff;
            const nx = dx / dist;
            const ny = dy / dist;
            // Target position = base + (radial direction × push)
            const tx = d.bx + nx * push;
            const ty = d.by + ny * push;
            // Pull current toward target (gentle) instead of hard-setting,
            // so the dot eases into the displaced position.
            d.vx += (tx - d.cx) * 0.18;
            d.vy += (ty - d.cy) * 0.18;
          } else {
            // Outside field — spring back to base.
            d.vx += (d.bx - d.cx) * SPRING;
            d.vy += (d.by - d.cy) * SPRING;
          }
        } else {
          // Cursor not in hero — spring back.
          d.vx += (d.bx - d.cx) * SPRING;
          d.vy += (d.by - d.cy) * SPRING;
        }

        d.vx *= DAMPING;
        d.vy *= DAMPING;
        d.cx += d.vx;
        d.cy += d.vy;
      }

      // Single fillStyle for the whole pass — alpha stays uniform so
      // the field reads as a coherent layer, not a heatmap.
      context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.22)`;
      for (const d of dots) {
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

      {/* Top edge fade. */}
      <div
        className="absolute inset-x-0 top-0 h-20"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg-canvas) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
