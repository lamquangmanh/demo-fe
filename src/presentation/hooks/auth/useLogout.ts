'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// import from common
import { LOGIN_PATH } from '@/common/constants';
// import from domain
import { useAuthStore } from '@/domain/stores';

export function useLogout() {
  // initialize router
  const router = useRouter();
  const { clear } = useAuthStore();

  // handle logout function
  const handleLogout = useCallback(() => {
    try {
      // clear accessToken and refreshToken from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // clear auth store
      clear();

      // redirect to login page
      router.push(LOGIN_PATH);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router, clear]);

  return {
    handleLogout,
  };
}
