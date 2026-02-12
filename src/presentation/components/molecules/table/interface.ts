import { ColumnDef, HeaderGroup, Row } from '@tanstack/react-table';

import { PaginationProps } from '../pagination';

export interface ToolbarProps {
  children?: React.ReactNode;
}

/**
 * Table expandable features:
 * 1. show table data with group header
 * 2. Show Pagination: total result items, change item per page, listen on page change
 * 3. Show loading state while fetching data, and show no data found and support custom no data found
 * 4. Expand single or multiple row to show more detail information
 */
export type TableExpandableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];

  isLoading?: boolean;
  customNoData?: React.ReactNode; // if not, using default no data

  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  renderExpandRow?: (row: Row<TData>) => React.ReactNode; // render expand row content
  style?: React.CSSProperties;
  pagination?: PaginationProps;
  dataCy?: string;
  className?: string;
  expandMode?: 'single' | 'multiple'; // default is "single"
  hasExpandAll?: boolean; // Whether to show "Expand All" icon. If the expand mode is single, we don't show this icon.
  expandColumnWidth?: number; // Width of the expand column, default is 35px
};

export type TableBaseRowProps<TData> = {
  row: Row<TData>;
  cols: number;
  renderExpandRow?: (row: Row<TData>) => React.ReactNode;
  expandMode?: 'single' | 'multiple';
  table: any;
};

export type TableRowExpandProps<TData> = {
  row: Row<TData>;
  cols: number;
  isExpanded: boolean;
  renderExpandRow?: (row: Row<TData>) => React.ReactNode;
};

export type TableBasicRowProps<TData> = {
  row: Row<TData>;
  cols: number;
  table: any;
  selection?: TableSelectionProps;
};

interface TableSelectionProps {
  enabled: boolean;
  enabledSelectAll?: boolean; // default is false, if "true", will show select all checkbox on header. Only support for mode "multiple"
  mode: 'single' | 'multiple'; // with single mode: table display select with Radio button, for multiple mode: table display select with Checkbox
  width?: number; // width of selection column, default is 35px
  size?: 'sm' | 'md' | 'lg'; // size of selection checkbox/radio
  highlight?: string; // custom class name for row highlight
  setSelectionInFirstColumn?: boolean; // set selection column as first column, default is false (selection column at before first column)
}

export type TableHeaderProps<TData> = {
  table: any;
  headerGroup: HeaderGroup<TData>;
  headerIndex: number;
  headerArray: HeaderGroup<TData>[];
  headerDivider?: 'full' | 'half' | 'none'; // header border style, default is 'full'
  selection?: TableSelectionProps;
};
/**
 * Table Basic features:
 * 1. Show table data with group header
 * 2. Show Pagination: total result items, change item per page, listen on page change
 * 3. Show loading state while fetching data, and show no data found and support custom no data found
 * 4. select all row or individual row selection
 * 5. Table title and toolbar
 */
export type TableBasicProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  title?: React.ReactNode; // position on top of table, above toolbar
  subTitle?: React.ReactNode; // position on top of table, above toolbar, bellow title
  style?: React.CSSProperties;
  pagination?: PaginationProps;
  dataCy?: string;
  className?: string;

  isLoading?: boolean; // show loading
  customNoData?: React.ReactNode; // custom no data found
  selection?: TableSelectionProps;
  onRowSelectionChange?: (rows: TData[]) => void; // listen on row select
  toolbar?: React.ReactNode; // display toolbar
  disabledRows?: string[]; // list of row ids that should be disabled from selection
  headerDivider?: 'full' | 'half' | 'none'; // header border style, default is 'full'
};

export interface TableAdvancedRowProps<
  TData,
> extends TableBasicRowProps<TData> {
  editableConfig?: TableAdvancedEditableConfig[];
  onCellEdit?: (rowIndex: number, columnId: string, newValue: any) => void; // Callback when cell is edited
  selectedGroupKeys?: Set<string>; // Set of group keys that are selected (all rows in these groups are editable)
  getRowGroupKey?: (row: TData) => string | undefined; // Function to get group key for a row
}

export type TableAdvancedHeaderProps<TData> = TableHeaderProps<TData>;

export type TableAdvancedEditableConfig = {
  columnId: string; // Column ID that can be edited
  renderComponent: (props: {
    value: any;
    onChange: (newValue: any) => void;
  }) => React.ReactNode; // Custom render function for the editor component
};

/**
 * Table Basic features:
 * 1. Show table data with group header
 * 2. Show Pagination: total result items, change item per page, listen on page change
 * 3. Show loading state while fetching data, and show no data found and support custom no data found
 * 4. select all row or individual row selection
 * 5. Table title and toolbar
 * 6. Support merged column headers (column grouping)
 * 7. Support merged rows in body
 * 8. Support inline editing for cells
 * 9. Enable editing based on row selection
 */
export interface TableAdvancedProps<TData, TValue> extends TableBasicProps<
  TData,
  TValue
> {
  // Inline editing support
  editableConfig?: TableAdvancedEditableConfig[]; // List of columns with their editor configurations
  onCellEdit?: (rowIndex: number, columnId: string, newValue: any) => void; // Callback when cell value changes
  getRowGroupKey?: (row: TData) => string | undefined; // Function to get group key for row-based editing (e.g., location key)
}
