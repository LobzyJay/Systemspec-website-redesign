'use client';

// Editorial proof bar.
//
// Phase 2 redesign — three deliberate moves over the prior flat layout:
//
//   1. Animated count-up on viewport entry. Each metric value parses into a
//      numeric prefix + suffix (e.g. "120M+" → 120 + "M+", "99.95%" →
//      99.95 + "%"); only the numeric portion animates. Eased over ~1.6s,
//      one-shot via IntersectionObserver. Reduced-motion users see the
//      final value immediately, no animation.
//
//   2. Center-aligned metric stacks. Each metric is a vertical flex column,
//      vertically AND horizontally centered in its grid cell, so the 4-up
//      grid reads as a balanced row of editorial stat blocks rather than
//      a strip of left-flush figures. Hairline dividers sit between cells
//      to preserve the editorial "table of figures" feel without boxing
//      anything in.
//
//   3. Logo marquee — single-row, slow infinite scroll left, pauses on
//      hover. Two cycles of the logo set are rendered so the loop is
//      seamless (translate from 0 to -50%). Logos sit desaturated by
//      default; hover lifts them back to full color/opacity. Soft fade
//      gradients on the left + right edges dissolve the strip into the
//      surface instead of clipping at the section bounds. Two-row
//      counter-scroll was considered and rejected: per brief §7
//      "calm over busy", a single restrained pass reads more editorial.
//
// Logo data shape supports both image src (preferred, when assets land in
// /institutions/) and bare text (current state — renders in mono caps as
// a typographic fallback). The component stays asset-agnostic.
//
// Section surface stays "muted" — provides recessed warm contrast against
// the cream hero above and the canvas section below.

import { useEffect, useRef, useState } from 'react';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

interface ProofMetric {
  value: string;
  label: string;
}

interface ProofLogo {
  name: string;
  alt?: string;
  src?: string;
}

interface ProofBarProps {
  intro: string;
  metrics: ProofMetric[];
  logos?: ProofLogo[];
}

// Parse a metric string like "120M+" or "99.95%" or "Tier-1" into a numeric
// target and a suffix. If no leading number is present (e.g. "Tier-1"), the
// numeric target is null and the value is rendered as-is, no animation.
function parseMetricValue(raw: string): { num: number | null; prefix: string; suffix: string; decimals: number } {
  const trimmed = raw.trim();
  // Match optional leading sign + digits (with optional decimal) at the start
  const match = trimmed.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { num: null, prefix: '', suffix: trimmed, decimals: 0 };
  }
  const numStr = match[1] ?? '';
  const suffix = match[2] ?? '';
  const num = Number(numStr);
  if (Number.isNaN(num)) {
    return { num: null, prefix: '', suffix: trimmed, decimals: 0 };
  }
  const decIdx = numStr.indexOf('.');
  const decimals = decIdx === -1 ? 0 : numStr.length - decIdx - 1;
  return { num, prefix: '', suffix, decimals };
}

// cubic-bezier(0.2, 0, 0, 1) approximation as a JS easing function — same
// curve used in the spec, so the count-up matches the visual cadence of the
// rest of the system (tokens/motion ease-expressive).
function easeOutExpressive(t: number): number {
  // Fast cubic-bezier evaluator for (0.2, 0, 0, 1)
  // Closed-form: same shape as easeOutQuart-ish but with a softer entry.
  // Approximation good enough for visible animation.
  const c = 1 - t;
  return 1 - c * c * c * c;
}

interface AnimatedNumberProps {
  raw: string;
  active: boolean;
  reducedMotion: boolean;
}

