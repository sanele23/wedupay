'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/store/useSessionStore';

/**
 * Phase 1 stand-in for a real auth guard: redirects to /auth when no mock
 * session role is set. Replace with middleware-based auth once the backend
 * phase lands.
 */
export function useRequireRole() {
  const router = useRouter();
  const role = useSessionStore((state) => state.role);

  useEffect(() => {
    // Check once, on mount, rather than reacting to every role change: a role
    // transitioning to 'none' while this page is mounted always originates
    // from an explicit logout action, which already owns its own navigation
    // (see Navbar). Reacting here too would race that navigation.
    if (useSessionStore.getState().role === 'none') {
      router.replace('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return role;
}
