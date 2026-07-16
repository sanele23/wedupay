import type { Metadata } from 'next';
import DashboardView from '@/features/student-dashboard/components/DashboardView';

export const metadata: Metadata = {
  title: 'Student Dashboard',
};

export default function DashboardPage() {
  return <DashboardView />;
}
