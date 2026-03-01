'use client';
import { SERVICE_TYPE_TAG_COLORS } from '@/constants/common';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RoomItem } from '@/types/rooms';
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
import RoomListUtils from './utils/room-list.utils';

export default function RoomListPage() {
  const {
    rooms,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    getServiceById,
    onEdit,
    onDelete,
    setItemIdDelete,
    onSubmitDelete,
  } = RoomListUtils();
  usePageTitle({ title: 'Room Management', icon: 'building-storefront' });

  const columns: TableColumn<RoomItem> = [
    {
      header: 'N°',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Room Name',
      accessorKey: 'name',
    },
    {
      header: 'Service Type',
      cell: ({ row }) => {
        const service = getServiceById(row.original.serviceId);
        if (!service) return '-';

        return (
          <Tag
            content={service.type}
            color={SERVICE_TYPE_TAG_COLORS[service.type]}
            type="outline"
          />
        );
      },
    },
    {
      header: 'Room Fee',
      cell: ({ row }) => {
        const service = getServiceById(row.original.serviceId);
        return formatPrice(service?.roomFee);
      },
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
        <FilterForm placeholder="Search room name" drawer={{ title: 'Filters' }}>
          2342342
        </FilterForm>
        <Link href={ROUTES.ROOMS_ADD}>
          <Button icon="plus">Add room</Button>
        </Link>
      </div>

      {/* content */}
      <Table
        columns={columns}
        data={rooms}
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
