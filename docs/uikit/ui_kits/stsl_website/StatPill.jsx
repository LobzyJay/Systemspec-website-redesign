// Floating stat pill. Mirrors packages/brand-stsl/src/components/StatPill.tsx
function StatPill({ label, value, avatars, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12, borderRadius: 9999,
      background: 'var(--bg-inverse)', color: 'var(--text-on-inverse)',
      padding: '6px 22px 6px 6px',
      boxShadow: 'var(--shadow-e3)',
      ...style,
    }}>
      {avatars && avatars.length > 0 && (
        <div style={{ display: 'flex' }}>
          {avatars.slice(0, 3).map((a, i) => (
            <div key={i} style={{
              width: 36, height: 36, borderRadius: 9999,
              border: '2px solid var(--bg-inverse)',
              background: a.bg || 'var(--bg-surface-muted)',
              marginLeft: i === 0 ? 0 : -8,
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              color: a.color || 'var(--text-secondary)',
              overflow: 'hidden',
            }}>
              {a.src
                ? <img src={a.src} alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                : <span>{a.initial || '?'}</span>}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: 12, color: 'rgba(247,248,249,.7)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>{value}</span>
      </div>
    </div>
  );
}
window.StatPill = StatPill;
