import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

import {
  Checkbox,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

import { Pagination } from '../pagination';
import { Toolbar } from './Toolbar';
import { TableBasicProps, TableBasicRowProps } from './interface';

function TableBaseRow<TData>(props: Readonly<TableBasicRowProps<TData>>) {
  const { row, table, selection } = props;
  return (
    <React.Fragment key={row.id}>
      <TableRow
        className={clsx({
          'table-basic-row-highlight': row.getIsSelected(),
          'table-basic-row-enable': row.getCanSelect(),
          'table-basic-row-disabled': !row.getCanSelect(),
          [selection?.highlight ?? '']: row.getIsSelected(), // custom classname for row highlight
        })}
      >
        {/* Show selection if enabled */}
        {selection?.enabled && (
          <TableCell>
            {selection?.mode === 'single' && (
              <Radio
                style={{
                  paddingBlock: 'var(--mag-spacing-4)',
                }}
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  onClick: (e) => {
                    e.stopPropagation();
                  },
                  onChange: (e) => {
                    e.stopPropagation();
                    table.setRowSelection(() => ({ [row.id]: true }));
                  },
                  size:
                    selection.size === 'sm'
                      ? 'small'
                      : selection.size === 'lg'
                        ? 'medium'
                        : 'medium',
                }}
              />
            )}
            {selection?.mode === 'multiple' && (
              <Checkbox
                style={{
                  paddingBlock: 'var(--mag-spacing-4)',
                }}
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                  size:
                    selection.size === 'sm'
                      ? 'small'
                      : selection.size === 'lg'
                        ? 'medium'
                        : 'medium',
                }}
              />
            )}
          </TableCell>
        )}

        {row.getVisibleCells().map((cell) => {
          return (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, {
                ...cell.getContext(),
              })}
            </TableCell>
          );
        })}
      </TableRow>
    </React.Fragment>
  );
}

export function TableBasic<TData, TValue>(
  props: Readonly<TableBasicProps<TData, TValue>>,
) {
  const {
    data,
    columns,
    title,
    subTitle,
    style,
    dataCy,
    isLoading,
    customNoData,
    className,
    selection,
    toolbar,
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const handleRowSelectionChange = useCallback(() => {
    if (props.onRowSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((r) => r.original);
      props.onRowSelectionChange(selectedRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // init use react table from tanstack
  const configReactTable = {
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      rowSelection, // manage state for selection
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection(row: any) {
      // Disable row selection for disabled rows
      const disabledRows = props.disabledRows ?? [];
      return disabledRows.indexOf(row.id) === -1;
    },
    onRowSelectionChange: setRowSelection,
  };
  const table = useReactTable(configReactTable);

  useEffect(() => {
    handleRowSelectionChange();
  }, [rowSelection, handleRowSelectionChange]);

  return (
    <>
      <Box
        style={style}
        data-cy={dataCy}
        className={clsx(
          // 'p-0',
          // 'flex-1',
          // 'mag-scrollable-true',
          // 'w-full',
          // 'hiddenTextContainerTable',
          // 'border border-[var(--mag-colors-neutral-200)] rounded-lg',
          className,
        )}
      >
        {(title || subTitle) && (
          <Box sx={{ p: 2 }}>
            {title}
            {subTitle}
          </Box>
        )}
        {/* Render toolbar */}
        {toolbar && <Toolbar>{toolbar}</Toolbar>}

        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Show selection if enabled */}
                {selection?.enabled && (
                  <TableCell sx={{ width: selection.width ?? 35 }}>
                    {selection.enabledSelectAll &&
                      selection.mode === 'multiple' && (
                        <Checkbox
                          style={{
                            paddingBlock: 'var(--mag-spacing-4)',
                          }}
                          {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getIsSomeRowsSelected()
                              ? () => table.setRowSelection(() => ({}))
                              : table.getToggleAllRowsSelectedHandler(),
                            size:
                              selection.size === 'sm'
                                ? 'small'
                                : selection.size === 'lg'
                                  ? 'medium'
                                  : 'medium',
                          }}
                        />
                      )}
                  </TableCell>
                )}

                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} sx={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow className="border-none">
                <TableCell
                  className="hover:bg-white"
                  colSpan={columns.length + 1}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '180px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      gap: 2,
                    }}
                  >
                    <CircularProgress size="large" />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && data.length === 0 && (
              <TableRow className="border-none">
                <TableCell
                  className="hover:bg-white"
                  colSpan={columns.length + 1}
                >
                  {customNoData ?? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 4,
                      }}
                    >
                      <Typography variant="h6">No data found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Please try another search, keyword or filter
                      </Typography>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableBaseRow
                    table={table}
                    row={row}
                    cols={columns.length + 1}
                    key={row.id}
                    selection={selection}
                  />
                ))}
          </TableBody>
        </Table>
      </Box>

      {props.pagination && <Pagination {...props.pagination} />}
    </>
  );
}
