import { flexRender } from '@tanstack/react-table';
import { TableRowType } from '.';
import clsx from 'clsx';
import { ReactNode } from 'react';

type TableRowProps<T> = {
  rows: TableRowType<T>;
  rowKey: string | number | symbol;
  selectedKeys?: React.Key[];
  onSelect?: (key: React.Key, row: T) => void;
  selectionType?: 'checkbox' | 'radio';
};
export const TableRow = <T extends Record<string, never>>({
  rows = [],
  rowKey,
  selectedKeys = [],
}: TableRowProps<T>): ReactNode => {
  return (
    <>
      {rows.map(row => {
        const key = row.original[rowKey as string];
        const isSelected = selectedKeys.includes(key);

        return (
          <tr
            key={row.original[rowKey as string]}
            className={clsx(' transition-all ease-linear hover:bg-primary-background', {
              'bg-primary-background': isSelected,
              'even:bg-neutral-table-header': !isSelected,
            })}
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="p-3 border-b border-neutral-divider text-14"
                style={{ width: cell.column.columnDef.size, maxWidth: cell.column.columnDef.size }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
};
