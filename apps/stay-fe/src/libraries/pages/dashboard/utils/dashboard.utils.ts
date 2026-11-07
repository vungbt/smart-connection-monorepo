import { BillItem, BillListRes } from '@/types/bills';
import { billKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { calculateBillAmount, monthOptions } from '@/utils/bills';
import { getRoomMemberCount } from '@/utils/rooms';
import { useApiQuery } from '@smart-connection-monorepo/api-client';
import { useMemo, useState } from 'react';

export type DashboardPeriod = {
  month: number;
  year: number;
};

export type RoomRevenueItem = {
  roomId: string;
  roomName: string;
  billCount: number;
  revenue: number;
};

const getPreviousPeriod = ({ month, year }: DashboardPeriod): DashboardPeriod =>
  month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };

const getBillAmount = (bill: BillItem) =>
  calculateBillAmount(
    bill.room?.service,
    {
      electricNumberOld: bill.electricNumberOld,
      electricNumberNew: bill.electricNumberNew,
      waterNumberOld: bill.waterNumberOld,
      waterNumberNew: bill.waterNumberNew,
    },
    bill.otherServiceFee,
    Boolean(bill.room?.isUseElectricBike),
    getRoomMemberCount(bill.room),
    {
      customElectricFee: bill.customElectricFee,
      customWaterFee: bill.customWaterFee,
    },
    Boolean(bill.isMoveOutBill)
  );

const getPeriodLabel = ({ month, year }: DashboardPeriod) =>
  `${monthOptions[month - 1]?.label || month} ${year}`;

export default function DashboardUtils() {
  const [period, setPeriod] = useState<DashboardPeriod>(() => ({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }));
  const previousPeriod = getPreviousPeriod(period);

  const { data: currentData, isLoading: isLoadingCurrent } = useApiQuery<BillListRes>({
    endpoint: API_ROUTES.BILLS,
    queryKey: billKeys.list({ ...period, report: 'current' }),
    params: {
      page: 1,
      pageSize: 1000,
      billingMonth: period.month,
      billingYear: period.year,
      sortBy: 'roomName',
      sortOrder: 'ASC',
    },
  });

  const { data: previousData, isLoading: isLoadingPrevious } = useApiQuery<BillListRes>({
    endpoint: API_ROUTES.BILLS,
    queryKey: billKeys.list({ ...previousPeriod, report: 'previous' }),
    params: {
      page: 1,
      pageSize: 1000,
      billingMonth: previousPeriod.month,
      billingYear: previousPeriod.year,
      sortBy: 'roomName',
      sortOrder: 'ASC',
    },
  });

  const report = useMemo(() => {
    const currentBills = currentData?.items || [];
    const previousBills = previousData?.items || [];
    const currentRevenue = currentBills.reduce((total, bill) => total + getBillAmount(bill), 0);
    const previousRevenue = previousBills.reduce((total, bill) => total + getBillAmount(bill), 0);
    const revenueDifference = currentRevenue - previousRevenue;
    const percentageChange =
      previousRevenue > 0 ? (revenueDifference / previousRevenue) * 100 : null;

    const roomRevenueMap = new Map<string, RoomRevenueItem>();
    currentBills.forEach(bill => {
      const current = roomRevenueMap.get(bill.roomId) || {
        roomId: bill.roomId,
        roomName: bill.room?.name || '-',
        billCount: 0,
        revenue: 0,
      };
      current.billCount += 1;
      current.revenue += getBillAmount(bill);
      roomRevenueMap.set(bill.roomId, current);
    });

    const roomRevenue = Array.from(roomRevenueMap.values()).sort((a, b) => b.revenue - a.revenue);

    return {
      currentRevenue,
      previousRevenue,
      revenueDifference,
      percentageChange,
      currentBillCount: currentBills.length,
      roomRevenue,
      chartData: [
        { period: getPeriodLabel(previousPeriod), revenue: previousRevenue },
        { period: getPeriodLabel(period), revenue: currentRevenue },
      ],
    };
  }, [currentData?.items, period, previousData?.items, previousPeriod]);

  return {
    period,
    previousPeriod,
    isLoading: isLoadingCurrent || isLoadingPrevious,
    report,
    setPeriod,
  };
}
