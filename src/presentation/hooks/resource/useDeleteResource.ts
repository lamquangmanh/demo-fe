'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  DeleteResourceDocument,
  DeleteResourceMutationResult,
  DeleteResourceMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

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
  const notify = useToastify();
  const { t } = useTranslation();

  const handleDeleteResourceRequest = useCallback(
    async (
      variables?: DeleteResourceMutationVariables,
    ): Promise<DeleteResourceMutationResult | undefined> => {
      try {
        // if loading is true, return early
        if (loading) {
          return;
        }

        const result = await safeRunMutation(variables);

        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(undefined, result as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0 && isNotifyError) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success(t('resource.delete.successMessage', { ns: 'iam' }));
        }

        return result?.data?.deleteResource;
      } catch (error: any) {
        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(undefined, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0 && isNotifyError) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess],
  );

  return {
    handleDeleteResourceRequest,
    loading,
    data,
    error,
    called,
  };
}
