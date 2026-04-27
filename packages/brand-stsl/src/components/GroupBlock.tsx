import { Container, Section } from '@systemspecs/foundations/layout';
import { ArrowUpRight } from '../icons';
import { SystemSpecsWordmark } from '../brand';

interface GroupCompany {
  name: string;
  description: string;
  href: string;
  logo?: string;
}

interface GroupBlockProps {
  intro: string;
  parentName: string;
  parentHref: string;
  foundedYear: number;
  companies: GroupCompany[];
}

// Lineage strip. Top: editorial statement + parent wordmark, set against the
// page surface (no forest panel — restraint). Below: a horizontal lineup of
// sister brands. Each company is a column with its own logo plate, name,
// one-line role, and an outbound chip. No nested cards, no dark band — just
// rhythm and lineage.
export function GroupBlock({
  intro,
  parentName,
  parentHref,
  foundedYear,
  companies,
}: GroupBlockProps) {
  return (
    <Section surface="surface" density="lg">
      <Container size="wide">
        {/* Header — editorial statement. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-[color:var(--border-subtle)]">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center h-6 px-3 rounded-pill bg-bg-surface-raised text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted ring-1 ring-[color:var(--border-subtle)] mb-6">
              Group
            </span>
            <h2 className="font-display font-medium text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
              {intro}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3">
            <a
              href={parentHref}
              rel="noopener"
              target="_blank"
              aria-label={parentName}
              className="inline-flex items-center group/p hover:opacity-80 transition-opacity duration-base ease-expressive"
            >
              <SystemSpecsWordmark height={28} />
            </a>
            <p className="text-body-sm text-fg-secondary lg:text-right max-w-xs">
              <a
                href={parentHref}
                rel="noopener"
                target="_blank"
                className="font-medium text-fg-primary hover:text-accent transition-colors duration-base ease-expressive"
              >
                {parentName}
              </a>
              {' · '}
              <span className="text-fg-muted">Operating since {foundedYear}.</span>
            </p>
          </div>
        </div>

        {/* Lineup — three columns, hairline dividers between. */}
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {companies.map((c, i) => (
            <li
              key={c.href}
              className={
                'flex flex-col py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 ' +
                (i > 0 ? 'border-t md:border-t-0 md:border-l border-[color:var(--border-subtle)]' : '')
              }
            >
              <a
                href={c.href}
                rel="noopener"
                target="_blank"
                className="group/co flex flex-col h-full"
              >
                {c.logo ? (
                  <div className="h-14 flex items-center mb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.name} className="h-7 w-auto max-w-[180px] object-contain" />
                  </div>
                ) : (
                  <div className="h-14 mb-8" />
                )}

                <h3 className="font-display font-medium text-heading-2 text-fg-primary leading-tight tracking-[-0.005em] group-hover/co:text-accent transition-colors duration-base ease-expressive">
                  {c.name}
                </h3>
                <p className="mt-3 text-body text-fg-secondary text-pretty flex-1">{c.description}</p>

                <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-fg-secondary group-hover/co:text-accent transition-colors duration-base ease-expressive">
                  <span>Visit {c.name}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-pill bg-bg-surface-raised text-fg-muted ring-1 ring-[color:var(--border-subtle)] transition-[transform,background-color,color] duration-base ease-expressive group-hover/co:bg-accent group-hover/co:text-white group-hover/co:ring-accent group-hover/co:translate-x-0.5 group-hover/co:-translate-y-px group-hover/co:scale-[1.06]"
                  >
                    <ArrowUpRight size={12} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
