'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  CreateUserDocument,
  CreateUserMutationResult,
  CreateUserMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { UserEntity } from '@/domain/entities';

export interface UseCreateUserProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useCreateUser(props?: UseCreateUserProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { createUser: CreateUserMutationResult },
      CreateUserMutationVariables
    >(CreateUserDocument);

  // initialize notify hook
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleCreateUserRequest = useCallback(
    async (
      variables?: CreateUserMutationVariables
    ): Promise<UserEntity | undefined | GraphQLError> => {
      try {
        // if loading is true, return early
        if (loading) {
          return;
        }

        const result = await safeRunMutation(variables);
        // handle error if any
        if (!result || result?.errors) {
          console.log('GraphQL error:', result?.errors);
          if (isNotifyError) notify.error(DEFAULT_ERROR);
          return result as GraphQLError;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success({
            message: t('user.create.successMessage', { ns: 'iam' }),
            description: t('user.create.successDescription', { ns: 'iam' }),
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createUser as any;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR);
        return error as GraphQLError;
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess]
  );

  return {
    handleCreateUserRequest,
    loading,
    data,
    error,
    called,
  };
}
