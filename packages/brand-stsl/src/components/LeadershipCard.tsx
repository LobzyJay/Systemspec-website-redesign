import { LinkedIn } from '../icons';
import { asset } from '../utils/asset';

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
            src={asset(photo)}
            alt={name}
            loading="lazy"
            decoding="async"
            // 4:5 frame matches the portrait aspect so object-cover
            // fills the frame cleanly. object-top keeps the head in
            // view if any portrait is taller than 4:5.
            className="absolute inset-0 w-full h-full object-cover object-top transition-[transform,filter] duration-cinematic ease-expressive
                       motion-safe:group-hover/lead:scale-[1.04]
                       grayscale-[0.18] motion-safe:group-hover/lead:grayscale-0
                       motion-safe:group-hover/lead:saturate-[1.1]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-display-md text-fg-muted/30 select-none">
              {initials || '—'}
            </span>
          </div>
        )}

        {/* Soft ink-wash overlay — fades in from bottom on hover so the
            portrait gains depth without obscuring the face. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none
                     opacity-0 group-hover/lead:opacity-100
                     transition-opacity duration-base ease-expressive"
          style={{
            background:
              'linear-gradient(to top, rgba(11,12,15,0.4) 0%, rgba(11,12,15,0) 100%)',
          }}
        />
      </div>

      {/* Hairline rail. Off-white tint so it reads against both the
          portrait above and the cream page floor below without shouting.
          Teal on hover for a subtle accent pulse. */}
      <span
        aria-hidden="true"
        className="block h-[5px] w-full bg-[#E8E2D5] group-hover/lead:bg-accent transition-colors duration-base ease-expressive"
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
