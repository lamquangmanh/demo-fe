'use client';

import React, { useRef, useState } from 'react';
import { Typography, Button, Flex, Popconfirm } from 'antd';
import type { FormInstance } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

// import from domain
import { ResourceEntity } from '@/domain/entities';

// import from common
import { PAGE_SIZE_OPTIONS, DEFAULT_SORT } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import {
  useListResource,
  useDeleteResource,
  useDetailResource,
  useListModule,
} from '@/presentation/hooks';
import { Autocomplete } from '@/presentation/components/atoms';

// import create Resource drawer
import ResourceCreateDrawer from './Create';
import ResourceEditDrawer from './Edit';

const ListResource = () => {
  const { handleGetModulesRequest } = useListModule();
  const { t } = useTranslation('iam');
  const actionRef = useRef<ActionType | null>(null);
  const formRef = useRef<FormInstance | undefined>(undefined);

  // state to manage selected Resource and edit popup
  const [selectedResource, setSelectedResource] =
    useState<ResourceEntity | null>(null);
  const [selectedResourceDelete, setSelectedResourceDelete] =
    useState<ResourceEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  // state to manage create Resource popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteResourceRequest } = useDeleteResource();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
  });

  // use custom hook to handle Resource listing
  const { handleGetResourcesRequest, loading } = useListResource();
  const { handleGetDetailResourceRequest, loading: loadingDetail } =
    useDetailResource();

  const handleEdit = async (resource: ResourceEntity) => {
    setOpenEditPopup(true);
    const detail: any = await handleGetDetailResourceRequest({
      resourceId: resource.resourceId,
    });
    if (detail?.resourceId) setSelectedResource(detail);
  };

  const handleDelete = (resource: ResourceEntity) => {
    setSelectedResourceDelete(resource);
  };

  const handleConfirmDelete = async () => {
    if (!selectedResourceDelete) return;

    // Call the delete Resource request here
    await handleDeleteResourceRequest({
      resourceId: selectedResourceDelete.resourceId,
    });

    // Reset the selected Resource after deletion
    setSelectedResourceDelete(null);
    // Reload the table data
    actionRef.current?.reloadAndRest?.();
  };

  const handleSearchModule = async (value: string) => {
    const result = await handleGetModulesRequest({
      filters: { field: 'name', value },
      pagination: {
        page: 1,
        limit: 50,
      },
      sorts: [],
    });
    if (result?.data) {
      const options = result.data.map((item) => ({
        key: item.moduleId,
        label: item.name,
        value: item.moduleId,
      }));
      return options;
    }
    return [];
  };

  const columns: ProColumns<ResourceEntity>[] = [
    {
      title: t('resource.list.table.name', { ns: 'iam' }),
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
    },
    {
      title: t('resource.list.table.module', { ns: 'iam' }),
      dataIndex: 'module.name',
      valueType: 'text',
      sorter: true,
      search: {
        transform: (value) => {
          return {
            moduleId: value,
          };
        },
      },
      render: (text, record) => record.module?.name || 'N/A',
      renderFormItem: () => {
        return <Autocomplete onSearchAPI={handleSearchModule} />;
      },
    },
    {
      title: t('resource.list.table.createdAt', { ns: 'iam' }),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
      sorter: true,
      width: 200,
      render: (_, record) =>
        record.createdAt
          ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      title: t('resource.list.table.createdUser', { ns: 'iam' }),
      dataIndex: 'createdUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.createdUser?.username || 'N/A',
    },
    {
      title: t('resource.list.table.updatedAt', { ns: 'iam' }),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
      sorter: true,
      width: 200,
      render: (_, record) =>
        record.updatedAt
          ? dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      title: t('resource.list.table.updatedUser', { ns: 'iam' }),
      dataIndex: 'updatedUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.updatedUser?.username || 'N/A',
    },
    // {
    //   title: t('resource.list.table.deletedAt', { ns: 'iam' }),
    //   dataIndex: 'deletedAt',
    //   valueType: 'dateTime',
    //   search: false,
    //   sorter: true,
    //   width: 200,
    //   render: (_, record) =>
    //     record.deletedAt
    //       ? dayjs(record.deletedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
    //       : 'N/A',
    // },
    // {
    //   title: t('resource.list.table.deletedUser', { ns: 'iam' }),
    //   dataIndex: 'deletedUser.username',
    //   valueType: 'text',
    //   search: false,
    //   width: 200,
    //   render: (text, record) => record.deletedUser?.username || 'N/A',
    // },
    {
      title: t('resource.list.table.actions', { ns: 'iam' }),
      key: 'action',
      search: false,
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <Flex gap="small" wrap>
          <Button type="primary" onClick={() => handleEdit(record)}>
            {t('table.editButton', { ns: 'common' })}
          </Button>

          <Popconfirm
            title={t('resource.delete.confirmTitle', { ns: 'iam' })}
            description={t('resource.delete.confirmMessage', { ns: 'iam' })}
            onConfirm={handleConfirmDelete}
            okText={t('table.deleteYesButton', { ns: 'common' })}
            cancelText={t('table.deleteNoButton', { ns: 'common' })}
          >
            <Button danger onClick={() => handleDelete(record)}>
              {t('table.deleteButton', { ns: 'common' })}
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>{t('resource.list.title')}</Typography.Title>
      <ProTable<ResourceEntity>
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="resourceId"
        search={{
          labelWidth: 'auto',
          optionRender: (searchConfig) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                searchConfig.form?.submit();
              }}
            >
              {t('table.filter.search', { ns: 'common' })}
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                searchConfig.form?.resetFields();
                // Trigger search after reset
                searchConfig.form?.submit();
              }}
            >
              {t('table.filter.reset', { ns: 'common' })}
            </Button>,
          ],
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              setOpenCreatePopup(true);
            }}
          >
            <PlusCircleOutlined />
            {t('table.filter.add', { ns: 'common' })}
          </Button>,
        ]}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });

            // Reset to page 1
            actionRef.current?.reloadAndRest?.();
          },
        }}
        request={async (params, sorter) => {
          const { pageSize, current, ...rest } = params;
          return await handleGetResourcesRequest({
            pagination: {
              page: current || 1,
              limit: pageSize || 10,
            },
            sorts: buildSortArgs(sorter, DEFAULT_SORT),
            filters: buildFilterArgs(rest),
          });
        }}
        loading={loading}
        dateFormatter="string"
        scroll={{ x: 'max-content' }} // enables horizontal scroll automatically
      />

      <ResourceCreateDrawer
        open={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        onCreateSuccess={() => {
          setOpenCreatePopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />

      <ResourceEditDrawer
        open={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        initialData={selectedResource || undefined}
        isLoading={loadingDetail}
        onUpdateSuccess={() => {
          setOpenEditPopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />
    </div>
  );
};

export default ListResource;
