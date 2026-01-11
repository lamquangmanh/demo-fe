import React from 'react';
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
import { RoleEntity } from '@/domain/entities';

// import from presentation
import { Autocomplete } from '@/presentation/components/atoms';
import { useListModule } from '@/presentation/hooks';

interface RoleFormProps {
  form: FormInstance<RoleEntity>;
  onFinish: (values: RoleEntity) => void;
  initialData?: RoleEntity;
}

const RoleForm: React.FC<RoleFormProps> = ({ form, onFinish, initialData }) => {
  const { t } = useTranslation();
  const { handleGetModulesRequest } = useListModule();

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
        <Form.List name="actions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
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
                    </Form.Item>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'actionId']}
                      label={t('role.form.permission.actionId', {
                        ns: 'iam',
                      })}
                    >
                      <Input
                        placeholder={t('role.form.permission.actionId', {
                          ns: 'iam',
                        })}
                      />
                    </Form.Item>
                  </div>

                  <div>
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
