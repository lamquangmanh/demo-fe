'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  CreateRoleDocument,
  CreateRoleMutationResult,
  CreateRoleMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';
import { GraphQLError } from '@/common/interfaces';

// import from domain
import { RoleEntity } from '@/domain/entities';

export interface UseCreateRoleProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useCreateRole(props?: UseCreateRoleProps) {
  const isNotifyError = props?.isNotifyError ?? true;
  const isNotifySuccess = props?.isNotifySuccess ?? true;

  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { createRole: CreateRoleMutationResult },
      CreateRoleMutationVariables
    >(CreateRoleDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleCreateRoleRequest = useCallback(
    async (
      variables?: CreateRoleMutationVariables,
      setError?: UseFormSetError<RoleEntity>,
    ): Promise<RoleEntity | undefined | GraphQLError> => {
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
          notify.success(t('role.create.successMessage', { ns: 'iam' }));
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createRole as any;
      } catch (error: any) {
        console.log('CreateRole error: ', error);

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
    handleCreateRoleRequest,
    loading,
    data,
    error,
    called,
  };
}
