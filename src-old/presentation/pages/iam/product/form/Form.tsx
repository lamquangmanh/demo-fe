import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'next-i18next';

// import from domain
import { ProductEntity } from '@/domain/entities';

interface ProductFormProps {
  form: FormInstance<ProductEntity>;
  onFinish: (values: ProductEntity) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, onFinish }) => {
  const { t } = useTranslation();
  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="name"
        label={t('product.form.name', { ns: 'iam' })}
        rules={[
          {
            required: true,
            message: t('product.form.error.name', { ns: 'iam' }),
          },
        ]}
      >
        <Input placeholder={t('product.form.name', { ns: 'iam' })} />
      </Form.Item>

      <Form.Item
        name="description"
        label={t('product.form.description', { ns: 'iam' })}
        rules={[
          {
            required: true,
            message: t('product.form.error.description', { ns: 'iam' }),
          },
        ]}
      >
        <Input.TextArea
          placeholder={t('product.form.description', { ns: 'iam' })}
        />
      </Form.Item>

      <Form.Item
        name="url"
        label={t('product.form.url', { ns: 'iam' })}
        rules={[
          {
            required: true,
            message: t('product.form.error.url', { ns: 'iam' }),
          },
        ]}
      >
        <Input placeholder={t('product.form.url', { ns: 'iam' })} />
      </Form.Item>

      <Form.Item name="icon" label={t('product.form.icon', { ns: 'iam' })}>
        <Input placeholder={t('product.form.icon', { ns: 'iam' })} />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
