// ui/components/table/types.ts
export interface Column<T> {
  title: string;
  dataIndex: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}
