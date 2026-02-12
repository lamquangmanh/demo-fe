import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ChevronDownOutline,
  ChevronRight as ChevronRightOutline,
  KeyboardDoubleArrowDown as ChevronDoubleDownOutline,
  NavigateNext as ChevronNextOutline,
} from '@mui/icons-material';

import { Tooltip as MuiTooltip } from '@mui/material';
import { Pagination } from '../pagination';
import {
  TableBaseRowProps,
  TableExpandableProps,
  TableRowExpandProps,
} from './interface';

import styles from '@/styles/styles.module.css';

function TableRowExpand<TData>(props: Readonly<TableRowExpandProps<TData>>) {
  const { renderExpandRow, cols, isExpanded, row } = props;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (expanded !== isExpanded) {
      setExpanded(isExpanded);
    }
  }, [isExpanded, setExpanded, expanded]);

  return (
    <TableRow className={styles['row-expanded']}>
      <TableCell colSpan={cols} className={styles['cell-expanded']}>
        <Collapse in={expanded} style={{ pointerEvents: 'auto' }}>
          {renderExpandRow?.(row)}
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

function TableBaseRow<TData>(props: Readonly<TableBaseRowProps<TData>>) {
  const { row, cols, renderExpandRow, table, expandMode } = props;
  const isExpanded = row.getIsSelected();
  const debounceExpanded = debounce(() => isExpanded, 200);

  // show expand row immediately when expanded and hide after 200ms
  const isShowExpand = debounceExpanded() ?? isExpanded;

  const handleExpandItem = (row: Row<TData>) => {
    // turn off all other rows
    if (expandMode === 'single') {
      table
        .getRowModel()
        .rows.forEach((rowItem: Row<TData>) => rowItem.toggleSelected(false));
    }

    const isSelected = row.getIsSelected();
    row.toggleSelected(!isSelected);
  };

  return (
    <React.Fragment key={row.id}>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() => handleExpandItem(row)}
            size="small"
            className={isExpanded ? 'trigger-expander' : ''}
          >
            {isExpanded && (
              <ChevronDownOutline
                className="svg-icon"
                aria-expanded={isExpanded}
              />
            )}
            {!isExpanded && <ChevronRightOutline aria-expanded={isExpanded} />}
          </IconButton>
        </TableCell>
        {row.getVisibleCells().map((cell) => {
          const isExpandTriggerCol = cell.column.columnDef.id === 'expander';
          return (
            <TableCell
              key={cell.id}
              style={
                isExpandTriggerCol ? { width: 24, paddingRight: 0 } : undefined
              }
            >
              {flexRender(cell.column.columnDef.cell, {
                ...cell.getContext(),
              })}
            </TableCell>
          );
        })}
      </TableRow>
      {isShowExpand && (
        <TableRowExpand
          key={`${row.id}--expand`}
          cols={cols}
          isExpanded={isExpanded}
          renderExpandRow={renderExpandRow}
          row={row}
        />
      )}
    </React.Fragment>
  );
}

export function TableExpandable<TData, TValue>(
  props: Readonly<TableExpandableProps<TData, TValue>>,
) {
  const {
    data,
    columns,
    title,
    subTitle,
    style,
    dataCy,
    className,
    expandMode = 'single',
    hasExpandAll,
    customNoData,
    isLoading,
    expandColumnWidth,
  } = props;
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    enableRowSelection: true,
  });

  // handle expand
  const isExpandAll = table.getIsAllRowsSelected();
  const handleExpandAllIconClick = () => {
    if (isExpandAll) {
      table.resetRowSelection(true);
    } else {
      table.toggleAllRowsSelected(true);
    }
  };

  return (
    <>
      <Box
        style={style}
        data-cy={dataCy}
        className={clsx(
          'p-0',
          'flex-1',
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
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCell sx={{ width: expandColumnWidth ?? 35 }}>
                  {hasExpandAll && expandMode === 'multiple' && (
                    <MuiTooltip
                      title={!isExpandAll ? 'Expand All' : 'Collapse All'}
                      placement="top"
                    >
                      <IconButton
                        size="small"
                        className={styles['trigger-expander-all']}
                        onClick={handleExpandAllIconClick}
                      >
                        {isExpandAll && (
                          <ChevronDoubleDownOutline
                            aria-expanded={isExpandAll}
                            className={'svg-icon'}
                          />
                        )}
                        {!isExpandAll && (
                          <ChevronNextOutline aria-expanded={isExpandAll} />
                        )}
                      </IconButton>
                    </MuiTooltip>
                  )}
                </TableCell>
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
                    renderExpandRow={props.renderExpandRow}
                    expandMode={expandMode}
                  />
                ))}
          </TableBody>
        </Table>
      </Box>
      {props.pagination && <Pagination {...props.pagination} />}
    </>
  );
}
