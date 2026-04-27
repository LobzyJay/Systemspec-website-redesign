import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

// Field architecture: warm cream background, hairline ring, expressive focus
// halo (4px accent-subtle glow + accent ring). The hairline lives on `ring-1`
// rather than `border-1` so the focus ring can replace it cleanly without
// causing a 1px layout shift. Radius matches the Doppelrand inner-core curve.
const fieldBase =
  'w-full rounded-2xl bg-bg-surface px-4 py-2.5 text-body text-fg-primary ' +
  'ring-1 ring-[color:var(--border-default)] ' +
  'placeholder:text-fg-muted ' +
  'transition-[box-shadow,background-color,border-color] duration-base ease-expressive ' +
  'focus:outline-none focus:ring-2 focus:ring-accent ' +
  'focus:shadow-[0_0_0_4px_var(--accent-subtle)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(fieldBase, 'h-11', className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 4, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={cn(fieldBase, 'py-3', className)} {...props} />;
});

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-body-sm font-medium text-fg-primary"
      >
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-caption text-feedback-danger">{error}</span>
      ) : hint ? (
        <span className="text-caption text-fg-muted">{hint}</span>
      ) : null}
    </div>
  );
}
