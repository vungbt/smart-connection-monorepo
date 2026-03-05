import { ROUTES } from '@/constants/route';
import { useSlugParams } from '@/hooks/useSlugParams';
import { BillCreateValues, BillDetailRes, BillItem } from '@/types/bills';
import { ServiceItem } from '@/types/services';
import { UserListRes } from '@/types/users';
import { billKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { SelectOption, toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { calculateBillAmount, monthOptions } from '@/utils/bills';
export { monthOptions, yearOptions } from '@/utils/bills';
import { FormikContextType, useFormikContext } from 'formik';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export type CreateBillFormValues = {
  tenantId: string;
  billingMonth: string;
  billingYear: string;
  electricNumberOld: number;
  electricNumberNew: number;
  waterNumberOld: number;
  waterNumberNew: number;
  otherServiceFee: number;
  note: string;
};

export const defaultInitialValues: CreateBillFormValues = {
  tenantId: '',
  billingMonth: new Date().toLocaleString('en-US', { month: 'long' }),
  billingYear: String(new Date().getFullYear()),
  electricNumberOld: 0,
  electricNumberNew: 0,
  waterNumberOld: 0,
  waterNumberNew: 0,
  otherServiceFee: 0,
  note: '',
};

type BillSlugUtilsResult = {
  isAdd: boolean;
  isEditing: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isLoadingUsers: boolean;
  bill?: BillItem;
  billId?: string;
  tenantOptions: SelectOption[];
  roomOptions: SelectOption[];
  tenantRoomMap: Map<string, string>;
  roomServiceMap: Map<string, ServiceItem | undefined>;
  roomMemberCountMap: Map<string, number>;
  roomElectricBikeMap: Map<string, boolean>;
  initialValues: CreateBillFormValues;
  onSubmit: (values: CreateBillFormValues) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onCancelAdd: () => void;
};

export default function BillSlugUtils(): BillSlugUtilsResult {
  const { itemId: billId, isAdd } = useSlugParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: billDetailData, isLoading: isLoadingDetail } = useApiQuery<BillDetailRes>(
    {
      endpoint: `${API_ROUTES.BILLS}/${billId}`,
      queryKey: billKeys.detail(billId || ''),
      params: { id: billId },
    },
    { enabled: !!billId && !isAdd }
  );

  const { data: userData, isLoading: isLoadingUsers } = useApiQuery<UserListRes>({
    endpoint: API_ROUTES.USERS,
    queryKey: ['users', 'all-for-bill-create', 'include-room-service'],
    params: {
      page: 1,
      pageSize: 1000,
      sortBy: 'roomName',
      sortOrder: 'ASC',
      includeRoomService: 'true',
    },
  });

  const { mutate: createBill, isPending: isCreating } = useApiMutation<
    BillDetailRes,
    BillCreateValues
  >('POST');

  const { mutate: updateBill, isPending: isUpdating } = useApiMutation<
    BillDetailRes,
    BillCreateValues
  >('PUT');

  const bill = billDetailData?.item;

  const roomOptions = useMemo<SelectOption[]>(() => {
    const roomMap = new Map<string, string>();
    (userData?.items || []).forEach(user => {
      if (user.room?.id && user.room?.name && !roomMap.has(user.room.id)) {
        roomMap.set(user.room.id, user.room.name);
      }
    });
    return Array.from(roomMap.entries()).map(([value, label]) => ({ value, label }));
  }, [userData?.items]);

  const tenantOptions = useMemo<SelectOption[]>(
    () =>
      (userData?.items || [])
        .filter(
          user => Boolean(user.roomId) && Boolean(user.isActive) && Boolean(user.isRoomLeader)
        )
        .map(user => ({
          value: user.id,
          label: user.room?.name ? `${user.name} - ${user.room.name}` : user.name,
        })),
    [userData?.items]
  );

  const tenantRoomMap = useMemo(
    () =>
      new Map(
        (userData?.items || [])
          .filter(user => Boolean(user.id) && Boolean(user.roomId))
          .map(user => [user.id, user.roomId] as [string, string])
      ),
    [userData?.items]
  );

  const roomServiceMap = useMemo(
    () =>
      new Map(
        (userData?.items || [])
          .filter(user => Boolean(user.roomId) && Boolean(user.room?.service))
          .map(user => [user.roomId, user.room?.service] as [string, ServiceItem | undefined])
      ),
    [userData?.items]
  );

  const roomMemberCountMap = useMemo(() => {
    const map = new Map<string, number>();
    (userData?.items || []).forEach(user => {
      if (!user.roomId || !user.isActive) return;
      map.set(user.roomId, Number(map.get(user.roomId) || 0) + 1);
    });
    return map;
  }, [userData?.items]);

  const roomElectricBikeMap = useMemo(
    () =>
      new Map(
        (userData?.items || [])
          .filter(user => Boolean(user.roomId) && Boolean(user.room))
          .map(user => [user.roomId, Boolean(user.room?.isUseElectricBike)] as [string, boolean])
      ),
    [userData?.items]
  );

  const defaultTenantId = useMemo(() => {
    if (!bill?.roomId) return '';
    const roomLeader = (userData?.items || []).find(
      user => user.roomId === bill.roomId && user.isActive && user.isRoomLeader
    );
    if (roomLeader?.id) return roomLeader.id;
    return (userData?.items || []).find(user => user.roomId === bill.roomId)?.id || '';
  }, [bill?.roomId, userData?.items]);

  const initialValues: CreateBillFormValues = isAdd
    ? defaultInitialValues
    : {
        tenantId: defaultTenantId,
        billingMonth: String(
          monthOptions[Math.max(Number(bill?.billingMonth || 1) - 1, 0)]?.value ||
            defaultInitialValues.billingMonth
        ),
        billingYear: String(bill?.billingYear || defaultInitialValues.billingYear),
        electricNumberOld: Number(bill?.electricNumberOld || 0),
        electricNumberNew: Number(bill?.electricNumberNew || 0),
        waterNumberOld: Number(bill?.waterNumberOld || 0),
        waterNumberNew: Number(bill?.waterNumberNew || 0),
        otherServiceFee: Number(bill?.otherServiceFee || 0),
        note: bill?.note || '',
      };

  const onStartEdit = () => setIsEditing(true);
  const onCancelEdit = () => setIsEditing(false);
  const onCancelAdd = () => router.push(ROUTES.BILLS);

  const onSubmit = (values: CreateBillFormValues) => {
    const roomId = tenantRoomMap.get(values.tenantId);
    if (!roomId) {
      toastError('Selected tenant does not have a room');
      return;
    }

    const payload: BillCreateValues = {
      roomId,
      billingMonth: monthOptions.findIndex(item => item.value === values.billingMonth) + 1,
      billingYear: Number(values.billingYear),
      electricNumberOld: Number(values.electricNumberOld || 0),
      electricNumberNew: Number(values.electricNumberNew || 0),
      waterNumberOld: Number(values.waterNumberOld || 0),
      waterNumberNew: Number(values.waterNumberNew || 0),
      otherServiceFee: values.otherServiceFee ? Number(values.otherServiceFee) : 0,
      note: values.note?.trim() || undefined,
    };

    if (isAdd) {
      createBill(
        { endpoint: API_ROUTES.BILLS, body: payload },
        {
          onSuccess: () => {
            toastSuccess('Bill created successfully');
            queryClient.invalidateQueries({ queryKey: billKeys.list() });
            router.push(ROUTES.BILLS);
          },
          onError: error => toastError(error?.message),
        }
      );
      return;
    }

    if (!billId) {
      toastError('Bill id is missing');
      return;
    }

    updateBill(
      { endpoint: `${API_ROUTES.BILLS}/${billId}`, body: payload },
      {
        onSuccess: () => {
          toastSuccess('Bill updated successfully');
          queryClient.invalidateQueries({ queryKey: billKeys.list() });
          queryClient.invalidateQueries({ queryKey: billKeys.detail(billId) });
          setIsEditing(false);
        },
        onError: error => toastError(error?.message),
      }
    );
  };

  return {
    isAdd,
    isEditing,
    isLoading: isLoadingDetail,
    isSubmitting: isCreating || isUpdating,
    isLoadingUsers,
    bill,
    billId: billId || undefined,
    tenantOptions,
    roomOptions,
    tenantRoomMap,
    roomServiceMap,
    roomMemberCountMap,
    roomElectricBikeMap,
    initialValues,
    onSubmit,
    onStartEdit,
    onCancelEdit,
    onCancelAdd,
  };
}

type UseBillFormParams = {
  tenantRoomMap: Map<string, string>;
  roomOptions: SelectOption[];
  roomServiceMap: Map<string, ServiceItem | undefined>;
  roomMemberCountMap: Map<string, number>;
  roomElectricBikeMap: Map<string, boolean>;
};

type UseBillFormResult = {
  values: CreateBillFormValues;
  setFieldValue: FormikContextType<CreateBillFormValues>['setFieldValue'];
  submitForm: FormikContextType<CreateBillFormValues>['submitForm'];
  selectedRoomLabel: string;
  service: ServiceItem | undefined;
  electricUnitPrice: number;
  waterUnitPrice: number;
  totalElectricity: number;
  totalWater: number;
  totalDue: number;
};

export function getBillDetail(bill: BillItem) {
  const room = bill.room;
  const service = room?.service;
  const user = room?.members?.[0];
  const memberCount = room?.members?.length || 0;

  const electricUsage = Math.max(
    Number(bill.electricNumberNew || 0) - Number(bill.electricNumberOld || 0),
    0
  );
  const waterUsage = Math.max(
    Number(bill.waterNumberNew || 0) - Number(bill.waterNumberOld || 0),
    0
  );
  const electricTotal = electricUsage * Number(service?.electricFee || 0);
  const waterTotal = waterUsage * Number(service?.waterFee || 0);
  const electricBikeTotal = bill.room?.isUseElectricBike
    ? Number(service?.electricBikeFee || 0)
    : 0;
  const subtotal = calculateBillAmount(
    service,
    {
      electricNumberOld: bill.electricNumberOld,
      electricNumberNew: bill.electricNumberNew,
      waterNumberOld: bill.waterNumberOld,
      waterNumberNew: bill.waterNumberNew,
    },
    bill.otherServiceFee,
    Boolean(bill.room?.isUseElectricBike),
    memberCount
  );

  const breakdownRows = [
    { key: 'roomFee', label: 'Monthly Rent', formula: 'Room fee', value: service?.roomFee || 0 },
    {
      key: 'waterFee',
      label: 'Water Fee',
      formula: `(${bill.waterNumberNew || 0} - ${bill.waterNumberOld || 0}) × ${Number(
        service?.waterFee || 0
      ).toLocaleString()}`,
      value: waterTotal,
    },
    {
      key: 'electricFee',
      label: 'Electricity',
      formula: `(${bill.electricNumberNew || 0} - ${bill.electricNumberOld || 0}) × ${Number(
        service?.electricFee || 0
      ).toLocaleString()}`,
      value: electricTotal,
    },
    {
      key: 'electricBikeFee',
      label: 'Electric Bike Fee',
      formula: bill.room?.isUseElectricBike ? 'Applied for this room' : 'Not applied',
      value: electricBikeTotal,
    },
    {
      key: 'commonServiceFee',
      label: 'Common Service Fee',
      formula: `${memberCount} × ${Number(service?.commonServiceFee || 0).toLocaleString()}`,
      value: Number(service?.commonServiceFee || 0) * memberCount,
    },
    {
      key: 'internetFee',
      label: 'Internet Fee',
      formula: 'Fixed internet fee',
      value: service?.internetFee || 0,
    },
    {
      key: 'otherServiceFee',
      label: 'Other Service Fee',
      formula: 'Manual input',
      value: bill.otherServiceFee || 0,
    },
  ];

  return { room, service, user, memberCount, subtotal, breakdownRows };
}

export function useBillForm({
  tenantRoomMap,
  roomOptions,
  roomServiceMap,
  roomMemberCountMap,
  roomElectricBikeMap,
}: UseBillFormParams): UseBillFormResult {
  const { values, setFieldValue, submitForm } = useFormikContext<CreateBillFormValues>();

  const selectedRoomId = values.tenantId ? tenantRoomMap.get(values.tenantId) || '' : '';
  const selectedRoomLabel = roomOptions.find(o => o.value === selectedRoomId)?.label || '-';
  const service = selectedRoomId ? roomServiceMap.get(selectedRoomId) : undefined;
  const memberCount = selectedRoomId ? Number(roomMemberCountMap.get(selectedRoomId) || 0) : 0;
  const isUseElectricBike = selectedRoomId
    ? Boolean(roomElectricBikeMap.get(selectedRoomId))
    : false;

  const electricUnitPrice = Number(service?.electricFee || 0);
  const waterUnitPrice = Number(service?.waterFee || 0);
  const totalElectricity =
    Math.max(Number(values.electricNumberNew || 0) - Number(values.electricNumberOld || 0), 0) *
    electricUnitPrice;
  const totalWater =
    Math.max(Number(values.waterNumberNew || 0) - Number(values.waterNumberOld || 0), 0) *
    waterUnitPrice;

  const totalDue = calculateBillAmount(
    service,
    {
      electricNumberOld: Number(values.electricNumberOld || 0),
      electricNumberNew: Number(values.electricNumberNew || 0),
      waterNumberOld: Number(values.waterNumberOld || 0),
      waterNumberNew: Number(values.waterNumberNew || 0),
    },
    Number(values.otherServiceFee || 0),
    isUseElectricBike,
    memberCount
  );

  return {
    values,
    setFieldValue,
    submitForm,
    selectedRoomLabel,
    service,
    electricUnitPrice,
    waterUnitPrice,
    totalElectricity,
    totalWater,
    totalDue,
  };
}
