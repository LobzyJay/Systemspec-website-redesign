// Sticky cream/blur nav. Mirrors packages/brand-stsl/src/components/Nav.tsx.
function Nav({ primaryLinks, salesHref, governmentHref, logoSrc, brandLabel = 'SystemSpecs' }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'color-mix(in srgb, var(--bg-canvas) 85%, transparent)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <Container size="wide">
        <div style={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" aria-label={brandLabel} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img src={logoSrc} alt={brandLabel} style={{ height: 26, width: 'auto', objectFit: 'contain' }} />
          </a>

          <nav aria-label="Primary" className="kit-nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {primaryLinks.map((l) => (
              <a key={l.label} href={l.href} style={{
                fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
                textDecoration: 'none', transition: 'color 160ms',
              }}
                 onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-default)'}
                 onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="kit-nav-desktop" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {governmentHref && (
              <Button variant="ghost" size="sm" href={governmentHref} withChip={false}>Government enquiries</Button>
            )}
            <Button variant="primary" size="sm" href={salesHref}>Talk to sales</Button>
          </div>

          <button onClick={() => setOpen((o) => !o)} aria-label="Menu"
            className="kit-nav-mobile-toggle" style={{
            display: 'none', width: 40, height: 40, borderRadius: 8,
            background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--text-primary)',
          }}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {/* Mobile drawer — uses interpolate-size + grid template trick so
            height animates from 0 → auto without measuring. data-open
            drives the transition; closed state stays in DOM but collapsed. */}
        <div
          className="kit-nav-mobile"
          data-open={open ? 'true' : 'false'}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ minHeight: 0 }}>
            <div style={{ padding: '12px 0 20px', borderTop: '1px solid var(--border-subtle)' }}>
              {primaryLinks.map((l) => (
                <a key={l.label} href={l.href} style={{
                  display: 'block', padding: '10px 0', fontSize: 16,
                  color: 'var(--text-primary)', textDecoration: 'none',
                }}>{l.label}</a>
              ))}
              <div style={{ display: 'flex', gap: 8, paddingTop: 12 }}>
                {governmentHref && <Button variant="secondary" size="md" href={governmentHref} withChip={false}>Government</Button>}
                <Button variant="primary" size="md" href={salesHref}>Talk to sales</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 1023px) {
          .kit-nav-desktop { display: none !important; }
          .kit-nav-mobile-toggle { display: inline-flex !important; align-items: center; justify-content: center; }
        }
        /* Drawer: animate height + opacity. Display:grid with rows 0fr→1fr
           is the cleanest way to animate to content-driven height without JS
           measurement. */
        .kit-nav-mobile {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 240ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 200ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .kit-nav-mobile[data-open="true"] {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .kit-nav-mobile { transition: opacity 100ms linear; grid-template-rows: 1fr; }
          .kit-nav-mobile[data-open="false"] { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </header>
  );
}
window.Nav = Nav;
