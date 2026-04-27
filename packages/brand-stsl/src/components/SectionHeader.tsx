import { Container } from '@systemspecs/foundations/layout';
import { Link } from '@systemspecs/foundations/primitives';
import { ArrowRight } from '../icons';

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  intro?: string;
  link?: { label: string; href: string };
}

export function SectionHeader({ eyebrow, headline, intro, link }: SectionHeaderProps) {
  return (
    <Container size="wide">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-end mb-12">
        <div className="lg:col-span-8">
          {eyebrow ? (
            <p className="text-overline uppercase text-accent mb-4">{eyebrow}</p>
          ) : null}
          <h2 className="font-display text-display-md text-fg-primary text-balance">
            {headline}
          </h2>
          {intro ? (
            <p className="mt-4 text-body-lg text-fg-secondary max-w-2xl">{intro}</p>
          ) : null}
        </div>
        {link ? (
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href={link.href}
              variant="standalone"
              trailingIcon={<ArrowRight size={16} />}
            >
              {link.label}
            </Link>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
