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
import Chip from '@mui/material/Chip';

// import from domain
import { UserEntity } from '@/domain/entities';

// import from common
import { DEFAULT_SORT, PAGE_SIZE_OPTIONS } from '@/common/constants';

// import UserStatus from generated types
import { UserStatus } from '@/infrastructure/graphql';
import { buildSortArgs, buildFilterArgs } from '@/common/utils';

// import from presentation/hooks
import { useListUser, useDeleteUser } from '@/presentation/hooks';

// import create user drawer
import UserCreateDrawer from './Create';
import UserEditDrawer from './Edit';
import UserFilter from './UserFilter';

// import TableBasic
import { TableBasic } from '@/presentation/components/molecules/table';
import { ColumnDef } from '@tanstack/react-table';

const ListUser = () => {
  const { t } = useTranslation('iam');

  // state to manage selected user and edit popup
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);
  const [selectedUserDelete, setSelectedUserDelete] =
    useState<UserEntity | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state to manage create user popup
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { handleDeleteUserRequest } = useDeleteUser();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const [users, setUsers] = useState<UserEntity[]>([]);

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [appliedFilterName, setAppliedFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [appliedFilterEmail, setAppliedFilterEmail] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [appliedFilterPhone, setAppliedFilterPhone] = useState('');
  const [filterStatus, setFilterStatus] = useState<UserStatus | ''>('');
  const [appliedFilterStatus, setAppliedFilterStatus] = useState<
    UserStatus | ''
  >('');

  // use custom hook to handle user listing
  const { handleGetUsersRequest, loading } = useListUser();

  const loadData = useCallback(
    async (
      filterName?: string,
      filterEmail?: string,
      filterPhone?: string,
      filterStatus?: UserStatus | '',
    ) => {
      if (loading) return;
      const result = await handleGetUsersRequest({
        pagination: {
          page: pagination.page,
          limit: pagination.pageSize,
        },
        sorts: buildSortArgs({}, DEFAULT_SORT),
        filters: buildFilterArgs({
          username: filterName ?? undefined,
          email: filterEmail ?? undefined,
          phone: filterPhone ?? undefined,
          status: filterStatus || undefined,
        }),
      });

      if (result) {
        setUsers(result.data || []);
        setPagination((prev) => ({
          ...prev,
          total: result.total || 0,
        }));
      }
    },
    [
      loading,
      handleGetUsersRequest,
      pagination.page,
      pagination.pageSize,
      appliedFilterName,
      appliedFilterEmail,
      appliedFilterPhone,
      appliedFilterStatus,
    ],
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilter = () => {
    setAppliedFilterName(filterName);
    setAppliedFilterEmail(filterEmail);
    setAppliedFilterPhone(filterPhone);
    setAppliedFilterStatus(filterStatus);
    setPagination((prev) => ({ ...prev, page: 1 }));

    loadData(filterName, filterEmail, filterPhone, filterStatus);
  };

  const handleClearFilter = () => {
    setFilterName('');
    setAppliedFilterName('');
    setFilterEmail('');
    setAppliedFilterEmail('');
    setFilterPhone('');
    setAppliedFilterPhone('');
    setFilterStatus('');
    setAppliedFilterStatus('');
    setPagination((prev) => ({ ...prev, page: 1 }));

    loadData('', '', '', '');
  };

  const handleEdit = (user: UserEntity) => {
    setSelectedUser(user);
    setOpenEditPopup(true);
  };

  const handleDelete = (user: UserEntity) => {
    setSelectedUserDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserDelete) return;

    // Call the delete user request here
    await handleDeleteUserRequest({
      userId: selectedUserDelete.userId,
    });

    // Reset the selected user after deletion
    setSelectedUserDelete(null);
    setOpenDeleteDialog(false);

    // Reload the table data
    setPagination((prev) => ({ ...prev }));
    loadData();
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return 'success';
      case UserStatus.Deactivated:
        return 'default';
      case UserStatus.Deleted:
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: ColumnDef<UserEntity>[] = [
    {
      accessorKey: 'username',
      header: t('user.list.table.username', { ns: 'iam' }),
      size: 150,
    },
    {
      accessorKey: 'email',
      header: t('user.list.table.email', { ns: 'iam' }),
      size: 200,
    },
    {
      accessorKey: 'phone',
      header: t('user.list.table.phone', { ns: 'iam' }),
      size: 150,
      cell: ({ row }) => row.original.phone || 'N/A',
    },
    {
      accessorKey: 'status',
      header: t('user.list.table.status', { ns: 'iam' }),
      size: 120,
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          color={getStatusColor(row.original.status)}
          size="small"
        />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: t('user.list.table.createdAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.createdAt
          ? dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'createdUser.username',
      header: t('user.list.table.createdUser', { ns: 'iam' }),
      size: 150,
      cell: ({ row }) => row.original.createdUser?.username || 'N/A',
    },
    {
      accessorKey: 'updatedAt',
      header: t('user.list.table.updatedAt', { ns: 'iam' }),
      size: 200,
      cell: ({ row }) =>
        row.original.updatedAt
          ? dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm [GMT]Z')
          : 'N/A',
    },
    {
      accessorKey: 'updatedUser.username',
      header: t('user.list.table.updatedUser', { ns: 'iam' }),
      size: 150,
      cell: ({ row }) => row.original.updatedUser?.username || 'N/A',
    },
    {
      id: 'actions',
      header: t('user.list.table.actions', { ns: 'iam' }),
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
            <Typography variant="h4">{t('user.list.title')}</Typography>
          </Box>

          <UserFilter
            filterName={filterName}
            onFilterNameChange={setFilterName}
            filterEmail={filterEmail}
            onFilterEmailChange={setFilterEmail}
            filterPhone={filterPhone}
            onFilterPhoneChange={setFilterPhone}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            loading={loading}
          />
        </Box>
      </Card>

      <Card className="mt-4">
        <TableBasic<UserEntity, any>
          columns={columns}
          data={users}
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
            {t('user.delete.confirmTitle', { ns: 'iam' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('user.delete.confirmMessage', { ns: 'iam' })}
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

        <UserCreateDrawer
          open={openCreatePopup}
          onClose={() => setOpenCreatePopup(false)}
          onCreateSuccess={() => {
            setOpenCreatePopup(false);
            setPagination((prev) => ({ ...prev }));
            loadData();
          }}
        />

        <UserEditDrawer
          open={openEditPopup}
          onClose={() => setOpenEditPopup(false)}
          initialData={selectedUser || undefined}
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

export default ListUser;
