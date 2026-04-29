// Editorial hero. Mirrors packages/brand-stsl/src/components/Hero.tsx.
// Senior-design pass: more vertical breathing room (pt 144 / pb 128), 12-col
// grid (7/5 split) with an extra left gutter on the visual at lg, and a
// responsive headline scale that mirrors the docs' display-md → display-xl.
function Hero({ eyebrow, headline, subhead, primary, secondary, visual }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-canvas)' }}>
      <Container size="wide" className="kit-hero-section" style={{ paddingTop: 144, paddingBottom: 128 }}>
        <div className="kit-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
          gap: 56, alignItems: 'center',
        }}>
          <div className="kit-reveal" data-reveal-now="true">
            {eyebrow && <Eyebrow accent style={{ marginBottom: 28 }}>{eyebrow}</Eyebrow>}
            <h1 className="kit-hero-headline" style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 56, letterSpacing: '-0.022em', lineHeight: 1.04,
              color: 'var(--text-primary)', textWrap: 'balance', margin: 0,
            }}>
              {headline}
            </h1>
            <p className="kit-hero-subhead" style={{
              marginTop: 20, fontSize: 19, lineHeight: 1.55,
              color: 'var(--text-secondary)', maxWidth: 560, textWrap: 'pretty',
            }}>
              {subhead}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" href={primary.href}>{primary.label}</Button>
              {secondary && <Button variant="secondary" size="lg" href={secondary.href}>{secondary.label}</Button>}
            </div>
          </div>

          {visual && (
            <div className="kit-reveal kit-hero-visual" data-reveal-now="true" style={{ animationDelay: '120ms', paddingLeft: 24 }}>
              <div style={{
                borderRadius: 28, padding: 6,
                background: 'color-mix(in srgb, var(--bg-canvas) 55%, var(--bg-surface-muted) 45%)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-e2)',
              }}>
                <div style={{
                  aspectRatio: '1 / 1', borderRadius: 22, overflow: 'hidden',
                  background: 'radial-gradient(ellipse at 50% 35%, var(--bg-surface) 0%, var(--bg-surface-muted) 100%)',
                  boxShadow: 'var(--shadow-inner-hi)',
                }}>
                  {visual}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1279px) {
          .kit-hero-section { padding-top: 112px !important; padding-bottom: 96px !important; }
          .kit-hero-headline { font-size: 48px !important; }
        }
        @media (max-width: 1023px) {
          .kit-hero-section { padding-top: 80px !important; padding-bottom: 64px !important; }
          .kit-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .kit-hero-headline { font-size: 40px !important; }
          .kit-hero-subhead { font-size: 17px !important; }
          .kit-hero-visual { padding-left: 0 !important; max-width: 480px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .kit-hero-headline { font-size: 36px !important; line-height: 1.08 !important; }
        }
      `}</style>
    </section>
  );
}
window.Hero = Hero;
