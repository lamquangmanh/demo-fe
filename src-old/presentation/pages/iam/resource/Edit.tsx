'use client';

import React, { useEffect } from 'react';
import { Drawer, Form, Button, Space, Spin } from 'antd';
import { useTranslation } from 'next-i18next';

// import form component
import ResourceForm from './Form';

// import from common
import { mappingErrorToForm } from '@/common/utils';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from presentation/hooks
import { useUpdateResource } from '@/presentation/hooks';

interface ResourceEditDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  initialData?: ResourceEntity;
  isLoading?: boolean;
}

const ResourceEditDrawer: React.FC<ResourceEditDrawerProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleUpdateResourceRequest, loading: isSubmiting } =
    useUpdateResource();

  useEffect(() => {
    // Reset form fields when the drawer opens or initialData changes
    if (initialData?.resourceId && form) {
      if (initialData) {
        form?.setFieldsValue({
          name: initialData.name,
          moduleId: initialData.moduleId,
          actions:
            initialData.actions?.map((actionItem) => {
              return {
                actionId: actionItem.actionId,
                name: actionItem.name,
                description: actionItem.description || '',
                url: actionItem.url,
                method: actionItem.method,
                requestType: actionItem.requestType,
              };
            }) || [],
        });
      } else {
        form?.resetFields();
      }
    }
  }, [initialData, form]);

  const handleFinish = async (formValues: ResourceEntity) => {
    if (!initialData?.resourceId) return;
    const result: any = await handleUpdateResourceRequest({
      ...formValues,
      resourceId: initialData.resourceId,
      actions:
        formValues.actions?.map((action) => ({
          ...action,
          description: action.description || '',
        })) || [],
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
      title={t('resource.edit.title', { ns: 'iam' })}
      width={1200}
      onClose={handleClose}
      open={open}
      destroyOnHidden
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>
            {t('resource.edit.cancelButton', { ns: 'iam' })}
          </Button>
          <Button
            type="primary"
            loading={isSubmiting}
            onClick={() => form.submit()}
          >
            {t('resource.edit.saveButton', { ns: 'iam' })}
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
        <ResourceForm
          onFinish={handleFinish}
          form={form}
          initialData={initialData}
        />
      )}
    </Drawer>
  );
};

export default ResourceEditDrawer;
