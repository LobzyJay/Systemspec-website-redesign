// Static "dotted globe" — proper orthographic projection of a sphere with
// dots at lat/lng grid points. Africa is rendered in the brand accent;
// everything else is muted neutral. Pure SVG, server-renderable, no JS.
//
// Use this anywhere a "data-anchored globe" is wanted: banners, social cards,
// newsletter heads, decorative section dividers. Crop / mask via the parent
// container — globe always paints into a 1:1 box, parent decides what's
// visible.

import { ReactNode } from 'react';

type Mask =
  | 'full'         // whole circle
  | 'half-top'
  | 'half-bottom'
  | 'half-left'
  | 'half-right'
  | 'quarter-tl' | 'quarter-tr' | 'quarter-bl' | 'quarter-br';

interface DottedGlobeProps {
  className?: string;
  // Rotation in degrees — controls which longitude faces the viewer.
  rotation?: number;
  // Latitude tilt — slight tilt looks more dimensional.
  tilt?: number;
  // Crop the globe into a half / quarter for use as a decorative element.
  mask?: Mask;
  // When true, dots inside the Africa bounding box render in the brand
  // accent. Default false — globe ships as a uniform grey dot field.
  highlightAfrica?: boolean;
  // Specific lat/lng points to render as red highlight pulses. Default empty.
  highlights?: { lat: number; lng: number }[];
  // Visual variant. `outline` (default) is the editorial dot-on-transparent
  // treatment. `filled` paints a solid sphere with a radial gradient for
  // depth — reads at small sizes (banner thumbnails, favicons, in-line
  // marks) where the outline dots disappear.
  variant?: 'outline' | 'filled';
  // Optional overlay (typically <StatPill />s positioned absolutely).
  children?: ReactNode;
}

const VIEWBOX = 600;
const CENTER = VIEWBOX / 2;
const RADIUS = VIEWBOX * 0.42;
const STEP = 5; // degrees between dots — 5° gives a dense, readable grid.

// Africa bounding box (loose). Only used when `highlightAfrica` prop is on.
function isAfrica(lat: number, lng: number): boolean {
  return lat >= -35 && lat <= 38 && lng >= -20 && lng <= 52;
}

// Pre-compute the projected dot positions once per render. Orthographic
// projection: dots on the back hemisphere (z < 0) are culled. Africa dots
// get the accent color; rest get a muted neutral.
function buildDots(rotation: number, tilt: number) {
  const dots: { x: number; y: number; r: number; africa: boolean; depth: number }[] = [];
  const yaw = (rotation * Math.PI) / 180;
  const pitch = (tilt * Math.PI) / 180;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);

  for (let lat = -90; lat <= 90; lat += STEP) {
    // Spacing along longitude expands toward the equator — skip tighter
    // bands near the poles to avoid clumping.
    const lngStep = STEP / Math.max(0.05, Math.cos((lat * Math.PI) / 180));
    for (let lng = -180; lng <= 180; lng += lngStep) {
      const phi = (lat * Math.PI) / 180;
      const lambda = (lng * Math.PI) / 180;
      // Unit sphere coordinates — y is up.
      const x0 = Math.cos(phi) * Math.cos(lambda);
      const z0 = Math.cos(phi) * Math.sin(lambda);
      const y0 = Math.sin(phi);
      // Yaw around y-axis (rotate the globe horizontally).
      const x1 = x0 * cy - z0 * sy;
      const z1 = x0 * sy + z0 * cy;
      const y1 = y0;
      // Pitch around x-axis (tilt forward).
      const y2 = y1 * cp - z1 * sp;
      const z2 = y1 * sp + z1 * cp;
      // Cull back-of-sphere.
      if (z2 < 0) continue;
      const px = CENTER + x1 * RADIUS;
      const py = CENTER - y2 * RADIUS;
      // Dot size shrinks toward the limb (z2 → 0) for a subtle 3D feel.
      const r = 1.2 + z2 * 1.4;
      dots.push({ x: px, y: py, r, africa: isAfrica(lat, lng), depth: z2 });
    }
  }
  return dots;
}

