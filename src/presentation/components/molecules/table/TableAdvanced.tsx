import {
  HeaderGroup,
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
import {
  TableAdvancedHeaderProps,
  TableAdvancedProps,
  TableAdvancedRowProps,
} from './interface';

/**
 * EditableCell component for inline editing with custom render component
 */
function EditableCell({
  value: initialValue,
  rowIndex,
  columnId,
  onEdit,
  renderComponent,
}: {
  value: any;
  rowIndex: number;
  columnId: string;
  onEdit: (rowIndex: number, columnId: string, value: any) => void;
  renderComponent: (props: {
    value: any;
    onChange: (newValue: any) => void;
  }) => React.ReactNode;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    onEdit(rowIndex, columnId, newValue);
  };

  return (
    <div style={{ width: '100%' }}>
      {renderComponent({
        value,
        onChange: handleChange,
      })}
    </div>
  );
}

function TableBodyRow<TData>(props: Readonly<TableAdvancedRowProps<TData>>) {
  const {
    row,
    table,
    selection,
    editableConfig,
    onCellEdit,
    selectedGroupKeys,
    getRowGroupKey,
  } = props;

  const isVisibleInFirstColumn = selection?.setSelectionInFirstColumn;
  const rowData = row.original as any;

  const renderSelection = (paddingLeft?: string, paddingRight?: string) => {
    if (selection?.mode === 'single') {
      return (
        <Radio
          style={{
            paddingLeft: paddingLeft ?? undefined,
            paddingRight: paddingRight ?? undefined,
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
            size: selection.size === 'sm' ? 'small' : 'medium',
          }}
        />
      );
    }

    if (selection?.mode === 'multiple') {
      return (
        <Checkbox
          style={{
            paddingLeft: paddingLeft ?? undefined,
            paddingRight: paddingRight ?? undefined,
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
      );
    }

    return null;
  };

  return (
    <React.Fragment key={row.id}>
      <TableRow
        className={clsx({
          'table-basic-row-highlight': row.getIsSelected(),
          'table-basic-row-enable': row.getCanSelect(),
          'table-basic-row-disabled': !row.getCanSelect(),
          [selection?.highlight ?? '']: row.getIsSelected(),
        })}
      >
        {row.getVisibleCells().map((cell: any, cellIndex: number) => {
          const cellStyle = cell.column.columnDef.meta?.cellStyle || {};
          const columnId = cell.column.id;

          // Multi-level rowSpan logic
          let rowSpan: number | undefined = undefined;
          let shouldSkipRendering = false;

          // Check for multi-level rowSpan configuration
          const multiLevelConfig =
            cell.column.columnDef.meta?.multiLevelRowSpan;
          if (multiLevelConfig) {
            const rowSpanValue = rowData[multiLevelConfig.rowSpanKey];
            const isFirst = rowData[multiLevelConfig.isFirstKey];

            if (isFirst) {
              rowSpan = rowSpanValue;
            } else {
              shouldSkipRendering = true;
            }
          }

          if (shouldSkipRendering) {
            return null;
          }

          const isVisibleSelectionColumn =
            selection?.enabled && cellIndex === 0;

          // use the custom style for selection cell padding
          let paddingLeft = undefined;
          let paddingRight = undefined;
          if (isVisibleSelectionColumn && isVisibleInFirstColumn) {
            paddingLeft = undefined;
            paddingRight = '4px';
          }

          const isFirstCell = cellIndex === 0;

          // Check if this column is editable and row's group is selected
          // All rows belonging to a selected group are editable
          const editorConfig = editableConfig?.find(
            (config: any) => config.columnId === columnId,
          );
          const rowGroupKey = getRowGroupKey
            ? getRowGroupKey(rowData)
            : undefined;
          const isGroupSelected =
            rowGroupKey && selectedGroupKeys?.has(rowGroupKey);
          const isEditable = editorConfig && onCellEdit && isGroupSelected;

          return (
            <React.Fragment key={cell.id}>
              {/* Show selection if enabled */}
              {selection?.enabled &&
                !isVisibleInFirstColumn &&
                cellIndex === 0 && (
                  <TableCell
                    key={cell.id + '-selection-button'}
                    rowSpan={rowSpan}
                    sx={{ width: selection.width ?? 35, textAlign: 'center' }}
                  >
                    {renderSelection(paddingLeft, paddingRight)}
                  </TableCell>
                )}

              <TableCell key={cell.id} rowSpan={rowSpan} style={cellStyle}>
                {isFirstCell && (
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* Show selection if enabled */}
                    {selection?.enabled &&
                      isVisibleInFirstColumn &&
                      cellIndex === 0 && (
                        <>{renderSelection(paddingLeft, paddingRight)}</>
                      )}

                    {isEditable ? (
                      <EditableCell
                        value={cell.getValue()}
                        rowIndex={row.index}
                        columnId={columnId}
                        onEdit={onCellEdit}
                        renderComponent={editorConfig.renderComponent}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </div>
                )}

                {!isFirstCell && (
                  <>
                    {/* Show selection if enabled */}
                    {selection?.enabled &&
                      isVisibleInFirstColumn &&
                      cellIndex === 0 && (
                        <>{renderSelection(paddingLeft, paddingRight)}</>
                      )}

                    {isEditable ? (
                      <EditableCell
                        value={cell.getValue()}
                        rowIndex={row.index}
                        columnId={columnId}
                        onEdit={onCellEdit}
                        renderComponent={editorConfig.renderComponent}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </>
                )}
              </TableCell>
            </React.Fragment>
          );
        })}
      </TableRow>
    </React.Fragment>
  );
}

function TableHeader<TData>(props: TableAdvancedHeaderProps<TData>) {
  const { headerGroup, selection, headerIndex, table } = props;

  // get total header depth
  const totalDepth = table.getHeaderGroups().length;
  const isVisibleSelectionColumn = selection?.enabled && headerIndex === 0;
  const isVisibleInFirstColumn = selection?.setSelectionInFirstColumn;
  const isEnableSelectAll =
    selection?.enabledSelectAll && selection.mode === 'multiple';

  // use the custom style for selection cell padding
  let paddingLeft = undefined;
  let paddingRight = undefined;
  if (isVisibleSelectionColumn && isVisibleInFirstColumn && isEnableSelectAll) {
    paddingLeft = undefined;
    paddingRight = '4px';
  }

  return (
    <TableRow key={headerGroup.id}>
      {/* Only render selection column in the first header row. before first column */}
      {isVisibleSelectionColumn && !isVisibleInFirstColumn && (
        <TableCell sx={{ width: selection.width ?? 35 }} rowSpan={totalDepth}>
          {isEnableSelectAll && (
            <Checkbox
              style={{
                paddingLeft: paddingLeft ?? undefined,
                paddingRight: paddingRight ?? undefined,
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

      {headerGroup.headers.map((header: any, headerIndex: number) => {
        // Determine the headerRowSpan from meta if exists
        const rowSpan = header.column.columnDef.meta?.headerRowSpan;
        const headerStyle =
          header.column.columnDef.meta?.headerStyle || undefined;

        // Skip rendering if header is placeholder and has rowSpan
        if (
          !header.isPlaceholder &&
          rowSpan !== undefined &&
          header.id === header.column.id
        ) {
          return null;
        }

        let enableCustomHeaderStyle = false;
        if (
          isVisibleSelectionColumn &&
          isVisibleInFirstColumn &&
          headerIndex === 0 &&
          isEnableSelectAll
        ) {
          enableCustomHeaderStyle = true;
        }

        return (
          <TableCell
            key={header.id}
            sx={{ width: header.getSize() }}
            colSpan={header.colSpan}
            rowSpan={rowSpan}
            style={headerStyle}
          >
            <Typography
              style={
                enableCustomHeaderStyle
                  ? {
                      display: 'flex',
                      alignItems: 'flex-start',
                      textAlign: 'center',
                    }
                  : undefined
              }
            >
              {isVisibleSelectionColumn &&
                isVisibleInFirstColumn &&
                headerIndex === 0 && (
                  <>
                    {isEnableSelectAll && (
                      <Checkbox
                        style={{
                          paddingLeft: paddingLeft ?? undefined,
                          paddingRight: paddingRight ?? undefined,
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
                  </>
                )}

              {flexRender(header.column.columnDef.header, header.getContext())}
            </Typography>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export function TableAdvanced<TData, TValue>(
  props: Readonly<TableAdvancedProps<TData, TValue>>,
) {
  const {
    data,
    columns,
    title,
    subTitle,
    style,
    dataCy,
    isLoading,
    headerDivider = 'full',
    customNoData,
    className,
    selection,
    toolbar,
    disabledRows,
    onRowSelectionChange,
    editableConfig,
    onCellEdit,
    getRowGroupKey,
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedGroupKeys, setSelectedGroupKeys] = useState<Set<string>>(
    new Set(),
  );

  const handleRowSelectionChange = useCallback(() => {
    const selectedRows = table.getSelectedRowModel().flatRows;

    // Track selected group keys using getRowGroupKey callback
    const groupKeys = new Set<string>();
    if (getRowGroupKey) {
      selectedRows.forEach((r) => {
        const groupKey = getRowGroupKey(r.original);
        if (groupKey) {
          groupKeys.add(groupKey);
        }
      });
    }
    setSelectedGroupKeys(groupKeys);

    if (onRowSelectionChange) {
      const rowData = selectedRows.map((r) => r.original);
      onRowSelectionChange(rowData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // init use react table from tanstack
  const configReactTable = {
    data,
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
      return disabledRows ? disabledRows.indexOf(row.id) === -1 : true;
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
          'p-0',
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
            {table
              .getHeaderGroups()
              .map(
                (
                  headerGroup: HeaderGroup<TData>,
                  headerIndex: number,
                  array: HeaderGroup<TData>[],
                ) => (
                  <TableHeader
                    table={table}
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                    selection={selection}
                    headerIndex={headerIndex}
                    headerArray={array}
                    headerDivider={headerDivider}
                  />
                ),
              )}
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
                  <TableBodyRow
                    table={table}
                    row={row}
                    cols={columns.length + 1}
                    key={row.id}
                    selection={selection}
                    editableConfig={editableConfig}
                    onCellEdit={onCellEdit}
                    selectedGroupKeys={selectedGroupKeys}
                    getRowGroupKey={getRowGroupKey}
                  />
                ))}
          </TableBody>
        </Table>
      </Box>

      {props.pagination && <Pagination {...props.pagination} />}
    </>
  );
}
