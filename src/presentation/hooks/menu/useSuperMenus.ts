'use client';

import { useCallback } from 'react';

// import from presentation/hooks
import { useAbstractHook } from '../common/useAbtractHook';

// import from domain
import { useMenuStore } from '@/domain/stores';

// import from infrastructure
import {
  GetSuperMenusDocument,
  GetSuperMenusResponse,
  GetSuperMenusQueryVariables,
} from '@/infrastructure/graphql';

export function useSuperMenus() {
  const {
    runQuery: getSuperMenuQuery,
    loading,
    data,
    error,
    called,
  } = useAbstractHook<
    { getSuperMenus: GetSuperMenusResponse },
    GetSuperMenusQueryVariables
  >(GetSuperMenusDocument);

  const { setSuperMenus } = useMenuStore();

  // handle login function
  const getSuperMenuRequest = useCallback(async () => {
    try {
      const result = await getSuperMenuQuery();

      // handle error if any
      if (!result || result.error) {
        console.log('GraphQL errors:', result);
        // You can throw or handle errors here
        return;
      }

      // set super menus in store
      if (result.data?.getSuperMenus) {
        setSuperMenus(result.data.getSuperMenus.superMenus);
      }
    } catch (error) {
      console.log('Network or unexpected error:', error);
    }
  }, [getSuperMenuQuery, setSuperMenus]);

  return {
    getSuperMenuRequest,
    loading,
    data,
    error,
    called,
  };
}
