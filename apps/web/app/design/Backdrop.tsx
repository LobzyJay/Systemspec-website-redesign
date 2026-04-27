'use client';

// Mouse-reactive dot-grid backdrop. NOT mounted globally — the pattern is an
// asset, not site chrome. Mount it inside the surfaces that explicitly want
// it: newsletter background, social card background, web hero section.
//
// Usage:
//   <BackdropSurface tone="light"> // or "dark"
//     ...content over the pattern...
//   </BackdropSurface>

import { useEffect, useRef, type ReactNode } from 'react';

interface BackdropSurfaceProps {
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}

export function BackdropSurface({ tone = 'light', className, children }: BackdropSurfaceProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${x}%`);
          el.style.setProperty('--my', `${y}%`);
          raf = 0;
        });
      }
    };

    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div
        ref={wrapRef}
        className={['ds-bd', tone === 'dark' ? 'ds-bd--dark' : 'ds-bd--light', className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="ds-bd__dots" aria-hidden="true" />
        <div className="ds-bd__sweep" aria-hidden="true" />
        <div className="ds-bd__spotlight" aria-hidden="true" />
        <div className="ds-bd__content">{children}</div>
      </div>
    </>
  );
}

const styles = `
.ds-bd {
  position: relative;
  overflow: hidden;
  --mx: 50%;
  --my: 50%;
}
.ds-bd--light { background: var(--bg-surface-muted, #EEF0F2); color: var(--text-primary); }
.ds-bd--dark  { background: var(--bg-inverse, #0B0C0F); color: var(--text-on-inverse); }

.ds-bd__dots,
.ds-bd__sweep {
  position: absolute;
  inset: -10%;
  pointer-events: none;
}
.ds-bd__dots {
  background-image: radial-gradient(currentColor 1px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: 0.18;
}
.ds-bd--dark .ds-bd__dots { opacity: 0.22; }

.ds-bd__sweep {
  background-image: radial-gradient(var(--accent-default, #017A6A) 1.5px, transparent 2px);
  background-size: 22px 22px;
  opacity: 0;
  -webkit-mask-image: linear-gradient(115deg, transparent 35%, black 50%, transparent 65%);
          mask-image: linear-gradient(115deg, transparent 35%, black 50%, transparent 65%);
  -webkit-mask-size: 250% 100%;
          mask-size: 250% 100%;
  animation: ds-bd-sweep 9s linear infinite;
}
@keyframes ds-bd-sweep {
  0%   { -webkit-mask-position: 200% 0; mask-position: 200% 0; opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { -webkit-mask-position: -50% 0; mask-position: -50% 0; opacity: 0; }
}

.ds-bd__spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    300px circle at var(--mx) var(--my),
    color-mix(in srgb, var(--accent-default) 22%, transparent),
    transparent 70%
  );
}

.ds-bd__content { position: relative; z-index: 1; }

@media (prefers-reduced-motion: reduce) {
  .ds-bd__sweep { animation: none; opacity: 0; }
}
`;
