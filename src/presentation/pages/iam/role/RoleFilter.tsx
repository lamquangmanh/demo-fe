import React from 'react';
import { useTranslation } from 'next-i18next';

// MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// import from domain
import { ModuleEntity } from '@/domain/entities';

interface RoleFilterProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
  filterModuleName: string;
  onFilterModuleNameChange: (value: string) => void;
  selectedModule: ModuleEntity | null;
  onModuleChange: (value: ModuleEntity | null) => void;
  moduleOptions: ModuleEntity[];
  moduleLoading?: boolean;
  onApplyFilter: () => void;
  onClearFilter: () => void;
  loading?: boolean;
}

const RoleFilter: React.FC<RoleFilterProps> = ({
  filterName,
  onFilterNameChange,
  filterModuleName,
  onFilterModuleNameChange,
  selectedModule,
  onModuleChange,
  moduleOptions,
  moduleLoading = false,
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
          t('role.filter.name', { ns: 'iam' }) || 'Search by role name...'
        }
        value={filterName}
        onChange={(e) => onFilterNameChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 250 }}
      />

      <Autocomplete
        size="small"
        options={moduleOptions}
        value={selectedModule}
        onChange={(_event, newValue) => onModuleChange(newValue)}
        getOptionLabel={(option) => option.name}
        loading={moduleLoading}
        isOptionEqualToValue={(option, value) =>
          option.moduleId === value.moduleId
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              t('role.filter.module', { ns: 'iam' }) || 'Filter by module...'
            }
            value={filterModuleName}
            onChange={(e) => onFilterModuleNameChange(e.target.value)}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.moduleId}>
            {option.name}
          </li>
        )}
        sx={{ minWidth: 250 }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onApplyFilter}
        disabled={loading}
      >
        {t('role.filter.searchButton', { ns: 'iam' }) || 'Search'}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={onClearFilter}
        disabled={loading || (!filterName && !selectedModule)}
      >
        {t('role.filter.resetButton', { ns: 'iam' }) || 'Clear'}
      </Button>
    </Box>
  );
};

export default RoleFilter;
