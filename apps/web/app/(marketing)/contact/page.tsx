// STSL contact router — Phase 2D.
// Wires:
//   - contactCopy (packages/brand-stsl/src/content/copy/contact.ts)
//   - ContactForm + ContactAudience type from @systemspecs/brand-stsl
//   - Hero, SectionHeader, icons from @systemspecs/brand-stsl
//
// Per brief §6.6: a segmented landing. Without `?audience=`, render the
// audience grid + offices block. With a recognised `?audience=<slug>`,
// render the matching audience hero + form + side context.
//
// Client component because it reads `useSearchParams()` to switch views.
// Wrapped in <Suspense> per Next 15 requirement — Next will throw at build
// if useSearchParams() is read outside a Suspense boundary.
//
// NOTE: copy includes a `support` audience that ContactForm does not yet
// type — we render a contact-channel card for it instead of a form.
//
// Backend wiring is Phase 4 (CMS + infra). The submit handler is a stub —
// it resolves immediately so the form's success state can be reviewed.

'use client';

import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Hero,
  ContactForm,
  SectionHeader,
  ArrowUpRight,
  Mail,
  Phone,
  contactCopy,
  type ContactAudience,
  type ContactPayload,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section, Stack } from '@systemspecs/foundations/layout';

// Audience slugs that the typed ContactForm understands. The contact copy
// also defines a `support` route — we render that one as a channel card
// rather than a form because ContactForm's `ContactAudience` type does not
// include it (and shouldn't — support flows through a different system).
const FORM_AUDIENCES: ReadonlyArray<ContactAudience> = [
  'banking',
  'fintech',
  'government',
  'community',
  'enterprise',
  'partners',
  'press',
  'careers',
];

function isFormAudience(value: string | null): value is ContactAudience {
  return value !== null && (FORM_AUDIENCES as readonly string[]).includes(value);
}

export default function ContactPage() {
  return (
    // Suspense boundary required by Next.js 15 around any client subtree
    // that reads useSearchParams(). The fallback matches the landing-view
    // hero spacing so we don't ship a layout-shift on first paint.
    <Suspense fallback={<ContactFallback />}>
      <ContactRouter />
    </Suspense>
  );
}

function ContactFallback() {
  return (
    <Section surface="canvas" density="lg">
      <Container size="wide">
        <div className="h-[40vh]" aria-hidden="true" />
      </Container>
    </Section>
  );
}

function ContactRouter() {
  const params = useSearchParams();
  const raw = params.get('audience');

  if (isFormAudience(raw)) {
    return <FormView audience={raw} />;
  }
  return <LandingView />;
}

// ────────────────────────────────────────────────────────────────────────
// Landing view — the segmented chooser. One tile per audience routing back
// to this page with `?audience=<slug>`. Offices + channels render below.
// ────────────────────────────────────────────────────────────────────────

