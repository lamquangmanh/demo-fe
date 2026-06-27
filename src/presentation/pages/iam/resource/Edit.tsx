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
import ResourceForm from './Form';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateResource } from '@/presentation/hooks';

interface ResourceEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ResourceEntity;
  isLoading?: boolean;
}

const ResourceEditDrawer: React.FC<ResourceEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const form = useForm<ResourceEntity>({
    defaultValues: {
      name: '',
      moduleId: '',
      actions: [],
    },
  });
  const { handleUpdateResourceRequest, loading: isSubmitting } =
    useUpdateResource();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.resourceId) {
      form.reset({
        name: initialData.name,
        moduleId: initialData.moduleId,
        actions:
          initialData.actions?.map((actionItem) => ({
            actionId: actionItem.actionId,
            name: actionItem.name,
            description: actionItem.description || '',
            url: actionItem.url,
            method: actionItem.method,
            requestType: actionItem.requestType,
          })) || [],
      });
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const handleFinish = async (formValues: ResourceEntity) => {
    if (!initialData?.resourceId) return;
    const result: any = await handleUpdateResourceRequest(
      {
        ...formValues,
        resourceId: initialData.resourceId,
        actions:
          formValues.actions?.map((action) => ({
            ...action,
            description: action.description || '',
          })) || [],
      },
      form.setError,
    );

    // Call the success callback and reset the form
    if (result?.success) {
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
            {t('resource.edit.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <ResourceForm
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
              {t('resource.edit.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting || isLoading}
              type="submit"
              form="resource-form"
            >
              {t('resource.edit.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ResourceEditDrawer;
