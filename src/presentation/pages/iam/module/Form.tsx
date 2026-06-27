import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormReturn, Controller } from 'react-hook-form';

// MUI Imports
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation
import { useListProduct } from '@/presentation/hooks';

interface ModuleFormProps {
  form: UseFormReturn<ModuleEntity>;
  onSubmit: (values: ModuleEntity) => void;
  initialData?: ModuleEntity;
}

interface ProductOption {
  label: string;
  value: string;
}

const ModuleForm: React.FC<ModuleFormProps> = ({
  form,
  onSubmit,
  initialData,
}) => {
  const { t } = useTranslation();
  const { handleGetProductsRequest } = useListProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [productLoading, setProductLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productInputValue, setProductInputValue] = useState('');

  useEffect(() => {
    if (initialData?.product) {
      setProductOptions([
        {
          label: initialData.product.name,
          value: initialData.product.productId,
        },
      ]);
    }
  }, [initialData]);

  const handleSearchProduct = async (value: string) => {
    try {
      setProductLoading(true);
      const result = await handleGetProductsRequest({
        filters: value ? [{ field: 'name', value }] : [],
        pagination: {
          page: 1,
          limit: 50,
        },
        sorts: [],
      });

      if (result && result.data) {
        const options = result.data.map((item) => ({
          label: item.name,
          value: item.productId,
        }));
        setProductOptions(options);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductLoading(false);
    }
  };

  // Debounce handleSearchProduct
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const debounceSearchProduct = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearchProduct(value);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="module-form">
      <Stack spacing={3}>
        <Controller
          name="productId"
          control={control}
          rules={{
            required: t('module.form.error.productId', { ns: 'iam' }),
          }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              options={productOptions}
              loading={productLoading}
              value={productOptions.find((opt) => opt.value === value) || null}
              onChange={(_, newValue) => {
                onChange(newValue?.value || '');
              }}
              onInputChange={(_, newInputValue, reason) => {
                setProductInputValue(newInputValue);
                if (reason === 'input') {
                  debounceSearchProduct(newInputValue);
                }
              }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onOpen={() => {
                handleSearchProduct('');
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('module.form.productId', { ns: 'iam' })}
                  error={!!errors.productId}
                  helperText={errors.productId?.message}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {productLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          )}
        />

        <TextField
          label={t('module.form.name', { ns: 'iam' })}
          placeholder={t('module.form.name', { ns: 'iam' })}
          fullWidth
          {...register('name', {
            required: t('module.form.error.name', { ns: 'iam' }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label={t('module.form.description', { ns: 'iam' })}
          placeholder={t('module.form.description', { ns: 'iam' })}
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: t('module.form.error.description', { ns: 'iam' }),
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label={t('module.form.url', { ns: 'iam' })}
          placeholder={t('module.form.url', { ns: 'iam' })}
          fullWidth
          {...register('url')}
        />

        <TextField
          label={t('module.form.icon', { ns: 'iam' })}
          placeholder={t('module.form.icon', { ns: 'iam' })}
          fullWidth
          {...register('icon')}
        />
      </Stack>
    </form>
  );
};

export default ModuleForm;
