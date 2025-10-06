'use client';

import React from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ModuleForm from './Form';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateModule } from '@/presentation/hooks';

interface ModuleCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ModuleCreateDrawer: React.FC<ModuleCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleCreateModuleRequest, loading: isSubmiting } = useCreateModule();

  const handleFinish = async (values: ModuleEntity) => {
    await handleCreateModuleRequest({
      ...values,
      productId: values.productId ?? '',
    });

    onCreateSuccess();
    form.resetFields();
  };

  const handleClose = () => {
    // Reset form fields and close the drawer
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={t('module.create.title', { ns: 'iam' })}
      width={400}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('module.create.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            loading={isSubmiting}
            type="primary"
            onClick={() => form.submit()}
          >
            {t('module.create.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      <ModuleForm onFinish={handleFinish} form={form} />
    </Drawer>
  );
};

export default ModuleCreateDrawer;
