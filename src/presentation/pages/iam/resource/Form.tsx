import React from 'react';
import {
  Form,
  FormInstance,
  Input,
  Button,
  Card,
  Select,
  Row,
  Col,
} from 'antd';
import { useTranslation } from 'next-i18next';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// import from common
import { REQUEST_TYPE_LIST, METHOD_LIST } from '@/common/constants';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation
import { Autocomplete } from '@/presentation/components/atoms';
import { useListModule } from '@/presentation/hooks';

interface ResourceFormProps {
  form: FormInstance<ResourceEntity>;
  onFinish: (values: ResourceEntity) => void;
  initialData?: ResourceEntity;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  form,
  onFinish,
  initialData,
}) => {
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
        <Col span={12} style={{ paddingRight: 8 }}>
          <Form.Item
            name="name"
            label={t('resource.form.name', { ns: 'iam' })}
            rules={[
              {
                required: true,
                message: t('resource.form.error.name', { ns: 'iam' }),
              },
            ]}
          >
            <Input placeholder={t('resource.form.name', { ns: 'iam' })} />
          </Form.Item>
        </Col>

        <Col span={12} style={{ paddingLeft: 8 }}>
          <Autocomplete
            formItem={{
              name: 'moduleId',
              label: t('resource.form.moduleId', { ns: 'iam' }),
              rules: [
                {
                  required: true,
                  message: t('resource.form.error.moduleId', { ns: 'iam' }),
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
        title={t('resource.form.listActions', { ns: 'iam' })}
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
                    // marginBottom: '12px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label={t('resource.form.action.name', { ns: 'iam' })}
                      rules={[
                        {
                          required: true,
                          message: t('resource.form.error.action.name', {
                            ns: 'iam',
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t('resource.form.action.name', {
                          ns: 'iam',
                        })}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label={t('resource.form.action.description', {
                        ns: 'iam',
                      })}
                    >
                      <Input
                        placeholder={t('resource.form.action.description', {
                          ns: 'iam',
                        })}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      label={t('resource.form.action.url', { ns: 'iam' })}
                      rules={[
                        {
                          required: true,
                          message: t('resource.form.error.action.url', {
                            ns: 'iam',
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t('resource.form.action.url', {
                          ns: 'iam',
                        })}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'method']}
                      label={t('resource.form.action.method', {
                        ns: 'iam',
                      })}
                      rules={[
                        {
                          required: true,
                          message: t('resource.form.error.action.method', {
                            ns: 'iam',
                          }),
                        },
                      ]}
                    >
                      <Select
                        options={METHOD_LIST}
                        placeholder={t('resource.form.action.method', {
                          ns: 'iam',
                        })}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'requestType']}
                      label={t('resource.form.action.requestType', {
                        ns: 'iam',
                      })}
                      rules={[
                        {
                          required: true,
                          message: t('resource.form.error.action.requestType', {
                            ns: 'iam',
                          }),
                        },
                      ]}
                    >
                      <Select
                        options={REQUEST_TYPE_LIST}
                        placeholder={t('resource.form.action.requestType', {
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
                        // marginTop: 4,
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
                  {t('resource.form.addActionButton', {
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

export default ResourceForm;
