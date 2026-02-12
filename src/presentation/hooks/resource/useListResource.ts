'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  GetResourcesResponse,
  ResourcesQueryVariables,
  ResourcesDocument,
} from '@/infrastructure/graphql';

// import from common
import { TableDataResponse } from '@/common/interfaces';
import { NO_DATA, DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { ResourceEntity } from '@/domain/entities';

type UseListResourceOptions = QueryHookOptions<
  { resources: GetResourcesResponse },
  ResourcesQueryVariables
>;

export function useListResource(
  props?: { isNotifyError?: boolean },
  options?: UseListResourceOptions
) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { resources: GetResourcesResponse },
    ResourcesQueryVariables
  >(ResourcesDocument, options);

  // initialize notify hook
  const notify = useNotify();

  const handleGetResourcesRequest = useCallback(
    async (
      variables?: ResourcesQueryVariables
    ): Promise<TableDataResponse<ResourceEntity>> => {
      try {
        // if loading is true, return early
        if (loading) {
          return NO_DATA;
        }

        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          if (isNotifyError) notify.error(DEFAULT_ERROR.message);
          return NO_DATA;
        }

        // handle success
        return {
          data: (result.data?.resources?.data as any) || [],
          total: result.data?.resources?.pagination?.totalItems || 0,
          success: true,
        };
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR.message);
        return NO_DATA;
      }
    },
    [runQuery, loading, notify, isNotifyError]
  );

  return {
    handleGetResourcesRequest,
    loading,
    data,
    error,
    called,
  };
}
