'use client';

import React from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ResourceForm from './Form';

// import from common
import { mappingErrorToForm } from '@/common/utils';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation/hooks
import { useCreateResource } from '@/presentation/hooks';

interface ResourceCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const ResourceCreateDrawer: React.FC<ResourceCreateDrawerProps> = ({
  open,
  onClose,
  onCreateSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleCreateResourceRequest, loading: isSubmiting } =
    useCreateResource({ isNotifyError: false, isNotifySuccess: true });

  const handleFinish = async (formValues: ResourceEntity) => {
    const result: any = await handleCreateResourceRequest({
      ...formValues,
      actions:
        formValues.actions?.map((action) => ({
          ...action,
          description: action.description || '',
        })) || [],
    });

    // map error to form if any
    const { hasError } = mappingErrorToForm(form, result);
    if (hasError) return;

    // if success, reset form and close drawer
    if (result?.resourceId) {
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
      title={t('resource.create.title', { ns: 'iam' })}
      width={1200}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('resource.create.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            loading={isSubmiting}
            type="primary"
            onClick={() => form.submit()}
          >
            {t('resource.create.saveButton', { ns: 'iam' })}
          </Button>
        </Space>
      }
    >
      <ResourceForm onFinish={handleFinish} form={form} />
    </Drawer>
  );
};

export default ResourceCreateDrawer;
