'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  UpdateRoleDocument,
  UpdateRoleMutationResult,
  UpdateRoleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

// import from domain
import { RoleEntity } from '@/domain/entities';

export interface UseUpdateRoleProps {
  isNotifyError?: boolean;
  isNotifySuccess?: boolean;
}

export function useUpdateRole(props?: UseUpdateRoleProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { updateRole: UpdateRoleMutationResult },
      UpdateRoleMutationVariables
    >(UpdateRoleDocument);

  // initialize notify hook
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleUpdateRoleRequest = useCallback(
    async (
      variables?: UpdateRoleMutationVariables
    ): Promise<RoleEntity | undefined> => {
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
            message: t('role.edit.successMessage', { ns: 'iam' }),
            description: t('role.edit.successDescription', { ns: 'iam' }),
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.updateRole as any;
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
    handleUpdateRoleRequest,
    loading,
    data,
    error,
    called,
  };
}
