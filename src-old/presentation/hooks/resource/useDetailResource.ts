'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  ResourceDocument,
  ResourceQueryVariables,
  ResourceEntity as ResourceResponse,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { ResourceEntity } from '@/domain/entities';

type UseListResourceOptions = QueryHookOptions<
  { resource: ResourceResponse },
  ResourceQueryVariables
>;

export function useDetailResource(
  props?: { isNotifyError?: boolean },
  options?: UseListResourceOptions
) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { resource: ResourceResponse },
    ResourceQueryVariables
  >(ResourceDocument, options);

  // initialize notify hook
  const [notify] = useNotify();

  const handleGetDetailResourceRequest = useCallback(
    async (
      variables?: ResourceQueryVariables
    ): Promise<ResourceEntity | null | GraphQLError> => {
      try {
        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          if (isNotifyError) notify.error(DEFAULT_ERROR);
          return result as GraphQLError;
        }

        // handle success
        return (result.data?.resource as any) || null;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR);
        return error as GraphQLError;
      }
    },
    [runQuery, notify, isNotifyError]
  );

  return {
    handleGetDetailResourceRequest,
    loading,
    data,
    error,
    called,
  };
}
