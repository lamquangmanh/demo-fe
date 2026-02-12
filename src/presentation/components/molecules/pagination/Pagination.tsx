import TablePagination from '@mui/material/TablePagination';

export type PaginationProps = {
  totalPage: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
};

export const Pagination = ({
  totalPage,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: PaginationProps) => {
  return (
    <TablePagination
      component="div"
      count={totalPage}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25, 50]}
    />
  );
};
