'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  UpdateSuccessResponse,
  UpdateUserDocument,
  UpdateUserMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

export interface UseUpdateUserProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useUpdateUser(props?: UseUpdateUserProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { updateUser: UpdateSuccessResponse },
      UpdateUserMutationVariables
    >(UpdateUserDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleUpdateUserRequest = useCallback(
    async (
      variables?: UpdateUserMutationVariables,
    ): Promise<UpdateSuccessResponse | undefined | GraphQLError> => {
      try {
        // if loading is true, return early
        if (loading) {
          return;
        }

        const result = await safeRunMutation(variables);
        // handle error if any
        if (!result || result?.errors) {
          console.log('GraphQL error:', result?.errors);
          if (isNotifyError) notify.error(DEFAULT_ERROR.message);
          return result as GraphQLError;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success(t('user.edit.successMessage', { ns: 'iam' }));
        }

        return result?.data?.updateUser;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        if (isNotifyError) notify.error(DEFAULT_ERROR.message);
        return error as GraphQLError;
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess],
  );

  return {
    handleUpdateUserRequest,
    loading,
    data,
    error,
    called,
  };
}
