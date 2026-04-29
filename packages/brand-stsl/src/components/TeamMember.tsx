// Compact team-member card. Designed for grids of 15+ where the full
// LeadershipCard (portrait + bio + credentials) would feel disorganized.
// Square crop, name + role, optional LinkedIn — that's it. Sized so an 8-up
// grid sits cleanly on desktop and a 2-up on mobile.

import { LinkedIn } from '../icons';

interface TeamMemberProps {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
  // Optional department badge — e.g. "Engineering", "Banking", "E-Government".
  // Use sparingly — most team members don't need it.
  department?: string;
}

export function TeamMember({ name, role, photo, linkedin, department }: TeamMemberProps) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  return (
    <article className="group/team flex flex-col text-left">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-surface-muted ring-1 ring-[color:var(--border-subtle)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            // Frame matches portrait aspect (4:5) so object-cover fills
            // cleanly without cropping the head — no per-photo scale
            // overrides needed.
            className="absolute inset-0 w-full h-full object-cover object-top transition-[transform,filter] duration-cinematic ease-expressive
                       motion-safe:group-hover/team:scale-[1.04]
                       grayscale-[0.15] motion-safe:group-hover/team:grayscale-0
                       motion-safe:group-hover/team:saturate-[1.1]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-heading-1 text-fg-muted/40 select-none">{initials || '—'}</span>
          </div>
        )}

        {/* Soft ink-wash overlay — fades in from bottom on hover so the
            name + LinkedIn pin sit on a legible band instead of floating
            on the photo. Pure CSS, no JS. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none
                     opacity-0 group-hover/team:opacity-100
                     transition-opacity duration-base ease-expressive"
          style={{
            background:
              'linear-gradient(to top, rgba(11,12,15,0.55) 0%, rgba(11,12,15,0) 100%)',
          }}
        />

        {linkedin ? (
          <a
            href={linkedin}
            rel="noopener"
            target="_blank"
            aria-label={`${name} on LinkedIn`}
            className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-pill bg-bg-canvas/85 backdrop-blur-md text-fg-primary shadow-e1
                       opacity-0 translate-y-1 group-hover/team:opacity-100 group-hover/team:translate-y-0
                       transition-[opacity,transform] duration-base ease-expressive"
          >
            <LinkedIn size={12} />
          </a>
        ) : null}

        {/* Department label — subtle editorial chip. Mono caps, accent
            color on tinted accent-subtle bg. Reads as a quiet category
            tag rather than a loud product badge. */}
        {department ? (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center h-5 px-2 rounded-pill bg-accent-subtle text-accent text-[9px] uppercase tracking-[0.18em] font-mono font-medium ring-1 ring-[color:var(--accent-default)]/20">
            {department}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <p className="font-display font-medium text-body text-fg-primary leading-tight">{name}</p>
        <p className="mt-0.5 text-caption text-fg-muted">{role}</p>
      </div>
    </article>
  );
}
