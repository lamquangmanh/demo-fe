import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormReturn, Controller } from 'react-hook-form';

// MUI Imports
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

// import from common utils
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from domain
import { UserEntity, RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useListRole } from '@/presentation/hooks';

// import UserStatus from generated types
import { UserStatus, SortOrder } from '@/infrastructure/graphql';

interface UserFormProps {
  form: UseFormReturn<UserEntity & { roles?: RoleEntity[] }, any, any>;
  onSubmit: (values: UserEntity & { roles?: RoleEntity[] }) => void;
  isEdit?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onSubmit,
  isEdit = false,
}) => {
  const [filterRoleName, setFilterRoleName] = useState<string>('');
  const [roles, setRoles] = React.useState<RoleEntity[]>([]);
  const requestRef = React.useRef(0);
  const { handleGetRolesRequest, loading: roleLoading } = useListRole();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = form;

  const statusValue = watch('status');

  const loadRoles = React.useCallback(async (filterName?: string) => {
    const currentRequest = ++requestRef.current;
    const result = await handleGetRolesRequest({
      pagination: { page: 1, limit: 100 },
      sorts: buildSortArgs({}, { field: 'name', order: SortOrder.Asc }),
      filters: buildFilterArgs({ name: filterName ?? undefined }),
    });
    if (result && currentRequest === requestRef.current) {
      setRoles(result.data || []);
    }
  }, []);

  // Load roles on mount
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      loadRoles(filterRoleName.trim() || undefined);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filterRoleName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="user-form">
      <Stack spacing={3}>
        <TextField
          label={t('user.form.username', { ns: 'iam' })}
          placeholder={t('user.form.username', { ns: 'iam' })}
          fullWidth
          {...register('username', {
            required: t('user.form.error.username', { ns: 'iam' }),
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label={t('user.form.email', { ns: 'iam' })}
          placeholder={t('user.form.email', { ns: 'iam' })}
          fullWidth
          type="email"
          {...register('email', {
            required: t('user.form.error.email', { ns: 'iam' }),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('user.form.error.emailInvalid', { ns: 'iam' }),
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label={t('user.form.password', { ns: 'iam' })}
          placeholder={t('user.form.password', { ns: 'iam' })}
          fullWidth
          type="password"
          {...register('password', {
            required: !isEdit
              ? t('user.form.error.password', { ns: 'iam' })
              : false,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: t('user.form.passwordHint', { ns: 'iam' }),
            },
          })}
          error={!!errors.password}
          helperText={
            errors.password?.message ||
            (isEdit ? t('user.form.passwordHint', { ns: 'iam' }) : '')
          }
        />

        <TextField
          label={t('user.form.phone', { ns: 'iam' })}
          placeholder={t('user.form.phone', { ns: 'iam' })}
          fullWidth
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          label={t('user.form.avatar', { ns: 'iam' })}
          placeholder={t('user.form.avatar', { ns: 'iam' })}
          fullWidth
          {...register('avatar')}
          error={!!errors.avatar}
          helperText={errors.avatar?.message}
        />

        <TextField
          select
          label={t('user.form.status', { ns: 'iam' })}
          fullWidth
          {...register('status', {
            required: t('user.form.error.status', { ns: 'iam' }),
          })}
          value={statusValue || UserStatus.Active}
          error={!!errors.status}
          helperText={errors.status?.message}
        >
          <MenuItem value={UserStatus.Active}>
            {t('user.form.statusActive', { ns: 'iam' })}
          </MenuItem>
          <MenuItem value={UserStatus.Deactivated}>
            {t('user.form.statusDeactivate', { ns: 'iam' })}
          </MenuItem>
          <MenuItem value={UserStatus.Deleted}>
            {t('user.form.statusDeleted', { ns: 'iam' })}
          </MenuItem>
        </TextField>

        <Controller
          name="roles"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              options={roles}
              value={value || []}
              onChange={(_event, newValue) => onChange(newValue)}
              onInputChange={(_event, newInputValue, reason) => {
                if (reason === 'input' || reason === 'clear') {
                  setFilterRoleName(newInputValue);
                }
              }}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.roleId === value.roleId
              }
              loading={roleLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('user.form.roles', { ns: 'iam' }) || 'Roles'}
                  placeholder={
                    t('user.form.selectRoles', { ns: 'iam' }) || 'Select roles'
                  }
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.roleId}
                    label={option.name}
                    size="small"
                  />
                ))
              }
            />
          )}
        />
      </Stack>
    </form>
  );
};

export default UserForm;
