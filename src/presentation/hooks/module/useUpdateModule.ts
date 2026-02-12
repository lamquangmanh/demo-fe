'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  UpdateModuleDocument,
  UpdateModuleMutationResult,
  UpdateModuleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

// import from domain
import { ModuleEntity } from '@/domain/entities';

export function useUpdateModule() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { updateModule: UpdateModuleMutationResult },
      UpdateModuleMutationVariables
    >(UpdateModuleDocument);

  // initialize notify hook
  const notify = useNotify();
  const { t } = useTranslation();

  const handleUpdateModuleRequest = useCallback(
    async (
      variables?: UpdateModuleMutationVariables,
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
        notify.success({
          message: t('module.edit.successMessage', { ns: 'iam' }),
          description: t('module.edit.successDescription', { ns: 'iam' }),
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.updateModule as any;
      } catch (error: any) {
        console.log('UpdateModule error: ', error);

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
    handleUpdateModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
