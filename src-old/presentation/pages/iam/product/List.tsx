'use client';

import React, { useRef, useState } from 'react';
import { Typography, Button, Flex, Popconfirm } from 'antd';
import type { FormInstance } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

// import from domain
import { ProductEntity } from '@/domain/entities';

// import from common
import { PAGE_SIZE_OPTIONS, DEFAULT_SORT } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import { useListProduct, useDeleteProduct } from '@/presentation/hooks';

// import create product drawer
import ProductCreateDrawer from './Create';
import ProductEditDrawer from './Edit';

const ListProduct = () => {
  const { t } = useTranslation('iam');
  const actionRef = useRef<ActionType | null>(null);
  const formRef = useRef<FormInstance | undefined>(undefined);

  // state to manage selected product and edit popup
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(
    null
  );
  const [selectedProductDelete, setSelectedProductDelete] =
    useState<ProductEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  // state to manage create product popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteProductRequest } = useDeleteProduct();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
  });

  // use custom hook to handle product listing
  const { handleGetProductsRequest, loading } = useListProduct();

  const handleEdit = (product: ProductEntity) => {
    setSelectedProduct(product);
    setOpenEditPopup(true);
  };

  const handleDelete = (product: ProductEntity) => {
    setSelectedProductDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductDelete) return;

    // Call the delete product request here
    await handleDeleteProductRequest({
      productId: selectedProductDelete.productId,
    });

    // Reset the selected product after deletion
    setSelectedProductDelete(null);
    // Reload the table data
    actionRef.current?.reloadAndRest?.();
  };

  const columns: ProColumns<ProductEntity>[] = [
    {
      title: t('product.list.table.name', { ns: 'iam' }),
      dataIndex: 'name',
      valueType: 'text',
      sorter: true,
    },
    {
      title: t('product.list.table.description', { ns: 'iam' }),
      dataIndex: 'description',
      valueType: 'text',
      search: false,
      width: 300,
    },
    {
      title: t('product.list.table.createdAt', { ns: 'iam' }),
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
      title: t('product.list.table.createdUser', { ns: 'iam' }),
      dataIndex: 'createdUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.createdUser?.username || 'N/A',
    },
    {
      title: t('product.list.table.updatedAt', { ns: 'iam' }),
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
      title: t('product.list.table.updatedUser', { ns: 'iam' }),
      dataIndex: 'updatedUser.username',
      valueType: 'text',
      search: false,
      width: 200,
      render: (text, record) => record.updatedUser?.username || 'N/A',
    },
    // {
    //   title: t('product.list.table.deletedAt', { ns: 'iam' }),
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
    //   title: t('product.list.table.deletedUser', { ns: 'iam' }),
    //   dataIndex: 'deletedUser.username',
    //   valueType: 'text',
    //   search: false,
    //   width: 200,
    //   render: (text, record) => record.deletedUser?.username || 'N/A',
    // },
    {
      title: t('product.list.table.actions', { ns: 'iam' }),
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
            title={t('product.delete.confirmTitle', { ns: 'iam' })}
            description={t('product.delete.confirmMessage', { ns: 'iam' })}
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
      <Typography.Title level={3}>{t('product.list.title')}</Typography.Title>
      <ProTable<ProductEntity>
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="productId"
        search={{
          labelWidth: 'auto',
          // optionRender: (searchConfig, formProps, dom) => [
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
          return await handleGetProductsRequest({
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

      <ProductCreateDrawer
        open={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        onCreateSuccess={() => {
          setOpenCreatePopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />

      <ProductEditDrawer
        open={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        initialData={selectedProduct || undefined}
        onUpdateSuccess={() => {
          setOpenEditPopup(false);
          actionRef.current?.reloadAndRest?.();
        }}
      />
    </div>
  );
};

export default ListProduct;
