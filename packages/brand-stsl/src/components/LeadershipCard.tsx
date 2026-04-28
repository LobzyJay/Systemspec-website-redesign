import { LinkedIn } from '../icons';

interface LeadershipCardProps {
  name: string;
  role: string;
  // Square or 4:5 portrait. Cover-cropped to fill the photo zone.
  photo?: string;
  // Brief bio. Two sentences max — typeset as serif italic pull-quote.
  bio?: string;
  // Up to 3 short credential tags.
  credentials?: string[];
  linkedin?: string;
}

// Editorial portrait card. Vertical: full-bleed photo on top, hairline rail,
// then a name plate. The plate uses flex so the LinkedIn chip pins to the
// top-right of the role line — it never lives on its own row, and never
// shows a "LinkedIn" text label. Card uses h-full + flex so a row of cards
// share the same height and their hairlines / role lines align.
export function LeadershipCard({
  name,
  role,
  photo,
  bio,
  credentials,
  linkedin,
}: LeadershipCardProps) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  return (
    <article className="group/lead flex flex-col h-full">
      {/* Portrait. 4:5 aspect — fixed across cards so a row aligns. */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-surface-muted">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-cinematic ease-expressive group-hover/lead:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-display-md text-fg-muted/30 select-none">
              {initials || '—'}
            </span>
          </div>
        )}
      </div>

      {/* Hairline rail — teal on hover. */}
      <span
        aria-hidden="true"
        className="block h-px w-full bg-[color:var(--border-subtle)] group-hover/lead:bg-accent transition-colors duration-base ease-expressive"
      />

      {/* Name plate. Role row: mono caps eyebrow + LinkedIn icon pinned right. */}
      <div className="flex flex-col flex-1 pt-5">
        <div className="flex items-center justify-between gap-3 min-h-[14px]">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
            {role}
          </p>
          {linkedin ? (
            <a
              href={linkedin}
              rel="noopener"
              target="_blank"
              aria-label={`${name} on LinkedIn`}
              className="inline-flex items-center justify-center h-6 w-6 rounded-pill text-fg-muted hover:text-accent transition-colors duration-base ease-expressive shrink-0"
            >
              <LinkedIn size={14} />
            </a>
          ) : null}
        </div>

        <h3 className="mt-2 font-display font-medium text-heading-2 md:text-heading-1 text-fg-primary leading-[1.1] tracking-[-0.01em]">
          {name}
        </h3>

        {bio ? (
          <p className="mt-3 font-serif italic text-body text-fg-secondary leading-snug text-pretty">
            {bio}
          </p>
        ) : null}

        {credentials && credentials.length > 0 ? (
          <p className="mt-auto pt-4 text-caption text-fg-muted">
            {credentials.slice(0, 3).join(' · ')}
          </p>
        ) : null}
      </div>
    </article>
  );
}
