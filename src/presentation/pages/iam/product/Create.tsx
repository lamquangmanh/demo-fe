'use client';

import React from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ProductForm from './form/Form';

// import from domain
import { ProductEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateProduct } from '@/presentation/hooks';

interface ProductCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ProductCreateDrawer: React.FC<ProductCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleCreateProductRequest, loading: isSubmiting } =
    useCreateProduct();

  const handleFinish = async (values: ProductEntity) => {
    const result = await handleCreateProductRequest(values);

    // check success
    if (result?.productId) {
      onCreateSuccess();
      form.resetFields();
    }
  };

  const handleClose = () => {
    // Reset form fields and close the drawer
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={t('product.create.title', { ns: 'iam' })}
      width={400}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('product.create.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            loading={isSubmiting}
            type="primary"
            onClick={() => form.submit()}
          >
            {t('product.create.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      <ProductForm onFinish={handleFinish} form={form} />
    </Drawer>
  );
};

export default ProductCreateDrawer;
