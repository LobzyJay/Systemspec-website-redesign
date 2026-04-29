// Solution card. Mirrors packages/brand-stsl/src/components/SolutionCard.tsx
function SolutionCard({ icon, title, description, proof, href }) {
  const [hover, setHover] = useState(false);
  return (
    <Doppelrand href={href}>
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        padding: 32, borderRadius: 22, background: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-inner-hi)', height: "459px"
      }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Icon chip — micro Doppelrand */}
        <div style={{
          width: 48, height: 48, borderRadius: 14, padding: 4,
          background: 'var(--bg-surface-raised)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 28
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 10,
            background: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-inner-hi)',
            display: 'grid', placeItems: 'center',
            color: 'var(--accent-default)'
          }}>
            {icon}
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500,
          color: 'var(--text-primary)', letterSpacing: '-0.005em',
          textWrap: 'balance', margin: 0 }}>
          {title}
        </h3>
        <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55,
          color: 'var(--text-secondary)', textWrap: 'pretty', flex: 1 }}>
          {description}
        </p>

        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--text-muted)', margin: 0 }}>Proof</p>
          <p style={{ marginTop: 8, fontSize: 14, fontWeight: 500,
            color: 'var(--text-primary)' }}>{proof}</p>
        </div>

        <div style={{ marginTop: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            height: 48, paddingLeft: 22, paddingRight: 6,
            borderRadius: 9999,
            background: hover ? 'var(--accent-default)' : 'var(--bg-surface)',
            color: hover ? '#fff' : 'var(--text-primary)',
            boxShadow: hover ? 'inset 0 0 0 1px var(--accent-default)' : 'inset 0 0 0 1px var(--border-default)',
            fontSize: 14, fontWeight: 500,
            transition: 'background-color 220ms, color 220ms, box-shadow 220ms'
          }}>
            <span style={{ lineHeight: 1 }}>Explore</span>
            <span aria-hidden="true" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 9999,
              background: hover ? 'rgba(255,255,255,.18)' : 'var(--accent-subtle)',
              color: hover ? '#fff' : 'var(--accent-default)',
              transform: hover ? 'translateX(2px)' : 'none',
              transition: 'transform 220ms, background-color 220ms, color 220ms'
            }}>
              <Icon name="arrowUpRight" size={14} />
            </span>
          </span>
        </div>
      </div>
    </Doppelrand>);

}
window.SolutionCard = SolutionCard;