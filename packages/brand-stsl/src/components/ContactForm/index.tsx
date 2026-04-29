'use client';

import { useId, useState, type FormEvent } from 'react';
import { Grid } from '@systemspecs/foundations/layout';
import { Button } from '@systemspecs/foundations/primitives';
import { ArrowUpRight, Check } from '../../icons';

export type ContactAudience =
  | 'banking'
  | 'government'
  | 'fintech'
  | 'community'
  | 'enterprise'
  | 'partners'
  | 'press'
  | 'careers'
  | 'support';

export type ContactPayload = {
  audience: ContactAudience;
  fullName: string;
  email: string;
  message: string;
  /** Audience-specific fields land here, keyed by their input name. */
  extras: Record<string, string>;
};

export interface ContactFormProps {
  audience: ContactAudience;
  onSubmit: (payload: ContactPayload) => Promise<void>;
  /** Optional submit-label override (defaults to "Send request"). */
  submitLabel?: string;
}

interface FieldDef {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'textarea';
}

// ────────────────────────────────────────────────────────────────────────
// Audience → field set. Each segment routes to a different sales pod, so
// each pod gets the upstream signals it needs without forcing every
// visitor through the same generic form.
// ────────────────────────────────────────────────────────────────────────
const COMMON: FieldDef[] = [
  { name: 'fullName', label: 'Full name', placeholder: 'Adaeze Okafor', required: true },
  { name: 'email',    label: 'Work email', placeholder: 'name@institution.com', required: true, type: 'email' },
];

const EXTRAS: Record<ContactAudience, FieldDef[]> = {
  banking: [
    { name: 'institution', label: 'Institution name', placeholder: 'Tier-1 commercial bank',  required: true },
    { name: 'role',        label: 'Role',             placeholder: 'Head of Digital',         required: true },
    { name: 'useCase',     label: 'Use case',         placeholder: 'What rails or product?',  required: true },
  ],
  government: [
    { name: 'mda',                label: 'MDA name',           placeholder: 'Federal Inland Revenue Service', required: true },
    { name: 'procurementContact', label: 'Procurement contact', placeholder: 'Director, ICT', required: true },
    { name: 'mandate',            label: 'Mandate',             placeholder: 'TSA, e-collections, payroll…', required: true },
  ],
  fintech: [
    { name: 'company',  label: 'Company',     placeholder: 'Your fintech',         required: true },
    { name: 'stage',    label: 'Stage',       placeholder: 'Pre-launch / Live',    required: true },
    { name: 'volumes',  label: 'Monthly volumes', placeholder: 'Approx. transactions / month' },
  ],
  community: [
    { name: 'organisation', label: 'Organisation',   placeholder: 'Cooperative / NGO',   required: true },
    { name: 'members',      label: 'Members served', placeholder: 'Approx. headcount' },
  ],
  enterprise: [
    { name: 'company',  label: 'Company',  placeholder: 'Your company',  required: true },
    { name: 'industry', label: 'Industry', placeholder: 'e.g. Energy, FMCG', required: true },
    { name: 'role',     label: 'Role',     placeholder: 'Head of HR / IT', required: true },
  ],
  partners: [
    { name: 'company',     label: 'Company',     placeholder: 'Your company',     required: true },
    { name: 'partnership', label: 'Partnership type', placeholder: 'Reseller, integrator, ISV…', required: true },
  ],
  press: [
    { name: 'outlet',   label: 'Outlet',  placeholder: 'Publication or broadcaster', required: true },
    { name: 'deadline', label: 'Deadline', placeholder: 'When do you need a response?' },
  ],
  careers: [
    { name: 'role',     label: 'Role of interest', placeholder: 'Engineering, Design, Sales…', required: true },
    { name: 'linkedin', label: 'LinkedIn URL',     placeholder: 'https://linkedin.com/in/…' },
  ],
  support: [
    { name: 'product',  label: 'Product or service', placeholder: 'Pouchii, FundACause, Banking integration…', required: true },
    { name: 'accountId', label: 'Account / institution ID', placeholder: 'Optional — speeds up triage' },
    { name: 'urgency',  label: 'Urgency',           placeholder: 'Low / Medium / High / Production-down' },
  ],
};

const MESSAGE_FIELD: FieldDef = {
  name: 'message',
  label: 'What are you exploring?',
  placeholder: "A few sentences on the system you're modernising or the rails you need.",
  required: true,
  type: 'textarea',
};

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUDIENCE_LABEL: Record<ContactAudience, string> = {
  banking:    'Banking',
  government: 'Government',
  fintech:    'Fintech',
  community:  'Community',
  enterprise: 'Enterprise',
  partners:   'Partners',
  press:      'Press',
  careers:    'Careers',
  support:    'Support',
};

/**
 * Segmented contact router (§6.6). Renders a different field set per
 * audience so each form arrives at the right sales pod with the right
 * upstream context. Visual language matches the kit's `.kit-field` pattern
 * (44px input, 12px radius, mono-caps label, subtle accent halo on focus)
 * without depending on the kit stylesheet — every value is a token.
 *
 * Validation is intentionally lightweight: required-field check + RFC-ish
 * email format. Heavier rules (institutional-domain, role taxonomy etc.)
 * belong on the server.
 */
