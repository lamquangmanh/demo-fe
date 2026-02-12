# TableAdvanced - Multi-Level RowSpan Support

## Main feature

- ✅ **Multi-level rowSpan**: Support merge cells multi-level (Location → Yard → Cost → Vendor)
- ✅ **Flexible configuration**: Setting rowSpan for every column
- ✅ **Backward compatible**: support legacy `cellRowSpan`
- ✅ **Type-safe**: Full TypeScript support với type definitions

## How to use

### 1. Data Structure

Data should be **flatten** and add metadata for rowSpan:

```typescript
interface LocationVendorData {
  // Data fields
  location: string;
  yard: string;
  cost: string;
  vendor: string;
  currency: string;

  // Multi-level rowSpan metadata
  locationRowSpan: number;
  yardRowSpan: number;
  costRowSpan: number;

  // Flags to identify to render cell or not
  isFirstLocation: boolean;
  isFirstYard: boolean;
  isFirstCost: boolean;
}
```

**Example data:**

```typescript
const data: LocationVendorData[] = [
  // Location 01 -> Yard 01 -> Cost 01 -> Vendor 01
  {
    location: 'Location 01',
    yard: 'Yard 01',
    cost: 'Cost 01',
    vendor: 'Vendor 01',
    currency: 'USD',
    locationRowSpan: 8,
    yardRowSpan: 4,
    costRowSpan: 2,
    isFirstLocation: true,
    isFirstYard: true,
    isFirstCost: true,
  },
  // Location 01 -> Yard 01 -> Cost 01 -> Vendor 02
  {
    location: 'Location 01',
    yard: 'Yard 01',
    cost: 'Cost 01',
    vendor: 'Vendor 02',
    currency: 'USD',
    locationRowSpan: 8,
    yardRowSpan: 4,
    costRowSpan: 2,
    isFirstLocation: false,
    isFirstYard: false,
    isFirstCost: false,
  },
  // ... others rows
];
```

### 2. columns setting

Use `meta.multiLevelRowSpan` to config rowSpan for every column:

```typescript
const columns = [
  columnHelper.accessor('location', {
    header: 'Location',
    size: 150,
    meta: {
      multiLevelRowSpan: {
        rowSpanKey: 'locationRowSpan', // Key contains value rowSpan
        isFirstKey: 'isFirstLocation', // Key identify is first row or not
      },
    },
  }),
  columnHelper.accessor('yard', {
    header: 'Yard',
    size: 150,
    meta: {
      multiLevelRowSpan: {
        rowSpanKey: 'yardRowSpan',
        isFirstKey: 'isFirstYard',
      },
    },
  }),
  columnHelper.accessor('cost', {
    header: 'Cost',
    size: 150,
    meta: {
      multiLevelRowSpan: {
        rowSpanKey: 'costRowSpan',
        isFirstKey: 'isFirstCost',
      },
    },
  }),
  columnHelper.accessor('vendor', {
    header: 'Vendor',
    size: 150,
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    size: 100,
  }),
];
```

### 3. Use component

```tsx
import { TableAdvanced } from '@/v2/presentation/components/molecules/table';

<TableAdvanced data={data} columns={columns} title="Location Vendor Cost Table" subTitle="Multi-level rowSpan example" />;
```

## Result

With example data above, result is table bellow:

```
┌──────────────┬──────────┬──────────┬───────────┬──────────┐
│ Location     │ Yard     │ Cost     │ Vendor    │ Currency │
├──────────────┼──────────┼──────────┼───────────┼──────────┤
│ Location 01  │ Yard 01  │ Cost 01  │ Vendor 01 │ USD      │
│ (rowspan=8)  │(rowspan=4)│(rowspan=2)├───────────┼──────────┤
│              │          │          │ Vendor 02 │ USD      │
│              │          ├──────────┼───────────┼──────────┤
│              │          │ Cost 02  │ Vendor 01 │ USD      │
│              │          │(rowspan=2)├───────────┼──────────┤
│              │          │          │ Vendor 02 │ USD      │
│              ├──────────┼──────────┼───────────┼──────────┤
│              │ Yard 02  │ Cost 01  │ Vendor 01 │ USD      │
│              │(rowspan=4)│(rowspan=2)├───────────┼──────────┤
│              │          │          │ Vendor 02 │ USD      │
│              │          ├──────────┼───────────┼──────────┤
│              │          │ Cost 02  │ Vendor 01 │ USD      │
│              │          │(rowspan=2)├───────────┼──────────┤
│              │          │          │ Vendor 02 │ USD      │
└──────────────┴──────────┴──────────┴───────────┴──────────┘
```

