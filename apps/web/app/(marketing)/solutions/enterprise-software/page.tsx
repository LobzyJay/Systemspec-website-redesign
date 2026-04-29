// Enterprise Software solution sub-page. Wires enterpriseSoftwareSolutionCopy
// through the shared SolutionPage template under solutions/_components.

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
