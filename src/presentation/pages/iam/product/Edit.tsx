'use client';

import React, { useEffect } from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ProductForm from './form/Form';

// import from domain
import { ProductEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateProduct } from '@/presentation/hooks';

interface ProductEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ProductEntity;
}

const ProductEditDrawer: React.FC<ProductEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleUpdateProductRequest, loading: isSubmiting } =
    useUpdateProduct();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData && initialData.productId && form) {
      if (initialData) {
        form?.setFieldsValue(initialData);
      } else {
        form?.resetFields();
      }
    }
  }, [initialData, form]);

  const handleFinish = async (values: ProductEntity) => {
    await handleUpdateProductRequest({
      ...values,
      productId: initialData?.productId ?? '',
    });

    // Call the success callback and reset the form
    onUpdateSuccess();
    form.resetFields();
  };

  const handleClose = () => {
    // Reset form fields and close the drawer
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={t('product.edit.title', { ns: 'iam' })}
      width={400}
      onClose={onClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('product.edit.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            type="primary"
            loading={isSubmiting}
            onClick={() => form.submit()}
          >
            {t('product.edit.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      <ProductForm onFinish={handleFinish} form={form} />
    </Drawer>
  );
};

export default ProductEditDrawer;
