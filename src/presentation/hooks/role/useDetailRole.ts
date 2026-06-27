'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useToastify } from '../common';

// import from infrastructure
import {
  RoleDocument,
  RoleQueryVariables,
  RoleEntity as RoleResponse,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { RoleEntity } from '@/domain/entities';

type UseListRoleOptions = QueryHookOptions<
  { role: RoleResponse },
  RoleQueryVariables
>;

export function useDetailRole(
  props?: { isNotifyError?: boolean },
  options?: UseListRoleOptions,
) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { role: RoleResponse },
    RoleQueryVariables
  >(RoleDocument, options);

  // initialize notify hook
  const notify = useToastify();

  const handleGetDetailRoleRequest = useCallback(
    async (
      variables?: RoleQueryVariables,
    ): Promise<RoleEntity | null | GraphQLError> => {
      try {
        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          if (isNotifyError) notify.error(DEFAULT_ERROR.message);
          return result as GraphQLError;
        }

        // handle success
        return (result.data?.role as any) || null;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR.message);
        return error as GraphQLError;
      }
    },
    [runQuery, notify, isNotifyError],
  );

  return {
    handleGetDetailRoleRequest,
    loading,
    data,
    error,
    called,
  };
}
