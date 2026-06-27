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
import { ProductEntity } from '@/domain/entities';

// import from common
import { DEFAULT_SORT, PAGE_SIZE_OPTIONS } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import { useListProduct, useDeleteProduct } from '@/presentation/hooks';

// import create product drawer
import ProductCreateDrawer from './Create';
import ProductEditDrawer from './Edit';
import ProductFilter from './ProductFilter';

// import TableBasic
import { TableBasic } from '@/presentation/components/molecules/table';
import { ColumnDef } from '@tanstack/react-table';

const ListProduct = () => {
  const { t } = useTranslation('iam');

  // state to manage selected product and edit popup
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(
    null,
  );
  const [selectedProductDelete, setSelectedProductDelete] =
    useState<ProductEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state to manage create product popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteProductRequest } = useDeleteProduct();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const [products, setProducts] = useState<ProductEntity[]>([]);

  // Filter states
  const [filterName, setFilterName] = useState('');

  // use custom hook to handle product listing
  const { handleGetProductsRequest, loading } = useListProduct();

  const loadData = useCallback(
    async (filterName?: string) => {
      if (loading) return;
      const result = await handleGetProductsRequest({
        pagination: {
          page: pagination.page,
          limit: pagination.pageSize,
        },
        sorts: buildSortArgs({}, DEFAULT_SORT),
        filters: buildFilterArgs({ name: filterName }),
      });

      if (result) {
        setProducts(result.data || []);
        setPagination((prev) => ({
          ...prev,
          total: result.total || 0,
        }));
      }
    },
    [loading, handleGetProductsRequest, pagination.page, pagination.pageSize],
  );

  useEffect(() => {
    loadData(filterName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilter = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadData(filterName);
  };

  const handleClearFilter = () => {
    setFilterName('');
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadData('');
  };

  const handleEdit = (product: ProductEntity) => {
    setSelectedProduct(product);
    setOpenEditPopup(true);
  };

  const handleDelete = (product: ProductEntity) => {
    setSelectedProductDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductDelete) return;

    // Call the delete product request here
    await handleDeleteProductRequest({
      productId: selectedProductDelete.productId,
    });

    // Reset the selected product after deletion
    setSelectedProductDelete(null);
    setOpenDeleteDialog(false);

    // Reload the table data
    setPagination((prev) => ({ ...prev }));
    loadData();
  };

  const columns: ColumnDef<ProductEntity>[] = [
    {
      accessorKey: 'name',
      header: t('product.list.table.name', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'description',
      header: t('product.list.table.description', { ns: 'iam' }),
      size: 300,
    },
    {
      accessorKey: 'createdAt',
      header: t('product.list.table.createdAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.createdAt
          ? dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'createdUser.username',
      header: t('product.list.table.createdUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.createdUser?.username || 'N/A',
    },
    {
      accessorKey: 'updatedAt',
      header: t('product.list.table.updatedAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.updatedAt
          ? dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'updatedUser.username',
      header: t('product.list.table.updatedUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.updatedUser?.username || 'N/A',
    },
    {
      id: 'actions',
      header: t('product.list.table.actions', { ns: 'iam' }),
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
            <Typography variant="h4">{t('product.list.title')}</Typography>
          </Box>

          <ProductFilter
            filterName={filterName}
            onFilterNameChange={setFilterName}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            loading={loading}
          />
        </Box>
      </Card>

      <Card className="mt-4">
        <TableBasic<ProductEntity, any>
          columns={columns}
          data={products}
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
            page: pagination.page - 1, // MUI TablePagination uses 0-based index
            rowsPerPage: pagination.pageSize,
            onPageChange: (_event: unknown, newPage: number) => {
              setPagination((prev) => ({ ...prev, page: newPage + 1 })); // Convert back to 1-based
              loadData(filterName);
            },
            onRowsPerPageChange: (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
              setPagination((prev) => ({
                ...prev,
                pageSize: parseInt(event.target.value, 10),
                page: 1,
              }));
              loadData(filterName);
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
            {t('product.delete.confirmTitle', { ns: 'iam' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('product.delete.confirmMessage', { ns: 'iam' })}
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

        <ProductCreateDrawer
          open={openCreatePopup}
          onClose={() => setOpenCreatePopup(false)}
          onCreateSuccess={() => {
            setOpenCreatePopup(false);
            setPagination((prev) => ({ ...prev }));
            loadData();
          }}
        />

        <ProductEditDrawer
          open={openEditPopup}
          onClose={() => setOpenEditPopup(false)}
          initialData={selectedProduct || undefined}
          onUpdateSuccess={() => {
            setOpenEditPopup(false);
            setPagination((prev) => ({ ...prev }));
            loadData();
          }}
        />
      </Card>
    </div>
  );
};

export default ListProduct;
