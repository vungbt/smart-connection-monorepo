/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import {
  ColumnDef,
  getCoreRowModel,
  HeaderGroup,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';
import { TableEmpty } from './table-empty';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';
import { TableLoading } from './table-loading';
import clsx from 'clsx';
import { Checkbox, Radio, Pagination } from '..';

type TableProps<T> = {
  columns: TableColumn<T>;
  data: T[];
  loading?: boolean;
  rowKey: keyof T;
  customClasses?: {
    root?: string;
  };

  // sorting
  sortable?: {
    sorting?: TableSortingType;
    onSorting?: (values: TableSortingType) => void;
  };

  // pagination
  pagination?: {
    total?: number;
    page?: number;
    pageCount?: number;
    limit?: number;
    onChangePage: (value: number) => void;
  };

  // sections
  rowSelection?: {
    type: 'checkbox' | 'radio';
    selectedRowKeys?: React.Key[]; // controlled
    onChange?: (selectedKeys: React.Key[], selectedRows: T[]) => void;
  };

  scroll?: {
    y?: number;
    x?: number;
  };
};

export const Table = <T extends Record<string, any>>({
  columns = [],
  data = [],
  loading = false,
  rowKey,
  customClasses = { root: '' },

  // sorting
  sortable = { sorting: [], onSorting: Function.prototype as () => void },

  // pagination
  pagination = {
    total: 0,
    page: 1,
    limit: 10,
    pageCount: 0,
    onChangePage: Function.prototype as () => void,
  },

  // selection
  rowSelection,

  scroll,
}: TableProps<T>): ReactNode => {
  const { sorting, onSorting } = sortable;
  const { total = 0, page = 1, pageCount: totalPage = 0, limit = 10, onChangePage } = pagination;
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>([]);
  const selectedKeys = rowSelection?.selectedRowKeys ?? internalSelectedKeys;

  const handleSelect = (key: React.Key, _: T) => {
    let newSelected: React.Key[] = [];

    if (rowSelection?.type === 'radio') {
      newSelected = [key];
    } else {
      if (selectedKeys.includes(key)) {
        newSelected = selectedKeys.filter(k => k !== key);
      } else {
        newSelected = [...selectedKeys, key];
      }
    }

    if (!rowSelection?.selectedRowKeys) {
      setInternalSelectedKeys(newSelected);
    }

    rowSelection?.onChange?.(
      newSelected,
      data.filter(d => newSelected.includes(d[rowKey]))
    );
  };

  const selectionColumn: ColumnDef<T> = {
    id: '__selection__',
    header: () =>
      rowSelection?.type === 'checkbox' ? (
        <Checkbox
          indeterminate={
            rows.length > 0 && selectedKeys.length > 0 && selectedKeys.length < rows.length
          }
          checked={
            (rows.length > 0 && rows.every(row => selectedKeys.includes(row.original[rowKey]))) ||
            (rows.length > 0 && selectedKeys.length > 0 && selectedKeys.length < rows.length)
          }
          onChange={e => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const allKeys = (e.target as any).checked ? rows.map(r => r.original[rowKey]) : [];
            if (!rowSelection?.selectedRowKeys) {
              setInternalSelectedKeys(allKeys);
            }
            rowSelection?.onChange?.(
              allKeys,
              data.filter(d => allKeys.includes(d[rowKey]))
            );
          }}
        />
      ) : null,
    cell: ({ row }) => {
      const key = row.original[rowKey];
      const isSelected = selectedKeys.includes(key);
      if (rowSelection?.type === 'checkbox')
        return (
          <span className="flex items-center justify-center w-fit h-fit">
            <Checkbox checked={isSelected} onChange={() => handleSelect(key, row.original)} />
          </span>
        );
      return (
        <span className="flex items-center justify-center w-fit h-fit">
          <Radio checked={isSelected} onChange={() => handleSelect(key, row.original)} />
        </span>
      );
    },
    size: 0,
    minSize: 0,
  };
  const allColumns = rowSelection ? [selectionColumn, ...columns] : columns;

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
    },
    onSortingChange: values => onSorting && onSorting(values as TableSortingType),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: undefined,
    manualPagination: true,
    manualSorting: true,
  });

  const pageCount = totalPage || Math.ceil(total / limit);
  const rows = table.getRowModel().rows;

  return (
    <div className={clsx('w-full', customClasses.root)}>
      <div className={clsx('overflow-y-auto', scroll?.y && `max-h-[${scroll?.y}px]`)}>
        <table className="min-w-full table-auto">
          <TableHeader headers={table.getHeaderGroups() as TableHeaderType<T>} />
          <tbody className="relative">
            {rows.length > 0 ? (
              <TableRow rows={rows} rowKey={rowKey} selectedKeys={selectedKeys} />
            ) : (
              <TableEmpty columnLength={columns.length} />
            )}

            {loading && <TableLoading />}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <Pagination
            pageCount={pageCount}
            page={page}
            total={total}
            limit={limit}
            onChangePage={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export type TableColumn<T> = ColumnDef<T>[];
export type TableRowType<T> = Row<T>[];
export type TableHeaderType<T> = HeaderGroup<T>[];
export type TableSortingType = SortingState;
