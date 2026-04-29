// Shared primitives for the STSL UI kit.
// Each component is small, cosmetic-only — no logic that isn't visual.
// All tokens come from ../../colors_and_type.css.

const { useState, useEffect, useRef } = React;

// ── Icon ─────────────────────────────────────────────────
// Inline SVG icons styled to match the project's hand-rolled set:
//   24×24 viewBox, currentColor, 1.6px stroke, round caps & joins.
// We define just the icons the kit actually uses to avoid a CDN fetch.
const ICONS = {
  arrowUpRight: 'M7 17 17 7M9 7h8v8',
  arrowRight:   'M5 12h14M13 6l6 6-6 6',
  menu:         'M4 7h16M4 12h16M4 17h16',
  close:        'M6 6l12 12M18 6L6 18',
  mail:         'M3 7l9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2',
  phone:        'M5 4h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  linkedin:     'M5 9v10M5 5v.01M10 9v10M10 13a3 3 0 0 1 6 0v6',
  twitter:      'M22 5.8a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1A4.1 4.1 0 0 0 11.7 9a11.6 11.6 0 0 1-8.4-4.3 4.1 4.1 0 0 0 1.3 5.5 4.1 4.1 0 0 1-1.9-.5v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.9.07 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0 0 22 5.8z',
  shieldCheck:  'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3M9 12l2 2 4-4',
  zap:          'M13 2 3 14h7l-1 8 10-12h-7l1-8z',
  layers:       'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  globe:        'M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18M5 7h14M5 17h14M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  sparkle:      'M12 3v18M3 12h18M6 6l12 12M18 6 6 18',
  lock:         'M6 11h12v9H6zM8 11V7a4 4 0 0 1 8 0v4',
};
function Icon({ name, size = 16, strokeWidth = 1.6, style = {} }) {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={strokeWidth}
         strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={path} />
    </svg>
  );
}

// ── Container ────────────────────────────────────────────
function Container({ size = 'wide', children, style = {}, className = '' }) {
  const max = { narrow: 720, default: 1120, wide: 1400 }[size];
  return (
    <div className={className} style={{ maxWidth: max, margin: '0 auto', padding: '0 24px', ...style }}>
      {children}
    </div>
  );
}

// ── Eyebrow ──────────────────────────────────────────────
function Eyebrow({ children, accent = false, style = {} }) {
  return (
    <span className="kit-eyebrow" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, height: 24, padding: '0 12px',
      borderRadius: 9999,
      background: accent ? 'var(--accent-subtle)' : 'transparent',
      color: accent ? 'var(--accent-default)' : 'var(--text-muted)',
      boxShadow: accent ? 'inset 0 0 0 1px color-mix(in srgb, var(--accent-default) 18%, transparent)' : 'none',
      fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      ...style,
    }}>
      {accent && <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: 9999, background: 'var(--accent-default)' }} />}
      {children}
    </span>
  );
}

// ── Pill button (primary / secondary / ghost) ────────────
function Button({ variant = 'primary', size = 'md', children, href, onClick, withChip = true, brandColor }) {
  const Tag = href ? 'a' : 'button';
  const heights  = { sm: 36, md: 48, lg: 52 };
  const fontSize = { sm: 13, md: 15, lg: 15 };
  const chipSize = { sm: 26, md: 36, lg: 40 };
  const padL     = { sm: 16, md: 22, lg: 26 };

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 12,
    height: heights[size], borderRadius: 9999,
    fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: fontSize[size],
    border: 0, cursor: 'pointer', textDecoration: 'none',
    transition: 'background-color 220ms cubic-bezier(.3,0,0,1.05), box-shadow 220ms cubic-bezier(.3,0,0,1.05), color 220ms',
  };

  let style = { ...base };
  if (variant === 'primary') {
    style = { ...style,
      background: brandColor || 'var(--accent-default)',
      color: '#fff',
      paddingLeft: padL[size], paddingRight: 6,
      boxShadow: 'var(--shadow-e1)',
    };
  } else if (variant === 'secondary') {
    style = { ...style,
      background: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      padding: `0 ${padL[size]}px`,
      boxShadow: 'inset 0 0 0 1px var(--border-default)',
    };
  } else {
    style = { ...style,
      background: 'transparent',
      color: 'var(--text-primary)',
      padding: `0 ${padL[size] - 4}px`,
    };
  }

  return (
    <Tag href={href} onClick={onClick} style={style}
         className={`kit-btn kit-btn-${variant} kit-btn-${size}`}>
      <span style={{ lineHeight: 1 }}>{children}</span>
      {withChip && variant === 'primary' && (
        <span aria-hidden="true" className="kit-chip" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: chipSize[size], height: chipSize[size], borderRadius: 9999,
          background: 'rgba(255,255,255,.18)',
          transition: 'transform 220ms cubic-bezier(.3,0,0,1.05)',
        }}>
          <Icon name="arrowUpRight" size={size === 'sm' ? 12 : 16} />
        </span>
      )}
    </Tag>
  );
}

