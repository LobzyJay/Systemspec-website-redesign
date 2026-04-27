'use client';

import { useState } from 'react';
import { Container, Stack } from '@systemspecs/foundations/layout';
import { Button, Link } from '@systemspecs/foundations/primitives';
import { cn } from '@systemspecs/foundations';
import { Menu, Close } from '../icons';

interface NavLink {
  label: string;
  href: string;
}

interface NavProps {
  primaryLinks: NavLink[];
  governmentHref?: string;
  salesHref: string;
  brand: { mark: React.ReactNode; href: string; label: string };
}

export function Nav({ primaryLinks, governmentHref, salesHref, brand }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg-canvas/85 backdrop-blur-md border-b border-border-subtle">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <a
            href={brand.href}
            className="flex items-center gap-2 font-display text-heading-3 text-fg-primary"
            aria-label={brand.label}
          >
            {brand.mark}
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <Stack direction="row" gap={6} align="center">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  variant="subtle"
                  className="text-body-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </nav>

          <Stack direction="row" gap={2} align="center" className="hidden lg:flex">
            {governmentHref ? (
              <Button asChild variant="ghost" size="sm">
                <a href={governmentHref}>Government enquiries</a>
              </Button>
            ) : null}
            <Button asChild variant="primary" size="sm">
              <a href={salesHref}>Talk to sales</a>
            </Button>
          </Stack>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-fg-primary hover:bg-bg-surface-raised"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={cn(
            'lg:hidden overflow-hidden transition-[max-height] duration-base ease-standard',
            open ? 'max-h-[80vh]' : 'max-h-0',
          )}
        >
          <Stack gap={2} className="py-4 border-t border-border-subtle">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                variant="subtle"
                className="text-body py-2"
              >
                {link.label}
              </Link>
            ))}
            <Stack direction="row" gap={2} className="pt-4">
              {governmentHref ? (
                <Button asChild variant="secondary" size="md" className="flex-1">
                  <a href={governmentHref}>Government</a>
                </Button>
              ) : null}
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={salesHref}>Talk to sales</a>
              </Button>
            </Stack>
          </Stack>
        </div>
      </Container>
    </header>
  );
}
