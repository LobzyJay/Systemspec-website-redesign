import { Container, Grid, Stack } from '@systemspecs/foundations/layout';
import { Link } from '@systemspecs/foundations/primitives';
import { LinkedIn, Twitter, Mail, Phone } from '../icons';

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

export function Footer({ columns, groupCompanies, contact, legalLinks, socialLinks }: FooterProps) {
  return (
    <footer className="bg-bg-inverse text-fg-on-inverse">
      <Container size="wide" className="py-16 md:py-20">
        <Grid cols={1} mdCols={2} lgCols={6} gap={10}>
          <div className="lg:col-span-2">
            <p className="font-display text-heading-2 text-fg-on-inverse">
              SystemSpecs Technology Solutions Limited
            </p>
            <p className="mt-3 text-body-sm text-fg-on-inverse/70 max-w-sm">
              The infrastructure behind Africa's payment, government, and
              financial technology systems.
            </p>
            <Stack direction="row" gap={3} className="mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.kind}
                  href={s.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-fg-on-inverse hover:bg-white/10"
                  aria-label={s.kind}
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
                    className="text-body-sm text-fg-on-inverse hover:text-accent"
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
                  className="text-body-sm text-fg-on-inverse hover:text-accent"
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
                className="inline-flex items-center gap-2 text-body-sm text-fg-on-inverse hover:text-accent"
              >
                <Mail size={16} /> {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 text-body-sm text-fg-on-inverse hover:text-accent"
              >
                <Phone size={16} /> {contact.phone}
              </a>
            </Stack>
          </div>
        </Grid>
      </Container>

      <div className="border-t border-white/10">
        <Container size="wide">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between py-6">
            <p className="text-caption text-fg-on-inverse/60">
              © {new Date().getFullYear()} SystemSpecs Technology Solutions Limited. All rights reserved.
            </p>
            <Stack direction="row" gap={6}>
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  variant="subtle"
                  className="text-caption text-fg-on-inverse/70 hover:text-fg-on-inverse"
                >
                  {l.label}
                </Link>
              ))}
            </Stack>
          </div>
        </Container>
      </div>
    </footer>
  );
}