## TypeScript Support

Type definitions have added at `src/index.d.ts`:

```typescript
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    // ... existing properties

    multiLevelRowSpan?: {
      rowSpanKey: string; // Key contain value of rowSpan in row data
      isFirstKey: string; // Key is identify first row
    };
  }
}
```

# Examples:

- 1. Multi-level rowSpan logic

```bash
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';

import { TableAdvanced } from './TableAdvanced';

/**
 * Example usage of TableAdvanced with multi-level rowSpan
 *
 * This example demonstrates hierarchical data structure:
 * Location -> Yard -> Cost -> Vendor
 *
 * Each level can have multiple children, and cells merge across child rows.
 */

// Define the flattened data type
interface LocationVendorData {
  location: string;
  yard: string;
  cost: string;
  vendor: string;
  currency: string;

  // Multi-level rowSpan metadata
  locationRowSpan: number; // How many rows this location spans
  yardRowSpan: number; // How many rows this yard spans
  costRowSpan: number; // How many rows this cost spans

  // Flags to determine if cell should be rendered
  isFirstLocation: boolean; // True for first row of location group
  isFirstYard: boolean; // True for first row of yard group
  isFirstCost: boolean; // True for first row of cost group
}

const columnHelper = createColumnHelper<LocationVendorData>();

export function TableAdvancedExample() {
  // Flattened data matching the HTML example
  const [data] = useState<LocationVendorData[]>([
    // Location 01 -> Yard 01 -> Cost 01 -> Vendor 01 & 02
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 01',
      vendor: 'Vendor 01',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: true,
      isFirstYard: true,
      isFirstCost: true,
    },
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 01',
      vendor: 'Vendor 02',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
    },
    // Location 01 -> Yard 01 -> Cost 02 -> Vendor 01 & 02
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 02',
      vendor: 'Vendor 01',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: true,
    },
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 02',
      vendor: 'Vendor 02',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
    },
    // Location 01 -> Yard 02 -> Cost 01 -> Vendor 01 & 02
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 01',
      vendor: 'Vendor 01',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: true,
      isFirstCost: true,
    },
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 01',
      vendor: 'Vendor 02',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
    },
    // Location 01 -> Yard 02 -> Cost 02 -> Vendor 01 & 02
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 02',
      vendor: 'Vendor 01',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: true,
    },
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 02',
      vendor: 'Vendor 02',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
    },
  ]);

  // Define columns with multi-level rowSpan configuration
  const columns: any[] = [
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'locationRowSpan',
          isFirstKey: 'isFirstLocation',
        },
      },
    }),
    columnHelper.accessor('yard', {
      header: 'Yard',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'yardRowSpan',
          isFirstKey: 'isFirstYard',
        },
      },
    }),
    columnHelper.accessor('cost', {
      header: 'Cost',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'costRowSpan',
          isFirstKey: 'isFirstCost',
        },
      },
    }),
    columnHelper.accessor('vendor', {
      header: 'Vendor',
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
      cell: (info) => info.getValue(),
      size: 100,
    }),
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>TableAdvanced Example - Multi-Level RowSpan</h1>
      <p>Demonstrates hierarchical data: Location → Yard → Cost → Vendor</p>

      <TableAdvanced data={data} columns={columns} title="Location Vendor Cost Table" subTitle="Multi-level rowSpan example" />

      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Multi-level rowSpan: Location (rowspan=8), Yard (rowspan=4), Cost (rowspan=2)</li>
          <li>✅ Hierarchical data structure with parent-child relationships</li>
          <li>✅ Automatic cell merging based on metadata (locationRowSpan, yardRowSpan, costRowSpan)</li>
          <li>✅ Conditional rendering using isFirst flags (isFirstLocation, isFirstYard, isFirstCost)</li>
        </ul>

        <h3>Data Structure:</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {`{
  location: 'Location 01',
  yard: 'Yard 01',
  cost: 'Cost 01',
  vendor: 'Vendor 01',
  currency: 'USD',
  locationRowSpan: 8,  // Span 8 rows
  yardRowSpan: 4,      // Span 4 rows
  costRowSpan: 2,      // Span 2 rows
  isFirstLocation: true,
  isFirstYard: true,
  isFirstCost: true,
}`}
        </pre>

        <h3>Column Configuration:</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {`columnHelper.accessor('location', {
  meta: {
    multiLevelRowSpan: {
      rowSpanKey: 'locationRowSpan',
      isFirstKey: 'isFirstLocation',
    },
  },
})`}
        </pre>
      </div>
    </div>
  );
}

export default TableAdvancedExample;

```

