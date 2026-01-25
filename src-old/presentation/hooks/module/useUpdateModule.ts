'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  UpdateModuleDocument,
  UpdateModuleMutationResult,
  UpdateModuleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

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
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleUpdateModuleRequest = useCallback(
    async (
      variables?: UpdateModuleMutationVariables
    ): Promise<ModuleEntity | undefined> => {
      try {
        // if loading is true, return early
        if (loading) {
          return;
        }

        const result = await safeRunMutation(variables);
        // handle error if any
        if (!result || result?.errors) {
          console.log('GraphQL error:', result?.errors);
          notify.error(DEFAULT_ERROR);
          return;
        }

        // handle success
        notify.success({
          message: t('module.edit.successMessage', { ns: 'iam' }),
          description: t('module.edit.successDescription', { ns: 'iam' }),
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.updateModule as any;
      } catch (error) {
        console.log('Network or unexpected error:', error);
        // Handle error appropriately, e.g., show a notification
        notify.error(DEFAULT_ERROR);
        return;
      }
    },
    [safeRunMutation, loading, notify, t]
  );

  return {
    handleUpdateModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
