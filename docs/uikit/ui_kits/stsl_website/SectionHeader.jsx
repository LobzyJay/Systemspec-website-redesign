// Section header. Mirrors packages/brand-stsl/src/components/SectionHeader.tsx
function SectionHeader({ eyebrow, headline, intro, link }) {
  return (
    <Container size="wide">
      <div className="kit-sh-grid" style={{
        display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 24,
        alignItems: 'end', marginBottom: 48,
      }}>
        <div>
          {eyebrow && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'var(--accent-default)', margin: '0 0 12px' }}>
              {eyebrow}
            </p>
          )}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36,
            letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)',
            textWrap: 'balance', margin: 0,
          }}>
            {headline}
          </h2>
          {intro && (
            <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.55,
                        color: 'var(--text-secondary)', maxWidth: '52ch' }}>
              {intro}
            </p>
          )}
        </div>
        {link && (
          <div style={{ textAlign: 'right' }}>
            <a href={link.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'var(--accent-default)', fontWeight: 500, fontSize: 15,
              textDecoration: 'none',
            }}>
              {link.label} <Icon name="arrowRight" size={16} />
            </a>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 1023px) { .kit-sh-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Container>
  );
}
window.SectionHeader = SectionHeader;
