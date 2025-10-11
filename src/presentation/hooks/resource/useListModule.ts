'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  GetModulesDocument,
  GetModulesQueryVariables,
  GetModulesResponse,
} from '@/infrastructure/graphql';

// import from common
import { TableDataResponse } from '@/common/interfaces';
import { NO_DATA, DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { ModuleEntity } from '@/domain/entities';

type UseListModuleOptions = QueryHookOptions<
  { modules: GetModulesResponse },
  GetModulesQueryVariables
>;

export function useListModule(options?: UseListModuleOptions) {
  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { modules: GetModulesResponse },
    GetModulesQueryVariables
  >(GetModulesDocument, options);

  // initialize notify hook
  const [notify] = useNotify();

  const handleGetModulesRequest = useCallback(
    async (
      variables?: GetModulesQueryVariables
    ): Promise<TableDataResponse<ModuleEntity>> => {
      try {
        // if loading is true, return early
        if (loading) {
          return NO_DATA;
        }

        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          notify.error(DEFAULT_ERROR);
          return NO_DATA;
        }

        // handle success
        return {
          data: result.data?.modules?.data || [],
          total: result.data?.modules?.pagination?.totalItems || 0,
          success: true,
        };
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        notify.error(DEFAULT_ERROR);
        return NO_DATA;
      }
    },
    [runQuery, loading, notify]
  );

  return {
    handleGetModulesRequest,
    loading,
    data,
    error,
    called,
  };
}
