'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  DeleteModuleDocument,
  DeleteModuleMutationResult,
  DeleteModuleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

export function useDeleteModule() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteModule: DeleteModuleMutationResult },
      DeleteModuleMutationVariables
    >(DeleteModuleDocument);

  // initialize notify hook
  const notify = useNotify();
  const { t } = useTranslation();

  const handleDeleteModuleRequest = useCallback(
    async (
      variables?: DeleteModuleMutationVariables,
    ): Promise<DeleteModuleMutationResult | undefined> => {
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
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        // handle success
        notify.success({
          message: t('module.delete.successMessage', { ns: 'iam' }),
          description: t('module.delete.successDescription', { ns: 'iam' }),
        });

        return result?.data?.deleteModule;
      } catch (error: any) {
        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(undefined, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }
      }
    },
    [loading, safeRunMutation, notify, t],
  );

  return {
    handleDeleteModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
