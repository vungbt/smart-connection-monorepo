import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';
import { useState } from 'react';
import type { TableSortingType } from '.';
import clsx from 'clsx';
import type { ColumnDef } from '@tanstack/react-table';

// Define User interface with index signature
interface User {
  [key: string]: string | 'active' | 'inactive';
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A powerful table component built with TanStack Table, supporting sorting, pagination, and row selection.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table<User>>;

const sampleData: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Editor',
    status: 'inactive',
  },
];

const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <span
        className={clsx(
          'px-2 py-1 rounded-full text-sm',
          row.original.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        )}
      >
        {row.original.status}
      </span>
    ),
  },
];

// Basic table
export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: 'id',
  },
};

// With loading state
export const Loading: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: 'id',
    loading: true,
  },
};

// With sorting
export const Sortable = () => {
  const [sorting, setSorting] = useState<TableSortingType>([]);

  return (
    <Table<User>
      columns={columns.map(item => ({ ...item, enableSorting: true }))}
      data={sampleData}
      rowKey="id"
      sortable={{
        sorting,
        onSorting: setSorting,
      }}
    />
  );
};

// With pagination
export const WithPagination = () => {
  const [page, setPage] = useState(1);
  const limit = 2;
  const total = sampleData.length;

  return (
    <Table<User>
      columns={columns}
      data={sampleData.slice((page - 1) * limit, page * limit)}
      rowKey="id"
      pagination={{
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
        onChangePage: setPage,
      }}
    />
  );
};

// With checkbox selection
export const WithCheckboxSelection = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  return (
    <div className="min-w-[800px]">
      <div className="mb-4">Selected rows: {selectedKeys.join(', ')}</div>
      <Table<User>
        columns={columns}
        data={sampleData}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          onChange: keys => setSelectedKeys(keys),
        }}
      />
    </div>
  );
};

// With radio selection
export const WithRadioSelection = () => {
  const [selectedKey, setSelectedKey] = useState<React.Key>();

  return (
    <div className="min-w-[800px]">
      <div className="mb-4">Selected row: {selectedKey}</div>
      <Table<User>
        columns={columns}
        data={sampleData}
        rowKey="id"
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedKey ? [selectedKey] : [],
          onChange: keys => setSelectedKey(keys[0]),
        }}
      />
    </div>
  );
};

// Empty state
export const Empty: Story = {
  args: {
    columns,
    data: [],
    rowKey: 'id',
  },
};
