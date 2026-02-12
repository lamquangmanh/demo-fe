import React from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormReturn } from 'react-hook-form';

// MUI Imports
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// import from domain
import { ProductEntity } from '@/domain/entities';

interface ProductFormProps {
  form: UseFormReturn<ProductEntity>;
  onSubmit: (values: ProductEntity) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="product-form">
      <Stack spacing={3}>
        <TextField
          label={t('product.form.name', { ns: 'iam' })}
          placeholder={t('product.form.name', { ns: 'iam' })}
          fullWidth
          {...register('name', {
            required: t('product.form.error.name', { ns: 'iam' }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label={t('product.form.description', { ns: 'iam' })}
          placeholder={t('product.form.description', { ns: 'iam' })}
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: t('product.form.error.description', { ns: 'iam' }),
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label={t('product.form.url', { ns: 'iam' })}
          placeholder={t('product.form.url', { ns: 'iam' })}
          fullWidth
          {...register('url', {
            required: t('product.form.error.url', { ns: 'iam' }),
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />

        <TextField
          label={t('product.form.icon', { ns: 'iam' })}
          placeholder={t('product.form.icon', { ns: 'iam' })}
          fullWidth
          {...register('icon')}
        />
      </Stack>
    </form>
  );
};

export default ProductForm;
