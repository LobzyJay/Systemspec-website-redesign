'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { STSL_CITIES } from './coordinates';

// Hex string → cobe RGB triplet (each in 0..1). Cobe doesn't accept CSS
// var() values; we resolve from --accent-default once at mount.
function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m || m.length < 3) return [0, 0.48, 0.42];
  return [
    parseInt(m[0] ?? '00', 16) / 255,
    parseInt(m[1] ?? '00', 16) / 255,
    parseInt(m[2] ?? '00', 16) / 255,
  ];
}

function readToken(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

interface GlobeProps {
  className?: string;
  /**
   * Optional caption rendered beneath the canvas. Used to make the globe's
   * "Nigeria-anchored coverage" framing legible without altering the
   * geometry. Default: no caption.
   */
  caption?: string;
}

export default function Globe({ className, caption }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(2.4);
  const widthRef = useRef(0);

  // Coarse-pointer + low-CPU devices get the SVG silhouette so we don't spin
  // a WebGL context on a battery budget.
  const [useStatic, setUseStatic] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) < 4;
    setUseStatic(coarse && lowCpu);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (useStatic) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const accent = hexToRgb(readToken('--accent-default', '#017A6A'));

    const onResize = () => {
      widthRef.current = wrap.offsetWidth;
    };
    onResize();
    window.addEventListener('resize', onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: phiRef.current,
      theta: 0.25,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.92, 0.94, 0.96],
      markerColor: accent,
      glowColor: [0.96, 0.97, 0.98],
      // No markers — the globe ships clean. City pins were demo only.
      markers: [],
    });

    // cobe v2 has no onRender hook — drive rotation from a manual RAF loop.
    let rafId = 0;
    const tick = () => {
      if (!pointerInteracting.current && !reducedMotion) {
        phiRef.current += 0.003;
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current / 200,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    canvas.style.opacity = '0';
    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [useStatic, reducedMotion]);

  if (useStatic) return <GlobeStatic className={className} caption={caption} />;

  return (
    <div
      ref={wrapRef}
      className={[
        // Globe MUST stay 1:1. The cobe renderer paints a square buffer; if
        // the wrapper isn't square the canvas stretches. aspect-square +
        // mx-auto keeps the frame consistent regardless of parent shape.
        'relative aspect-square w-full max-w-full mx-auto select-none',
        className,
      ].filter(Boolean).join(' ')}
      role="img"
      aria-label="Globe showing SystemSpecs Technology Solutions coverage across Nigerian financial centers"
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
        }
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 0.6s cubic-bezier(0.2, 0, 0, 1)',
        }}
      />
      {caption ? (
        <figcaption
          className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-body-sm text-white/85"
        >
          {caption}
        </figcaption>
      ) : null}
    </div>
  );
}

// SSR-safe deterministic dot-field silhouette. Same visual mass as the live
// cobe globe pre-hydration, so first paint isn't a blank box.
export function GlobeStatic({ className, caption }: { className?: string; caption?: string }) {
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;
  const step = 14;
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let y = -radius; y <= radius; y += step) {
    for (let x = -radius; x <= radius; x += step) {
      const d = Math.sqrt(x * x + y * y);
      if (d > radius) continue;
      const t = d / radius;
      const o = 1 - t * t * 0.85;
      dots.push({ x: cx + x, y: cy + y, r: 1.4 * (1 - t * 0.4), o });
    }
  }
  return (
    <div
      className={[
        'relative aspect-square w-full max-w-full mx-auto grid place-items-center',
        className,
      ].filter(Boolean).join(' ')}
      role="img"
      aria-label="SystemSpecs Technology Solutions coverage globe (static fallback)"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="var(--accent-default, #017A6A)"
            opacity={d.o}
          />
        ))}
      </svg>
      {caption ? (
        <figcaption
          className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-body-sm text-white/85"
        >
          {caption}
        </figcaption>
      ) : null}
    </div>
  );
}
