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
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

// import form component
import ModuleForm from './Form';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateModule } from '@/presentation/hooks';

interface ModuleEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ModuleEntity;
  isLoading?: boolean;
}

const ModuleEditDrawer: React.FC<ModuleEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
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
  const { handleUpdateModuleRequest, loading: isSubmitting } =
    useUpdateModule();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.moduleId) {
      form.reset(initialData);
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const handleFinish = async (values: ModuleEntity) => {
    if (!initialData?.moduleId) return;
    const result = await handleUpdateModuleRequest(
      {
        ...values,
        moduleId: initialData.moduleId,
        productId: values.productId ?? '',
      },
      form.setError,
    );

    // Call the success callback and reset the form
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
            {t('module.edit.title', { ns: 'iam' })}
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
            <ModuleForm
              onSubmit={handleFinish}
              form={form}
              initialData={initialData}
            />
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
              {t('module.edit.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting || isLoading}
              type="submit"
              form="module-form"
            >
              {t('module.edit.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ModuleEditDrawer;
