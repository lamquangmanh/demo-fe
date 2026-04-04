'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useLazyQuery,
  DocumentNode,
  QueryHookOptions,
  OperationVariables,
  QueryResult,
} from '@apollo/client';
import { useRouter } from 'next/navigation';

import { LOGIN_PATH } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

export function useAbstractHook<
  TData = any,
  TVariables extends OperationVariables = any,
>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) {
  const router = useRouter();

  const [runQuery, { loading, data, error, called }] = useLazyQuery<
    TData,
    TVariables
  >(query, {
    ...options,
    fetchPolicy: 'no-cache', // optional: avoid caching
  });

  type RunSafeQueryResult =
    | QueryResult<TData, TVariables>
    | undefined
    | GraphQLError;

  // const handleUnauthorized = (result: any): boolean => {
  //   const errors = result?.error || result?.graphQLErrors || [];
  //   // check unauthorized error
  //   if (errors?.length > 0) {
  //     console.log('handleUnauthorized error detected: ', errors);
  //     const unauthorized = errors.find(
  //       (err: any) => err.extensions?.code === 'UNAUTHORIZED',
  //     );
  //     if (result?.error?.cause?.statusCode === 401 || unauthorized) {
  //       router.push(LOGIN_PATH);
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  // const safeRunQuery = async (
  //   variables?: TVariables,
  // ): Promise<QueryResult<TData, TVariables> | undefined | GraphQLError> => {
  //   try {
  //     // check if loading is true
  //     if (loading) return;

  //     const result = await runQuery({ variables });
  //     if (handleUnauthorized(result)) return;

  //     return result;
  //   } catch (e) {
  //     console.error('useAbstractHook safeRunQuery error: ', e);
  //     if (handleUnauthorized(e)) return;

  //     throw e;
  //   }
  // };

  const safeRunQuery = async (
    variables?: TVariables,
  ): Promise<RunSafeQueryResult> => {
    const result = await runQuery({ variables });

    // Check for 401 unauthorized errors
    if (result?.error) {
      console.log('useAbstractHook error detected: ', result.error);

      // Check for UNAUTHORIZED in GraphQL errors
      const unauthorized = result.error.graphQLErrors?.find(
        (err) => err.extensions?.code === 'UNAUTHORIZED',
      );

      // Check for 401 status in network errors
      const isNetworkUnauthorized =
        result.error.networkError &&
        'statusCode' in result.error.networkError &&
        result.error.networkError.statusCode === 401;

      if (unauthorized || isNetworkUnauthorized) {
        console.log('Unauthorized access - redirecting to login.');
        router.push(LOGIN_PATH);
        return;
      }
    }

    return result;
  };

  return {
    runQuery: safeRunQuery,
    loading,
    data,
    error,
    called,
  };
}
