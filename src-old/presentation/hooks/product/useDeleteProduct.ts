'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useNotify } from '../common';

// import from infrastructure
import {
  DeleteProductDocument,
  DeleteProductMutationResult,
  DeleteProductMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';

export function useDeleteProduct() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteProduct: DeleteProductMutationResult },
      DeleteProductMutationVariables
    >(DeleteProductDocument);

  // initialize notify hook
  const [notify] = useNotify();
  const { t } = useTranslation();

  const handleDeleteProductRequest = useCallback(
    async (
      variables?: DeleteProductMutationVariables
    ): Promise<DeleteProductMutationResult | undefined> => {
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
          message: t('product.delete.successMessage', { ns: 'iam' }),
          description: t('product.delete.successDescription', { ns: 'iam' }),
        });

        return result?.data?.deleteProduct;
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
    handleDeleteProductRequest,
    loading,
    data,
    error,
    called,
  };
}
