'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// import from constants
import { LOGIN_PATH } from '@/common/constants';

// import from presentation
import { useComponentMounted, useSuperMenus } from '@/presentation/hooks';
// import from presentation/components
import { PageLoading } from '@/presentation/components/atoms';

// import from domain
import { useAuthStore, AuthState, useMenuStore } from '@/domain/stores';

// Type Imports
import type { ChildrenType } from '@ui/core/types';

// Layout Imports
// import LayoutWrapper from '@ui/layouts/LayoutWrapper';

// Component Imports
// import Providers from '@ui/components/Providers';

// import infrastructure
import { initializeSocket, disconnectSocket } from '@/infrastructure/websocket';

const AuthorizedLayout = ({ children }: ChildrenType) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated,
  );

  const [hydrated, setHydrated] = useState(false);

  // initialize super menus from menu store
  // and fetch super menus from server if not already fetched
  // This is to ensure that the super menus are available for the layout
  const { superMenus, isLoaded, setIsLoaded } = useMenuStore();
  const { getSuperMenuRequest } = useSuperMenus();

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unSubscribeHydrate = useAuthStore.persist.onHydrate(() =>
      setHydrated(false),
    );

    const unSubscribeFinishHydration = useAuthStore.persist.onFinishHydration(
      () => setHydrated(true),
    );

    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unSubscribeHydrate();
      unSubscribeFinishHydration();
    };
  }, []);

  // Check if user is authenticated, if not redirect to login page
  // This effect runs on the client side to ensure the user is authenticated
  // before rendering the layout
  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.push(LOGIN_PATH);
    } else {
      // User is authenticated, initialize websocket connection
      const socket = initializeSocket();

      setTimeout(() => {
        // Emit an event to notify the server of the new connection
        socket.emit('hello', { socketId: socket.id });
      }, 10000);

      return () => {
        // Clean up the socket connection when the component unmounts
        disconnectSocket();
      };
    }
  }, [isAuthenticated, router, hydrated]);

  useEffect(() => {
    // If superMenus are not fetched, fetch them
    if (!isLoaded) {
      getSuperMenuRequest();
      setIsLoaded(true);
    }
  }, [superMenus.length, isLoaded, setIsLoaded, getSuperMenuRequest]);

  // Prevent hydration mismatch
  const isMounted = useComponentMounted();
  if (!isMounted) return <PageLoading />;

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Show nothing (or a loader) while redirecting
    return <PageLoading />;
  }

  // return (
  //   <Providers direction={'ltr'}>
  //     <LayoutWrapper>{children}</LayoutWrapper>
  //   </Providers>
  // );

  return <>{children}</>;
};

export default AuthorizedLayout;
