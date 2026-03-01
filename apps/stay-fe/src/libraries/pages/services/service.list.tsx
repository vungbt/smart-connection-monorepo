'use client';
import { SERVICE_TYPE_TAG_COLORS } from '@/constants/common';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ServiceItem } from '@/types/services';
import { getCellIndex } from '@/utils/common';
import { formatPrice } from '@/utils/formater';
import {
  Button,
  ModalConfirm,
  Table,
  TableColumn,
  Tag,
} from '@smart-connection-monorepo/ui-components';
import { ActionButtons, FilterForm } from '@smart-connection-monorepo/ui-modules';
import Link from 'next/link';
import ServiceListUtils from './utils/service-list.utils';

export default function ServiceListPage() {
  const {
    services,
    metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    onEdit,
    onDelete,
    setItemIdDelete,
    onSubmitDelete,
  } = ServiceListUtils();
  usePageTitle({ title: 'Service Management', icon: 'vuesax-empty-wallet-change' });
  const columns: TableColumn<ServiceItem> = [
    {
      header: 'N°',
      cell: ({ row }) => (
        <Link
          href={ROUTES.SERVICES_SLUG.replace(':slug', row.original.id)}
          className="font-semibold"
        >
          {getCellIndex(metadata, row.index)}
        </Link>
      ),
    },
    {
      header: 'Room Fee',
      cell: ({ row }) => formatPrice(row.original.roomFee),
    },
    {
      header: 'Water Fee',
      cell: ({ row }) => formatPrice(row.original.waterFee),
    },
    {
      header: 'Electric Fee',
      cell: ({ row }) => formatPrice(row.original.electricFee),
    },
    {
      header: 'Electric Bike Fee',
      cell: ({ row }) => formatPrice(row.original.electricBikeFee),
    },
    {
      header: 'Common Service Fee',
      cell: ({ row }) => formatPrice(row.original.commonServiceFee),
    },
    {
      header: 'Internet Fee',
      cell: ({ row }) => formatPrice(row.original.internetFee),
    },
    {
      header: 'Type',
      cell: ({ row }) => (
        <Tag
          content={row.original.type}
          color={SERVICE_TYPE_TAG_COLORS[row.original.type]}
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
      {/* headers */}
      <div className="flex items-center gap-3 justify-end mt-6">
        <FilterForm drawer={{ title: 'Filters' }}>2342342</FilterForm>
        <Link href={ROUTES.SERVICES_ADD}>
          <Button icon="plus">Add service</Button>
        </Link>
      </div>

      {/* content */}
      <Table
        columns={columns}
        data={services}
        rowKey="id"
        loading={isLoading}
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
