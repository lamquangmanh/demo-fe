'use client';

// import from libraries
import { useCallback } from 'react';
import { QueryHookOptions } from '@apollo/client';

// import from presentation/hooks
import { useAbstractHook, useNotify } from '../common';

// import from infrastructure
import {
  UserDocument,
  UserQueryVariables,
  UserEntity as UserResponse,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { UserEntity } from '@/domain/entities';

type UseListUserOptions = QueryHookOptions<
  { user: UserResponse },
  UserQueryVariables
>;

export function useDetailUser(
  props?: { isNotifyError?: boolean },
  options?: UseListUserOptions
) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize hooks
  const { runQuery, loading, data, error, called } = useAbstractHook<
    { user: UserResponse },
    UserQueryVariables
  >(UserDocument, options);

  // initialize notify hook
  const [notify] = useNotify();

  const handleGetDetailUserRequest = useCallback(
    async (
      variables?: UserQueryVariables
    ): Promise<UserEntity | null | GraphQLError> => {
      try {
        const result = await runQuery(variables);
        // handle error if any
        if (!result || result?.error) {
          console.log('GraphQL error:', result?.error);
          if (isNotifyError) notify.error(DEFAULT_ERROR);
          return result as GraphQLError;
        }

        // handle success
        return (result.data?.user as any) || null;
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
    handleGetDetailUserRequest,
    loading,
    data,
    error,
    called,
  };
}
