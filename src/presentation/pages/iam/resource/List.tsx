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
import { ResourceEntity } from '@/domain/entities';

// import from common
import { DEFAULT_SORT, PAGE_SIZE_OPTIONS } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import {
  useListResource,
  useDeleteResource,
  useDetailResource,
} from '@/presentation/hooks';

// import create Resource drawer
import ResourceCreateDrawer from './Create';
import ResourceEditDrawer from './Edit';

// import TableBasic
import { TableBasic } from '@/presentation/components/molecules/table';
import { ColumnDef } from '@tanstack/react-table';

const ListResource = () => {
  const { t } = useTranslation('iam');

  // state to manage selected Resource and edit popup
  const [selectedResource, setSelectedResource] =
    useState<ResourceEntity | null>(null);
  const [selectedResourceDelete, setSelectedResourceDelete] =
    useState<ResourceEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state to manage create Resource popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteResourceRequest } = useDeleteResource();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const [resources, setResources] = useState<ResourceEntity[]>([]);

  // use custom hook to handle Resource listing
  const { handleGetResourcesRequest, loading } = useListResource();
  const { handleGetDetailResourceRequest, loading: loadingDetail } =
    useDetailResource();

  const loadData = useCallback(async () => {
    if (loading) return;
    const result = await handleGetResourcesRequest({
      pagination: {
        page: pagination.page,
        limit: pagination.pageSize,
      },
      sorts: buildSortArgs({}, DEFAULT_SORT),
      filters: buildFilterArgs({}),
    });

    if (result) {
      setResources(result.data || []);
      setPagination((prev) => ({
        ...prev,
        total: result.total || 0,
      }));
    }
  }, [
    handleGetResourcesRequest,
    pagination.page,
    pagination.pageSize,
    loading,
  ]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize]);

  const handleEdit = async (resource: ResourceEntity) => {
    setOpenEditPopup(true);
    const detail: any = await handleGetDetailResourceRequest({
      resourceId: resource.resourceId,
    });
    if (detail?.resourceId) setSelectedResource(detail);
  };

  const handleDelete = (resource: ResourceEntity) => {
    setSelectedResourceDelete(resource);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedResourceDelete) return;

    // Call the delete Resource request here
    await handleDeleteResourceRequest({
      resourceId: selectedResourceDelete.resourceId,
    });

    // Reset the selected Resource after deletion
    setSelectedResourceDelete(null);
    setOpenDeleteDialog(false);

    // Reload the table data
    loadData();
  };

  const columns: ColumnDef<ResourceEntity>[] = [
    {
      accessorKey: 'name',
      header: t('resource.list.table.name', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'module.name',
      header: t('resource.list.table.module', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.module?.name || 'N/A',
    },
    {
      accessorKey: 'createdAt',
      header: t('resource.list.table.createdAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.createdAt
          ? dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'createdUser.username',
      header: t('resource.list.table.createdUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.createdUser?.username || 'N/A',
    },
    {
      accessorKey: 'updatedAt',
      header: t('resource.list.table.updatedAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.updatedAt
          ? dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'updatedUser.username',
      header: t('resource.list.table.updatedUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.updatedUser?.username || 'N/A',
    },
    {
      id: 'actions',
      header: t('resource.list.table.actions', { ns: 'iam' }),
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
    <Card>
      <TableBasic<ResourceEntity, any>
        columns={columns}
        data={resources}
        isLoading={loading}
        toolbar={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
            }}
            className="p-4"
          >
            <Typography variant="h4">{t('resource.list.title')}</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreatePopup(true)}
            >
              {t('table.filter.add', { ns: 'common' })}
            </Button>
          </Box>
        }
        pagination={{
          totalPage: pagination.total,
          page: pagination.page - 1, // MUI TablePagination uses 0-based index
          rowsPerPage: pagination.pageSize,
          onPageChange: (_event: unknown, newPage: number) => {
            setPagination((prev) => ({ ...prev, page: newPage + 1 })); // Convert back to 1-based
          },
          onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setPagination((prev) => ({
              ...prev,
              pageSize: parseInt(event.target.value, 10),
              page: 1,
            }));
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
          {t('resource.delete.confirmTitle', { ns: 'iam' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('resource.delete.confirmMessage', { ns: 'iam' })}
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

      <ResourceCreateDrawer
        open={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        onCreateSuccess={() => {
          setOpenCreatePopup(false);
          setPagination((prev) => ({ ...prev }));
          loadData();
        }}
      />

      <ResourceEditDrawer
        open={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        initialData={selectedResource || undefined}
        isLoading={loadingDetail}
        onUpdateSuccess={() => {
          setOpenEditPopup(false);
          setPagination((prev) => ({ ...prev }));
          loadData();
        }}
      />
    </Card>
  );
};

export default ListResource;
