'use client';

import React, { useEffect } from 'react';
import { Drawer, Form, Button, Space, Spin } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import RoleForm from './Form';

// import from common
import { mappingErrorToForm } from '@/common/utils';

// import from domain
import { RoleEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateRole } from '@/presentation/hooks';

interface RoleEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: RoleEntity;
  isLoading?: boolean;
}

const RoleEditDrawer: React.FC<RoleEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleUpdateRoleRequest, loading: isSubmiting } = useUpdateRole();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.roleId && form) {
      if (initialData) {
        form?.setFieldsValue({
          name: initialData.name,
          moduleId: initialData.moduleId,
        });
      } else {
        form?.resetFields();
      }
    }
  }, [initialData, form]);

  const handleFinish = async (formValues: RoleEntity) => {
    if (!initialData?.roleId) return;
    const result: any = await handleUpdateRoleRequest({
      ...formValues,
      roleId: initialData.roleId,
    });

    // map error to form if any
    const { hasError } = mappingErrorToForm(form, result);
    if (hasError) return;

    // Call the success callback and reset the form
    if (result?.success) {
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
      title={t('role.edit.title', { ns: 'iam' })}
      width={1200}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('role.edit.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            type="primary"
            loading={isSubmiting}
            onClick={() => form.submit()}
          >
            {t('role.edit.saveButton', { ns: 'iam' })}
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
        <RoleForm
          onFinish={handleFinish}
          form={form}
          initialData={initialData}
        />
      )}
    </Drawer>
  );
};

export default RoleEditDrawer;
