import { ROUTES } from '@/constants/route';
import {
  BillCreateValues,
  BillDetailRes,
  BillListRes,
  BulkDraft,
  BulkRoomRow,
} from '@/types/bills';
import { RoomListRes } from '@/types/rooms';
import { ServiceItem } from '@/types/services';
import { billKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { monthOptions } from '@/utils/bills';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export type { BulkDraft, BulkRoomRow } from '@/types/bills';
export { monthOptions, yearOptions } from '@/utils/bills';

export const defaultDraft: BulkDraft = {
  electricNumberOld: 0,
  electricNumberNew: 0,
  waterNumberOld: 0,
  waterNumberNew: 0,
  otherServiceFee: 0,
};

export const toNumber = (value: number | string | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

function baselineDraftForRoom(
  roomId: string,
  previousBillByRoomId: Map<string, { electricNumberNew: number; waterNumberNew: number }>
): BulkDraft {
  const previousBill = previousBillByRoomId.get(roomId);
  const oldElectric = toNumber(previousBill?.electricNumberNew);
  const oldWater = toNumber(previousBill?.waterNumberNew);
  return {
    electricNumberOld: oldElectric,
    electricNumberNew: oldElectric,
    waterNumberOld: oldWater,
    waterNumberNew: oldWater,
    otherServiceFee: 0,
  };
}

export const getFixedFeeBreakdown = (service?: ServiceItem, isUseElectricBike = false) => {
  const roomFee = toNumber(service?.roomFee || 0);
  const commonServiceFee = toNumber(service?.commonServiceFee || 0);
  const internetFee = toNumber(service?.internetFee || 0);
  const electricBikeFee = isUseElectricBike ? toNumber(service?.electricBikeFee || 0) : 0;

  return {
    roomFee,
    commonServiceFee,
    internetFee,
    electricBikeFee,
    total: roomFee + commonServiceFee + internetFee + electricBikeFee,
  };
};

type BillBulkUtilsResult = {
  billingMonth: string;
  billingYear: string;
  roomRows: BulkRoomRow[];
  preparedDrafts: Record<string, BulkDraft>;
  isLoading: boolean;
  isSubmitting: boolean;
  setBillingMonth: (value: string) => void;
  setBillingYear: (value: string) => void;
  updateDraft: (roomId: string, key: keyof BulkDraft, value: number | string) => void;
  onSubmitBulk: () => Promise<void>;
  onCancel: () => void;
};

export default function BillBulkUtils(): BillBulkUtilsResult {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [billingMonth, setBillingMonth] = useState(() =>
    String(monthOptions[new Date().getMonth()]?.value ?? monthOptions[0].value)
  );
  const [billingYear, setBillingYear] = useState(() => String(new Date().getFullYear()));
  const [drafts, setDrafts] = useState<Record<string, Partial<BulkDraft>>>({});
  const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);

  const { data: roomData, isLoading: isLoadingRooms } = useApiQuery<RoomListRes>({
    endpoint: API_ROUTES.ROOMS,
    queryKey: ['rooms', 'all-for-bill-bulk-create'],
    params: {
      page: 1,
      pageSize: 1000,
      includeMembers: 'true',
      includeService: 'true',
    },
  });

  const roomRows = useMemo<BulkRoomRow[]>(() => {
    return (roomData?.items || [])
      .map(room => ({
        roomId: room.id,
        roomName: room.name || '-',
        service: room.service,
        isUseElectricBike: Boolean(room.isUseElectricBike),
        memberCount: (room.members || []).filter(member => member.isActive).length,
      }))
      .sort((a, b) =>
        a.roomName.localeCompare(b.roomName, undefined, { numeric: true, sensitivity: 'base' })
      );
  }, [roomData?.items]);

  const roomIds = useMemo(() => roomRows.map(item => item.roomId), [roomRows]);

  const selectedMonthIndex = useMemo(
    () => monthOptions.findIndex(option => option.value === billingMonth),
    [billingMonth]
  );

  const previousBillingPeriod = useMemo(() => {
    const billingMonthNumber = selectedMonthIndex + 1;
    const billingYearNumber = Number(billingYear);
    if (billingMonthNumber <= 1) {
      return { month: 12, year: billingYearNumber - 1 };
    }
    return { month: billingMonthNumber - 1, year: billingYearNumber };
  }, [selectedMonthIndex, billingYear]);

  const { data: previousBillsData } = useApiQuery<BillListRes>({
    endpoint: API_ROUTES.BILLS,
    queryKey: [
      'bills',
      'bulk-create',
      'previous-month',
      roomIds.join(','),
      previousBillingPeriod.month,
      previousBillingPeriod.year,
    ],
    params: {
      page: 1,
      pageSize: 2000,
      roomIds,
      billingMonth: previousBillingPeriod.month,
      billingYear: previousBillingPeriod.year,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    },
  });

  const previousBillByRoomId = useMemo(() => {
    const map = new Map<string, { electricNumberNew: number; waterNumberNew: number }>();
    (previousBillsData?.items || []).forEach(bill => {
      if (!bill.roomId) return;
      if (
        bill.billingMonth !== previousBillingPeriod.month ||
        bill.billingYear !== previousBillingPeriod.year
      ) {
        return;
      }
      if (map.has(bill.roomId)) return;
      map.set(bill.roomId, {
        electricNumberNew: toNumber(bill.electricNumberNew),
        waterNumberNew: toNumber(bill.waterNumberNew),
      });
    });
    return map;
  }, [previousBillsData?.items, previousBillingPeriod.month, previousBillingPeriod.year]);

  const { mutateAsync: createBill } = useApiMutation<BillDetailRes, BillCreateValues>('POST');

  useEffect(() => {
    setDrafts({});
  }, [billingMonth, billingYear]);

  const preparedDrafts = useMemo(() => {
    const next: Record<string, BulkDraft> = {};
    roomRows.forEach(row => {
      const baseline = baselineDraftForRoom(row.roomId, previousBillByRoomId);
      next[row.roomId] = { ...baseline, ...drafts[row.roomId] };
    });
    return next;
  }, [roomRows, previousBillByRoomId, drafts]);

  const updateDraft = (roomId: string, key: keyof BulkDraft, value: number | string) => {
    setDrafts(previous => ({
      ...previous,
      [roomId]: {
        ...previous[roomId],
        [key]: toNumber(value),
      },
    }));
  };

  const onSubmitBulk = async () => {
    if (roomRows.length === 0) {
      toastError('No rooms available to create bills');
      return;
    }

    const hasInvalidValues = roomRows.some(row => {
      const draft = preparedDrafts[row.roomId] || defaultDraft;
      return (
        draft.electricNumberNew < draft.electricNumberOld ||
        draft.waterNumberNew < draft.waterNumberOld
      );
    });

    if (hasInvalidValues) {
      toastError('Current index must be greater than or equal to previous index');
      return;
    }

    setIsSubmittingBulk(true);
    try {
      const tasks = roomRows.map(async row => {
        const draft = preparedDrafts[row.roomId] || defaultDraft;
        const payload: BillCreateValues = {
          roomId: row.roomId,
          billingMonth: monthOptions.findIndex(item => item.value === billingMonth) + 1,
          billingYear: Number(billingYear),
          electricNumberOld: toNumber(draft.electricNumberOld),
          electricNumberNew: toNumber(draft.electricNumberNew),
          waterNumberOld: toNumber(draft.waterNumberOld),
          waterNumberNew: toNumber(draft.waterNumberNew),
          otherServiceFee: toNumber(draft.otherServiceFee),
        };

        return createBill({ endpoint: API_ROUTES.BILLS, body: payload });
      });

      const results = await Promise.allSettled(tasks);
      const successCount = results.filter(result => result.status === 'fulfilled').length;
      const failedCount = results.length - successCount;

      if (successCount > 0) {
        toastSuccess(`Created ${successCount} bill(s) successfully`);
        queryClient.invalidateQueries({ queryKey: billKeys.list() });
      }
      if (failedCount > 0) {
        toastError(`${failedCount} bill(s) failed to create`);
      }
      if (successCount > 0) {
        router.push(ROUTES.BILLS);
      }
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Bulk create bill failed';
      toastError(message);
    } finally {
      setIsSubmittingBulk(false);
    }
  };

  const onCancel = () => router.push(ROUTES.BILLS);

  return {
    billingMonth,
    billingYear,
    roomRows,
    preparedDrafts,
    isLoading: isLoadingRooms,
    isSubmitting: isSubmittingBulk || isLoadingRooms,
    setBillingMonth,
    setBillingYear,
    updateDraft,
    onSubmitBulk,
    onCancel,
  };
}
