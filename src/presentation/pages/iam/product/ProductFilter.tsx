import React from 'react';
import { useTranslation } from 'next-i18next';

// MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface ProductFilterProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
  loading?: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filterName,
  onFilterNameChange,
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
      }}
    >
      <TextField
        size="small"
        placeholder={
          t('product.filter.name', { ns: 'iam' }) || 'Search by name...'
        }
        value={filterName}
        onChange={(e) => onFilterNameChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 300 }}
      />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onApplyFilter}
        disabled={loading}
      >
        {t('product.filter.searchButton', { ns: 'iam' }) || 'Search'}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={onClearFilter}
        disabled={loading || !filterName}
      >
        {t('product.filter.resetButton', { ns: 'iam' }) || 'Clear'}
      </Button>
    </Box>
  );
};

export default ProductFilter;
