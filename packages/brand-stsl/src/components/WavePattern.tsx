// Background pattern library — three motion loops.
//
//   Loop 1 — Diagonal sweep   · band of accent dots drifts across a grid
//   Loop 2 — Dot ripple       · circular wave propagates outward through dots
//   Loop 3 — Vertical drift   · dot grid masked by a vertical fade band
//
// Loop 1 also ships 6 frozen-frame stills for use in static surfaces.
// Loops 2 and 3 are live-only.
//
// All variants honor prefers-reduced-motion and use `currentColor` so the
// host surface controls tone.

import type { CSSProperties } from 'react';

interface BaseProps {
  className?: string;
  style?: CSSProperties;
}

interface StillProps extends BaseProps {
  progress?: number; // 0..1
}

const wrap = (extra: string, className?: string) =>
  ['absolute inset-0 overflow-hidden pointer-events-none text-current', extra, className]
    .filter(Boolean)
    .join(' ');

// ============================================================
// LOOP 1 — Diagonal sweep (live + 6 stills)
// ============================================================

export function WaveBackdrop({ className, style }: BaseProps) {
  return (
    <span className={wrap('', className)} style={style} aria-hidden="true">
      <style>{styles}</style>
      <span className="ds-w1__base" />
      <span className="ds-w1__sweep" data-w-anim />
    </span>
  );
}

export function WaveStill({ className, style, progress = 0.5 }: StillProps) {
  const maskPos = `${200 - progress * 250}% 0`;
  return (
    <span className={wrap('', className)} style={style} aria-hidden="true">
      <style>{styles}</style>
      <span className="ds-w1__base" />
      <span
        className="ds-w1__sweep"
        style={{ WebkitMaskPosition: maskPos, maskPosition: maskPos, opacity: 0.6, animation: 'none' }}
      />
    </span>
  );
}

export const waveStills = [0, 0.16, 0.33, 0.5, 0.66, 0.84].map((progress, i) => ({
  progress,
  label: `Frame ${i + 1} / 6`,
}));

// ============================================================
// LOOP 2 — Dot ripple (live only)
//   The DOTS themselves carry the wave. Each dot pulses on a ~5s cycle
//   with a delay proportional to its distance from center → concentric
//   rings of brightness emanate outward continuously.
// ============================================================

const RIPPLE_GRID = 22;       // 22×22 dot grid
const RIPPLE_DURATION = 5;    // s — full pulse cycle
const RIPPLE_PROPAGATION = 1.6; // s — time for the wave to traverse half the grid

function rippleDots() {
  const dots: { cx: number; cy: number; delay: number }[] = [];
  const cx = (RIPPLE_GRID - 1) / 2;
  const cy = (RIPPLE_GRID - 1) / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  for (let r = 0; r < RIPPLE_GRID; r++) {
    for (let c = 0; c < RIPPLE_GRID; c++) {
      const dx = c - cx;
      const dy = r - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Delay scales linearly with distance from center; modulo by duration
      // so the wave restarts seamlessly.
      const delay = -((dist / maxDist) * RIPPLE_PROPAGATION);
      dots.push({ cx: c + 0.5, cy: r + 0.5, delay });
    }
  }
  return dots;
}

export function WaveBackdrop2({ className, style }: BaseProps) {
  const dots = rippleDots();
  return (
    <span className={wrap('grid place-items-center', className)} style={style} aria-hidden="true">
      <style>{styles}</style>
      <svg
        viewBox={`0 0 ${RIPPLE_GRID} ${RIPPLE_GRID}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r="0.18"
            fill="currentColor"
            data-w-anim
            style={{
              animation: `ds-w2-ripple ${RIPPLE_DURATION}s ease-in-out infinite`,
              animationDelay: `${d.delay}s`,
              transformOrigin: `${d.cx}px ${d.cy}px`,
            }}
          />
        ))}
      </svg>
    </span>
  );
}

// ============================================================
// LOOP 3 — Vertical drift (live only)
// ============================================================

export function WaveBackdrop3({ className, style }: BaseProps) {
  return (
    <span className={wrap('', className)} style={style} aria-hidden="true">
      <style>{styles}</style>
      <span className="ds-w3__base" data-w-anim />
    </span>
  );
}

// ============================================================
// Shared styles
// ============================================================

const styles = `
.ds-w1__base,
.ds-w1__sweep,
.ds-w3__base {
  position: absolute;
  inset: -10%;
  pointer-events: none;
}

/* Loop 1 — diagonal sweep */
.ds-w1__base {
  background-image: radial-gradient(currentColor 1px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: 0.32;
}
.ds-w1__sweep {
  background-image: radial-gradient(currentColor 1.5px, transparent 2px);
  background-size: 22px 22px;
  opacity: 0;
  -webkit-mask-image: linear-gradient(115deg, transparent 35%, black 50%, transparent 65%);
          mask-image: linear-gradient(115deg, transparent 35%, black 50%, transparent 65%);
  -webkit-mask-size: 250% 100%;
          mask-size: 250% 100%;
}
.ds-w1__sweep[data-w-anim] {
  animation: ds-w1-sweep 9s linear infinite;
}
@keyframes ds-w1-sweep {
  0%   { -webkit-mask-position: 200% 0; mask-position: 200% 0; opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { -webkit-mask-position: -50% 0; mask-position: -50% 0; opacity: 0; }
}

/* Loop 2 — dot ripple — each dot pulses, staggered by distance from center */
@keyframes ds-w2-ripple {
  0%, 100% { transform: scale(0.7); opacity: 0.18; }
  50%      { transform: scale(2.6); opacity: 0.95; }
}

/* Loop 3 — vertical drift */
.ds-w3__base {
  background-image: radial-gradient(currentColor 1px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: 0.45;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%);
  -webkit-mask-size: 100% 250%;
          mask-size: 100% 250%;
}
.ds-w3__base[data-w-anim] {
  animation: ds-w3-drift 11s ease-in-out infinite;
}
@keyframes ds-w3-drift {
  0%, 100% { -webkit-mask-position: 0 0;   mask-position: 0 0; }
  50%      { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
}

@media (prefers-reduced-motion: reduce) {
  [data-w-anim] { animation: none !important; }
}
`;