function AnimatedNumber({ raw, active, reducedMotion }: AnimatedNumberProps) {
  const parsed = parseMetricValue(raw);
  const [display, setDisplay] = useState<string>(() => {
    if (parsed.num === null || reducedMotion) return raw;
    // Pre-animation state: show "0" with the same suffix, formatted to the
    // same decimal count, so layout doesn't jump when the animation kicks in.
    return `${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    if (parsed.num === null) return;
    if (reducedMotion) {
      setDisplay(raw);
      startedRef.current = true;
      return;
    }
    startedRef.current = true;
    const target = parsed.num;
    const duration = 1600; // ms — calm, not snappy
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutExpressive(t);
      const current = target * eased;
      const formatted = current.toFixed(parsed.decimals);
      setDisplay(`${formatted}${parsed.suffix}`);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Lock to the exact source string so trailing zeros / formatting
        // exactly matches what the content authored.
        setDisplay(raw);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, raw, parsed.num, parsed.suffix, parsed.decimals, reducedMotion]);

  // tabular-nums applied at the parent so the digit width stays stable as
  // the value counts up — no horizontal jitter.
  return <>{display}</>;
}

export function ProofBar({ intro, metrics, logos }: ProofBarProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once on mount. Stays static — we do not
  // listen for live changes; the cost of a re-subscribe is not worth it for
  // a count-up that runs at most once per page load.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  // IntersectionObserver — triggers the count-up exactly once when ~30% of
  // the metrics block has scrolled into view. Disconnects after firing so
  // the animation never replays on re-entry (per spec: one-shot).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Section surface="muted" density="md">
      <Container size="wide">
        <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted text-center">
          {intro}
        </p>

        {/* Metrics grid. Each cell is a centered vertical stack — value on
            top, label beneath. md+ uses hairline column dividers between
            cells (skipped on the first column of each row) so the row reads
            as one editorial table of figures. */}
        <Grid
          ref={sectionRef}
          cols={12}
          gap={0}
          className="mt-10 md:mt-14"
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={[
                'col-span-6 md:col-span-3',
                'flex flex-col items-center justify-center text-center',
                'px-4 md:px-6 py-5 md:py-6',
                // Vertical hairlines between columns (mobile: every 2nd cell).
                // First in each row gets no left border.
                i % 2 === 0 ? '' : 'border-l border-[color:var(--border-subtle)]',
                'md:border-l md:border-[color:var(--border-subtle)]',
                'md:[&:nth-child(4n+1)]:border-l-0',
              ].join(' ')}
            >
              <p className="font-display font-medium text-heading-1 md:text-display-md text-fg-primary tracking-tight tabular-nums leading-[1.05]">
                <AnimatedNumber raw={m.value} active={inView} reducedMotion={reducedMotion} />
              </p>
              <p className="mt-2 md:mt-3 text-body-sm text-fg-secondary text-balance max-w-[22ch]">
                {m.label}
              </p>
            </div>
          ))}
        </Grid>

        {logos && logos.length > 0 ? (
          <div className="mt-14 pt-10 border-t border-[color:var(--border-subtle)]">
            <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted text-center mb-8">
              Trusted by tier-1 institutions and federal MDAs
            </p>

            {/* Marquee: a viewport-width strip with two duplicate tracks of
                logos translated -50% over the animation so the loop is
                seamless. Pause on hover. Soft horizontal fades on either
                edge dissolve the logos into the muted surface — uses a CSS
                mask so the gradient is true alpha, not an overlay tint. */}
            <div
              className="proofbar-marquee group/marquee relative overflow-hidden"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div
                className="proofbar-marquee-track flex items-center gap-12 md:gap-16 w-max will-change-transform"
                style={{
                  animation: 'proofbar-marquee 38s linear infinite',
                }}
              >
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex items-center gap-12 md:gap-16 shrink-0" aria-hidden={dup === 1 ? 'true' : undefined}>
                    {logos.map((logo) => (
                      <ProofLogoMark key={`${dup}-${logo.name}`} logo={logo} />
                    ))}
                  </div>
                ))}
              </div>

              {/* CSS lives inline so the component is self-contained — no
                  global stylesheet edit required to ship the marquee. The
                  reduced-motion override pauses the keyframes so motion-
                  sensitive users see a static, legible row. */}
              <style>{`
                @keyframes proofbar-marquee {
                  from { transform: translate3d(0, 0, 0); }
                  to   { transform: translate3d(-50%, 0, 0); }
                }
                .proofbar-marquee:hover .proofbar-marquee-track {
                  animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                  .proofbar-marquee-track {
                    animation: none !important;
                    transform: none !important;
                  }
                }
              `}</style>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

// Single logo cell. Renders an <img> when src is provided, otherwise a
// mono-caps text fallback. Both variants share the same height + hover
// behavior so the strip reads as one consistent row regardless of whether
// the data is image-backed or text-backed.
function ProofLogoMark({ logo }: { logo: ProofLogo }) {
  const altText = logo.alt ?? logo.name;
  if (logo.src) {
    return (
      <span
        className="inline-flex items-center justify-center h-8 md:h-9 transition-[filter,opacity] duration-base ease-expressive"
        style={{ filter: 'grayscale(0.4) opacity(0.75)' }}
        // On hover the parent track pauses; per-logo, lift to full color
        // via inline style override on the wrapping span hover.
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.filter = 'grayscale(0) opacity(1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.filter = 'grayscale(0.4) opacity(0.75)';
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt={altText} className="h-full w-auto object-contain" />
      </span>
    );
  }
  return (
    <span
      aria-label={altText}
      className="inline-flex items-center h-8 md:h-9 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-fg-muted transition-colors duration-base ease-expressive hover:text-fg-primary whitespace-nowrap"
    >
      {logo.name}
    </span>
  );
}