export function ContactForm({ audience, onSubmit, submitLabel = 'Send request' }: ContactFormProps) {
  const fields = [...COMMON, ...EXTRAS[audience], MESSAGE_FIELD];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formId = useId();

  const setValue = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? '').trim();
      if (f.required && !v) next[f.name] = `${f.label} is required.`;
      else if (f.type === 'email' && v && !EMAIL_RX.test(v)) {
        next[f.name] = 'Use your official institutional address.';
      }
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus('submitting');
    setErrorMessage('');
    try {
      const extras: Record<string, string> = {};
      for (const f of EXTRAS[audience]) {
        const v = values[f.name];
        if (v) extras[f.name] = v;
      }
      await onSubmit({
        audience,
        fullName: values.fullName ?? '',
        email:    values.email ?? '',
        message:  values.message ?? '',
        extras,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="stsl-fade-up rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-8 md:p-10 text-center shadow-e1"
      >
        <span
          aria-hidden="true"
          className="inline-grid place-items-center h-14 w-14 rounded-pill bg-accent-subtle text-accent mb-5"
        >
          <Check size={26} />
        </span>
        <h2 className="font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em]">
          Received.
        </h2>
        <p className="mt-2 text-body text-fg-secondary max-w-prose mx-auto">
          Our {AUDIENCE_LABEL[audience].toLowerCase()} team has your note. Expect a response within
          two business days, addressed to <b className="text-fg-primary">{values.email}</b>.
        </p>
      </div>
    );
  }

  // Two-column rows on desktop for the first two common fields. Extra
  // fields and message stack full-width — they tend to be longer copy that
  // benefits from the wider rail.
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-title`}
      className="flex flex-col gap-4 md:gap-5"
    >
      <p
        id={`${formId}-title`}
        className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent"
      >
        {AUDIENCE_LABEL[audience]} enquiry
      </p>

      {/* Common row — full name + email side by side on md+. */}
      <Grid cols={12} gap={4} mdGap={5}>
        {COMMON.map((f) => (
          <div key={f.name} className="col-span-12 md:col-span-6">
            <FieldRow
              field={f}
              value={values[f.name] ?? ''}
              error={errors[f.name]}
              onChange={(v) => setValue(f.name, v)}
              formId={formId}
            />
          </div>
        ))}
      </Grid>

      {/* Audience-specific extras. Pair tighter pairs on md+. */}
      <Grid cols={12} gap={4} mdGap={5}>
        {EXTRAS[audience].map((f) => (
          <div key={f.name} className="col-span-12 md:col-span-6">
            <FieldRow
              field={f}
              value={values[f.name] ?? ''}
              error={errors[f.name]}
              onChange={(v) => setValue(f.name, v)}
              formId={formId}
            />
          </div>
        ))}
      </Grid>

      {/* Message — always full-width. */}
      <FieldRow
        field={MESSAGE_FIELD}
        value={values.message ?? ''}
        error={errors.message}
        onChange={(v) => setValue('message', v)}
        formId={formId}
      />

      {status === 'error' && errorMessage ? (
        <p
          role="alert"
          className="text-body-sm text-feedback-danger bg-feedback-danger-subtle ring-1 ring-[color:var(--feedback-danger)]/20 rounded-2xl px-4 py-3"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-2 flex items-center justify-end gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === 'submitting'}
          trailingIcon={<ArrowUpRight size={14} />}
        >
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;

interface FieldRowProps {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  formId: string;
}

/**
 * One labelled field. Mirrors the kit `.kit-field` pattern: mono-caps
 * label above a 44px input on a raised cream surface with a hairline ring;
 * focus swaps to accent ring + 3px accent-subtle halo. Error state turns
 * the surface to feedback-danger-subtle and pushes a caption beneath.
 */
function FieldRow({ field, value, error, onChange, formId }: FieldRowProps) {
  const id = `${formId}-${field.name}`;
  const hasError = Boolean(error);
  const sharedField =
    'block w-full font-sans text-body text-fg-primary placeholder:text-fg-muted ' +
    'rounded-[0.75rem] px-4 ring-1 ' +
    'transition-[box-shadow,background-color,border-color] duration-base ease-expressive ' +
    'focus:outline-none focus:ring-2 focus:ring-accent ' +
    'focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-default)_15%,transparent)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';
  const tone = hasError
    ? 'bg-feedback-danger-subtle ring-[color:var(--feedback-danger)]'
    : 'bg-bg-surface-raised ring-[color:var(--border-subtle)]';

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-mono font-medium uppercase tracking-[0.22em] text-fg-muted"
      >
        {field.label}
        {field.required ? <span aria-hidden="true" className="ml-1 text-accent">*</span> : null}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${id}-err` : undefined}
          rows={4}
          className={`${sharedField} ${tone} py-3 resize-none min-h-[7rem]`}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type ?? 'text'}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${id}-err` : undefined}
          className={`${sharedField} ${tone} h-11`}
        />
      )}
      {hasError ? (
        <span id={`${id}-err`} role="alert" className="text-caption text-feedback-danger">
          {error}
        </span>
      ) : null}
    </div>
  );
}
