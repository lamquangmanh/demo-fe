import React, { useState, useEffect } from 'react';
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

// import from common
import { REQUEST_TYPE_LIST, METHOD_LIST } from '@/common/constants';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation
import { useListModule } from '@/presentation/hooks';

interface ResourceFormProps {
  form: UseFormReturn<ResourceEntity>;
  onSubmit: (values: ResourceEntity) => void;
  initialData?: ResourceEntity;
}

interface ModuleOption {
  label: string;
  value: string;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  form,
  onSubmit,
  initialData,
}) => {
  const { t } = useTranslation();
  const { handleGetModulesRequest } = useListModule();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actions',
  });

  const [moduleOptions, setModuleOptions] = useState<ModuleOption[]>([]);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [moduleInputValue, setModuleInputValue] = useState('');

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

  const handleSearchModule = async (value: string) => {
    try {
      setModuleLoading(true);
      const result = await handleGetModulesRequest({
        filters: value ? [{ field: 'name', value }] : [],
        pagination: {
          page: 1,
          limit: 50,
        },
        sorts: [],
      });

      if (result && result.data) {
        const options = result.data.map((item) => ({
          label: item.name,
          value: item.moduleId,
        }));
        setModuleOptions(options);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setModuleLoading(false);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="resource-form">
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label={t('resource.form.name', { ns: 'iam' })}
            placeholder={t('resource.form.name', { ns: 'iam' })}
            fullWidth
            {...register('name', {
              required: t('resource.form.error.name', { ns: 'iam' }),
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="moduleId"
            control={control}
            rules={{
              required: t('resource.form.error.moduleId', { ns: 'iam' }),
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
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('resource.form.moduleId', { ns: 'iam' })}
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
        <CardHeader title={t('resource.form.listActions', { ns: 'iam' })} />
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
                <TextField
                  label={t('resource.form.action.name', { ns: 'iam' })}
                  placeholder={t('resource.form.action.name', { ns: 'iam' })}
                  fullWidth
                  size="small"
                  {...register(`actions.${index}.name`, {
                    required: t('resource.form.error.action.name', {
                      ns: 'iam',
                    }),
                  })}
                  error={!!errors.actions?.[index]?.name}
                  helperText={errors.actions?.[index]?.name?.message}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TextField
                  label={t('resource.form.action.description', { ns: 'iam' })}
                  placeholder={t('resource.form.action.description', {
                    ns: 'iam',
                  })}
                  fullWidth
                  size="small"
                  {...register(`actions.${index}.description`, {
                    required: t('resource.form.error.action.description', {
                      ns: 'iam',
                    }),
                  })}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TextField
                  label={t('resource.form.action.url', { ns: 'iam' })}
                  placeholder={t('resource.form.action.url', { ns: 'iam' })}
                  fullWidth
                  size="small"
                  {...register(`actions.${index}.url`, {
                    required: t('resource.form.error.action.url', {
                      ns: 'iam',
                    }),
                  })}
                  error={!!errors.actions?.[index]?.url}
                  helperText={errors.actions?.[index]?.url?.message}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Controller
                  name={`actions.${index}.method`}
                  control={control}
                  rules={{
                    required: t('resource.form.error.action.method', {
                      ns: 'iam',
                    }),
                  }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!errors.actions?.[index]?.method}
                    >
                      <InputLabel>
                        {t('resource.form.action.method', { ns: 'iam' })}
                      </InputLabel>
                      <Select
                        {...field}
                        label={t('resource.form.action.method', { ns: 'iam' })}
                      >
                        {METHOD_LIST.map((method) => (
                          <MenuItem key={method.value} value={method.value}>
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.actions?.[index]?.method && (
                        <FormHelperText>
                          {errors.actions[index]?.method?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Controller
                  name={`actions.${index}.requestType`}
                  control={control}
                  rules={{
                    required: t('resource.form.error.action.requestType', {
                      ns: 'iam',
                    }),
                  }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!errors.actions?.[index]?.requestType}
                    >
                      <InputLabel>
                        {t('resource.form.action.requestType', { ns: 'iam' })}
                      </InputLabel>
                      <Select
                        {...field}
                        label={t('resource.form.action.requestType', {
                          ns: 'iam',
                        })}
                      >
                        {REQUEST_TYPE_LIST.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.actions?.[index]?.requestType && (
                        <FormHelperText>
                          {errors.actions[index]?.requestType?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
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
                actionId: '',
                resourceId: '',
                name: '',
                description: '',
                url: '',
                method: '' as any,
                requestType: '' as any,
              })
            }
            sx={{ mt: 2 }}
          >
            {t('resource.form.addActionButton', { ns: 'iam' })}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ResourceForm;
