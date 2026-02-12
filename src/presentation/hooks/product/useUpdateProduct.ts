'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  UpdateProductDocument,
  UpdateProductMutationResult,
  UpdateProductMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

// import from domain
import { ProductEntity } from '@/domain/entities';

export function useUpdateProduct() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { updateProduct: UpdateProductMutationResult },
      UpdateProductMutationVariables
    >(UpdateProductDocument);

  // initialize notify hook
  const notify = useNotify();
  const { t } = useTranslation();

  const handleUpdateProductRequest = useCallback(
    async (
      variables?: UpdateProductMutationVariables,
      setError?: UseFormSetError<ProductEntity>,
    ): Promise<ProductEntity | undefined> => {
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
        notify.success(t('product.edit.successMessage', { ns: 'iam' }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.updateProduct as any;
      } catch (error: any) {
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
    handleUpdateProductRequest,
    loading,
    data,
    error,
    called,
  };
}
