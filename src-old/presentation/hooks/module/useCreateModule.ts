'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  CreateModuleDocument,
  CreateModuleMutationResult,
  CreateModuleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

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
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleCreateModuleRequest = useCallback(
    async (
      variables?: CreateModuleMutationVariables
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
          message: t('module.create.successMessage', { ns: 'iam' }),
          description: t('module.create.successDescription', { ns: 'iam' }),
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createModule as any;
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
    handleCreateModuleRequest,
    loading,
    data,
    error,
    called,
  };
}
