'use client';

import React, { useState } from 'react';
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
import { useCreateUser, useListRole } from '@/presentation/hooks';

// import UserStatus from generated types
import { UserStatus } from '@/infrastructure/graphql';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';
import { SortOrder } from '@/infrastructure/graphql';

interface UserCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const UserCreateDrawer: React.FC<UserCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const [filterRoleName, setFilterRoleName] = useState<string>('');
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
  const { handleCreateUserRequest, loading: isSubmitting } = useCreateUser();

  const loadRoles = async (filterName?: string) => {
    const result = await handleGetRolesRequest({
      pagination: { page: 1, limit: 100 },
      sorts: buildSortArgs({}, { field: 'name', order: SortOrder.Asc }),
      filters: buildFilterArgs({ name: filterName ?? undefined }),
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
  }, [open]);

  const handleFinish = async (
    values: UserEntity & { roles?: RoleEntity[] },
  ) => {
    const roleIds = values.roles?.map((role) => role.roleId) || [];
    const result = await handleCreateUserRequest({
      ...values,
      roleIds,
    });

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
            {t('user.create.title', { ns: 'iam' })}
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
              {t('user.create.cancelButton', { ns: 'iam' })}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              type="submit"
              form="user-form"
            >
              {t('user.create.saveButton', { ns: 'iam' })}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserCreateDrawer;
