// Real WebGL globe — cobe 0.6.3. Cities + popup labels use cobe's built-in
// anchor injection: each marker with an `id` makes cobe expose
// --cobe-{id} (anchor position) and --cobe-visible-{id} (1 when facing
// camera, 0 on far side). Our HTML labels read those vars via
// CSS anchor-positioning + opacity — zero JS projection math.

const { useEffect, useRef } = React;

window.__stslGlobe = window.__stslGlobe || { phi: 2.4, theta: 0.3, width: 0 };

function hexToRgb(hex) {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m || m.length < 3) return [0, 0.48, 0.42];
  return [
    parseInt(m[0] || '00', 16) / 255,
    parseInt(m[1] || '00', 16) / 255,
    parseInt(m[2] || '00', 16) / 255,
  ];
}
function readToken(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function DottedGlobe({ caption, cities = [] }) {
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);
  const phiRef    = useRef(2.4);
  const widthRef  = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let globeInst = null;
    let removeListeners = null;

    const init = () => {
      const createGlobe = window.createGlobe;
      if (!createGlobe) return false;
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return false;

      // Cobe marker = the dot baked into the WebGL globe. We keep this
      // subtle now since the editorial pin SVG sits above and owns the
      // visual weight. Slightly desaturated teal so the pin reads as the
      // primary marker.
      const accent  = hexToRgb(readToken('--accent-default', '#017A6A'));
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const onResize = () => {
        widthRef.current = wrap.offsetWidth;
        window.__stslGlobe.width = widthRef.current;
      };
      onResize();
      window.addEventListener('resize', onResize);

      requestAnimationFrame(() => {
        if (cancelled) return;
        onResize();
        if (widthRef.current === 0) {
          requestAnimationFrame(() => { if (!cancelled) reallyInit(); });
        } else {
          reallyInit();
        }
      });

      function reallyInit() {
        // Markers carry `id` so cobe publishes --cobe-{id} anchor positions
        // and --cobe-visible-{id} opacity flags. Our labels read both.
        const markers = cities.map((c) => ({
          location: [c.lat, c.lng],
          size: c.size || 0.045,
          id: c.id,
        }));

        globeInst = createGlobe(canvas, {
          devicePixelRatio: Math.min(window.devicePixelRatio, 2),
          width:  widthRef.current * 2,
          height: widthRef.current * 2,
          phi: phiRef.current,
          theta: 0.3,
          dark: 0,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [1, 1, 1],
          markerColor: accent,
          glowColor: [1, 1, 1],
          markers,
          onRender: (state) => {
            if (!reduced) phiRef.current += 0.003;
            state.phi = phiRef.current;
            state.width  = widthRef.current * 2;
            state.height = widthRef.current * 2;
            window.__stslGlobe.phi   = phiRef.current;
            window.__stslGlobe.theta = 0.3;
            window.__stslGlobe.width = widthRef.current;
          },
        });
        canvas.style.opacity = '0';
        requestAnimationFrame(() => { canvas.style.opacity = '1'; });
      }

      removeListeners = () => window.removeEventListener('resize', onResize);
      return true;
    };

    if (!init()) {
      const onReady = () => { if (!cancelled) init(); };
      window.addEventListener('cobe-ready', onReady, { once: true });
      removeListeners = () => window.removeEventListener('cobe-ready', onReady);
    }

    return () => {
      cancelled = true;
      if (globeInst && globeInst.destroy) globeInst.destroy();
      if (removeListeners) removeListeners();
    };
  }, [cities]);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Rotating globe — SystemSpecs coverage"
      style={{
        position: 'relative', aspectRatio: '1 / 1',
        width: '100%', maxWidth: '100%', margin: '0 auto',
        userSelect: 'none', pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{
        width: '100%', height: '100%',
        contain: 'layout paint size',
        opacity: 0,
        transition: 'opacity 600ms cubic-bezier(.2,0,0,1)',
      }} />
      {/* Labels — one per city. Each uses CSS Anchor Positioning to track
          its --cobe-{id} anchor (auto-injected by cobe), and reads
          --cobe-visible-{id} (0 on back side, 1 when facing camera) for
          opacity. Zero projection JS — cobe drives everything.
          The .cobe-label is now a refined editorial map-pin: a teardrop
          glyph sitting just above the cobe marker dot, with the city name
          on a small floating tag beneath the pin. SVG is inline so we
          don't add a font / icon dependency. */}
      {cities.map((c) => (
        <div
          key={c.id}
          className="cobe-label"
          style={{
            positionAnchor: `--cobe-${c.id}`,
            opacity: `var(--cobe-visible-${c.id}, 0)`,
          }}
        >
          <svg
            className="cobe-label__pin"
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            aria-hidden="true"
          >
            {/* Teardrop pin: rounded head + tapered tip. */}
            <path
              d="M7 0.5 C3.41 0.5 0.5 3.41 0.5 7 C0.5 11.5 7 17.5 7 17.5 C7 17.5 13.5 11.5 13.5 7 C13.5 3.41 10.59 0.5 7 0.5 Z"
              fill="var(--accent-default)"
              stroke="rgba(255,255,255,.92)"
              strokeWidth="1"
            />
            {/* Inner aperture — single dot, fully circular (no nested radii issue). */}
            <circle cx="7" cy="7" r="2.4" fill="#FFFFFF" />
          </svg>
          <span className="cobe-label__name">{c.name}</span>
        </div>
      ))}
      {caption && (
        <figcaption style={{
          position: 'absolute', insetInline: 0, bottom: 8, textAlign: 'center',
          fontSize: 13, color: 'var(--text-secondary)', pointerEvents: 'none',
        }}>{caption}</figcaption>
      )}
    </div>
  );
}
window.DottedGlobe = DottedGlobe;
