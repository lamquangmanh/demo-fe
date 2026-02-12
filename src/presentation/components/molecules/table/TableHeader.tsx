/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@tanstack/react-table';

import { MetaDividerType, MetaRowSpanType } from '@/common/interfaces';

export type TableHeaderProps<TData, TValue> = {
  style?: React.CSSProperties;
  dataCy?: string;
  className?: string;
  header: Header<TData, TValue>;
};

export function TableHeader<TData, TValue>(
  props: TableHeaderProps<TData, TValue>,
) {
  const { style, dataCy, className, header } = props;
  const { column } = header;

  const isCanFilter = column.getCanFilter();
  const isCanSort = column.getCanSort();
  const columnDef = column.columnDef;

  const rowSpan = (columnDef.meta as MetaRowSpanType)?.rowSpan;
  const divider = (columnDef.meta as MetaDividerType)?.divider;

  if (
    !header.isPlaceholder &&
    rowSpan !== undefined &&
    header.id === header.column.id
  ) {
    return null;
  }

  if (isCanFilter) {
    return (
      <>
        {/* <Th key={header.id} divider={isExpandTriggerCol ? 'none' : 'haft'} style={isExpandTriggerCol ? { width: 24, paddingRight: 0 } : undefined}>
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </Th> */}
      </>
    );
  }

  if (isCanSort) {
    return (
      <>
        {/* <Th key={header.id} divider={isExpandTriggerCol ? 'none' : 'haft'} style={isExpandTriggerCol ? { width: 24, paddingRight: 0 } : undefined}>
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </Th> */}
      </>
    );
  }

  return (
    <>
      {/* <Th key={header.id} divider={isExpandTriggerCol ? 'none' : 'haft'} style={isExpandTriggerCol ? { width: 24, paddingRight: 0 } : undefined}>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
      </Th> */}
    </>
  );
}
