'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DocumentNode,
  OperationVariables,
  useMutation,
  MutationHookOptions,
} from '@apollo/client';

export function useAbstractMutationHook<
  TData = any,
  TVariables extends OperationVariables = any
>(query: DocumentNode, options?: MutationHookOptions<TData, TVariables>) {
  const [runMutation, { loading, data, error, called }] = useMutation<
    TData,
    TVariables
  >(query, {
    ...options,
    fetchPolicy: 'no-cache', // optional: avoid caching
  });

  const safeRunMutation = async (variables?: TVariables) => {
    if (!loading) {
      return runMutation({ variables });
    }
  };

  return {
    runMutation,
    safeRunMutation,
    loading,
    data,
    error,
    called,
  };
}
