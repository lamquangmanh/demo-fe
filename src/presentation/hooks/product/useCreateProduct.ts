'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormSetError } from 'react-hook-form';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  CreateProductDocument,
  CreateProductMutationResult,
  CreateProductMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

// import from domain
import { ProductEntity } from '@/domain/entities';

export function useCreateProduct() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { createProduct: CreateProductMutationResult },
      CreateProductMutationVariables
    >(CreateProductDocument);

  // initialize notify hook
  const { t } = useTranslation();
  const notify = useToastify();

  const handleCreateProductRequest = useCallback(
    async (
      variables?: CreateProductMutationVariables,
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
        notify.success(t('product.create.successMessage', { ns: 'iam' }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createProduct as any;
      } catch (error: any) {
        console.log('CreateProduct error: ', error);

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
    handleCreateProductRequest,
    loading,
    data,
    error,
    called,
  };
}
