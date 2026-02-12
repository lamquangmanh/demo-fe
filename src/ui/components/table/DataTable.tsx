'use client';

// React Imports
import React, { ReactNode } from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Styles
import tableStyles from '@ui/core/styles/table.module.css';

export type ColumnDef<T> = {
  title: string;
  dataIndex: keyof T | string;
  key?: string;
  width?: number;
  sorter?: boolean;
  search?: boolean;
  fixed?: 'left' | 'right';
  render?: (value: any, record: T, index: number) => ReactNode;
};

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  loading?: boolean;
  dataSource?: T[];
  rowKey: keyof T | ((record: T) => string);
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    onChange?: (page: number, pageSize: number) => void;
  };
  onSortChange?: (field: string, order: 'asc' | 'desc' | null) => void;
  onSearch?: (searchValues: Record<string, any>) => void;
  toolBarRender?: () => ReactNode[];
  scroll?: { x?: string | number };
};

const DataTable = <T extends Record<string, any>>({
  columns,
  loading = false,
  dataSource = [],
  rowKey,
  pagination,
  onSortChange,
  onSearch,
  toolBarRender,
  scroll,
}: DataTableProps<T>) => {
  const [sortField, setSortField] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc' | null>(null);
  const [searchValues, setSearchValues] = React.useState<
    Record<string, string>
  >({});

  const handleSort = (field: string) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSortChange?.(field, newOrder);
  };

  const handleSearch = () => {
    onSearch?.(searchValues);
  };

  const handleReset = () => {
    setSearchValues({});
    onSearch?.({});
  };

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey] || index);
  };

  const searchableColumns = columns.filter((col) => col.search !== false);

  return (
    <Card>
      {/* Toolbar */}
      {toolBarRender && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Data Table</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>{toolBarRender()}</Box>
        </Box>
      )}

      {/* Search Filters */}
      {searchableColumns.length > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid var(--mui-palette-divider)' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            {searchableColumns.map((col) => (
              <TextField
                key={String(col.dataIndex)}
                label={col.title}
                size="small"
                value={searchValues[String(col.dataIndex)] || ''}
                onChange={(e) =>
                  setSearchValues((prev) => ({
                    ...prev,
                    [String(col.dataIndex)]: e.target.value,
                  }))
                }
                sx={{ minWidth: 200 }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      )}

      {/* Table */}
      <TableContainer>
        <Table className={tableStyles.table} sx={{ minWidth: scroll?.x }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.dataIndex)}
                  style={{ width: col.width }}
                  sx={{
                    ...(col.fixed === 'left' && {
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'var(--mui-palette-background-paper)',
                    }),
                    ...(col.fixed === 'right' && {
                      position: 'sticky',
                      right: 0,
                      zIndex: 1,
                      backgroundColor: 'var(--mui-palette-background-paper)',
                    }),
                  }}
                >
                  {col.sorter ? (
                    <TableSortLabel
                      active={sortField === String(col.dataIndex)}
                      direction={
                        sortField === String(col.dataIndex)
                          ? sortOrder || 'asc'
                          : 'asc'
                      }
                      onClick={() => handleSort(String(col.dataIndex))}
                    >
                      {col.title}
                    </TableSortLabel>
                  ) : (
                    col.title
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 10 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : dataSource.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 10 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              dataSource.map((record, index) => (
                <TableRow key={getRowKey(record, index)}>
                  {columns.map((col) => {
                    const value = String(col.dataIndex)
                      .split('.')
                      .reduce((obj, key) => obj?.[key], record);
                    return (
                      <TableCell
                        key={String(col.dataIndex)}
                        sx={{
                          ...(col.fixed === 'left' && {
                            position: 'sticky',
                            left: 0,
                            zIndex: 1,
                            backgroundColor:
                              'var(--mui-palette-background-paper)',
                          }),
                          ...(col.fixed === 'right' && {
                            position: 'sticky',
                            right: 0,
                            zIndex: 1,
                            backgroundColor:
                              'var(--mui-palette-background-paper)',
                          }),
                        }}
                      >
                        {col.render
                          ? col.render(value, record, index)
                          : String(value || '')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.current - 1}
          onPageChange={(_, newPage) =>
            pagination.onChange?.(newPage + 1, pagination.pageSize)
          }
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={(event) =>
            pagination.onChange?.(1, parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={pagination.pageSizeOptions || [5, 10, 25, 50]}
        />
      )}
    </Card>
  );
};

export default DataTable;
