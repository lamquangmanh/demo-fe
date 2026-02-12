'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  ModuleDocument,
  ModuleQueryVariables,
  ModuleEntity as ModuleResponse,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { ModuleEntity } from '@/domain/entities';

type UseListModuleOptions = QueryHookOptions<
  { module: ModuleResponse },
  ModuleQueryVariables
>;

export function useDetailModule(options?: UseListModuleOptions) {
  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { module: ModuleResponse },
    ModuleQueryVariables
  >(ModuleDocument, options);

  // initialize notify hook
  const notify = useNotify();

  const handleGetDetailModuleRequest = useCallback(
    async (variables?: ModuleQueryVariables): Promise<ModuleEntity | null> => {
      try {
        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          notify.error(DEFAULT_ERROR.message);
          return null;
        }

        // handle success
        return result.data?.module || null;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        notify.error(DEFAULT_ERROR.message);
        return null;
      }
    },
    [runQuery, notify]
  );

  return {
    handleGetDetailModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
