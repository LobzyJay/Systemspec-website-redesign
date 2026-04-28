import { Container, Section } from '@systemspecs/foundations/layout';

interface ProofMetric {
  value: string;
  label: string;
}

interface ProofBarProps {
  intro: string;
  metrics: ProofMetric[];
  // Logo strip below the metrics — kept silent at this layout level since the
  // metrics now carry the claim. Each logo is a ReactNode (page can pass an
  // <img> or an inline SVG; system stays content-agnostic).
  logos?: { alt: string; node: React.ReactNode }[];
}

// Editorial proof bar. Eyebrow pill + serif intro + tabular display numerals.
// Sits on a recessed warm muted surface so it visually separates from the
// canvas without needing a heavy frame.
export function ProofBar({ intro, metrics, logos }: ProofBarProps) {
  return (
    <Section surface="muted" density="md">
      <Container size="wide">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-[color:var(--border-default)]" />
          <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted">{intro}</p>
        </div>
        <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-10 gap-x-6 md:gap-x-12">
          {metrics.map((m) => (
            <div key={m.label} className="border-l border-[color:var(--border-subtle)] pl-4 md:pl-6 first:border-l-0 first:pl-0 md:border-l md:first:border-l-0 md:first:pl-0">
              <p className="font-display font-medium text-heading-1 md:text-display-md text-fg-primary tracking-tight tabular-nums">
                {m.value}
              </p>
              <p className="mt-1.5 md:mt-2 text-body-sm text-fg-secondary">{m.label}</p>
            </div>
          ))}
        </div>
        {logos && logos.length > 0 ? (
          <div className="mt-14 pt-8 border-t border-[color:var(--border-subtle)]">
            <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted mb-6">
              Trusted by tier-1 institutions and federal MDAs
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {logos.map((logo) => (
                <div key={logo.alt} className="text-fg-muted opacity-80" aria-label={logo.alt}>
                  {logo.node}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
