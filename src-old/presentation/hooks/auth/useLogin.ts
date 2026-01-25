'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// import from domain
import { DASHBOARD_PATH } from '@/common/constants';

// import from presentation/hooks
import { useAbstractHook } from '../common/useAbtractHook';
import { useNotify } from '../common/useNotify';

// import from domain
import { useAuthStore } from '@/domain/stores';

// import from infrastructure
import {
  LoginDocument,
  LoginQueryVariables,
  LoginResponse,
} from '@/infrastructure/graphql';

export function useLogin(options?: Record<string, any>) {
  // initialize router
  const router = useRouter();
  const [notify] = useNotify();
  const { setAuthenticated } = useAuthStore();

  const {
    runQuery: runLoginQuery,
    loading,
    data,
    error,
    called,
  } = useAbstractHook<{ login: LoginResponse }, LoginQueryVariables>(
    LoginDocument,
    options
  );

  // handle login function
  const handleLogin = useCallback(
    async (variables: LoginQueryVariables) => {
      try {
        const result = await runLoginQuery(variables);

        // handle error if any
        if (!result || result?.error || !result.data?.login?.success) {
          console.log('GraphQL errors:', result?.error);
          // You can throw or handle errors here
          // show a notification
          notify.error({
            message: 'Something went wrong',
            description: 'Please check your credentials and try again.',
            duration: 10,
          });
          return;
        }

        // set isAuthenticated to true
        setAuthenticated(true);

        // handle success
        notify.success({
          message: 'Login successful',
          description: 'You have successfully logged in.',
          duration: 10,
        });
        // // redirect to dashboard
        router.push(DASHBOARD_PATH);
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        notify.error({
          message: 'Something went wrong',
          description:
            error?.toString() ?? 'Please check your credentials and try again.',
        });
      }
    },
    [runLoginQuery, router, notify, setAuthenticated]
  );

  return {
    handleLogin,
    loading,
    data,
    error,
    called,
  };
}
