import { Container, Section } from '@systemspecs/foundations/layout';

interface CapabilityStripProps {
  eyebrow?: string;
  headline: string;
  body: string;
  capabilities: string[];
}

// Editorial capability section per brief §6.1 — single paragraph + list,
// explicitly NOT a card grid. Restraint signals seniority. Body text shifts
// to Source Serif italic for the lede paragraph; the bullet list uses a
// fine teal dot and tight tracking for register.
export function CapabilityStrip({ eyebrow, headline, body, capabilities }: CapabilityStripProps) {
  return (
    <Section surface="surface" density="lg">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-5">
            {eyebrow ? (
              <span className="inline-flex items-center h-6 px-3 rounded-pill bg-accent-subtle text-accent text-[10px] uppercase tracking-[0.22em] font-mono font-medium ring-1 ring-[color:var(--accent-default)]/15 mb-6">
                <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-accent" />
                {eyebrow}
              </span>
            ) : null}
            <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
              {headline}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-serif italic text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] leading-[1.5] text-fg-secondary text-pretty">
              {body}
            </p>
            <ul className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 border-t border-[color:var(--border-subtle)] pt-6 md:pt-8">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-body text-fg-primary text-pretty"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-pill bg-accent shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
