'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

// MUI Imports
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

// import form component
import ProductForm from './form/Form';

// import from domain
import { ProductEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateProduct } from '@/presentation/hooks';

interface ProductEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ProductEntity;
  isLoading?: boolean;
}

const ProductEditDrawer: React.FC<ProductEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const form = useForm<ProductEntity>({
    defaultValues: {
      name: '',
      description: '',
      url: '',
      icon: '',
    },
  });
  const { handleUpdateProductRequest, loading: isSubmitting } =
    useUpdateProduct();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.productId) {
      form.reset(initialData);
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const handleFinish = async (values: ProductEntity) => {
    const result = await handleUpdateProductRequest(
      {
        ...values,
        productId: initialData?.productId ?? '',
      },
      form.setError,
    );

    // check success
    if (result) {
      onUpdateSuccess();
      form.reset();
    }
  };

  const handleClose = () => {
    // Reset form fields and close the drawer
    form.reset();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('product.edit.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {isLoading || !initialData ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <ProductForm onSubmit={handleFinish} form={form} />
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button onClick={handleClose} variant="outlined">
              {t('product.edit.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              type="submit"
              form="product-form"
            >
              {t('product.edit.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProductEditDrawer;
