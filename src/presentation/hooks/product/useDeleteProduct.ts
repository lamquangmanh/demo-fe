'use client';

// import from libraries
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

// import from presentation/hooks
import { useAbstractMutationHook, useToastify } from '../common';

// import from infrastructure
import {
  DeleteProductDocument,
  DeleteProductMutationResult,
  DeleteProductMutationVariables,
} from '@/infrastructure/graphql';

// import from common
import { mappingErrorToReactHookForm } from '@/common/utils';

export function useDeleteProduct() {
  // initialize hooks
  const { safeRunMutation, loading, data, error, called } =
    useAbstractMutationHook<
      { deleteProduct: DeleteProductMutationResult },
      DeleteProductMutationVariables
    >(DeleteProductDocument);

  // initialize notify hook
  const notify = useToastify();
  const { t } = useTranslation();

  const handleDeleteProductRequest = useCallback(
    async (
      variables?: DeleteProductMutationVariables,
    ): Promise<DeleteProductMutationResult | undefined> => {
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
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }

        // handle success
        notify.success(t('product.delete.successMessage', { ns: 'iam' }));

        return result?.data?.deleteProduct;
      } catch (error: any) {
        // handle error if any
        const { hasError, errorOutOffFormMessage } =
          mappingErrorToReactHookForm(undefined, error as any);
        if (hasError) {
          if (errorOutOffFormMessage.length > 0) {
            notify.error(errorOutOffFormMessage);
          }
          return;
        }
      }
    },
    [loading, safeRunMutation, notify, t],
  );

  return {
    handleDeleteProductRequest,
    loading,
    data,
    error,
    called,
  };
}
