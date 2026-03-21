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
import { RoleEntity, ModuleEntity } from '@/domain/entities';

// import from common
import { DEFAULT_SORT, PAGE_SIZE_OPTIONS } from '@/common/constants';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';
import { SortOrder } from '@/infrastructure/graphql';

// import from presentation/hooks
import {
  useListRole,
  useDeleteRole,
  useDetailRole,
} from '@/presentation/hooks';
import { useListModule } from '@/presentation/hooks';

// import create Role drawer
import RoleCreateDrawer from './Create';
import RoleEditDrawer from './Edit';
import RoleFilter from './RoleFilter';

// import TableBasic
import { TableBasic } from '@/presentation/components/molecules/table';
import { ColumnDef } from '@tanstack/react-table';

const ListRole = () => {
  const { t } = useTranslation('iam');

  // state to manage selected Role and edit popup
  const [selectedRole, setSelectedRole] = useState<RoleEntity | null>(null);
  const [selectedRoleDelete, setSelectedRoleDelete] =
    useState<RoleEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state to manage create Role popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteRoleRequest } = useDeleteRole();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const [roles, setRoles] = useState<RoleEntity[]>([]);

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [appliedFilterName, setAppliedFilterName] = useState('');
  const [filterModuleName, setFilterModuleName] = useState('');
  const [selectedModule, setSelectedModule] = useState<ModuleEntity | null>(
    null,
  );
  const [appliedModuleId, setAppliedModuleId] = useState('');

  // Module options for autocomplete
  const [modules, setModules] = useState<ModuleEntity[]>([]);

  // use custom hook to handle Role listing
  const { handleGetRolesRequest, loading } = useListRole();
  const { handleGetDetailRoleRequest, loading: loadingDetail } =
    useDetailRole();
  const { handleGetModulesRequest, loading: moduleLoading } = useListModule();

  // Load modules for autocomplete
  useEffect(() => {
    const loadModules = async () => {
      const result = await handleGetModulesRequest({
        pagination: { page: 1, limit: 50 },
        sorts: buildSortArgs({}, { field: 'name', order: SortOrder.Asc }),
        filters: buildFilterArgs({ name: filterModuleName }),
      });
      if (result) {
        setModules(result.data || []);
      }
    };
    loadModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterModuleName]);

  const loadData = useCallback(
    async (filterName?: string, filterModuleId?: string) => {
      if (loading) return;
      const result = await handleGetRolesRequest({
        pagination: {
          page: pagination.page,
          limit: pagination.pageSize,
        },
        sorts: buildSortArgs({}, DEFAULT_SORT),
        filters: buildFilterArgs({
          name: filterName ?? undefined,
          moduleId: filterModuleId ?? undefined,
        }),
      });

      if (result) {
        setRoles(result.data || []);
        setPagination((prev) => ({
          ...prev,
          total: result.total || 0,
        }));
      }
    },
    [
      handleGetRolesRequest,
      pagination.page,
      pagination.pageSize,
      loading,
      appliedFilterName,
      appliedModuleId,
    ],
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilter = () => {
    setAppliedFilterName(filterName);
    setAppliedModuleId(selectedModule?.moduleId || '');
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadData(filterName, selectedModule?.moduleId || '');
  };

  const handleClearFilter = () => {
    setFilterName('');
    setAppliedFilterName('');
    setSelectedModule(null);
    setAppliedModuleId('');
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadData('', '');
  };

  const handleEdit = async (role: RoleEntity) => {
    setOpenEditPopup(true);
    const detail: any = await handleGetDetailRoleRequest({
      roleId: role.roleId,
    });
    if (detail?.roleId) setSelectedRole(detail);
  };

  const handleDelete = (role: RoleEntity) => {
    setSelectedRoleDelete(role);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoleDelete) return;

    // Call the delete Role request here
    await handleDeleteRoleRequest({
      roleId: selectedRoleDelete.roleId,
    });

    // Reset the selected Role after deletion
    setSelectedRoleDelete(null);
    setOpenDeleteDialog(false);

    // Reload the table data
    loadData();
  };

  const columns: ColumnDef<RoleEntity>[] = [
    {
      accessorKey: 'name',
      header: t('role.list.table.name', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'module.name',
      header: t('role.list.table.module', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.module?.name || 'N/A',
    },
    {
      accessorKey: 'description',
      header: t('role.list.table.description', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'createdAt',
      header: t('role.list.table.createdAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.createdAt
          ? dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'createdUser.username',
      header: t('role.list.table.createdUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.createdUser?.username || 'N/A',
    },
    {
      accessorKey: 'updatedAt',
      header: t('role.list.table.updatedAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.updatedAt
          ? dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'updatedUser.username',
      header: t('role.list.table.updatedUser', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) => row.original.updatedUser?.username || 'N/A',
    },
    {
      id: 'actions',
      header: t('role.list.table.actions', { ns: 'iam' }),
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
            <Typography variant="h4">{t('role.list.title')}</Typography>
          </Box>

          <RoleFilter
            filterName={filterName}
            onFilterNameChange={setFilterName}
            filterModuleName={filterModuleName}
            onFilterModuleNameChange={setFilterModuleName}
            selectedModule={selectedModule}
            onModuleChange={setSelectedModule}
            moduleOptions={modules}
            moduleLoading={moduleLoading}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            loading={loading}
          />
        </Box>
      </Card>

      <Card className="mt-4">
        <TableBasic<RoleEntity, any>
          columns={columns}
          data={roles}
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
            },
            onRowsPerPageChange: (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
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
            {t('role.delete.confirmTitle', { ns: 'iam' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('role.delete.confirmMessage', { ns: 'iam' })}
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

        <RoleCreateDrawer
          open={openCreatePopup}
          onClose={() => setOpenCreatePopup(false)}
          onCreateSuccess={() => {
            setOpenCreatePopup(false);
            setPagination((prev) => ({ ...prev }));
            loadData();
          }}
        />

        <RoleEditDrawer
          open={openEditPopup}
          onClose={() => setOpenEditPopup(false)}
          initialData={selectedRole || undefined}
          isLoading={loadingDetail}
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

export default ListRole;
