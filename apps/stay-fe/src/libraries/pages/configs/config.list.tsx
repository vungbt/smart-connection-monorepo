'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ConfigItem } from '@/types/configs';
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
import ConfigListUtils from './utils/config-list.utils';

export default function ConfigListPage() {
  const {
    configs,
    metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    onEdit,
    setItemIdDelete,
    onSubmitDelete,
  } = ConfigListUtils();
  usePageTitle({ title: 'Config Management', icon: 'vuesax-empty-wallet-change' });
  const columns: TableColumn<ConfigItem> = [
    {
      header: 'N°',
      cell: ({ row }) => (
        <Link
          href={ROUTES.CONFIGS_SLUG.replace(':slug', row.original.id)}
          className="font-semibold"
        >
          {getCellIndex(metadata, row.index)}
        </Link>
      ),
    },
    { header: 'Room Fee', accessorKey: 'roomFee' },
    { header: 'Water Fee', accessorKey: 'waterFee' },
    { header: 'Electric Fee', accessorKey: 'electricFee' },
    { header: 'Common Service Fee', accessorKey: 'commonServiceFee' },
    { header: 'Internet Fee', accessorKey: 'internetFee' },
    {
      header: 'Type',
      cell: ({ row }) => <Tag content={row.original.type} color="red" type="outline" />,
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons
          onEdit={() => onEdit(row.original)}
          onDelete={() => setItemIdDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div>
      {/* headers */}
      <div className="flex items-center gap-3 justify-end mt-6">
        <FilterForm drawer={{ title: 'Filters' }}>2342342</FilterForm>
        <Link href={ROUTES.CONFIGS_ADD}>
          <Button icon="plus">Add config</Button>
        </Link>
      </div>

      {/* content */}
      <Table
        columns={columns}
        data={configs}
        rowKey="id"
        loading={isLoading}
        customClasses={{ root: 'mt-6' }}
      />

      <ModalConfirm
        isLoading={isLoadingDelete}
        isOpen={!!itemIdDelete}
        onClose={() => setItemIdDelete(null)}
        onSubmit={onSubmitDelete}
      />
    </div>
  );
}
