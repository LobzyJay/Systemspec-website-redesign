// Stat pill — the floating card pattern from the SystemSpecs reference: small
// avatar stack, tiny label, big number. Pairs naturally over the DottedGlobe
// but works as a standalone callout anywhere (above tables, alongside charts).

interface StatPillProps {
  label: string;
  value: string;
  // Up to 3 portrait URLs render as an overlapping stack. Fall back to
  // initial-letter discs if no photos available.
  avatars?: { src?: string; initial?: string }[];
  className?: string;
}

export function StatPill({ label, value, avatars, className }: StatPillProps) {
  return (
    <div
      className={[
        'inline-flex items-center gap-3 rounded-pill bg-bg-inverse text-fg-on-inverse',
        'pl-1.5 pr-5 py-1.5 shadow-e3 pointer-events-auto',
        className,
      ].filter(Boolean).join(' ')}
    >
      {avatars && avatars.length > 0 ? (
        <div className="flex -space-x-2">
          {avatars.slice(0, 3).map((a, i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-pill border-2 border-bg-inverse bg-bg-surface-muted overflow-hidden grid place-items-center text-caption text-fg-secondary font-medium"
            >
              {a.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.src} alt="" className="h-full w-full object-cover" />
              ) : (
                <span>{a.initial ?? '?'}</span>
              )}
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-col leading-tight">
        <span className="text-caption text-fg-on-inverse/70">{label}</span>
        <span className="font-display text-heading-3 text-fg-on-inverse">{value}</span>
      </div>
    </div>
  );
}
