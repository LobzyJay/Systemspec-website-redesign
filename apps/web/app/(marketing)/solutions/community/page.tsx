// Community solution sub-page. Wires communitySolutionCopy through the
// shared SolutionPage template under solutions/_components.

import {
  communitySolutionCopy,
  Wallet,
  Users,
  Card,
  Network,
  Shield,
  Document,
} from '@systemspecs/brand-stsl';
import { SolutionPage } from '../_components/SolutionPage';

// Order matches communitySolutionCopy.capabilities.blocks:
//   branded wallets, contributions and savings, payouts and disbursements,
//   loans and credit schemes, member onboarding, admin and oversight
const capabilityIcons = [
  <Wallet size={28} key="wallets" />,
  <Users size={28} key="contributions" />,
  <Network size={28} key="payouts" />,
  <Card size={28} key="loans" />,
  <Shield size={28} key="onboarding" />,
  <Document size={28} key="admin" />,
];

export default function CommunityPage() {
  return (
    <SolutionPage
      copy={communitySolutionCopy}
      capabilityIcons={capabilityIcons}
      segmentedCtaAudienceSlugs={['Cooperatives', 'Fintechs', 'Partners']}
    />
  );
}
