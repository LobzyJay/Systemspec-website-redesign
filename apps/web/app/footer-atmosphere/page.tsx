import type { Metadata } from 'next';
import { FooterAtmosphereReactive } from '@systemspecs/brand-stsl/components';

export const metadata: Metadata = {
  title: 'Footer atmosphere · Component showcase',
  description:
    'Isolated showcase of the reactive Loop 1 footer atmosphere — same canvas physics as the production marketing footer, painted on the espresso surface.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/footer-atmosphere' },
};

export default function FooterAtmospherePage() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0B0C0F] text-accent">
      <FooterAtmosphereReactive />
    </div>
  );
}
