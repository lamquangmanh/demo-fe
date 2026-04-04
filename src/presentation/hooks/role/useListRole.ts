'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  GetRolesResponse,
  RolesQueryVariables,
  RolesDocument,
} from '@/infrastructure/graphql';

// import from common
import { TableDataResponse } from '@/common/interfaces';
import { NO_DATA, DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { RoleEntity } from '@/domain/entities';

type UseListRoleOptions = QueryHookOptions<
  { roles: GetRolesResponse },
  RolesQueryVariables
>;

export function useListRole(
  props?: { isNotifyError?: boolean },
  options?: UseListRoleOptions,
) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { roles: GetRolesResponse },
    RolesQueryVariables
  >(RolesDocument, options);

  // initialize notify hook
  const notify = useNotify();

  const handleGetRolesRequest = useCallback(
    async (
      variables?: RolesQueryVariables,
    ): Promise<TableDataResponse<RoleEntity>> => {
      try {
        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          if (isNotifyError) notify.error(DEFAULT_ERROR.message);
          return NO_DATA;
        }

        // handle success
        return {
          data: (result.data?.roles?.data as any) || [],
          total: result.data?.roles?.pagination?.totalItems || 0,
          success: true,
        };
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR.message);
        return NO_DATA;
      }
    },
    [runQuery, notify, isNotifyError],
  );

  return {
    handleGetRolesRequest,
    loading,
    data,
    error,
    called,
  };
}
