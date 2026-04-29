// SolutionCard — rebuilt from scratch. Single radius. One ring. One shadow.
// Zero nested radii. The card is a single anchor that fills its grid cell;
// content is a single padding box; the icon is a flat tinted glyph (no
// chip), the proof + CTA pin to the bottom via auto margin so a 3-up row
// shares a baseline regardless of description length.
//
// Notes for future-me / audit:
//   • There is exactly ONE border-radius on the card (28px). Nothing
//     inside the content column has a border-radius EXCEPT the CTA pill
//     (9999) and its inner arrow chip (9999) — both fully circular, so
//     they don't read as "squircle inside a squircle".
//   • Icon is rendered without a background tile to avoid a nested
//     rounded shape. Visual weight comes from the teal stroke + a hairline
//     baseline rule below the icon.
//   • Hover lifts 4px and bumps the shadow tier (e1 → e3). The CTA chip
//     also slides diagonally per the magnetic-button pattern in the
//     high-end-visual-design skill.
function SolutionCard({ icon, title, description, proof, href }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        // Layout — fill the grid row, lay out as a column so mt:auto works.
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        padding: 32,

        // The single radius on the card. Nothing nested matches it.
        borderRadius: 28,

        // Surface + chrome — one warm hairline ring, one espresso-tinted
        // shadow. No rgba(0,0,0) drops; the e1/e3 tokens already use
        // espresso ink (rgba(11,12,15,.06)).
        background: 'var(--bg-surface)',
        boxShadow: hover
          ? '0 12px 28px -10px rgba(48,38,18,.16), 0 4px 10px -4px rgba(48,38,18,.08)'
          : '0 1px 2px 0 rgba(48,38,18,.05), 0 1px 3px 0 rgba(48,38,18,.04)',
        border: '1px solid var(--border-subtle)',

        // Lift on hover — transform + shadow only (GPU-safe).
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition:
          'transform 360ms cubic-bezier(.2,0,0,1), box-shadow 360ms cubic-bezier(.2,0,0,1), border-color 220ms',
        borderColor: hover ? 'var(--border-default)' : 'var(--border-subtle)',

        // Anchor reset.
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      {/* Icon row — flat glyph, no tile. A hairline rule beneath gives
          the icon visual weight without a nested radius. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'var(--accent-default)',
          paddingBottom: 20,
          marginBottom: 24,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Title — Plus Jakarta Sans display, restrained weight, tight tracking. */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          lineHeight: 1.18,
          textWrap: 'balance',
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description — Geist body, secondary text, pretty wrap. */}
      <p
        style={{
          margin: '12px 0 0',
          fontSize: 14.5,
          lineHeight: 1.55,
          color: 'var(--text-secondary)',
          textWrap: 'pretty',
        }}
      >
        {description}
      </p>

      {/* Proof + CTA — pinned to bottom. mt:auto pushes this block to the
          card foot so all 3 cards in a row align their baselines. */}
      <div style={{ marginTop: 'auto', paddingTop: 28 }}>
        {/* Proof — mono caps label + serif italic value. The serif italic
            is the editorial fingerprint and mirrors the brand voice. */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              flexShrink: 0,
            }}
          >
            Proof
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
            }}
          >
            {proof}
          </span>
        </div>

        {/* CTA — text + magnetic arrow chip. Chip is fully circular (9999),
            so it doesn't conflict with the card's 28px radius. */}
        <div
          style={{
            marginTop: 22,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            color: hover ? 'var(--accent-default)' : 'var(--text-primary)',
            transition: 'color 220ms',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              lineHeight: 1,
            }}
          >
            Explore
          </span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: hover ? 'var(--accent-default)' : 'var(--accent-subtle)',
              color: hover ? '#fff' : 'var(--accent-default)',
              transform: hover ? 'translate(3px, -1px)' : 'translate(0,0)',
              transition:
                'transform 280ms cubic-bezier(.2,0,0,1), background-color 220ms, color 220ms',
            }}
          >
            <Icon name="arrowUpRight" size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
window.SolutionCard = SolutionCard;
