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
import RoleForm from './Form';

// import from domain
import { RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateRole } from '@/presentation/hooks';

interface RoleCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const RoleCreateDrawer: React.FC<RoleCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
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
  const { handleCreateRoleRequest, loading: isSubmiting } = useCreateRole({
    isNotifyError: false,
    isNotifySuccess: true,
  });

  const handleFinish = async (formValues: RoleEntity) => {
    const result: any = await handleCreateRoleRequest(
      {
        name: formValues.name,
        description: formValues.description,
        moduleId: formValues.moduleId,
        permissions: formValues.permissions || [],
      },
      form.setError,
    );

    // if success, reset form and close drawer
    if (result?.roleId) {
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
            {t('Role.create.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <RoleForm onSubmit={handleFinish} form={form} />
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
              {t('Role.create.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmiting}
              type="submit"
              form="role-form"
            >
              {t('Role.create.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RoleCreateDrawer;
