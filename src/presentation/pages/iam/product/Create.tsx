'use client';

import React from 'react';
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

// import form component
import ProductForm from './form/Form';

// import from domain
import { ProductEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateProduct } from '@/presentation/hooks';

interface ProductCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ProductCreateDrawer: React.FC<ProductCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
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
  const { handleCreateProductRequest, loading: isSubmitting } =
    useCreateProduct();

  const handleFinish = async (values: ProductEntity) => {
    const result = await handleCreateProductRequest(values, form.setError);

    // check success
    if (result) {
      onCreateSuccess();
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
            {t('product.create.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <ProductForm onSubmit={handleFinish} form={form} />
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
              {t('product.create.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              type="submit"
              form="product-form"
            >
              {t('product.create.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProductCreateDrawer;
