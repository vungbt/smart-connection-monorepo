'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Button } from '@smart-connection-monorepo/ui-components';
import { FilterForm } from '@smart-connection-monorepo/ui-modules';
import Link from 'next/link';

export default function RoomListPage() {
  usePageTitle({ title: 'Room Management', icon: 'building-storefront' });

  // const columns: TableColumn<RoomItem> = [
  //   { header: 'ID', accessorKey: 'id' },
  //   { header: 'Room Fee', accessorKey: 'config' },
  //   { header: 'Water Fee', accessorKey: 'waterFee' },
  //   { header: 'Electric Fee', accessorKey: 'electricFee' },
  //   { header: 'Common Service Fee', accessorKey: 'commonServiceFee' },
  //   { header: 'Internet Fee', accessorKey: 'internetFee' },
  //   { header: 'Type', accessorKey: 'type' },
  //   { header: 'Special Room', accessorKey: 'isSpecialRoom' },
  //   {
  //     header: 'Actions',
  //     // cell: ({ row }) => (
  //     //   <div style={{ display: 'flex', gap: 8 }}>
  //     //     <button onClick={() => onEdit(row.original)}>Edit</button>
  //     //     <button onClick={() => onDelete(row.original.id)}>Delete</button>
  //     //   </div>
  //     // ),
  //   },
  // ];

  return (
    <div>
      {/* headers */}
      <div className="flex items-center gap-3 justify-end">
        <FilterForm drawer={{ title: 'Filters' }}>2342342</FilterForm>
        <Link href={ROUTES.ROOMS_ADD}>
          <Button icon="plus">Add room</Button>
        </Link>
      </div>

      {/* content */}
    </div>
  );
}
