// Banking solution sub-page. Wires bankingSolutionCopy through the shared
// SolutionPage template under solutions/_components.

import type { Metadata } from 'next';
import {
  bankingSolutionCopy,
  Wallet,
  Network,
  Building,
  Card,
  Shield,
  Document,
} from '@systemspecs/brand-stsl';
import { SolutionPage } from '../_components/SolutionPage';

export const metadata: Metadata = {
  title: 'Banking',
  description:
    'STSL banking infrastructure — virtual accounts, payment APIs, core banking integration, lending, and identity for Nigerian Tier-1 and challenger banks.',
  alternates: { canonical: '/solutions/banking' },
  openGraph: {
    title: 'Banking · SystemSpecs Technology Solutions',
    description: 'Payment, identity, and core-banking infrastructure for Nigerian banks.',
    url: '/solutions/banking',
  },
};

// Order matches bankingSolutionCopy.capabilities.blocks:
//   virtual accounts, payment APIs, core banking integration,
//   lending infrastructure, identity and onboarding, ops and reconciliation
const capabilityIcons = [
  <Wallet size={28} key="virtual-accounts" />,
  <Network size={28} key="payment-apis" />,
  <Building size={28} key="core-banking" />,
  <Card size={28} key="lending" />,
  <Shield size={28} key="identity" />,
  <Document size={28} key="ops" />,
];

export default function BankingPage() {
  return (
    <SolutionPage
      copy={bankingSolutionCopy}
      capabilityIcons={capabilityIcons}
      segmentedCtaAudienceSlugs={['Banks', 'Fintechs', 'Partners']}
    />
  );
}
