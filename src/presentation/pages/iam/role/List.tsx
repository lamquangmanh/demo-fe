'use client';

import React, { useRef, useState } from 'react';
import { Typography, Button, Flex, Popconfirm } from 'antd';
import type { FormInstance } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

// import from domain
import { RoleEntity } from '@/domain/entities';

// import from common
import { PAGE_SIZE_OPTIONS, DEFAULT_SORT } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import {
  useListRole,
  useDeleteRole,
  useDetailRole,
  useListModule,
} from '@/presentation/hooks';
import { Autocomplete } from '@/presentation/components/atoms';

// import create Role drawer
import RoleCreateDrawer from './Create';
import RoleEditDrawer from './Edit';

const ListRole = () => {
  const { handleGetModulesRequest } = useListModule();
  const { t } = useTranslation('iam');
  const actionRef = useRef<ActionType | null>(null);
  const formRef = useRef<FormInstance | undefined>(undefined);

  // state to manage selected Role and edit popup
  const [selectedRole, setSelectedRole] = useState<RoleEntity | null>(null);
  const [selectedRoleDelete, setSelectedRoleDelete] =
    useState<RoleEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  // state to manage create Role popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteRoleRequest } = useDeleteRole();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
  });

  // use custom hook to handle Role listing
  const { handleGetRolesRequest, loading } = useListRole();
  const { handleGetDetailRoleRequest, loading: loadingDetail } =
    useDetailRole();

  const handleEdit = async (role: RoleEntity) => {
    setOpenEditPopup(true);
    const detail: any = await handleGetDetailRoleRequest({
      roleId: role.roleId,
    });
    if (detail?.roleId) setSelectedRole(detail);
  };

  const handleDelete = (role: RoleEntity) => {
    setSelectedRoleDelete(role);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoleDelete) return;

    // Call the delete Role request here
    await handleDeleteRoleRequest({
      roleId: selectedRoleDelete.roleId,
    });

    // Reset the selected Role after deletion
    setSelectedRoleDelete(null);
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

  const columns: ProColumns<RoleEntity>[] = [
    {
      title: t('role.list.table.name', { ns: 'iam' }),
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
    },
    {
      title: t('role.list.table.module', { ns: 'iam' }),
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
      title: t('role.list.table.description', { ns: 'iam' }),
      dataIndex: 'description',
      valueType: 'text',
      sorter: false,
      search: false,
    },
    {
      title: t('role.list.table.createdAt', { ns: 'iam' }),
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
      title: t('role.list.table.createdUser', { ns: 'iam' }),
      dataIndex: 'createdUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.createdUser?.username || 'N/A',
    },
    {
      title: t('role.list.table.updatedAt', { ns: 'iam' }),
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
      title: t('role.list.table.updatedUser', { ns: 'iam' }),
      dataIndex: 'updatedUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.updatedUser?.username || 'N/A',
    },
    // {
    //   title: t('role.list.table.deletedAt', { ns: 'iam' }),
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
    //   title: t('role.list.table.deletedUser', { ns: 'iam' }),
    //   dataIndex: 'deletedUser.username',
    //   valueType: 'text',
    //   search: false,
    //   width: 200,
    //   render: (text, record) => record.deletedUser?.username || 'N/A',
    // },
    {
      title: t('role.list.table.actions', { ns: 'iam' }),
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
            title={t('role.delete.confirmTitle', { ns: 'iam' })}
            description={t('role.delete.confirmMessage', { ns: 'iam' })}
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
      <Typography.Title level={3}>{t('role.list.title')}</Typography.Title>
      <ProTable<RoleEntity>
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="roleId"
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
          return await handleGetRolesRequest({
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

      <RoleCreateDrawer
        open={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        onCreateSuccess={() => {
          setOpenCreatePopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />

      <RoleEditDrawer
        open={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        initialData={selectedRole || undefined}
        isLoading={loadingDetail}
        onUpdateSuccess={() => {
          setOpenEditPopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />
    </div>
  );
};

export default ListRole;
