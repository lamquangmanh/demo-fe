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
import { ProductEntity } from '@/domain/entities';

interface ModuleFilterProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
  filterProductName: string;
  onFilterProductNameChange: (value: string) => void;
  selectedProduct: ProductEntity | null;
  onProductChange: (value: ProductEntity | null) => void;
  productOptions: ProductEntity[];
  productLoading?: boolean;
  onApplyFilter: () => void;
  onClearFilter: () => void;
  loading?: boolean;
}

const ModuleFilter: React.FC<ModuleFilterProps> = ({
  filterName,
  onFilterNameChange,
  filterProductName,
  onFilterProductNameChange,
  selectedProduct,
  onProductChange,
  productOptions,
  productLoading = false,
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
          t('module.filter.name', { ns: 'iam' }) || 'Search by module name...'
        }
        value={filterName}
        onChange={(e) => onFilterNameChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 250 }}
      />

      <Autocomplete
        size="small"
        options={productOptions}
        value={selectedProduct}
        onChange={(_event, newValue) => onProductChange(newValue)}
        getOptionLabel={(option) => option.name}
        loading={productLoading}
        isOptionEqualToValue={(option, value) =>
          option.productId === value.productId
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              t('module.filter.product', { ns: 'iam' }) ||
              'Filter by product...'
            }
            value={filterProductName}
            onChange={(e) => onFilterProductNameChange(e.target.value)}
          />
        )}
        sx={{ minWidth: 250 }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onApplyFilter}
        disabled={loading}
      >
        {t('module.filter.searchButton', { ns: 'iam' }) || 'Search'}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={onClearFilter}
        disabled={loading || (!filterName && !selectedProduct)}
      >
        {t('module.filter.resetButton', { ns: 'iam' }) || 'Clear'}
      </Button>
    </Box>
  );
};

export default ModuleFilter;
