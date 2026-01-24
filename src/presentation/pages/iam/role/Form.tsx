import React, { useState, useEffect, useCallback } from 'react';
import {
  Form,
  FormInstance,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
} from 'antd';
import { useTranslation } from 'next-i18next';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// import from domain
import { RoleEntity, ResourceEntity } from '@/domain/entities';

// import from presentation
import { Autocomplete } from '@/presentation/components/atoms';
import {
  useListModule,
  useListResource,
  useDetailResource,
} from '@/presentation/hooks';

interface RoleFormProps {
  form: FormInstance<RoleEntity>;
  onFinish: (values: RoleEntity) => void;
  initialData?: RoleEntity;
}

const RoleForm: React.FC<RoleFormProps> = ({ form, onFinish, initialData }) => {
  const { t } = useTranslation();
  const { handleGetModulesRequest } = useListModule();
  const { handleGetResourcesRequest } = useListResource();
  const { handleGetDetailResourceRequest } = useDetailResource();
  const [resourcesCache, setResourcesCache] = useState<
    Record<string, ResourceEntity>
  >({});

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
          })
        );

        setResourcesCache(cache);
      };
      loadResourceDetails();
    }
  }, [initialData, handleGetDetailResourceRequest]);

  const handleSearchModule = async (value: string) => {
    const result = await handleGetModulesRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    if (result?.data) {
      const options = result.data.map((item) => ({
        key: item.moduleId,
        label: item.name,
        value: item.moduleId,
      }));
      return options;
    }
    return [];
  };

  const handleSearchResource = async (value: string) => {
    const result = await handleGetResourcesRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    if (result?.data) {
      const options = result.data.map((item) => ({
        key: item.resourceId,
        label: item.name,
        value: item.resourceId,
      }));
      return options;
    }
    return [];
  };

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
    [resourcesCache, handleGetDetailResourceRequest]
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
    [resourcesCache]
  );

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Row justify="start">
        <Col span={8} style={{ paddingRight: 8 }}>
          <Form.Item
            name="name"
            label={t('role.form.name', { ns: 'iam' })}
            rules={[
              {
                required: true,
                message: t('role.form.error.name', { ns: 'iam' }),
              },
            ]}
          >
            <Input placeholder={t('role.form.name', { ns: 'iam' })} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="description"
            label={t('role.form.description', { ns: 'iam' })}
            rules={[
              {
                required: true,
                message: t('role.form.error.description', { ns: 'iam' }),
              },
            ]}
          >
            <Input placeholder={t('role.form.description', { ns: 'iam' })} />
          </Form.Item>
        </Col>

        <Col span={8} style={{ paddingLeft: 8 }}>
          <Autocomplete
            formItem={{
              name: 'moduleId',
              label: t('role.form.moduleId', { ns: 'iam' }),
              rules: [
                {
                  required: true,
                  message: t('role.form.error.moduleId', { ns: 'iam' }),
                },
              ],
            }}
            onSearchAPI={handleSearchModule}
            selectedOptions={
              initialData?.module
                ? [
                    {
                      key: initialData.module.moduleId,
                      label: initialData.module.name,
                      value: initialData.module.moduleId,
                    },
                  ]
                : []
            }
          />
        </Col>
      </Row>

      <Card
        title={t('role.form.listPermissions', { ns: 'iam' })}
        style={{ marginTop: 20 }}
      >
        <Form.List name="permissions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'resourceId']}
                      label={t('role.form.permission.resourceId', {
                        ns: 'iam',
                      })}
                      rules={[
                        {
                          required: true,
                          message: t('role.form.error.permission.resourceId', {
                            ns: 'iam',
                          }),
                        },
                      ]}
                    >
                      <Autocomplete
                        onSearchAPI={handleSearchResource}
                        selectedOptions={[]}
                        onChange={(value) => {
                          // Load resource details when selected
                          if (value) {
                            handleResourceSelect(String(value));
                          }
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => {
                        const prevResourceId =
                          prevValues?.permissions?.[name]?.resourceId;
                        const currentResourceId =
                          currentValues?.permissions?.[name]?.resourceId;
                        return prevResourceId !== currentResourceId;
                      }}
                    >
                      {({ getFieldValue }) => {
                        const resourceId = getFieldValue([
                          'permissions',
                          name,
                          'resourceId',
                        ]);
                        const actions = resourceId
                          ? getActionsForResource(resourceId)
                          : [];

                        return (
                          <Form.Item
                            {...restField}
                            name={[name, 'actionId']}
                            label={t('role.form.permission.actionId', {
                              ns: 'iam',
                            })}
                            rules={[
                              {
                                required: true,
                                message: t(
                                  'role.form.error.permission.actionIds',
                                  {
                                    ns: 'iam',
                                  }
                                ),
                              },
                            ]}
                          >
                            <Select
                              placeholder={t('role.form.permission.actionId', {
                                ns: 'iam',
                              })}
                              options={actions}
                              disabled={!resourceId || actions.length === 0}
                              showSearch
                              filterOption={(input, option) =>
                                (option?.label ?? '')
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </div>

                  <div style={{ paddingTop: 30 }}>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      style={{
                        flex: 'none',
                        width: 30,
                        height: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </div>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('role.form.addPermissionButton', {
                    ns: 'iam',
                  })}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </Form>
  );
};

export default RoleForm;
