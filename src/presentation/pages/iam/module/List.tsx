'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

// MUI Imports
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// import from domain
import { ModuleEntity } from '@/domain/entities';

// import from common
import { DEFAULT_SORT, PAGE_SIZE_OPTIONS } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';
import { SortOrder } from '@/infrastructure/graphql';

// import from presentation/hooks
import {
  useListModule,
  useDeleteModule,
  useDetailModule,
} from '@/presentation/hooks';
import { useListProduct } from '@/presentation/hooks';

// import create Module drawer
import ModuleCreateDrawer from './Create';
import ModuleEditDrawer from './Edit';
import ModuleFilter from './ModuleFilter';
import type { ProductOption } from './ModuleFilter';

// import TableBasic
import { TableBasic } from '@/presentation/components/molecules/table';
import { ColumnDef } from '@tanstack/react-table';

const ListModule = () => {
  const { t } = useTranslation('iam');

  // state to manage selected module and edit popup
  const [selectedModule, setSelectedModule] = useState<ModuleEntity | null>(
    null,
  );
  const [selectedModuleDelete, setSelectedModuleDelete] =
    useState<ModuleEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state to manage create module popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteModuleRequest } = useDeleteModule();
  const { handleGetDetailModuleRequest, loading: loadingDetail } =
    useDetailModule();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const [modules, setModules] = useState<ModuleEntity[]>([]);

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterProductName, setFilterProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(
    null,
  );

  // Product options for autocomplete
  const [products, setProducts] = useState<ProductOption[]>([]);

  // use custom hook to handle Module listing
  const { handleGetModulesRequest, loading } = useListModule();
  const { handleGetProductsRequest, loading: productLoading } =
    useListProduct();

  // Load products for autocomplete
  useEffect(() => {
    const loadProducts = async () => {
      const result = await handleGetProductsRequest({
        pagination: { page: 1, limit: 50 },
        sorts: buildSortArgs({}, { field: 'name', order: SortOrder.Asc }),
        filters: buildFilterArgs({ name: filterProductName }),
      });
      if (result) {
        const productOptions = (result.data || []).map((product) => ({
          productId: product.productId,
          name: product.name,
          value: product.productId,
        }));
        setProducts(productOptions);
      }
    };
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProductName]);

  const loadData = useCallback(
    async (filterName?: string, filterProductId?: string) => {
      if (loading) return;
      const result = await handleGetModulesRequest({
        pagination: {
          page: pagination.page,
          limit: pagination.pageSize,
        },
        sorts: buildSortArgs({}, DEFAULT_SORT),
        filters: buildFilterArgs({
          name: filterName ?? undefined,
          productId: filterProductId ?? undefined,
        }),
      });

      if (result) {
        setModules(result.data || []);
        setPagination((prev) => ({
          ...prev,
          total: result.total || 0,
        }));
      }
    },
    [handleGetModulesRequest, pagination.page, pagination.pageSize, loading],
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilter = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));

    loadData(filterName, selectedProduct?.productId || '');
  };

  const handleClearFilter = () => {
    setFilterName('');
    setSelectedProduct(null);
    setPagination((prev) => ({ ...prev, page: 1 }));

    loadData('', '');
  };

  const handleEdit = async (module: ModuleEntity) => {
    setOpenEditPopup(true);
    const detail = await handleGetDetailModuleRequest({
      moduleId: module.moduleId,
    });
    setSelectedModule(detail);
  };

  const handleDelete = (module: ModuleEntity) => {
    setSelectedModuleDelete(module);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedModuleDelete) return;

    // Call the delete Module request here
    await handleDeleteModuleRequest({
      moduleId: selectedModuleDelete.moduleId,
    });

    // Reset the selected module after deletion
    setSelectedModuleDelete(null);
    setOpenDeleteDialog(false);

    // Reload the table data
    loadData();
  };

  const columns: ColumnDef<ModuleEntity>[] = [
    {
      accessorKey: 'name',
      header: t('module.list.table.name', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'product.name',
      header: t('module.list.table.product', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.product?.name || 'N/A',
    },
    {
      accessorKey: 'description',
      header: t('module.list.table.description', { ns: 'iam' }),
      size: 300,
    },
    {
      accessorKey: 'createdAt',
      header: t('module.list.table.createdAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.createdAt
          ? dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'createdUser.username',
      header: t('module.list.table.createdUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.createdUser?.username || 'N/A',
    },
    {
      accessorKey: 'updatedAt',
      header: t('module.list.table.updatedAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.updatedAt
          ? dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'updatedUser.username',
      header: t('module.list.table.updatedUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.updatedUser?.username || 'N/A',
    },
    {
      id: 'actions',
      header: t('module.list.table.actions', { ns: 'iam' }),
      size: 160,
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(row.original)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(row.original)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Card className="p-4">
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
            className="mb-4"
          >
            <Typography variant="h4">{t('module.list.title')}</Typography>
          </Box>

          <ModuleFilter
            filterName={filterName}
            onFilterNameChange={setFilterName}
            filterProductName={filterProductName}
            onFilterProductNameChange={setFilterProductName}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
            productOptions={products}
            productLoading={productLoading}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            loading={loading}
          />
        </Box>
      </Card>

      <Card className="mt-4">
        <TableBasic<ModuleEntity, any>
          columns={columns}
          data={modules}
          isLoading={loading}
          toolbar={
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenCreatePopup(true)}
                >
                  {t('table.filter.add', { ns: 'common' })}
                </Button>
              </Box>
            </Box>
          }
          pagination={{
            totalPage: pagination.total,
            page: pagination.page - 1,
            rowsPerPage: pagination.pageSize,
            onPageChange: (_event: unknown, newPage: number) => {
              setPagination((prev) => ({ ...prev, page: newPage + 1 }));
              loadData(filterName, selectedProduct?.productId || '');
            },
            onRowsPerPageChange: (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
              setPagination((prev) => ({
                ...prev,
                pageSize: parseInt(event.target.value, 10),
                page: 1,
              }));
              loadData(filterName, selectedProduct?.productId || '');
            },
            rowsPerPageOptions: PAGE_SIZE_OPTIONS,
          }}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            {t('module.delete.confirmTitle', { ns: 'iam' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('module.delete.confirmMessage', { ns: 'iam' })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>
              {t('table.deleteNoButton', { ns: 'common' })}
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              {t('table.deleteYesButton', { ns: 'common' })}
            </Button>
          </DialogActions>
        </Dialog>

        <ModuleCreateDrawer
          open={openCreatePopup}
          onClose={() => setOpenCreatePopup(false)}
          onCreateSuccess={() => {
            setOpenCreatePopup(false);
            loadData();
          }}
        />

        <ModuleEditDrawer
          open={openEditPopup}
          onClose={() => setOpenEditPopup(false)}
          initialData={selectedModule || undefined}
          isLoading={loadingDetail}
          onUpdateSuccess={() => {
            setOpenEditPopup(false);
            loadData();
          }}
        />
      </Card>
    </div>
  );
};

export default ListModule;
