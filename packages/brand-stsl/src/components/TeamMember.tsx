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
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-surface-muted ring-1 ring-[color:var(--border-subtle)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-cinematic ease-expressive"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-heading-1 text-fg-muted/40 select-none">{initials || '—'}</span>
          </div>
        )}
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
        {department ? (
          <span className="absolute top-2 left-2 inline-flex items-center h-5 px-2 rounded-pill bg-bg-canvas/85 backdrop-blur-md text-[9px] uppercase tracking-[0.16em] font-mono font-medium text-fg-secondary">
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
