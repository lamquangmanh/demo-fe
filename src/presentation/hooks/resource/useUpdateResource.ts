'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  UpdateResourceDocument,
  UpdateResourceMutationResult,
  UpdateResourceMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

// import from domain
import { ResourceEntity } from '@/domain/entities';

export interface UseUpdateResourceProps {
  isNotifyError?: boolean;
  isNotifySuccess?: boolean;
}

export function useUpdateResource(props?: UseUpdateResourceProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { updateResource: UpdateResourceMutationResult },
      UpdateResourceMutationVariables
    >(UpdateResourceDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleUpdateResourceRequest = useCallback(
    async (
      variables?: UpdateResourceMutationVariables,
      setError?: UseFormSetError<ResourceEntity>,
    ): Promise<ResourceEntity | undefined> => {
      try {
        // if loading is true, return early
        if (loading) {
          return;
        }

        const result = await safeRunMutation(variables);

        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(setError as any, result as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0 && isNotifyError) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success(t('resource.edit.successMessage', { ns: 'iam' }));
        }

        return result?.data?.updateResource as any;
      } catch (error: any) {
        console.log('UpdateResource error: ', error);

        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(setError as any, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0 && isNotifyError) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        return;
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess],
  );

  return {
    handleUpdateResourceRequest,
    loading,
    data,
    error,
    called,
  };
}
