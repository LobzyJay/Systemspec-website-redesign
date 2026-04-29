'use client';

import { useId, useState, type FormEvent } from 'react';
import { Grid } from '@systemspecs/foundations/layout';
import { Button } from '@systemspecs/foundations/primitives';
import { ArrowUpRight, Check } from '../../icons';

export interface NewsletterCTAProps {
  /** Display headline. Falls back to a sensible default. */
  headline?: string;
  /** Editorial eyebrow, rendered in serif italic above the headline. */
  eyebrow?: string;
  /** Supporting paragraph beneath the headline. */
  description?: string;
  /** Email input placeholder. */
  placeholder?: string;
  /** Submit-handler — receives the validated email string. */
  onSubmit: (email: string) => Promise<void>;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Editorial newsletter / insights subscription strip (§8 — "newsletter or
 * insights subscription"). Single section: serif italic eyebrow → display
 * headline → short body → inline email + subscribe pill.
 *
 * Lives borderless on the canvas — no card chrome — to keep the page floor
 * editorial. Inline success / error states swap the form for a confirming
 * caption; the focus is moved to the live region for AT users.
 */
export function NewsletterCTA({
  headline = 'Insights from the people building the rails.',
  eyebrow = 'Insights',
  description = 'A monthly note on payments, public-sector technology and the systems that move money in Africa. No noise.',
  placeholder = 'name@institution.com',
  onSubmit,
}: NewsletterCTAProps) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Email is required.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RX.test(trimmed)) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setError('');
    try {
      await onSubmit(trimmed);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <Grid
      as="section"
      aria-labelledby={`${id}-title`}
      cols={12}
      gap={8}
      mdGap={12}
      className="items-end"
    >
      <div className="col-span-12 lg:col-span-7">
        {eyebrow ? (
          <p className="font-serif italic text-[1.0625rem] text-accent mb-3">{eyebrow}</p>
        ) : null}
        <h2
          id={`${id}-title`}
          className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]"
        >
          {headline}
        </h2>
        {description ? (
          <p className="mt-4 md:mt-5 text-body md:text-body-lg text-fg-secondary text-pretty max-w-xl">
            {description}
          </p>
        ) : null}
      </div>

      <div className="col-span-12 lg:col-span-5">
        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="stsl-fade-up flex items-start gap-4 rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-5 md:p-6 shadow-e1"
          >
            <span
              aria-hidden="true"
              className="inline-grid place-items-center h-10 w-10 rounded-pill bg-accent-subtle text-accent shrink-0"
            >
              <Check size={18} />
            </span>
            <div>
              <p className="font-display font-medium text-heading-3 text-fg-primary">
                You're on the list.
              </p>
              <p className="mt-1 text-body-sm text-fg-secondary">
                Look out for the next dispatch in your inbox.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-3"
            aria-describedby={status === 'error' && error ? `${id}-err` : undefined}
          >
            <label htmlFor={`${id}-email`} className="sr-only">
              Email address
            </label>
            <div
              className={`
                flex items-center h-13 pl-5 pr-1.5 rounded-pill
                bg-bg-surface ring-1
                transition-[box-shadow,border-color,background-color] duration-base ease-expressive
                focus-within:ring-2 focus-within:ring-accent focus-within:shadow-[0_0_0_4px_var(--accent-subtle)]
                ${status === 'error'
                  ? 'ring-[color:var(--feedback-danger)]'
                  : 'ring-[color:var(--border-default)]'}
              `}
            >
              <input
                id={`${id}-email`}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setError('');
                  }
                }}
                aria-invalid={status === 'error' || undefined}
                className="
                  flex-1 min-w-0 bg-transparent outline-none border-0
                  text-body text-fg-primary placeholder:text-fg-muted
                "
                disabled={status === 'submitting'}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'submitting'}
                trailingIcon={<ArrowUpRight size={14} />}
                className="h-10"
              >
                {status === 'submitting' ? 'Sending…' : 'Subscribe'}
              </Button>
            </div>

            {status === 'error' && error ? (
              <p
                id={`${id}-err`}
                role="alert"
                className="text-caption text-feedback-danger pl-5"
              >
                {error}
              </p>
            ) : (
              <p className="text-caption text-fg-muted pl-5">
                One email a month. Unsubscribe in one click.
              </p>
            )}
          </form>
        )}
      </div>
    </Grid>
  );
}

export default NewsletterCTA;
