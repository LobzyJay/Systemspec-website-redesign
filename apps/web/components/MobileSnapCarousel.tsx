'use client';

import { Children, useEffect, useRef, type ReactNode } from 'react';

interface MobileSnapCarouselProps {
  children: ReactNode;
  // Item width as a basis-* utility on mobile. Default 85% so the next
  // card peeks at the right edge as a swipe affordance.
  mobileBasis?: string;
  // md+ grid breakdown — passed straight through as Tailwind classes
  // on each <li>, e.g. 'md:basis-auto md:col-span-4 md:flex-1'. The
  // outer <ul> switches from flex to grid at md so col-span lands.
  desktopItemClass?: string;
}

// Mobile horizontal snap-scroll wrapper. On md+ it renders as a grid
// (passes col-span via desktopItemClass). On mobile it snap-scrolls and
// tags the centered <li> with data-focused="true" so children can react
// (e.g. ProductCard swaps its B/W logo to the colored one when its
// parent <li> is focused). Carousel breaks the Container padding via
// -mx-6/px-6 for full-bleed and overrides touch-action to allow pan-x
// against the global pan-y horizontal scroll lock.
export function MobileSnapCarousel({
  children,
  mobileBasis = 'basis-[85%]',
  desktopItemClass = 'md:basis-auto md:col-span-4',
}: MobileSnapCarouselProps) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = ref.current;
    if (!ul) return;

    const update = () => {
      // Only meaningful when actually scrollable (mobile carousel mode).
      // On desktop the grid has no overflow and scrollLeft stays 0; we
      // still mark the first card focused as a sensible default but
      // hover overrides take precedence.
      const items = Array.from(ul.children) as HTMLElement[];
      if (!items.length) return;
      const containerCenter = ul.scrollLeft + ul.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const dist = Math.abs(containerCenter - itemCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      items.forEach((item, i) => {
        item.dataset.focused = i === closest ? 'true' : 'false';
      });
    };

    update();
    ul.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      ul.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <ul
      ref={ref}
      className="mt-12 md:mt-16
                 flex items-stretch md:grid md:grid-cols-12 gap-4 md:gap-5
                 overflow-x-auto md:overflow-visible
                 snap-x snap-mandatory md:snap-none
                 -mx-6 md:mx-0 px-6 md:px-0
                 py-8 md:py-0
                 [touch-action:pan-x_pan-y] md:[touch-action:auto]
                 [&::-webkit-scrollbar]:hidden
                 [scrollbar-width:none]"
    >
      {Children.map(children, (child, i) => (
        <li
          key={i}
          data-focused={i === 0 ? 'true' : 'false'}
          className={`group/card shrink-0 md:shrink ${mobileBasis} ${desktopItemClass} snap-center flex [&>*]:flex-1
                      origin-center transition-transform duration-300 ease-out
                      data-[focused=true]:md:scale-100 data-[focused=false]:scale-95 data-[focused=true]:scale-100
                      md:scale-100`}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
