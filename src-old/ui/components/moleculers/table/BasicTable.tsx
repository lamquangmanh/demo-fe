// ui/components/table/BasicTable.tsx
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Column } from './types';

export function BasicTable<T>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={String(col.dataIndex)}>{col.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={String(col.dataIndex)}>
                {col.render
                  ? col.render(row[col.dataIndex], row)
                  : String(row[col.dataIndex])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
