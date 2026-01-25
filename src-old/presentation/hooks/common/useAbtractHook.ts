'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useLazyQuery,
  DocumentNode,
  QueryHookOptions,
  OperationVariables,
} from '@apollo/client';

export function useAbstractHook<
  TData = any,
  TVariables extends OperationVariables = any
>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) {
  const [runQuery, { loading, data, error, called }] = useLazyQuery<
    TData,
    TVariables
  >(query, {
    ...options,
    fetchPolicy: 'no-cache', // optional: avoid caching
  });

  const safeRunQuery = async (variables?: TVariables) => {
    if (!loading) {
      return runQuery({ variables });
    }
  };

  return {
    runQuery: safeRunQuery,
    loading,
    data,
    error,
    called,
  };
}
