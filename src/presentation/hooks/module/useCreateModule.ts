'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  CreateModuleDocument,
  CreateModuleMutationResult,
  CreateModuleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

// import from domain
import { ModuleEntity } from '@/domain/entities';

export function useCreateModule() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { createModule: CreateModuleMutationResult },
      CreateModuleMutationVariables
    >(CreateModuleDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleCreateModuleRequest = useCallback(
    async (
      variables?: CreateModuleMutationVariables,
      setError?: UseFormSetError<ModuleEntity>,
    ): Promise<ModuleEntity | undefined> => {
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
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        // handle success
        notify.success(t('module.create.successMessage', { ns: 'iam' }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createModule as any;
      } catch (error: any) {
        console.log('CreateModule error: ', error);

        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(setError as any, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        return;
      }
    },
    [safeRunMutation, loading, notify, t],
  );

  return {
    handleCreateModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
