import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: 'color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas))',
        gap: '1rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        404 · Not found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: 32 * 16,
        }}
      >
        That page isn&rsquo;t here.
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          maxWidth: 28 * 16,
        }}
      >
        The link may be old, the page may have moved, or it never existed. Try the
        homepage or one of the primary sections.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 48,
            padding: '0 24px',
            borderRadius: 9999,
            background: 'var(--accent-default)',
            color: '#fff',
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: 15,
          }}
        >
          Back to homepage
        </Link>
        <Link
          href="/solutions"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 48,
            padding: '0 24px',
            borderRadius: 9999,
            background: '#fff',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: 15,
          }}
        >
          Browse solutions
        </Link>
      </div>
    </main>
  );
}
