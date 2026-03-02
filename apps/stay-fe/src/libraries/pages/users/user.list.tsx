'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { UserItem } from '@/types/users';
import { getCellIndex } from '@/utils/common';
import {
  Button,
  ModalConfirm,
  Table,
  TableColumn,
  Tag,
} from '@smart-connection-monorepo/ui-components';
import { ActionButtons, FilterForm } from '@smart-connection-monorepo/ui-modules';
import Link from 'next/link';
import { useRef } from 'react';
import UserListUtils from './utils/user-list.utils';

export default function UserListPage() {
  const {
    users,
    metadata,
    isLoading,
    isLoadingDelete,
    isImporting,
    itemIdDelete,
    sorting,
    onEdit,
    onDelete,
    onImportCsv,
    setItemIdDelete,
    setSorting,
    onSubmitDelete,
  } = UserListUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  usePageTitle({ title: 'User Management', icon: 'user-group' });

  const columns: TableColumn<UserItem> = [
    {
      header: 'N°',
      cell: ({ row }) => (
        <Link href={ROUTES.USERS_SLUG.replace(':slug', row.original.id)} className="font-semibold">
          {getCellIndex(metadata, row.index)}
        </Link>
      ),
    },
    {
      header: 'User Name',
      accessorKey: 'name',
      enableSorting: true,
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      enableSorting: true,
    },
    {
      header: 'Address',
      accessorKey: 'address',
      enableSorting: true,
    },
    {
      header: 'Room',
      id: 'roomName',
      enableSorting: true,
      accessorFn: row => row.room?.name || '',
      cell: ({ row }) => row.original.room?.name || '-',
    },
    {
      header: 'Status',
      id: 'isActive',
      enableSorting: true,
      cell: ({ row }) => (
        <Tag
          content={row.original.isActive ? 'ACTIVE' : 'INACTIVE'}
          color={row.original.isActive ? 'green' : 'red'}
          type="outline"
        />
      ),
    },
    {
      header: 'Role',
      id: 'isRoomLeader',
      enableSorting: true,
      cell: ({ row }) => (
        <Tag
          content={row.original.isRoomLeader ? 'ROOM LEADER' : 'ROOM MEMBER'}
          color={row.original.isRoomLeader ? 'blue' : 'green'}
          type="outline"
        />
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 justify-end mt-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={async event => {
            const input = event.currentTarget;
            const file = event.target.files?.[0];
            if (!file) return;
            await onImportCsv(file);
            input.value = '';
          }}
        />
        <FilterForm placeholder="Search user name" drawer={{ title: 'Filters' }}>
          2342342
        </FilterForm>
        <Button
          icon="vuesax-document-upload"
          variant="outline"
          loading={isImporting}
          onClick={() => fileInputRef.current?.click()}
        >
          Import CSV
        </Button>
        <Link href={ROUTES.USERS_ADD}>
          <Button icon="plus">Add user</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        data={users}
        rowKey="id"
        loading={isLoading}
        sortable={{ sorting, onSorting: setSorting }}
        customClasses={{ root: 'mt-6' }}
      />

      <ModalConfirm
        isLoading={isLoadingDelete}
        isOpen={!!itemIdDelete}
        onCancel={() => setItemIdDelete(null)}
        onClose={() => setItemIdDelete(null)}
        onSubmit={onSubmitDelete}
      />
    </div>
  );
}
