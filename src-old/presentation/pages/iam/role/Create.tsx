'use client';

import React from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import RoleForm from './Form';

// import from common
import { mappingErrorToForm } from '@/common/utils';

// import from domain
import { RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateRole } from '@/presentation/hooks';

interface RoleCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const RoleCreateDrawer: React.FC<RoleCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleCreateRoleRequest, loading: isSubmiting } = useCreateRole({
    isNotifyError: false,
    isNotifySuccess: true,
  });

  const handleFinish = async (formValues: RoleEntity) => {
    const result: any = await handleCreateRoleRequest({
      name: formValues.name,
      description: formValues.description,
      moduleId: formValues.moduleId,
      permissions: formValues.permissions || [],
    });

    // map error to form if any
    const { hasError } = mappingErrorToForm(form, result);
    if (hasError) return;

    // if success, reset form and close drawer
    if (result?.roleId) {
      form.resetFields();
      onCreateSuccess();
    }
  };

  const handleClose = () => {
    // Reset form fields and close the drawer
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={t('Role.create.title', { ns: 'iam' })}
      width={1200}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('Role.create.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            loading={isSubmiting}
            type="primary"
            onClick={() => form.submit()}
          >
            {t('Role.create.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      <RoleForm onFinish={handleFinish} form={form} />
    </Drawer>
  );
};

export default RoleCreateDrawer;
