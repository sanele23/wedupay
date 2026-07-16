import type { Metadata } from 'next';
import AuthForm from '@/features/auth/components/AuthForm';

export const metadata: Metadata = {
  title: 'Portal Login',
};

export default function AuthPage() {
  return <AuthForm />;
}