const MASK_CLIPS: Record<Mask, string | undefined> = {
  full: undefined,
  'half-top':    'inset(0 0 50% 0)',
  'half-bottom': 'inset(50% 0 0 0)',
  'half-left':   'inset(0 50% 0 0)',
  'half-right':  'inset(0 0 0 50%)',
  'quarter-tl':  'inset(0 50% 50% 0)',
  'quarter-tr':  'inset(0 0 50% 50%)',
  'quarter-bl':  'inset(50% 50% 0 0)',
  'quarter-br':  'inset(50% 0 0 50%)',
};

function projectPoint(
  lat: number,
  lng: number,
  rotation: number,
  tilt: number,
): { x: number; y: number; visible: boolean } {
  const yaw = (rotation * Math.PI) / 180;
  const pitch = (tilt * Math.PI) / 180;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const phi = (lat * Math.PI) / 180;
  const lambda = (lng * Math.PI) / 180;
  const x0 = Math.cos(phi) * Math.cos(lambda);
  const z0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const x1 = x0 * cy - z0 * sy;
  const z1 = x0 * sy + z0 * cy;
  const y1 = y0;
  const y2 = y1 * cp - z1 * sp;
  const z2 = y1 * sp + z1 * cp;
  return {
    x: CENTER + x1 * RADIUS,
    y: CENTER - y2 * RADIUS,
    visible: z2 >= 0,
  };
}

export function DottedGlobe({
  className,
  rotation = 20,
  tilt = 18,
  mask = 'full',
  highlightAfrica = false,
  highlights = [],
  variant = 'outline',
  children,
}: DottedGlobeProps) {
  const dots = buildDots(rotation, tilt);
  const clip = MASK_CLIPS[mask];
  const visibleHighlights = highlights
    .map((h) => projectPoint(h.lat, h.lng, rotation, tilt))
    .filter((p) => p.visible);
  const filled = variant === 'filled';
  // Unique gradient ID so multiple globes on a page don't collide.
  const gradId = `globe-grad-${Math.round(rotation)}-${Math.round(tilt)}`;

  return (
    <div
      className={[
        'relative aspect-square w-full max-w-full mx-auto',
        className,
      ].filter(Boolean).join(' ')}
      role="img"
      aria-label="Dotted globe — Africa coverage highlighted"
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="block w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={clip ? { clipPath: clip } : undefined}
      >
        {filled ? (
          <defs>
            {/* Radial gradient — light on top-left, deep teal at the rim.
                Gives the sphere visible depth at small sizes. */}
            <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
              <stop offset="0%"  stopColor="var(--brand-teal-light, #83BFB7)" />
              <stop offset="55%" stopColor="var(--accent-default,  #017A6A)" />
              <stop offset="100%" stopColor="var(--brand-forest-deep, #0A4530)" />
            </radialGradient>
          </defs>
        ) : null}
        {/* Base sphere — solid filled gradient when variant=filled, near-
            transparent placeholder otherwise. */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill={filled ? `url(#${gradId})` : 'var(--bg-surface-muted, #EEF0F2)'}
          opacity={filled ? 1 : 0.35}
        />
        {dots.map((d, i) => {
          const lit = highlightAfrica && d.africa;
          // Filled variant: dots are white-on-teal (continents standing out
          // against the brand sphere). Outline variant: dots are grey-on-
          // light or accent if Africa is highlighted.
          const fill = filled
            ? 'rgba(255,255,255,0.85)'
            : lit
              ? 'var(--accent-default, #017A6A)'
              : 'var(--text-muted, #7A828D)';
          const opacity = filled ? 0.7 : lit ? 0.92 : 0.4;
          return (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={fill} opacity={opacity} />
          );
        })}
        {/* Red highlight pulses for marquee cities. Two concentric circles —
            outer ring + filled center — give a subtle "active" indicator. */}
        {visibleHighlights.map((p, i) => (
          <g key={`hl-${i}`}>
            <circle cx={p.x} cy={p.y} r="6" fill="var(--feedback-danger, #C0353A)" opacity="0.18" />
            <circle cx={p.x} cy={p.y} r="3" fill="var(--feedback-danger, #C0353A)" />
          </g>
        ))}
      </svg>
      {children ? <div className="absolute inset-0 pointer-events-none">{children}</div> : null}
    </div>
  );
}
