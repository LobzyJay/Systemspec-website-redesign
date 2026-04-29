// Product card. Mirrors packages/brand-stsl/src/components/ProductCard.tsx
function ProductCard({ name, positioning, proof, brandColor, logo, href, tag }) {
  const panelTint = brandColor
    ? `color-mix(in srgb, ${brandColor} 10%, var(--bg-surface-raised))`
    : 'var(--bg-surface-raised)';
  return (
    <Doppelrand href={href}>
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
        borderRadius: 22, background: 'var(--bg-surface)', overflow: 'hidden',
        boxShadow: 'var(--shadow-inner-hi)',
      }}>
        <div style={{
          position: 'relative', aspectRatio: '5/2', display: 'grid', placeItems: 'center',
          padding: 32, background: panelTint,
        }}>
          {logo
            ? <img src={logo} alt={name} style={{ maxHeight: 36, maxWidth: '55%', objectFit: 'contain' }} />
            : <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-muted)', opacity: .4 }}>{name[0]}</span>
          }
          {brandColor && (
            <span aria-hidden="true" style={{
              position: 'absolute', insetInline: 0, bottom: 0, height: 1,
              background: brandColor, opacity: .5,
            }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24,
              letterSpacing: '-0.005em', lineHeight: 1.15,
              color: 'var(--text-primary)', margin: 0,
            }}>{name}</h3>
            {tag && (
              <span style={{
                flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 10,
                fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>{tag}</span>
            )}
          </div>

          <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55,
                      color: 'var(--text-secondary)', textWrap: 'pretty' }}>
            {positioning}
          </p>

          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'var(--text-muted)', margin: 0 }}>Proof</p>
            <p style={{ marginTop: 6, fontSize: 14, fontWeight: 500,
                        color: 'var(--text-primary)' }}>{proof}</p>
          </div>

          {/* CTA pinned to bottom — synced with SolutionCard / docs ProductCard.
              Pill h-12 / chip h-9 / pl-24 / pr-6 → chip clears the right
              padding cleanly and reads as one button family across the row. */}
          <div style={{ marginTop: 'auto', paddingTop: 28 }}>
            <span className="kit-prod-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              height: 48, paddingLeft: 24, paddingRight: 6, borderRadius: 9999,
              fontSize: 14, fontWeight: 500,
              color: brandColor || 'var(--accent-default)',
              boxShadow: `inset 0 0 0 1px ${brandColor ? `${brandColor}33` : 'var(--border-default)'}`,
              transition: 'box-shadow 220ms cubic-bezier(.3,0,0,1.05)',
            }}>
              <span style={{ lineHeight: 1 }}>Visit {name}</span>
              <span aria-hidden="true" className="kit-prod-cta-chip" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 9999,
                background: brandColor ? `${brandColor}1f` : 'var(--accent-subtle)',
                color: brandColor || 'var(--accent-default)',
                transition: 'transform 220ms cubic-bezier(.3,0,0,1.05)',
              }}>
                <Icon name="arrowUpRight" size={14} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Doppelrand>
  );
}
window.ProductCard = ProductCard;
