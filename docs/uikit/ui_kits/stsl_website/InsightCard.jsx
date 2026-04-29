// Insight card. Mirrors packages/brand-stsl/src/components/InsightCard.tsx
const KIND_META = {
  press:        { label: 'Press',      tint: 'var(--feedback-info)' },
  blog:         { label: 'Insight',    tint: 'var(--accent-default)' },
  'case-study': { label: 'Case study', tint: 'var(--feedback-success)' },
};

function InsightCard({ kind, publication, date, title, href, cover }) {
  const meta = KIND_META[kind] || KIND_META.blog;
  const [hover, setHover] = useState(false);
  return (
    <Doppelrand href={href}>
      <div
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
        position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
        borderRadius: 22, background: 'var(--bg-surface)', overflow: 'hidden',
        boxShadow: 'var(--shadow-inner-hi)',
      }}>
        {cover && (
          <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--bg-surface-muted)' }}>
            <img src={cover} alt="" style={{
              height: '100%', width: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.04)' : 'none',
              transition: 'transform 520ms cubic-bezier(.3,0,0,1.05)',
            }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start',
            gap: 8, height: 24, padding: '0 12px', borderRadius: 9999,
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: meta.tint,
            background: `color-mix(in srgb, ${meta.tint} 10%, transparent)`,
            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${meta.tint} 28%, transparent)`,
          }}>
            <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: 9999, background: meta.tint }} />
            {meta.label}
          </span>

          <h3 style={{
            marginTop: 20, fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 22, letterSpacing: '-0.005em', lineHeight: 1.2,
            color: 'var(--text-primary)', textWrap: 'balance', flex: 1,
          }}>
            {title}
          </h3>

          <div style={{
            marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{publication || 'SystemSpecs'}</span>
              <span style={{ color: 'var(--text-muted)' }}> · {date}</span>
            </span>
            <span aria-hidden="true" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 9999,
              background: hover ? 'var(--accent-default)' : 'var(--bg-surface-raised)',
              color: hover ? '#fff' : 'var(--text-muted)',
              boxShadow: hover ? 'inset 0 0 0 1px var(--accent-default)' : 'inset 0 0 0 1px var(--border-subtle)',
              transform: hover ? 'translate(2px, -1px) scale(1.05)' : 'none',
              transition: 'transform 220ms, background-color 220ms, color 220ms',
            }}>
              <Icon name="arrowUpRight" size={14} />
            </span>
          </div>
        </div>
      </div>
    </Doppelrand>
  );
}
window.InsightCard = InsightCard;
