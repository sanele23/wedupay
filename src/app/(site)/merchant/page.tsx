import type { Metadata } from 'next';
import MerchantDashboardView from '@/features/merchant-dashboard/components/MerchantDashboardView';

export const metadata: Metadata = {
  title: 'Merchant Workspace',
};

export default function MerchantPage() {
  return <MerchantDashboardView />;
}
