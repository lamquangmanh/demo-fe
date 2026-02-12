'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DocumentNode,
  OperationVariables,
  useMutation,
  MutationHookOptions,
  FetchResult,
} from '@apollo/client';

import { useRouter } from 'next/navigation';

import { LOGIN_PATH } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

export function useAbstractMutationHook<
  TData = any,
  TVariables extends OperationVariables = any,
>(query: DocumentNode, options?: MutationHookOptions<TData, TVariables>) {
  const router = useRouter();

  const [runMutation, { loading, data, error, called }] = useMutation<
    TData,
    TVariables
  >(query, {
    ...options,
    fetchPolicy: 'no-cache', // optional: avoid caching
  });

  // const handleUnauthorized = (result: any): boolean => {
  //   const errors = result?.error || result?.graphQLErrors || [];

  //   // check unauthorized error
  //   if (errors?.length > 0) {
  //     const unauthorized = errors.find((err: any) => err.code === 401);
  //     if (result?.cause?.code === 401 || unauthorized) {
  //       router.push(LOGIN_PATH);
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  // const safeRunMutation = async (
  //   variables?: TVariables,
  // ): Promise<FetchResult<TData> | undefined | GraphQLError> => {
  //   try {
  //     // check if loading is true
  //     if (loading) return;

  //     const result = await runMutation({ variables });
  //     console.log('safeRunMutation: ', result);
  //     if (handleUnauthorized(result)) return;

  //     return result;
  //   } catch (e: any) {
  //     console.log('useAbstractMutationHook safeRunMutation error: ', e);
  //     if (handleUnauthorized(e)) return;

  //     throw e;
  //   }
  // };

  // type RunSafeMutationResult = FetchResult<TData> | undefined | GraphQLError;

  const safeRunMutation = async (variables?: TVariables) => {
    // check if loading is true
    if (loading) return;

    const result = await runMutation({ variables });

    // Check for 401 unauthorized errors
    if (result?.errors && result.errors.length > 0) {
      console.log('useAbstractMutationHook errors detected: ', result.errors);

      // Check for UNAUTHORIZED in GraphQL errors
      const unauthorized = result.errors.find(
        (err) => err.extensions?.code === 'UNAUTHORIZED',
      );

      if (unauthorized) {
        console.log('Unauthorized access - redirecting to login.');
        router.push(LOGIN_PATH);
        return;
      }
    }

    // Also check network errors from the mutation hook's error state
    if (error) {
      console.log('useAbstractMutationHook hook error detected: ', error);

      const isNetworkUnauthorized =
        error.networkError &&
        'statusCode' in error.networkError &&
        error.networkError.statusCode === 401;

      if (isNetworkUnauthorized) {
        console.log('Unauthorized access - redirecting to login.');
        router.push(LOGIN_PATH);
        return;
      }
    }

    return result;
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
