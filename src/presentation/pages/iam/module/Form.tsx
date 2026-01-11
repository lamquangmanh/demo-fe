import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'next-i18next';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation
import { Autocomplete } from '@/presentation/components/atoms';
import { useListProduct } from '@/presentation/hooks';

interface ModuleFormProps {
  form: FormInstance<ModuleEntity>;
  onFinish: (values: ModuleEntity) => void;
  initialData?: ModuleEntity;
}

const ModuleForm: React.FC<ModuleFormProps> = ({
  form,
  onFinish,
  initialData,
}) => {
  const { t } = useTranslation();
  const { handleGetProductsRequest } = useListProduct();

  const handleSearchProduct = async (value: string) => {
    const result = await handleGetProductsRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    if (result && result.data) {
      const options = result.data.map((item) => ({
        key: item.productId,
        label: item.name,
        value: item.productId,
      }));
      return options;
    }
    return [];
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Autocomplete
        formItem={{
          name: 'productId',
          label: t('module.form.productId', { ns: 'iam' }),
          rules: [
            {
              required: true,
              message: t('module.form.error.productId', { ns: 'iam' }),
            },
          ],
        }}
        onSearchAPI={handleSearchProduct}
        selectedOptions={
          initialData?.product
            ? [
                {
                  key: initialData.product.productId,
                  label: initialData.product.name,
                  value: initialData.product.productId,
                },
              ]
            : []
        }
      />
      <Form.Item
        name="name"
        label={t('module.form.name', { ns: 'iam' })}
        rules={[
          {
            required: true,
            message: t('module.form.error.name', { ns: 'iam' }),
          },
        ]}
      >
        <Input placeholder={t('module.form.name', { ns: 'iam' })} />
      </Form.Item>

      <Form.Item
        name="description"
        label={t('module.form.description', { ns: 'iam' })}
        rules={[
          {
            required: true,
            message: t('module.form.error.description', { ns: 'iam' }),
          },
        ]}
      >
        <Input.TextArea
          placeholder={t('module.form.description', { ns: 'iam' })}
        />
      </Form.Item>

      <Form.Item name="url" label={t('module.form.url', { ns: 'iam' })}>
        <Input placeholder={t('module.form.url', { ns: 'iam' })} />
      </Form.Item>

      <Form.Item name="icon" label={t('module.form.icon', { ns: 'iam' })}>
        <Input placeholder={t('module.form.icon', { ns: 'iam' })} />
      </Form.Item>
    </Form>
  );
};

export default ModuleForm;
