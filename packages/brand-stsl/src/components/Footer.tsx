import { Container, Grid, Stack } from '@systemspecs/foundations/layout';
import { Link } from '@systemspecs/foundations/primitives';
import { LinkedIn, Twitter, Mail, Phone } from '../icons';
import { SystemSpecsWordmark } from '../brand';
// Atmosphere is loaded via a client-only dynamic shim so the canvas
// forcefield + RAF loop split into their own chunk. Footer stays a server
// component; the shim is the only client payload added here.
import { FooterAtmosphereReactive } from './FooterAtmosphereReactive.client';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  columns: FooterColumn[];
  groupCompanies: { label: string; href: string }[];
  contact: { email: string; phone: string };
  legalLinks: { label: string; href: string }[];
  socialLinks: { kind: 'linkedin' | 'twitter'; href: string }[];
}

// Footer surface = bg-bg-inverse (deep espresso #0B0C0F) — matches
// SegmentedCTA above for tonal continuity. FooterAtmosphere paints the
// Loop 1 diagonal sweep behind everything; content sits above via z-10.
// Squircle (rounded-[32px]) + inset wrapper from the marketing layout
// makes the whole footer read as a floating dark card.
export function Footer({ columns, groupCompanies, contact, legalLinks, socialLinks }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-bg-inverse text-fg-on-inverse isolate rounded-[32px]">
      <FooterAtmosphereReactive />

      <div className="relative z-10">
        {/* DESKTOP / TABLET footer (md+). Full link grid as designed. */}
        <div className="hidden md:block">
          <Container size="wide" className="py-16 md:py-20">
            <Grid cols={1} mdCols={2} lgCols={6} gap={10}>
              <div className="lg:col-span-2">
                <SystemSpecsWordmark tone="inverse" height={26} />
                <p className="mt-5 font-display text-body-lg text-fg-on-inverse">
                  Technology Solutions Limited
                </p>
                <p className="mt-3 text-body-sm text-fg-on-inverse/70 max-w-sm">
                  The infrastructure behind Africa&apos;s payment, government, and
                  financial technology systems.
                </p>
                <Stack direction="row" gap={3} className="mt-6">
                  {socialLinks.map((s) => (
                    <a
                      key={s.kind}
                      href={s.href}
                      rel="noopener"
                      target="_blank"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-fg-on-inverse hover:bg-white/10 transition-colors"
                      aria-label={`SystemSpecs Technology Solutions on ${s.kind === 'linkedin' ? 'LinkedIn' : 'Twitter'}`}
                    >
                      {s.kind === 'linkedin' ? <LinkedIn size={18} /> : <Twitter size={18} />}
                    </a>
                  ))}
                </Stack>
              </div>

              {columns.map((col) => (
                <div key={col.title}>
                  <p className="text-overline uppercase text-fg-on-inverse/50">{col.title}</p>
                  <Stack gap={2} className="mt-4">
                    {col.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="stsl-underline-draw self-start text-body-sm text-fg-on-inverse hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </Stack>
                </div>
              ))}

              <div>
                <p className="text-overline uppercase text-fg-on-inverse/50">Group</p>
                <Stack gap={2} className="mt-4">
                  {groupCompanies.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="stsl-underline-draw self-start text-body-sm text-fg-on-inverse hover:text-accent transition-colors"
                      rel="noopener"
                      target="_blank"
                    >
                      {c.label} ↗
                    </a>
                  ))}
                </Stack>

                <p className="text-overline uppercase text-fg-on-inverse/50 mt-8">Contact</p>
                <Stack gap={2} className="mt-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="stsl-underline-draw self-start inline-flex items-center gap-2 text-body-sm text-fg-on-inverse hover:text-accent transition-colors"
                  >
                    <Mail size={16} /> {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="stsl-underline-draw self-start inline-flex items-center gap-2 text-body-sm text-fg-on-inverse hover:text-accent transition-colors"
                  >
                    <Phone size={16} /> {contact.phone}
                  </a>
                </Stack>
              </div>
            </Grid>
          </Container>

          <div>
            <Container size="wide">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between py-6">
                <p className="text-caption text-fg-on-inverse/60">
                  © {new Date().getFullYear()} SystemSpecs Technology Solutions Limited. All rights reserved.
                </p>
                <Stack direction="row" gap={6}>
                  <Link
                    href="/solutions"
                    variant="subtle"
                    className="stsl-underline-draw text-caption text-fg-on-inverse/70 hover:text-fg-on-inverse"
                  >
                    Solutions
                  </Link>
                  {legalLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      variant="subtle"
                      className="stsl-underline-draw text-caption text-fg-on-inverse/70 hover:text-fg-on-inverse"
                    >
                      {l.label}
                    </Link>
                  ))}
                </Stack>
              </div>
            </Container>
          </div>
        </div>

        {/* MOBILE footer (<md). Compact: wordmark + tagline + 2-up link
            grid (Solutions + Company), social row, contact line, legal
            row. Everything in one shorter card so the mobile scroll
            doesn't end on a wall of text. */}
        <div className="md:hidden">
          <Container size="wide" className="py-10">
            <SystemSpecsWordmark tone="inverse" height={22} />
            <p className="mt-3 font-display text-body text-fg-on-inverse">
              Technology Solutions Limited
            </p>

            {/* 2-up condensed nav. Pulls the FIRST two columns the consumer
                passed (typically Solutions + Products) so mobile users still
                get the primary IA without the full 6-column grid. */}
            <Grid cols={2} gap={6} className="mt-6">
              {columns.slice(0, 2).map((col) => (
                <div key={col.title}>
                  <p className="text-overline uppercase text-fg-on-inverse/50">{col.title}</p>
                  <Stack gap={2} className="mt-2.5">
                    {col.links.slice(0, 4).map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-body-sm text-fg-on-inverse/85 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </Stack>
                </div>
              ))}
            </Grid>

            {/* Inline contact + social. One row each, no labels. */}
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <Stack direction="row" gap={2}>
                {socialLinks.map((s) => (
                  <a
                    key={s.kind}
                    href={s.href}
                    rel="noopener"
                    target="_blank"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-fg-on-inverse hover:bg-white/10 transition-colors"
                    aria-label={`SystemSpecs Technology Solutions on ${s.kind === 'linkedin' ? 'LinkedIn' : 'Twitter'}`}
                  >
                    {s.kind === 'linkedin' ? <LinkedIn size={14} /> : <Twitter size={14} />}
                  </a>
                ))}
              </Stack>
              <Stack direction="row" gap={3}>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-fg-on-inverse hover:bg-white/10 transition-colors"
                  aria-label={`Email ${contact.email}`}
                >
                  <Mail size={14} />
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-fg-on-inverse hover:bg-white/10 transition-colors"
                  aria-label={`Call ${contact.phone}`}
                >
                  <Phone size={14} />
                </a>
              </Stack>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-2">
              <p className="text-[11px] text-fg-on-inverse/55">
                © {new Date().getFullYear()} SystemSpecs Technology Solutions Limited
              </p>
              <Stack direction="row" gap={4} className="flex-wrap">
                {legalLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    variant="subtle"
                    className="text-[11px] text-fg-on-inverse/65 hover:text-fg-on-inverse"
                  >
                    {l.label}
                  </Link>
                ))}
              </Stack>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
