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
import RoleForm from './Form';

// import from domain
import { RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateRole } from '@/presentation/hooks';

interface RoleEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: RoleEntity;
  isLoading?: boolean;
}

const RoleEditDrawer: React.FC<RoleEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const form = useForm<RoleEntity>({
    defaultValues: {
      name: '',
      description: '',
      moduleId: '',
      permissions: [],
    },
  });
  const { handleUpdateRoleRequest, loading: isSubmiting } = useUpdateRole();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.roleId) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        moduleId: initialData.moduleId,
        permissions: initialData.permissions || [],
      });
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const handleFinish = async (formValues: RoleEntity) => {
    if (!initialData?.roleId) return;
    const result: any = await handleUpdateRoleRequest(
      {
        roleId: initialData.roleId,
        name: formValues.name,
        description: formValues.description,
        moduleId: formValues.moduleId,
        permissions: formValues.permissions || [],
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
            {t('role.edit.title', { ns: 'iam' })}
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
            <RoleForm
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
              {t('role.edit.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmiting || isLoading}
              type="submit"
              form="role-form"
            >
              {t('role.edit.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RoleEditDrawer;
