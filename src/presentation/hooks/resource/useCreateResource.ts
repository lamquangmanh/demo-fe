'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  CreateResourceDocument,
  CreateResourceMutationResult,
  CreateResourceMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { ResourceEntity } from '@/domain/entities';

export interface UseCreateResourceProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useCreateResource(props?: UseCreateResourceProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { createResource: CreateResourceMutationResult },
      CreateResourceMutationVariables
    >(CreateResourceDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleCreateResourceRequest = useCallback(
    async (
      variables?: CreateResourceMutationVariables,
      setError?: UseFormSetError<ResourceEntity>,
    ): Promise<ResourceEntity | undefined | GraphQLError> => {
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
          return result as GraphQLError;
        }

        // handle success
        if (isNotifySuccess) {
          notify.success(t('resource.create.successMessage', { ns: 'iam' }));
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createResource as any;
      } catch (error: any) {
        console.log('CreateResource error: ', error);

        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(setError as any, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0 && isNotifyError) {
            notify.error(errorOutOffFormMessage);
          }
          return error as GraphQLError;
        }

        return error as GraphQLError;
      }
    },
    [safeRunMutation, loading, notify, t, isNotifyError, isNotifySuccess],
  );

  return {
    handleCreateResourceRequest,
    loading,
    data,
    error,
    called,
  };
}
