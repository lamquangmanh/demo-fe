'use client';

import React, { useEffect } from 'react';
import { Drawer, Form, Button, Space, Spin } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ModuleForm from './Form';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateModule } from '@/presentation/hooks';

interface ModuleEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ModuleEntity;
  isLoading?: boolean;
}

const ModuleEditDrawer: React.FC<ModuleEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleUpdateModuleRequest, loading: isSubmiting } = useUpdateModule();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.moduleId && form) {
      if (initialData) {
        form?.setFieldsValue(initialData);
      } else {
        form?.resetFields();
      }
    }
  }, [initialData, form]);

  const handleFinish = async (values: ModuleEntity) => {
    if (!initialData?.moduleId) return;
    const result = await handleUpdateModuleRequest({
      ...values,
      moduleId: initialData.moduleId,
      productId: values.productId ?? '',
    });

    // Call the success callback and reset the form
    if (result?.moduleId) {
      onUpdateSuccess();
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
      title={t('module.edit.title', { ns: 'iam' })}
      width={400}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('module.edit.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            type="primary"
            loading={isSubmiting}
            onClick={() => form.submit()}
          >
            {t('module.edit.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : null}
      {!isLoading && (
        <ModuleForm
          onFinish={handleFinish}
          form={form}
          initialData={initialData}
        />
      )}
    </Drawer>
  );
};

export default ModuleEditDrawer;
