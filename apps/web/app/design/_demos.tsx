'use client';

// Client-side demo wrappers. The design page is a server component, but
// some primitives/patterns need state (Dialog `open`, form submit handlers).
// Wrapping them here lets the page itself stay a server component while the
// interactive demos run client-side.

import { useState } from 'react';
import {
  Button,
  Dialog,
  Checkbox,
  RadioGroup,
  RadioItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Field,
  Input,
} from '@systemspecs/foundations/primitives';
import {
  ContactForm,
  NewsletterCTA,
  type ContactPayload,
} from '@systemspecs/brand-stsl/components';
import { ArrowUpRight, Info } from '@systemspecs/brand-stsl/icons';

// ────────────────────────────────────────────────────────────────────
// Dialog — open/close state + a few size demos
// ────────────────────────────────────────────────────────────────────
export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={() => { setSize('sm'); setOpen(true); }}>Open small</Button>
      <Button variant="secondary" onClick={() => { setSize('md'); setOpen(true); }}>Open medium</Button>
      <Button variant="ghost" onClick={() => { setSize('lg'); setOpen(true); }}>Open large</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size={size}
        title="Procurement-ready brief"
        description="A short PDF with reference architecture, integration patterns, and the security posture."
      >
        <div className="space-y-4">
          <p className="text-body text-fg-secondary">
            This dialog demonstrates the Doppelrand-safe modal: single 24px radius,
            no nested chrome. Backdrop is rgba(11,12,15,.42), motion follows the
            foundations expressive curve.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={() => setOpen(false)}>Got it</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Checkbox group
// ────────────────────────────────────────────────────────────────────
export function CheckboxDemo() {
  const [bank, setBank] = useState(true);
  const [gov, setGov] = useState(false);
  const [fintech, setFintech] = useState(true);
  return (
    <div className="flex flex-col gap-3 max-w-md">
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox checked={bank} onCheckedChange={(v) => setBank(v === true)} />
        <span className="text-body text-fg-primary">Banking</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox checked={gov} onCheckedChange={(v) => setGov(v === true)} />
        <span className="text-body text-fg-primary">E-Government</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox checked={fintech} onCheckedChange={(v) => setFintech(v === true)} />
        <span className="text-body text-fg-primary">Fintech &amp; PSP</span>
      </label>
      <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
        <Checkbox disabled />
        <span className="text-body text-fg-primary">Disabled</span>
      </label>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Radio group
// ────────────────────────────────────────────────────────────────────
export function RadioDemo() {
  const [value, setValue] = useState('banking');
  return (
    <RadioGroup value={value} onValueChange={setValue} className="gap-3 max-w-md">
      {[
        { v: 'banking', label: 'Banking' },
        { v: 'government', label: 'E-Government' },
        { v: 'fintech', label: 'Fintech' },
        { v: 'community', label: 'Community' },
      ].map(({ v, label }) => (
        <label key={v} className="flex items-center gap-3 cursor-pointer">
          <RadioItem value={v} />
          <span className="text-body text-fg-primary">{label}</span>
        </label>
      ))}
    </RadioGroup>
  );
}

// ────────────────────────────────────────────────────────────────────
// Select
// ────────────────────────────────────────────────────────────────────
export function SelectDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Field label="Country" htmlFor="country">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="country" className="max-w-sm">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ng">Nigeria</SelectItem>
          <SelectItem value="gh">Ghana</SelectItem>
          <SelectItem value="ke">Kenya</SelectItem>
          <SelectItem value="za">South Africa</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}

// ────────────────────────────────────────────────────────────────────
// Tooltip
// ────────────────────────────────────────────────────────────────────
export function TooltipDemo() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex flex-wrap items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" leadingIcon={<Info size={14} />}>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            Tier-1 banks integrated since 2008.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>With arrow</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            32 years of fintech infrastructure in Nigeria.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" trailingIcon={<ArrowUpRight size={12} />}>Right side</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Federal MDA references on request.
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

// ────────────────────────────────────────────────────────────────────
// Inline ContactForm — never actually submits, resolves the promise so the
// success state can be reviewed.
// ────────────────────────────────────────────────────────────────────
export function ContactFormDemo() {
  const handleSubmit = async (_payload: ContactPayload) => {
    await new Promise((r) => setTimeout(r, 600));
  };
  return <ContactForm audience="banking" onSubmit={handleSubmit} />;
}

// ────────────────────────────────────────────────────────────────────
// Inline NewsletterCTA
// ────────────────────────────────────────────────────────────────────
export function NewsletterCTADemo() {
  const handleSubmit = async (_email: string) => {
    await new Promise((r) => setTimeout(r, 500));
  };
  return <NewsletterCTA onSubmit={handleSubmit} />;
}

// ────────────────────────────────────────────────────────────────────
// Reveal-replay button — clears `data-revealed` on every reveal node and
// re-arms the IntersectionObserver path so the entry animations can be
// previewed without a full page reload.
// ────────────────────────────────────────────────────────────────────
export function RevealReplay() {
  const [pulsing, setPulsing] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setPulsing(true);
        document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-card]').forEach((el) => {
          delete el.dataset.revealed;
        });
        setTimeout(() => {
          document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-card]').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.dataset.revealed = 'true';
            }
          });
          setPulsing(false);
        }, 30);
      }}
      className={
        'inline-flex h-9 items-center px-4 rounded-pill ring-1 ring-[color:var(--border-subtle)] ' +
        'bg-bg-surface-raised text-body-sm font-medium text-fg-primary ' +
        'hover:bg-bg-surface transition-colors duration-base ease-expressive ' +
        (pulsing ? 'animate-pulse' : '')
      }
    >
      Replay reveals on this page
    </button>
  );
}
