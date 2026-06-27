'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  UpdateRoleDocument,
  UpdateRoleMutationResult,
  UpdateRoleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

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
  const notify = useToastify();
  const { t } = useTranslation();

  const handleUpdateRoleRequest = useCallback(
    async (
      variables?: UpdateRoleMutationVariables,
      setError?: UseFormSetError<RoleEntity>,
    ): Promise<RoleEntity | undefined> => {
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
          notify.success(t('role.edit.successMessage', { ns: 'iam' }));
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.updateRole as any;
      } catch (error: any) {
        console.log('UpdateRole error: ', error);

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
    handleUpdateRoleRequest,
    loading,
    data,
    error,
    called,
  };
}
