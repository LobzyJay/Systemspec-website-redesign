import { createElement, forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

/**
 * Grid — canonical layout scaffold for STSL.
 *
 * Prefer `cols={12}` for every section-level layout, then express children
 * as `col-span-X` (and `md:col-span-X`/`lg:col-span-X`) fractions of 12.
 * This keeps every section on the SAME column rhythm so the whole site reads
 * as one coherent layout vocabulary.
 *
 * 12-col scaffold — every section divides cleanly:
 *   ▒▒▒▒▒▒▒▒▒▒▒▒                full row (12)
 *   ▒▒▒▒▒▒  ▒▒▒▒▒▒              2-up (6+6)
 *   ▒▒▒▒  ▒▒▒▒  ▒▒▒▒            3-up (4+4+4)
 *   ▒▒▒  ▒▒▒  ▒▒▒  ▒▒▒          4-up (3+3+3+3)
 *   ▒▒  ▒▒  ▒▒  ▒▒  ▒▒  ▒▒      6-up (2×6)
 *   ▒▒▒▒▒▒▒  ▒▒▒▒▒              7+5 split (label + content)
 *   ▒▒▒▒▒▒▒▒  ▒▒▒▒              8+4 split
 *
 * Responsive convention: collapse to `col-span-12` on mobile, step up at
 * `md:` and `lg:` to the target fraction. Sub-grids inside a 7/5 or 8/4
 * split should also be expressed as col-span-X of 12.
 *
 * 5-up grids (12 / 5) and 7-up grids (12 / 7) DO NOT divide 12 cleanly —
 * use a different cols value (`cols={6}` etc.) or flag for a layout review.
 */

type Cols = 1 | 2 | 3 | 4 | 6 | 12;
/** Use `0` to opt out of the uniform `gap-*` class (e.g. when applying
 *  asymmetric `gap-x-*` / `gap-y-*` overrides via `className`). */
type Gap = 0 | 'px' | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 | 16;

interface GridProps extends HTMLAttributes<HTMLElement> {
  cols?: Cols;
  mdCols?: Cols;
  lgCols?: Cols;
  gap?: Gap;
  mdGap?: Gap;
  lgGap?: Gap;
  /** Render as a different intrinsic element (e.g. `'ul'`, `'ol'`, `'section'`). */
  as?: ElementType;
}

const colsMap: Record<Cols, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
  4: 'grid-cols-4', 6: 'grid-cols-6', 12: 'grid-cols-12',
};
const mdMap: Record<Cols, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
  4: 'md:grid-cols-4', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12',
};
const lgMap: Record<Cols, string> = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12',
};
const gapMap: Record<Gap, string> = {
  0: '',
  px: 'gap-px',
  2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5', 6: 'gap-6',
  8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 14: 'gap-14', 16: 'gap-16',
};
const mdGapMap: Record<Gap, string> = {
  0: '',
  px: 'md:gap-px',
  2: 'md:gap-2', 3: 'md:gap-3', 4: 'md:gap-4', 5: 'md:gap-5', 6: 'md:gap-6',
  8: 'md:gap-8', 10: 'md:gap-10', 12: 'md:gap-12', 14: 'md:gap-14', 16: 'md:gap-16',
};
const lgGapMap: Record<Gap, string> = {
  0: '',
  px: 'lg:gap-px',
  2: 'lg:gap-2', 3: 'lg:gap-3', 4: 'lg:gap-4', 5: 'lg:gap-5', 6: 'lg:gap-6',
  8: 'lg:gap-8', 10: 'lg:gap-10', 12: 'lg:gap-12', 14: 'lg:gap-14', 16: 'lg:gap-16',
};

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { cols = 1, mdCols, lgCols, gap = 6, mdGap, lgGap, as = 'div', className, ...props },
  ref,
) {
  return createElement(as, {
    ref,
    className: cn(
      'grid',
      colsMap[cols],
      mdCols && mdMap[mdCols],
      lgCols && lgMap[lgCols],
      gapMap[gap],
      mdGap !== undefined && mdGapMap[mdGap],
      lgGap !== undefined && lgGapMap[lgGap],
      className,
    ),
    ...props,
  });
});
