'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  DeleteUserDocument,
  DeleteUserMutationResult,
  DeleteUserMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

export interface UseDeleteUserProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useDeleteUser(props?: UseDeleteUserProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteUser: DeleteUserMutationResult },
      DeleteUserMutationVariables
    >(DeleteUserDocument);

  // initialize notify hook
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleDeleteUserRequest = useCallback(
    async (
      variables?: DeleteUserMutationVariables
    ): Promise<DeleteUserMutationResult | undefined> => {
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
          return;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success({
            message: t('user.delete.successMessage', { ns: 'iam' }),
            description: t('user.delete.successDescription', { ns: 'iam' }),
          });
        }

        return result?.data?.deleteUser;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        if (isNotifyError) notify.error(DEFAULT_ERROR);
        return;
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess]
  );

  return {
    handleDeleteUserRequest,
    loading,
    data,
    error,
    called,
  };
}
