import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

type LinkVariant = 'default' | 'subtle' | 'standalone';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  trailingIcon?: ReactNode;
}

const variants: Record<LinkVariant, string> = {
  default: 'text-fg-link underline underline-offset-[3px] decoration-[1.5px] decoration-[color:var(--accent-default)]/40 hover:decoration-[color:var(--accent-default)] hover:text-accent-emphasis transition-[text-decoration-color,color] duration-base ease-expressive',
  subtle: 'text-fg-secondary hover:text-fg-primary transition-colors duration-base ease-expressive',
  // Standalone — discrete CTA. When given a trailingIcon, renders a magnetic
  // arrow chip that translates on hover (same vocabulary as Button).
  standalone:
    'group/link inline-flex items-center gap-2 text-body-sm font-medium text-fg-primary transition-colors duration-base ease-expressive hover:text-accent',
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'default', className, children, trailingIcon, ...props },
  ref,
) {
  if (variant === 'standalone' && trailingIcon) {
    return (
      <a ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center h-7 w-7 rounded-pill bg-accent-subtle text-accent transition-[transform,background-color,color] duration-base ease-expressive group-hover/link:translate-x-0.5 group-hover/link:-translate-y-px group-hover/link:scale-[1.06] group-hover/link:bg-accent group-hover/link:text-white"
        >
          {trailingIcon}
        </span>
      </a>
    );
  }
  return (
    <a ref={ref} className={cn(variants[variant], className)} {...props}>
      {children}
      {trailingIcon ? <span className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </a>
  );
});
