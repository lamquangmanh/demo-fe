'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  DeleteRoleDocument,
  DeleteRoleMutationResult,
  DeleteRoleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

export interface UseDeleteRoleProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useDeleteRole(props?: UseDeleteRoleProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteRole: DeleteRoleMutationResult },
      DeleteRoleMutationVariables
    >(DeleteRoleDocument);

  // initialize notify hook
  const notify = useNotify();
  const { t } = useTranslation();

  const handleDeleteRoleRequest = useCallback(
    async (
      variables?: DeleteRoleMutationVariables,
    ): Promise<DeleteRoleMutationResult | undefined> => {
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
          notify.success({
            message: t('role.delete.successMessage', { ns: 'iam' }),
            description: t('role.delete.successDescription', { ns: 'iam' }),
          });
        }

        return result?.data?.deleteRole;
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
    handleDeleteRoleRequest,
    loading,
    data,
    error,
    called,
  };
}
