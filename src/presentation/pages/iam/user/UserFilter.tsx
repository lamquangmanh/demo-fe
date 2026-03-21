import React from 'react';
import { useTranslation } from 'next-i18next';

// MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// import UserStatus
import { UserStatus } from '@/infrastructure/graphql';

interface UserFilterProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
  filterEmail: string;
  onFilterEmailChange: (value: string) => void;
  filterPhone: string;
  onFilterPhoneChange: (value: string) => void;
  filterStatus: UserStatus | '';
  onFilterStatusChange: (value: UserStatus | '') => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
  loading?: boolean;
}

const UserFilter: React.FC<UserFilterProps> = ({
  filterName,
  onFilterNameChange,
  filterEmail,
  onFilterEmailChange,
  filterPhone,
  onFilterPhoneChange,
  filterStatus,
  onFilterStatusChange,
  onApplyFilter,
  onClearFilter,
  loading = false,
}) => {
  const { t } = useTranslation(['iam', 'common']);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onApplyFilter();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        size="small"
        placeholder={
          t('user.filter.name', { ns: 'iam' }) || 'Search by username...'
        }
        value={filterName}
        onChange={(e) => onFilterNameChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 200 }}
      />

      <TextField
        size="small"
        placeholder={
          t('user.filter.email', { ns: 'iam' }) || 'Search by email...'
        }
        value={filterEmail}
        onChange={(e) => onFilterEmailChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 200 }}
      />

      <TextField
        size="small"
        placeholder={
          t('user.filter.phone', { ns: 'iam' }) || 'Search by phone...'
        }
        value={filterPhone}
        onChange={(e) => onFilterPhoneChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="user-status-filter-label">
          {t('user.filter.status', { ns: 'iam' }) || 'Status'}
        </InputLabel>
        <Select
          labelId="user-status-filter-label"
          value={filterStatus}
          label={t('user.filter.status', { ns: 'iam' }) || 'Status'}
          onChange={(e) =>
            onFilterStatusChange(e.target.value as UserStatus | '')
          }
        >
          <MenuItem value="">
            <em>{t('user.status.all', { ns: 'iam' }) || 'All'}</em>
          </MenuItem>
          <MenuItem value={UserStatus.Active}>
            {t('user.status.active', { ns: 'iam' }) || 'Active'}
          </MenuItem>
          <MenuItem value={UserStatus.Deactivated}>
            {t('user.status.deactivated', { ns: 'iam' }) || 'Deactivated'}
          </MenuItem>
          <MenuItem value={UserStatus.Deleted}>
            {t('user.status.deleted', { ns: 'iam' }) || 'Deleted'}
          </MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onApplyFilter}
        disabled={loading}
      >
        {t('user.filter.searchButton', { ns: 'iam' }) || 'Search'}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={onClearFilter}
        disabled={
          loading ||
          (!filterName && !filterEmail && !filterPhone && !filterStatus)
        }
      >
        {t('user.filter.resetButton', { ns: 'iam' }) || 'Clear'}
      </Button>
    </Box>
  );
};

export default UserFilter;
