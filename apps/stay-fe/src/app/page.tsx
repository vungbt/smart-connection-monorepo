'use client';
import { Table, TableColumn, TableSortingType } from '@smart-connection-monorepo/ui-components';
import { useState } from 'react';

export default function Index() {
  const [sorting, setSorting] = useState<TableSortingType>([]);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });

  const data = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  const columns: TableColumn<any> = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableSorting: true,
    },
  ];
  return (
    <div className="p-5">
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        sortable={{ sorting, onSorting: setSorting }}
        pagination={{
          total: 1000,
          limit: pagination.limit,
          page: pagination.page,
          onChangePage: page => {
            setPagination({ ...pagination, page });
          },
        }}
        rowSelection={{
          type: 'checkbox',
        }}
      />
    </div>
  );
}
