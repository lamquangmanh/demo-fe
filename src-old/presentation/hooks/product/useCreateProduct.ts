'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  CreateProductDocument,
  CreateProductMutationResult,
  CreateProductMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

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
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleCreateProductRequest = useCallback(
    async (
      variables?: CreateProductMutationVariables
    ): Promise<ProductEntity | undefined> => {
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
          message: t('product.create.successMessage', { ns: 'iam' }),
          description: t('product.create.successDescription', { ns: 'iam' }),
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result?.data?.createProduct as any;
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
    handleCreateProductRequest,
    loading,
    data,
    error,
    called,
  };
}
