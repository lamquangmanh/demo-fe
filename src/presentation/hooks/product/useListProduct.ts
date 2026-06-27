'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useToastify } from '../common';

// import from infrastructure
import {
  GetProductsResponse,
  ProductsQueryVariables,
  ProductsDocument,
} from '@/infrastructure/graphql';

// import from common
import { TableDataResponse } from '@/common/interfaces';
import { NO_DATA, DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { ProductEntity } from '@/domain/entities';

export function useListProduct(
  options?: QueryHookOptions<
    { products: GetProductsResponse },
    ProductsQueryVariables
  >,
) {
  // initialize hooks
  const {
    runQuery: getProductsQuery,
    loading,
    data,
    error,
    called,
  } = useAbstractHook<
    { products: GetProductsResponse },
    ProductsQueryVariables
  >(ProductsDocument, options);

  // initialize notify hook
  const notify = useToastify();

  const handleGetProductsRequest = useCallback(
    async (
      variables?: ProductsQueryVariables,
    ): Promise<TableDataResponse<ProductEntity>> => {
      try {
        // if loading is true, return early
        if (loading) {
          return NO_DATA;
        }

        const result = await getProductsQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          notify.error(DEFAULT_ERROR.message);
          return NO_DATA;
        }

        // handle success
        return {
          data: result.data?.products.data || [],
          total: result.data?.products.pagination.totalItems || 0,
          success: true,
        };
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        notify.error(DEFAULT_ERROR.message);
        return NO_DATA;
      }
    },
    [getProductsQuery, loading, notify],
  );

  return {
    handleGetProductsRequest,
    loading,
    data,
    error,
    called,
  };
}
