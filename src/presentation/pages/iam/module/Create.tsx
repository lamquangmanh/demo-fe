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
import ModuleForm from './Form';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateModule } from '@/presentation/hooks';

interface ModuleCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ModuleCreateDrawer: React.FC<ModuleCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const form = useForm<ModuleEntity>({
    defaultValues: {
      name: '',
      description: '',
      url: '',
      icon: '',
      productId: '',
    },
  });
  const { handleCreateModuleRequest, loading: isSubmiting } = useCreateModule();

  const handleFinish = async (values: ModuleEntity) => {
    const result = await handleCreateModuleRequest(
      {
        ...values,
        productId: values.productId ?? '',
      },
      form.setError,
    );

    // check success
    if (result?.moduleId) {
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
            {t('module.create.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <ModuleForm onSubmit={handleFinish} form={form} />
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
              {t('module.create.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmiting}
              type="submit"
              form="module-form"
            >
              {t('module.create.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ModuleCreateDrawer;
