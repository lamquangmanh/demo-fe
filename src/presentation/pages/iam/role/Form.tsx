import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormReturn, Controller, useFieldArray } from 'react-hook-form';

// MUI Imports
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// import from domain
import { RoleEntity, ResourceEntity } from '@/domain/entities';

// import from presentation
import {
  useListModule,
  useListResource,
  useDetailResource,
} from '@/presentation/hooks';

interface RoleFormProps {
  form: UseFormReturn<RoleEntity>;
  onSubmit: (values: RoleEntity) => void;
  initialData?: RoleEntity;
}

interface ModuleOption {
  label: string;
  value: string;
}

interface ResourceOption {
  label: string;
  value: string;
}

const RoleForm: React.FC<RoleFormProps> = ({ form, onSubmit, initialData }) => {
  const { t } = useTranslation();
  const { handleGetModulesRequest } = useListModule();
  const { handleGetResourcesRequest } = useListResource();
  const { handleGetDetailResourceRequest } = useDetailResource();
  const [resourcesCache, setResourcesCache] = useState<
    Record<string, ResourceEntity>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permissions',
  });

  const [moduleOptions, setModuleOptions] = useState<ModuleOption[]>([]);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [moduleInputValue, setModuleInputValue] = useState('');

  const [resourceOptions, setResourceOptions] = useState<ResourceOption[]>([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resourceInputValue, setResourceInputValue] = useState('');

  // Load initial module if editing
  useEffect(() => {
    if (initialData?.module) {
      setModuleOptions([
        {
          label: initialData.module.name,
          value: initialData.module.moduleId,
        },
      ]);
    }
  }, [initialData]);

  // Load initial resource details if editing
  useEffect(() => {
    if (initialData?.permissions) {
      const loadResourceDetails = async () => {
        const resourceIds = [
          ...new Set(initialData.permissions?.map((p) => p.resourceId) || []),
        ];
        const cache: Record<string, ResourceEntity> = {};

        await Promise.all(
          resourceIds.map(async (resourceId) => {
            const resource = (await handleGetDetailResourceRequest({
              resourceId,
            })) as ResourceEntity;
            if (resource?.resourceId) {
              cache[resourceId] = resource;
            }
          }),
        );

        setResourcesCache(cache);
      };
      loadResourceDetails();
    }
  }, [initialData, handleGetDetailResourceRequest]);

  const handleSearchModule = async (value: string) => {
    if (!value || value.length < 2) return;

    setModuleLoading(true);
    const result = await handleGetModulesRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    setModuleLoading(false);

    if (result?.data) {
      const options = result.data.map((item) => ({
        label: item.name,
        value: item.moduleId,
      }));
      setModuleOptions(options);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (moduleInputValue) {
        handleSearchModule(moduleInputValue);
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleInputValue]);

  const handleSearchResource = async (value: string) => {
    if (!value || value.length < 2) return;

    setResourceLoading(true);
    const result = await handleGetResourcesRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    setResourceLoading(false);

    if (result?.data) {
      const options = result.data.map((item) => ({
        label: item.name,
        value: item.resourceId,
      }));
      setResourceOptions(options);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resourceInputValue) {
        handleSearchResource(resourceInputValue);
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceInputValue]);

  const handleResourceSelect = useCallback(
    async (resourceId: string) => {
      // Fetch resource details with actions if not in cache
      if (!resourcesCache[resourceId]) {
        const resource = (await handleGetDetailResourceRequest({
          resourceId,
        })) as ResourceEntity;
        if (resource?.resourceId) {
          setResourcesCache((prev) => ({ ...prev, [resourceId]: resource }));
        }
      }
    },
    [resourcesCache, handleGetDetailResourceRequest],
  );

  const getActionsForResource = useCallback(
    (resourceId: string) => {
      const resource = resourcesCache[resourceId];
      if (!resource?.actions) return [];

      return resource.actions.map((action) => ({
        label: action.name,
        value: action.actionId,
      }));
    },
    [resourcesCache],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="role-form">
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label={t('role.form.name', { ns: 'iam' })}
            placeholder={t('role.form.name', { ns: 'iam' })}
            fullWidth
            {...register('name', {
              required: t('role.form.error.name', { ns: 'iam' }),
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            label={t('role.form.description', { ns: 'iam' })}
            placeholder={t('role.form.description', { ns: 'iam' })}
            fullWidth
            {...register('description', {
              required: t('role.form.error.description', { ns: 'iam' }),
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="moduleId"
            control={control}
            rules={{
              required: t('role.form.error.moduleId', { ns: 'iam' }),
            }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={moduleOptions}
                loading={moduleLoading}
                value={moduleOptions.find((opt) => opt.value === value) || null}
                onChange={(_, newValue) => {
                  onChange(newValue?.value || '');
                }}
                onInputChange={(_, newInputValue) => {
                  setModuleInputValue(newInputValue);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('role.form.moduleId', { ns: 'iam' })}
                    error={!!errors.moduleId}
                    helperText={errors.moduleId?.message}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {moduleLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
              />
            )}
          />
        </Box>
      </Box>

      <Card sx={{ mt: 3 }}>
        <CardHeader title={t('role.form.listPermissions', { ns: 'iam' })} />
        <CardContent>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Controller
                  name={`permissions.${index}.resourceId`}
                  control={control}
                  rules={{
                    required: t('role.form.error.permission.resourceId', {
                      ns: 'iam',
                    }),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={resourceOptions}
                      loading={resourceLoading}
                      value={
                        resourceOptions.find((opt) => opt.value === value) ||
                        null
                      }
                      onChange={(_, newValue) => {
                        const newResourceId = newValue?.value || '';
                        onChange(newResourceId);
                        if (newResourceId) {
                          handleResourceSelect(newResourceId);
                        }
                      }}
                      onInputChange={(_, newInputValue) => {
                        setResourceInputValue(newInputValue);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('role.form.permission.resourceId', {
                            ns: 'iam',
                          })}
                          size="small"
                          error={!!errors.permissions?.[index]?.resourceId}
                          helperText={
                            errors.permissions?.[index]?.resourceId?.message
                          }
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {resourceLoading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Controller
                  name={`permissions.${index}.actionId`}
                  control={control}
                  rules={{
                    required: t('role.form.error.permission.actionIds', {
                      ns: 'iam',
                    }),
                  }}
                  render={({ field }) => {
                    const resourceId = form.watch(
                      `permissions.${index}.resourceId`,
                    );
                    const actions = resourceId
                      ? getActionsForResource(resourceId)
                      : [];

                    return (
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!errors.permissions?.[index]?.actionId}
                      >
                        <InputLabel>
                          {t('role.form.permission.actionId', { ns: 'iam' })}
                        </InputLabel>
                        <Select
                          {...field}
                          label={t('role.form.permission.actionId', {
                            ns: 'iam',
                          })}
                          disabled={!resourceId || actions.length === 0}
                        >
                          {actions.map((action) => (
                            <MenuItem key={action.value} value={action.value}>
                              {action.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.permissions?.[index]?.actionId && (
                          <FormHelperText>
                            {errors.permissions[index]?.actionId?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  }}
                />
              </Box>

              <Box sx={{ pt: 0.5 }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                permissionId: '',
                roleId: '',
                resourceId: '',
                actionId: '',
              })
            }
            sx={{ mt: 2 }}
          >
            {t('role.form.addPermissionButton', { ns: 'iam' })}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default RoleForm;
