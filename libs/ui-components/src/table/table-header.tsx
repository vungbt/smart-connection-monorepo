/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { TableHeaderType } from '.';
import { flexRender } from '@tanstack/react-table';
import { RenderIcon } from '../icons';
import { ReactNode } from 'react';

type TableHeaderProps<T> = {
  headers: TableHeaderType<T>;
  className?: string;
  customClasses?: {
    root?: string;
    tr?: string;
    th?: string;
  };
};

export const TableHeader = <T extends Record<string, any>>({
  headers,
  className,
  customClasses,
}: TableHeaderProps<T>): ReactNode => {
  return (
    <thead
      className={clsx('sticky top-0 bg-neutral-table-header z-[1]', className, customClasses?.root)}
    >
      {headers.map(headerGroup => (
        <tr key={headerGroup.id} className={clsx(customClasses?.tr)}>
          {headerGroup.headers.map(header => {
            const columnDef = header?.column?.columnDef;
            const sortActive = header.column.getIsSorted() as 'asc' | 'desc';
            const showSort = columnDef?.enableSorting;
            return (
              <th
                key={header.id}
                className={clsx(
                  'p-3 text-left select-none transition-all ease-linear hover:bg-primary-background border-b border-solid border-neutral-divider',
                  {
                    'cursor-pointer': showSort,
                    'bg-primary-background': sortActive,
                  },
                  customClasses?.th
                )}
                style={{
                  width: header.column.columnDef.size,
                  maxWidth: header.column.columnDef.size,
                }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {/* header content */}
                <div className="flex items-center justify-between gap-1 text-14">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {showSort && <SortAction active={sortActive} />}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

const SortAction = ({ active }: { active: 'asc' | 'desc' }): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center w-fit">
      <span className="mb-[-2px]">
        <RenderIcon
          name="caret-up-fill"
          className={clsx('!w-3 !h-3', {
            'text-primary': active === 'asc',
          })}
        />
      </span>
      <span className="mt-[-2px]">
        <RenderIcon
          name="caret-down-fill"
          className={clsx('!w-3 !h-3', {
            'text-primary': active === 'desc',
          })}
        />
      </span>
    </div>
  );
};
