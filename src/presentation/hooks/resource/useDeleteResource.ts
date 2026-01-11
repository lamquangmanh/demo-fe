'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  DeleteResourceDocument,
  DeleteResourceMutationResult,
  DeleteResourceMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

export interface UseDeleteResourceProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useDeleteResource(props?: UseDeleteResourceProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteResource: DeleteResourceMutationResult },
      DeleteResourceMutationVariables
    >(DeleteResourceDocument);

  // initialize notify hook
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleDeleteResourceRequest = useCallback(
    async (
      variables?: DeleteResourceMutationVariables
    ): Promise<DeleteResourceMutationResult | undefined> => {
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
            message: t('resource.delete.successMessage', { ns: 'iam' }),
            description: t('resource.delete.successDescription', { ns: 'iam' }),
          });
        }

        return result?.data?.deleteResource;
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
    handleDeleteResourceRequest,
    loading,
    data,
    error,
    called,
  };
}