function LandingView() {
  const c = contactCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={{ label: 'Talk to banking sales', href: '?audience=banking' }}
        secondary={{ label: 'Request API access', href: '?audience=fintech' }}
        atmosphereReactive
      />

      {/* Audience grid — full chooser. Each tile is a same-page link that
          flips the ?audience= param so the router re-renders into the form
          view. Matches the SegmentedCTA visual vocabulary at a lighter
          surface tone — these aren't a final CTA, they're a chooser.
          Dark surface so the boundary against the cream Hero reads cleanly.
          SectionHeader replaced with inline JSX (white headlines on ink).
          Audience tiles keep their cream surface so they pop against the ink. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">Audiences</p>
            <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
              Every conversation goes to the team that owns it.
            </h2>
            <p className="mt-4 text-body-lg text-white/70 text-pretty max-w-xl">
              Pick the closest match. Replies inside one business day. Existing customers route to the support team that owns their account.
            </p>
          </div>
          <Grid as="ul" cols={12} gap={4} mdGap={5} className="mt-12 md:mt-16">
            {c.routes.map((route) => (
              <li key={route.slug} className="col-span-12 md:col-span-6 lg:col-span-4">
                <a
                  href={`?audience=${route.slug}`}
                  className="group/aud relative flex flex-col h-full rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                             bg-bg-surface
                             transition-[transform,box-shadow] duration-slow ease-expressive
                             hover:-translate-y-0.5 hover:shadow-e2"
                >
                  <div className="relative flex flex-col h-full p-7 md:p-8 rounded-[calc(1.75rem-0.375rem)] bg-bg-surface-raised">
                    <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent">
                      {route.audience}
                    </p>
                    <p className="mt-4 font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em] text-balance">
                      {route.title}
                    </p>
                    <p className="mt-3 text-body-sm text-fg-secondary text-pretty">
                      {route.description}
                    </p>
                    <div className="mt-auto pt-8 inline-flex items-center gap-2 text-body-sm font-medium text-fg-primary">
                      <span className="leading-none">{route.ctaLabel}</span>
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-pill bg-accent-subtle text-accent
                                   transition-[transform,background-color] duration-base ease-expressive
                                   group-hover/aud:translate-x-0.5 group-hover/aud:-translate-y-px group-hover/aud:bg-accent group-hover/aud:!text-white"
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Offices + standing channels. Phone / email / handles are placeholder
          tokens pending STSL comms approval (brief §11) and render as-is.
          Pale green pre-footer band, matches marketing layout's page bg. */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}>
        <Container size="wide">
          <SectionHeader eyebrow={c.offices.eyebrow} headline={c.offices.headline} />
          <Grid cols={12} gap={6} mdGap={8} className="mt-12 md:mt-16">
            {c.offices.locations.map((office) => (
              <article
                key={office.city}
                className="col-span-12 md:col-span-6 rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-7 md:p-8 shadow-e1"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent">
                  Office
                </p>
                <h3 className="mt-3 font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em]">
                  {office.city}
                </h3>
                <address className="not-italic mt-4 text-body text-fg-secondary">
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <Stack direction="col" gap={2} className="mt-5 text-body-sm">
                  <a
                    href={`tel:${office.phone}`}
                    className="inline-flex items-center gap-2 text-fg-primary hover:text-accent transition-[color] duration-base ease-expressive"
                  >
                    <Phone size={16} />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="inline-flex items-center gap-2 text-fg-primary hover:text-accent transition-[color] duration-base ease-expressive"
                  >
                    <Mail size={16} />
                    <span>{office.email}</span>
                  </a>
                </Stack>
              </article>
            ))}
          </Grid>

          {/* Standing channels — general inbox + socials. */}
          <div className="mt-16 border-t border-[color:var(--border-subtle)] pt-10">
            <p className="text-overline uppercase text-accent mb-6">{c.channels.eyebrow}</p>
            <Grid as="ul" cols={12} gap={6}>
              {c.channels.items.map((channel) => (
                <li key={channel.label} className="col-span-12 md:col-span-4 flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                    {channel.label}
                  </span>
                  <a
                    href={channel.href}
                    className="text-body font-medium text-fg-primary hover:text-accent transition-[color] duration-base ease-expressive"
                  >
                    {channel.value}
                  </a>
                </li>
              ))}
            </Grid>
          </div>
        </Container>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Form view — one of the typed audiences. Hero pulls per-audience copy,
// ContactForm renders the field set, side panel shows context from copy.
// ────────────────────────────────────────────────────────────────────────

function FormView({ audience }: { audience: ContactAudience }) {
  const c = contactCopy;
  const route = c.routes.find((r) => r.slug === audience);

  // Submit handler — Phase 4 will wire this to the real backend (CMS forms
  // / dedicated transactional service / etc). For now we resolve so the
  // form can transition to its success state and visual review can sign
  // off the segmented router. Logged once so QA can confirm wiring.
  // Hook must run before any conditional return — Rules of Hooks.
  const handleSubmit = useCallback(async (payload: ContactPayload): Promise<void> => {
    // eslint-disable-next-line no-console
    console.info('[contact] stub submit — backend wires up in Phase 4', payload);
    await Promise.resolve();
  }, []);

  // Defensive: isFormAudience already narrowed audience, but the route list
  // is the authoritative source of titles + descriptions. If it's missing
  // we fall through to the landing view rather than render a broken hero.
  if (!route) {
    return <LandingView />;
  }

  return (
    <>
      <Hero
        eyebrow={route.audience}
        headline={route.title}
        subhead={route.description}
        primary={{ label: 'Back to all audiences', href: '/contact' }}
        atmosphereReactive
      />

      {/* Form section — pale green surface (matches marketing page bg)
          since this section sits directly above the footer. The form
          card keeps its own white surface and pops against the wash. */}
      <section
        className="relative py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
        <Container size="wide">
          <Grid cols={12} gap={10} lgGap={16} className="items-start">
            {/* Form — primary column, owns the wider rail. */}
            <div className="col-span-12 lg:col-span-7">
              <div className="rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-7 md:p-10 shadow-e1">
                <ContactForm
                  audience={audience}
                  onSubmit={handleSubmit}
                  submitLabel={route.ctaLabel}
                />
              </div>
            </div>

            {/* Side note — what to expect after submission, plus standing
                channels for visitors who want to bypass the form. */}
            <aside className="col-span-12 lg:col-span-5 lg:pt-2">
              <p className="text-overline uppercase text-accent mb-4">What happens next</p>
              <p className="font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em] text-balance">
                {route.successMessage}
              </p>

              <Grid as="dl" cols={1} gap={6} className="mt-10 border-t border-[color:var(--border-subtle)] pt-8">
                {c.channels.items.map((channel) => (
                  <div key={channel.label} className="flex flex-col gap-1">
                    <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                      {channel.label}
                    </dt>
                    <dd>
                      <a
                        href={channel.href}
                        className="text-body font-medium text-fg-primary hover:text-accent transition-[color] duration-base ease-expressive"
                      >
                        {channel.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </Grid>

              <div className="mt-10">
                <a
                  href="/contact"
                  className="group/back inline-flex items-center gap-2 text-body-sm font-medium text-fg-secondary hover:text-accent transition-[color] duration-base ease-expressive"
                >
                  <span>Wrong audience? Pick a different conversation</span>
                </a>
              </div>
            </aside>
          </Grid>
        </Container>
      </section>
    </>
  );
}