// ── Doppelrand wrapper (the card-in-card chrome) ─────────
function Doppelrand({ children, style = {}, hover = true, onClick, href }) {
  const [isHover, setHover] = useState(false);
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        borderRadius: 28, padding: 6,
        // height: 100% so when the Doppelrand sits in a CSS Grid row, it
        // stretches to the row height. The inner card (which has its own
        // height: 100%) then fills the anchor — guaranteeing CTA + Proof
        // alignment across cards regardless of content length.
        height: '100%',
        boxSizing: 'border-box',
        background: 'color-mix(in srgb, var(--bg-canvas) 55%, var(--bg-surface-muted) 45%)',
        boxShadow: hover && isHover ? 'var(--shadow-e3)' : 'var(--shadow-e1)',
        border: '1px solid var(--border-subtle)',
        transition: 'transform 360ms cubic-bezier(.3,0,0,1.05), box-shadow 360ms cubic-bezier(.3,0,0,1.05)',
        transform: hover && isHover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: href || onClick ? 'pointer' : 'default',
        ...style,
      }}>
      {children}
    </Tag>
  );
}

// ── shared style injection ────────────────────────────────
// Inject keyframes / hover descendants we need globally.
const globalCSS = `
  .kit-btn-primary:hover { background: var(--accent-default-hover) !important; box-shadow: var(--shadow-e2) !important; }
  .kit-btn-secondary:hover { box-shadow: inset 0 0 0 1px var(--accent-default) !important; color: var(--accent-default) !important; }
  .kit-btn-ghost:hover { background: var(--bg-surface-raised); }
  .kit-btn-primary:hover .kit-chip { transform: translate(2px, -1px); }

  /* Reveal — staged on scroll via IntersectionObserver. Sections enter
     with a soft fade-up the first time they cross 12% of the viewport,
     then settle. Above-the-fold sections (Hero) get [data-reveal-now]
     to fire immediately without waiting for IO. */
  @keyframes kit-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .kit-reveal { opacity: 0; transform: translateY(8px); will-change: opacity, transform; }
  .kit-reveal[data-revealed="true"],
  .kit-reveal[data-reveal-now="true"] {
    animation: kit-fade-up 520ms cubic-bezier(.2,0,0,1) both;
  }
  @media (prefers-reduced-motion: reduce) {
    .kit-reveal { opacity: 1; transform: none; animation: none !important; }
  }
`;
function GlobalStyle() {
  return <style>{globalCSS}</style>;
}

// Mount one IntersectionObserver per page that watches every .kit-reveal
// node. First time a node intersects, flip data-revealed="true" so the
// keyframe fires. Run once on mount; the observer sticks around so any
// nodes added later get caught too.
function useRevealObserver() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          entry.target.setAttribute('data-revealed', 'true');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    const observe = () => {
      document.querySelectorAll('.kit-reveal:not([data-reveal-now])').forEach((el) => {
        if (!seen.has(el)) io.observe(el);
      });
    };
    observe();
    // Re-scan when more JSX scripts load (Babel runs them async).
    const reobs = setInterval(observe, 400);
    setTimeout(() => clearInterval(reobs), 4000);

    return () => { io.disconnect(); clearInterval(reobs); };
  }, []);
}

Object.assign(window, { Icon, Container, Eyebrow, Button, Doppelrand, GlobalStyle, useRevealObserver });
