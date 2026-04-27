import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type ContainerSize = 'prose' | 'default' | 'wide';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizes: Record<ContainerSize, string> = {
  prose: 'max-w-prose',
  default: 'max-w-container',
  wide: 'max-w-[88rem]',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'default', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('mx-auto w-full px-6 md:px-10', sizes[size], className)}
      {...props}
    />
  );
});
