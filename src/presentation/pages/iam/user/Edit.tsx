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

// import form component
import UserForm from './Form';

// import from domain
import { UserEntity, RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateUser, useListRole } from '@/presentation/hooks';

// import UserStatus from generated types
import { UserStatus } from '@/infrastructure/graphql';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';
import { SortOrder } from '@/infrastructure/graphql';

interface UserEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: UserEntity;
}

const UserEditDrawer: React.FC<UserEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
}) => {
  const { t } = useTranslation();
  const [roles, setRoles] = React.useState<RoleEntity[]>([]);
  const { handleGetRolesRequest, loading: roleLoading } = useListRole();

  const form = useForm<UserEntity & { roles?: RoleEntity[] }>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      avatar: '',
      status: UserStatus.Active,
      roles: [],
    },
  });
  const { handleUpdateUserRequest, loading: isSubmitting } = useUpdateUser();

  const loadRoles = async () => {
    const result = await handleGetRolesRequest({
      pagination: { page: 1, limit: 100 },
      sorts: buildSortArgs({}, { field: 'name', order: SortOrder.Asc }),
      filters: buildFilterArgs({}),
    });
    if (result) {
      setRoles(result.data || []);
    }
  };

  // Load roles on mount
  React.useEffect(() => {
    if (open) {
      loadRoles();
    }
  }, []);

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.userId) {
      form.reset(initialData);
    } else {
      form.reset();
    }
  }, [initialData, form]);

  const handleFinish = async (values: UserEntity) => {
    // NOTE: Update functionality is disabled due to backend API limitations
    // Backend updateUser only accepts userId parameter, not full update
    console.log('Update requested with values:', values);
    const result = await handleUpdateUserRequest();

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
            {t('user.edit.title', { ns: 'iam' })}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <UserForm
            onSubmit={handleFinish}
            form={form}
            isEdit
            roleOptions={roles}
            roleLoading={roleLoading}
          />
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
              {t('user.edit.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              type="submit"
              form="user-form"
            >
              {t('user.edit.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserEditDrawer;
