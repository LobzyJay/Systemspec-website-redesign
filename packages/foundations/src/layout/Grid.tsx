import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Cols = 1 | 2 | 3 | 4 | 6 | 12;
type Gap = 2 | 3 | 4 | 6 | 8 | 10 | 12;

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: Cols;
  mdCols?: Cols;
  lgCols?: Cols;
  gap?: Gap;
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
  2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6',
  8: 'gap-8', 10: 'gap-10', 12: 'gap-12',
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { cols = 1, mdCols, lgCols, gap = 6, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        colsMap[cols],
        mdCols && mdMap[mdCols],
        lgCols && lgMap[lgCols],
        gapMap[gap],
        className,
      )}
      {...props}
    />
  );
});
