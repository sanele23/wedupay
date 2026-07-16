import type { Metadata } from 'next';
import SuccessView from '@/features/payment-success/components/SuccessView';

export const metadata: Metadata = {
  title: 'Payment Confirmed',
};

export default function SuccessPage() {
  return <SuccessView />;
}
