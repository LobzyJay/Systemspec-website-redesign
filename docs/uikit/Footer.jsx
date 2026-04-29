// Footer. Mirrors packages/brand-stsl/src/components/Footer.tsx.
//
// Senior pass: hierarchy was previously logo + 22px lockup + 14px paragraph
// stacked tight — a "wall of attribution". Restructured to: wordmark anchors
// the brand column, a serif-italic mission statement carries the editorial
// voice (matches PageHeading lede on docs), then social pills sit on a row
// with proper breathing room. Color literals → tokens. Link rows pick up an
// accent hover so they read as interactive without underlines.
function Footer({ columns, groupCompanies, contact, legalLinks, socialLinks, logoSrc }) {
  const onInverse = 'var(--text-on-inverse)';
  return (
    <footer style={{ background: 'var(--bg-inverse)', color: onInverse }}>
      <Container size="wide" style={{ paddingTop: 96, paddingBottom: 72 }}>
        <div className="kit-foot-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 48,
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            {logoSrc && <img src={logoSrc} alt="SystemSpecs" style={{ height: 28, marginBottom: 24 }} />}
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 19, lineHeight: 1.45, margin: 0,
              color: 'rgba(247,248,249,.82)', maxWidth: 360,
            }}>
              The infrastructure behind Africa's payment, government, and financial technology systems.
            </p>
            <p style={{
              marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 11,
              fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(247,248,249,.45)', margin: '20px 0 0',
            }}>
              SystemSpecs Technology Solutions Limited
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
              {socialLinks.map((s) => (
                <a key={s.kind} href={s.href} aria-label={s.kind} className="kit-foot-social" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 38, height: 38, borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,.14)',
                  color: onInverse,
                  transition: 'background-color 200ms, border-color 200ms, color 200ms',
                }}>
                  <Icon name={s.kind} size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(247,248,249,.5)', margin: 0,
              }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} className="kit-foot-link" style={{
                    fontSize: 14, color: onInverse,
                    transition: 'color 160ms',
                  }}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(247,248,249,.5)', margin: 0,
            }}>Group</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
              {groupCompanies.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener" className="kit-foot-link" style={{
                  fontSize: 14, color: onInverse,
                  transition: 'color 160ms',
                }}>{c.label} ↗</a>
              ))}
            </div>

            <p style={{
              marginTop: 36, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(247,248,249,.5)',
            }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
              <a href={`mailto:${contact.email}`} className="kit-foot-link" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 14, color: onInverse,
                transition: 'color 160ms',
              }}><Icon name="mail" size={15} />{contact.email}</a>
              <a href={`tel:${contact.phone}`} className="kit-foot-link" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 14, color: onInverse,
                transition: 'color 160ms',
              }}><Icon name="phone" size={15} />{contact.phone}</a>
            </div>
          </div>
        </div>
      </Container>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <Container size="wide">
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12,
            alignItems: 'center', justifyContent: 'space-between',
            padding: '24px 0',
          }}>
            <p style={{ fontSize: 12, color: 'rgba(247,248,249,.5)', margin: 0,
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              © {new Date().getFullYear()} SystemSpecs Technology Solutions Limited. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {legalLinks.map((l) => (
                <a key={l.label} href={l.href} className="kit-foot-link" style={{
                  fontSize: 13, color: 'rgba(247,248,249,.7)',
                  transition: 'color 160ms',
                }}>{l.label}</a>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <style>{`
        .kit-foot-link:hover { color: var(--accent-subtle) !important; }
        .kit-foot-social:hover {
          background: rgba(255,255,255,.06);
          border-color: rgba(255,255,255,.32) !important;
        }
        @media (max-width: 1023px) {
          .kit-foot-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 640px) {
          .kit-foot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
window.Footer = Footer;
