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
import ResourceForm from './Form';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateResource } from '@/presentation/hooks';

interface ResourceCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ResourceCreateDrawer: React.FC<ResourceCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const form = useForm<ResourceEntity>({
    defaultValues: {
      name: '',
      moduleId: '',
      actions: [],
    },
  });
  const { handleCreateResourceRequest, loading: isSubmiting } =
    useCreateResource();

  const handleFinish = async (formValues: ResourceEntity) => {
    const result: any = await handleCreateResourceRequest(
      {
        ...formValues,
        actions:
          formValues.actions?.map((action) => ({
            ...action,
            description: action.description || '',
          })) || [],
      },
      form.setError,
    );

    // if success, reset form and close drawer
    if (result?.resourceId) {
      form.reset();
      onCreateSuccess();
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
          width: 1200,
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
            {t('resource.create.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <ResourceForm onSubmit={handleFinish} form={form} />
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
              {t('resource.create.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmiting}
              type="submit"
              form="resource-form"
            >
              {t('resource.create.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ResourceCreateDrawer;
