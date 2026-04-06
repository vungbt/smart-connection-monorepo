import { ROUTES } from '@/constants/route';
import { usePagination } from '@/hooks/usePagination';
import { BillItem, BillListRes } from '@/types/bills';
import { billKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { monthOptions } from '@/utils/bills';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import {
  TableSortingType,
  toastError,
  toastSuccess,
} from '@smart-connection-monorepo/ui-components';
import { useFilterForm } from '@smart-connection-monorepo/ui-modules';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Metadata } from '@/types/common';

type BillSortBy =
  | 'createdAt'
  | 'billingYear'
  | 'billingMonth'
  | 'electricNumberNew'
  | 'waterNumberNew'
  | 'roomName';

const sortFieldMap: Record<string, BillSortBy> = {
  issueDate: 'createdAt',
  amount: 'waterNumberNew',
  roomName: 'roomName',
};

export type BillListFilterFormValues = {
  billingMonth: string;
  billingYear: string;
};

type BillListUtilsResult = {
  bills: BillItem[];
  metadata?: Metadata;
  isLoading: boolean;
  isLoadingDelete: boolean;
  itemIdDelete: string | null;
  sorting: TableSortingType;
  listBillingMonth: number;
  listBillingYear: number;
  listFilterInitialValues: BillListFilterFormValues;
  applyBillingPeriodFilter: (month: number, year: number) => void;
  onView: (bill: BillItem) => void;
  onDelete: (billId: string) => void;
  onSubmitDelete: () => void;
  setItemIdDelete: (id: string | null) => void;
  setSorting: (sorting: TableSortingType) => void;
};

export default function BillListUtils(): BillListUtilsResult {
  const [itemIdDelete, setItemIdDelete] = useState<string | null>(null);
  const [listBillingMonth, setListBillingMonth] = useState(() => new Date().getMonth() + 1);
  const [listBillingYear, setListBillingYear] = useState(() => new Date().getFullYear());
  const [sorting, setSorting] = useState<TableSortingType>([{ id: 'roomName', desc: false }]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { q } = useFilterForm();
  const { pagination, setPagination } = usePagination({});

  const searchKeyword = q.trim();
  const activeSort = sorting[0];
  const sortBy = activeSort ? sortFieldMap[activeSort.id] || 'roomName' : 'roomName';
  const sortOrder = activeSort?.desc ? 'DESC' : 'ASC';

  const { data: billData, isLoading } = useApiQuery<BillListRes>({
    endpoint: API_ROUTES.BILLS,
    queryKey: billKeys.list({
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword,
      sortBy,
      sortOrder,
      billingMonth: listBillingMonth,
      billingYear: listBillingYear,
    }),
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword || undefined,
      sortBy,
      sortOrder,
      billingMonth: listBillingMonth,
      billingYear: listBillingYear,
    },
  });

  const { mutate: deleteBill, isPending: isLoadingDelete } = useApiMutation<
    { message: string },
    Record<string, never>
  >('DELETE');

  const onView = (bill: BillItem) => {
    router.push(ROUTES.BILLS_SLUG.replace(':slug', bill.id));
  };

  const onDelete = (billId: string) => {
    setItemIdDelete(billId);
  };

  const listFilterInitialValues: BillListFilterFormValues = {
    billingMonth: String(monthOptions[listBillingMonth - 1]?.value ?? monthOptions[0].value),
    billingYear: String(listBillingYear),
  };

  const applyBillingPeriodFilter = (month: number, year: number) => {
    setListBillingMonth(month);
    setListBillingYear(year);
    setPagination({ ...pagination, page: 1 });
  };

  const onSubmitDelete = () => {
    if (!itemIdDelete) return;
    deleteBill(
      { endpoint: `${API_ROUTES.BILLS}/${itemIdDelete}`, body: {} },
      {
        onSuccess: data => {
          setItemIdDelete(null);
          toastSuccess(data?.message || 'Bill deleted successfully');
          queryClient.invalidateQueries({
            queryKey: billKeys.list(),
          });
          setPagination({
            ...pagination,
            page: 1,
          });
        },
        onError: error => {
          setItemIdDelete(null);
          toastError(error?.message);
        },
      }
    );
  };

  return {
    bills: billData?.items || [],
    metadata: billData?.metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    sorting,
    listBillingMonth,
    listBillingYear,
    listFilterInitialValues,
    applyBillingPeriodFilter,
    onView,
    onDelete,
    setItemIdDelete,
    setSorting,
    onSubmitDelete,
  };
}
