// E-Government solution sub-page. Wires eGovernmentSolutionCopy through the
// shared SolutionPage template under solutions/_components.

import {
  eGovernmentSolutionCopy,
  Document,
  Government,
  Card,
  Shield,
  Award,
  Network,
} from '@systemspecs/brand-stsl';
import { SolutionPage } from '../_components/SolutionPage';

// Order matches eGovernmentSolutionCopy.capabilities.blocks:
//   e-budgeting, warranting and AIE, revenue and collections,
//   identity and citizen onboarding, reporting and oversight,
//   integration with federal systems
const capabilityIcons = [
  <Document size={28} key="e-budgeting" />,
  <Government size={28} key="warranting" />,
  <Card size={28} key="revenue" />,
  <Shield size={28} key="identity" />,
  <Award size={28} key="reporting" />,
  <Network size={28} key="integration" />,
];

export default function EGovernmentPage() {
  return (
    <SolutionPage
      copy={eGovernmentSolutionCopy}
      capabilityIcons={capabilityIcons}
      segmentedCtaAudienceSlugs={['Government', 'Partners']}
    />
  );
}
