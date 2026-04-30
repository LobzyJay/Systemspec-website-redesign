// Enterprise Software solution sub-page. Wires enterpriseSoftwareSolutionCopy
// through the shared SolutionPage template under solutions/_components.

import type { Metadata } from 'next';
import {
  enterpriseSoftwareSolutionCopy,
  Code,
  Network,
  Building,
  Document,
  Award,
  Users,
} from '@systemspecs/brand-stsl';
import { SolutionPage } from '../_components/SolutionPage';

export const metadata: Metadata = {
  title: 'Enterprise Software',
  description:
    'STSL enterprise software services — product engineering, platform, integration, data, modernization, and managed delivery for institutional clients.',
  alternates: { canonical: '/solutions/enterprise-software' },
  openGraph: {
    title: 'Enterprise Software · SystemSpecs Technology Solutions',
    description: 'Product engineering, platform, integration, and managed delivery for institutions.',
    url: '/solutions/enterprise-software',
  },
};

// Order matches enterpriseSoftwareSolutionCopy.capabilities.blocks:
//   product engineering, platform and infrastructure, integration and middleware,
//   data and analytics, modernization, managed delivery
const capabilityIcons = [
  <Code size={28} key="product" />,
  <Network size={28} key="platform" />,
  <Building size={28} key="integration" />,
  <Document size={28} key="data" />,
  <Award size={28} key="modernization" />,
  <Users size={28} key="managed" />,
];

export default function EnterpriseSoftwarePage() {
  return (
    <SolutionPage
      copy={enterpriseSoftwareSolutionCopy}
      capabilityIcons={capabilityIcons}
      segmentedCtaAudienceSlugs={['Fintechs', 'Banks', 'Partners', 'Careers']}
    />
  );
}
