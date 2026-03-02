'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { BillItem, BillListRes } from '@/types/bills';
import { API_ROUTES } from '@/utils/apis/router';
import { formatDate, formatPrice } from '@/utils/formater';
import { useApiQuery } from '@smart-connection-monorepo/api-client';
import {
  Button,
  Table,
  TableColumn,
  TableSortingType,
} from '@smart-connection-monorepo/ui-components';
import { FilterForm, useFilterForm } from '@smart-connection-monorepo/ui-modules';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { calculateBillAmount } from './bill.mock';

type BillSortBy =
  | 'createdAt'
  | 'billingYear'
  | 'billingMonth'
  | 'electricNumberNew'
  | 'waterNumberNew';

const sortFieldMap: Record<string, BillSortBy> = {
  issueDate: 'createdAt',
  amount: 'waterNumberNew',
  roomName: 'roomName',
};

export default function BillListPage() {
  const { q } = useFilterForm();
  const [sorting, setSorting] = useState<TableSortingType>([{ id: 'issueDate', desc: true }]);

  const activeSort = sorting[0];
  const sortBy = activeSort ? sortFieldMap[activeSort.id] || 'createdAt' : 'createdAt';
  const sortOrder = activeSort?.desc ? 'DESC' : 'ASC';

  usePageTitle({ title: 'Bill Management', icon: 'vuesax-money-receive' });

  const { data: billData, isLoading: isLoadingBills } = useApiQuery<BillListRes>({
    endpoint: API_ROUTES.BILLS,
    queryKey: ['bills', q, sortBy, sortOrder],
    params: {
      page: 1,
      pageSize: 100,
      q: q || undefined,
      sortBy,
      sortOrder,
    },
  });

  const bills = billData?.items || [];

  const columns: TableColumn<BillItem> = useMemo(
    () => [
      {
        header: 'Invoice ID',
        cell: ({ row }) => (
          <Link
            className="font-semibold text-primary"
            href={ROUTES.BILLS_SLUG.replace(':slug', row.original.id)}
          >
            #{row.original.id}
          </Link>
        ),
      },
      {
        header: 'Tenant',
        cell: ({ row }) => row.original.room?.members?.[0]?.name || '-',
      },
      {
        header: 'Room',
        id: 'roomName',
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.room?.name ?? '--';
          return <Text>{value}</Text>;
        },
      },
      {
        header: 'Issue Date',
        id: 'issueDate',
        enableSorting: true,
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        header: 'Service Type',
        cell: ({ row }) => row.original.room?.service?.type || '-',
      },
      {
        header: 'Amount',
        id: 'amount',
        enableSorting: true,
        cell: ({ row }) => (
          <span className="font-semibold">
            {formatPrice(
              calculateBillAmount(row.original.room?.service, row.original.otherServiceFee)
            )}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex items-center gap-3 justify-end mt-6">
        <FilterForm placeholder="Search invoice, tenant or room" drawer={{ title: 'Filters' }}>
          2342342
        </FilterForm>
        <Link href={ROUTES.BILLS_ADD}>
          <Button icon="plus">Create Bill</Button>
        </Link>
        <Button icon="arrow-up-tray" variant="outline">
          Export list
        </Button>
      </div>

      <Table
        columns={columns}
        data={bills}
        rowKey="id"
        loading={isLoadingBills}
        sortable={{ sorting, onSorting: setSorting }}
        customClasses={{ root: 'mt-6' }}
      />
    </div>
  );
}
