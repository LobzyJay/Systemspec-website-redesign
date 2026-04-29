// Shared hero brand panel for product sub-pages (§6.3 — "value prop +
// product visual placeholder"). Real product UI screenshots aren't ready, so
// the visual slot is a tinted brand-colour panel with the product name in
// display type. Same Doppelrand vocabulary as Hero.tsx so the slot frames
// match the rest of the system. The brand colour comes from the same
// productBrandColors map used on the homepage product cards.

interface ProductHeroPanelProps {
  /** Product display name — rendered as a placeholder until real UI ships. */
  name: string;
  /** Brand-owned hex colour. Drives the tinted ground + a thin baseline rule. */
  brandColor: string;
}

export function ProductHeroPanel({ name, brandColor }: ProductHeroPanelProps) {
  // Tinted ground — same color-mix recipe as ProductCard's brand panel so
  // the hero slot reads as the product card scaled up.
  const panelTint = `color-mix(in srgb, ${brandColor} 12%, var(--bg-surface-raised))`;

  return (
    <div
      className="relative grid place-items-center w-full h-full px-8"
      style={{ backgroundColor: panelTint }}
    >
      <span
        className="font-display font-medium text-display-lg md:text-display-xl tracking-[-0.02em] leading-[1] text-balance"
        style={{ color: brandColor }}
      >
        {name}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ backgroundColor: brandColor, opacity: 0.5 }}
      />
    </div>
  );
}