Example 2: inlineEdit

```bash
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import { Button, Input } from '@ocean-network-express/magenta-react';

import { TableAdvanced } from './TableAdvanced';

/**
 * Example usage of TableAdvanced2 with:
 * 1. Multi-level rowSpan (Location -> Yard -> Cost -> Vendor)
 * 2. Row selection
 * 3. Inline editing enabled when location is selected
 */

// Define the flattened data type
interface LocationVendorData {
  location: string;
  yard: string;
  cost: string;
  vendor: string;
  currency: string;

  // Multi-level rowSpan metadata
  locationRowSpan: number;
  yardRowSpan: number;
  costRowSpan: number;

  // Flags to determine if cell should be rendered
  isFirstLocation: boolean;
  isFirstYard: boolean;
  isFirstCost: boolean;

  // Grouping keys
  locationKey: string; // Unique key for location group
  yardKey: string;
  costKey: string;
}

const columnHelper = createColumnHelper<LocationVendorData>();

export function TableAdvanced2Example() {
  // State for data
  const [data, setData] = useState<LocationVendorData[]>([
    // Location 01 -> Yard 01 -> Cost 01
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 01',
      vendor: 'Vendor 01',
      currency: 'USD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: true,
      isFirstYard: true,
      isFirstCost: true,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-01',
      costKey: 'loc-01-yard-01-cost-01',
    },
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 01',
      vendor: 'Vendor 02',
      currency: 'EUR',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-01',
      costKey: 'loc-01-yard-01-cost-01',
    },
    // Location 01 -> Yard 01 -> Cost 02
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 02',
      vendor: 'Vendor 01',
      currency: 'GBP',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: true,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-01',
      costKey: 'loc-01-yard-01-cost-02',
    },
    {
      location: 'Location 01',
      yard: 'Yard 01',
      cost: 'Cost 02',
      vendor: 'Vendor 02',
      currency: 'JPY',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-01',
      costKey: 'loc-01-yard-01-cost-02',
    },
    // Location 01 -> Yard 02 -> Cost 01
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 01',
      vendor: 'Vendor 01',
      currency: 'CNY',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: true,
      isFirstCost: true,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-02',
      costKey: 'loc-01-yard-02-cost-01',
    },
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 01',
      vendor: 'Vendor 02',
      currency: 'KRW',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-02',
      costKey: 'loc-01-yard-02-cost-01',
    },
    // Location 01 -> Yard 02 -> Cost 02
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 02',
      vendor: 'Vendor 01',
      currency: 'AUD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: true,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-02',
      costKey: 'loc-01-yard-02-cost-02',
    },
    {
      location: 'Location 01',
      yard: 'Yard 02',
      cost: 'Cost 02',
      vendor: 'Vendor 02',
      currency: 'CAD',
      locationRowSpan: 8,
      yardRowSpan: 4,
      costRowSpan: 2,
      isFirstLocation: false,
      isFirstYard: false,
      isFirstCost: false,
      locationKey: 'loc-01',
      yardKey: 'loc-01-yard-02',
      costKey: 'loc-01-yard-02-cost-02',
    },
    {
      location: 'Location 02',
      yard: 'Yard 02',
      cost: 'Cost 02',
      vendor: 'Vendor 02',
      currency: 'CAD',
      locationRowSpan: 1,
      yardRowSpan: 1,
      costRowSpan: 1,
      isFirstLocation: true,
      isFirstYard: true,
      isFirstCost: true,
      locationKey: 'loc-02',
      yardKey: 'loc-02-yard-02',
      costKey: 'loc-02-yard-02-cost-02',
    },
  ]);

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState<LocationVendorData[]>([]);

  // Define columns
  const columns: any[] = [
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'locationRowSpan',
          isFirstKey: 'isFirstLocation',
        },
      },
    }),
    columnHelper.accessor('yard', {
      header: 'Yard',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'yardRowSpan',
          isFirstKey: 'isFirstYard',
        },
      },
    }),
    columnHelper.accessor('cost', {
      header: 'Cost',
      cell: (info) => info.getValue(),
      size: 150,
      meta: {
        multiLevelRowSpan: {
          rowSpanKey: 'costRowSpan',
          isFirstKey: 'isFirstCost',
        },
      },
    }),
    columnHelper.accessor('vendor', {
      header: 'Vendor',
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
      cell: (info) => info.getValue(),
      size: 150,
    }),
  ];

  // Handle cell edit
  const handleCellEdit = (rowIndex: number, columnId: string, newValue: any) => {
    console.log('handleCellEdit:', { rowIndex, columnId, newValue });
    setData((prevData) => {
      const newData = [...prevData];
      const row = newData[rowIndex];

      // Update the corresponding field
      if (columnId === 'currency') {
        row.currency = newValue;
      } else if (columnId === 'vendor') {
        row.vendor = newValue;
      } else if (columnId === 'cost') {
        row.cost = newValue;
      } else if (columnId === 'yard') {
        row.yard = newValue;
      }

      return newData;
    });
  };

  // Handle row selection change
  const handleRowSelectionChange = (rows: LocationVendorData[]) => {
    setSelectedRows(rows);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  return (
    <div>
      <h1>Per-Row Inline Editing with Different Editor Types</h1>
      <p>
        <strong>Select any row</strong> to enable editing for that specific row
      </p>

      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div>
          <strong>Selected Rows:</strong> {selectedRows.length}
        </div>
        {selectedRows.length > 0 && (
          <Button onClick={handleClearSelection} size="sm">
            Clear Selection
          </Button>
        )}
      </div>

      <TableAdvanced<LocationVendorData, any>
        data={data}
        columns={columns}
        title="Location Vendor Cost Table"
        subTitle="Select any row to enable editing for all rows in that location"
        selection={{
          enabled: true,
          mode: 'single',
          // enabledSelectAll: true,
          setSelectionInFirstColumn: true,
        }}
        // onRowSelectionChange={handleRowSelectionChange}
        getRowGroupKey={(row: any) => row.locationKey} // Group rows by locationKey
        editableConfig={[
          {
            columnId: 'currency',
            renderComponent: ({ value, onChange }: any) => <Input value={value} onChange={(e) => onChange(e.target.value)} size="sm" autoFocus />,
          },
          {
            columnId: 'vendor',
            renderComponent: ({ value, onChange }: any) => (
              <select
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '4px 8px',
                  fontSize: '14px',
                  border: '1px solid var(--mag-colors-neutral-300)',
                  borderRadius: '4px',
                }}
              >
                <option value="Vendor 01">Vendor 01</option>
                <option value="Vendor 02">Vendor 02</option>
                <option value="Vendor 03">Vendor 03</option>
                <option value="Vendor 04">Vendor 04</option>
              </select>
            ),
          },
          {
            columnId: 'cost',
            renderComponent: ({ value, onChange }: any) => (
              <select
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '4px 8px',
                  fontSize: '14px',
                  border: '1px solid var(--mag-colors-neutral-300)',
                  borderRadius: '4px',
                }}
              >
                <option value="Cost 01">Cost 01</option>
                <option value="Cost 02">Cost 02</option>
                <option value="Cost 03">Cost 03</option>
                <option value="Cost 04">Cost 04</option>
              </select>
            ),
          },
          {
            columnId: 'yard',
            renderComponent: ({ value, onChange }: any) => (
              <select
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '4px 8px',
                  fontSize: '14px',
                  border: '1px solid var(--mag-colors-neutral-300)',
                  borderRadius: '4px',
                }}
              >
                <option value="Yard 01">Yard 01</option>
                <option value="Yard 02">Yard 02</option>
                <option value="Yard 03">Yard 03</option>
                <option value="Yard 04">Yard 04</option>
              </select>
            ),
          },
        ]}
        onCellEdit={handleCellEdit}
      />
    </div>
  );
}

export default TableAdvanced2Example;

```
