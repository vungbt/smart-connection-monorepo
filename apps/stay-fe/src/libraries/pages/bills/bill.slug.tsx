'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSlugParams } from '@/hooks/useSlugParams';
import { BillCreateValues, BillDetailRes } from '@/types/bills';
import { ServiceItem } from '@/types/services';
import { UserListRes } from '@/types/users';
import { billKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { formatDate, formatPrice } from '@/utils/formater';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import {
  Box,
  Breadcrumb,
  Button,
  FormikForm,
  FormikItem,
  Input,
  Select,
  SelectOption,
  Tag,
  toastError,
  toastSuccess,
  yup,
} from '@smart-connection-monorepo/ui-components';
import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { calculateBillAmount } from './bill.mock';

type CreateBillFormValues = {
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

const defaultInitialValues: CreateBillFormValues = {
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

const validationSchema = yup.object({
  tenantId: yup.string().required('Please select tenant'),
  electricNumberNew: yup
    .number()
    .typeError('Please input new electric number')
    .min(0, 'Value must be greater than or equal to 0')
    .required('Please input new electric number'),
  waterNumberNew: yup
    .number()
    .typeError('Please input new water number')
    .min(0, 'Value must be greater than or equal to 0')
    .required('Please input new water number'),
  otherServiceFee: yup
    .number()
    .typeError('Other service fee must be a number')
    .min(0, 'Value must be greater than or equal to 0')
    .optional(),
  note: yup.string().max(1000, 'Note is too long').optional(),
});

const monthOptions: SelectOption[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map(month => ({ value: month, label: month }));

const yearOptions: SelectOption[] = [0, 1, 2, 3, 4].map(offset => {
  const year = String(new Date().getFullYear() - offset);
  return { value: year, label: year };
});

function CreateBillLayout({
  roomOptions,
  tenantOptions,
  tenantRoomMap,
  roomServiceMap,
  isCreating,
  isLoadingRooms,
  onCancel,
}: {
  roomOptions: SelectOption[];
  tenantOptions: SelectOption[];
  tenantRoomMap: Map<string, string>;
  roomServiceMap: Map<string, ServiceItem | undefined>;
  isCreating: boolean;
  isLoadingRooms: boolean;
  onCancel: () => void;
}) {
  const { values, setFieldValue, submitForm } = useFormikContext<CreateBillFormValues>();

  const selectedRoomId = values.tenantId ? tenantRoomMap.get(values.tenantId) || '' : '';
  const selectedRoomLabel =
    roomOptions.find(option => option.value === selectedRoomId)?.label || '-';
  const service = selectedRoomId ? roomServiceMap.get(selectedRoomId) : undefined;

  const electricUnitPrice = Number(service?.electricFee || 0);
  const waterUnitPrice = Number(service?.waterFee || 0);
  const totalElectricity =
    Math.max(Number(values.electricNumberNew || 0) - Number(values.electricNumberOld || 0), 0) *
    electricUnitPrice;
  const totalWater =
    Math.max(Number(values.waterNumberNew || 0) - Number(values.waterNumberOld || 0), 0) *
    waterUnitPrice;

  const fixedMonthlyFees =
    Number(service?.roomFee || 0) +
    Number(service?.commonServiceFee || 0) +
    Number(service?.internetFee || 0) +
    Number(service?.electricBikeFee || 0);

  const totalDue =
    totalElectricity + totalWater + fixedMonthlyFees + Number(values.otherServiceFee || 0);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: 'Home', href: ROUTES.HOME },
          { title: 'Bills', href: ROUTES.BILLS },
          { title: 'Create Bill' },
        ]}
        description="Generate and send a detailed invoice for the current billing cycle."
      />

      <h3 className="text-30 font-semibold text-neutral-text-primary">Create Monthly Bill</h3>

      <Box>
        <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">
          General Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormikItem
            name="tenantId"
            required
            label="Tenant Name"
            mapValue={value => tenantOptions.find(option => option.value === value) || null}
            mapOnChange={option => {
              const selectedTenantId = (option as SelectOption | null)?.value || '';
              setFieldValue('electricNumberOld', 0);
              setFieldValue('waterNumberOld', 0);
              setFieldValue('electricNumberNew', 0);
              setFieldValue('waterNumberNew', 0);
              setFieldValue('otherServiceFee', 0);
              setFieldValue('note', '');
              setFieldValue(
                'billingMonth',
                values.billingMonth || defaultInitialValues.billingMonth
              );
              setFieldValue('billingYear', values.billingYear || defaultInitialValues.billingYear);
              return selectedTenantId;
            }}
          >
            <Select
              options={tenantOptions}
              placeholder="Select a tenant"
              loading={isCreating || isLoadingRooms}
            />
          </FormikItem>

          <Input label="Room Number" value={selectedRoomLabel} disabled />

          <FormikItem
            name="billingMonth"
            label="Billing Period"
            mapValue={value => monthOptions.find(option => option.value === value) || null}
            mapOnChange={option =>
              (option as SelectOption | null)?.value || defaultInitialValues.billingMonth
            }
          >
            <Select options={monthOptions} placeholder="Month" loading={isCreating} />
          </FormikItem>

          <FormikItem
            name="billingYear"
            label="&nbsp;"
            mapValue={value => yearOptions.find(option => option.value === value) || null}
            mapOnChange={option =>
              (option as SelectOption | null)?.value || defaultInitialValues.billingYear
            }
          >
            <Select options={yearOptions} placeholder="Year" loading={isCreating} />
          </FormikItem>
        </div>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Box>
          <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            Electricity Usage
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikItem name="electricNumberOld" label="Previous Index">
              <Input type="number" min="0" step="0.01" loading={isCreating} />
            </FormikItem>
            <FormikItem name="electricNumberNew" required label="Current Index">
              <Input type="number" min="0" step="0.01" loading={isCreating} />
            </FormikItem>
            <Input label="Unit Price" value={`${formatPrice(electricUnitPrice)} / kWh`} disabled />
            <Input label="Total Electricity" value={formatPrice(totalElectricity)} disabled />
          </div>
        </Box>

        <Box>
          <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">Water Usage</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikItem name="waterNumberOld" label="Previous Index">
              <Input type="number" min="0" step="0.01" loading={isCreating} />
            </FormikItem>
            <FormikItem name="waterNumberNew" required label="Current Index">
              <Input type="number" min="0" step="0.01" loading={isCreating} />
            </FormikItem>
            <Input label="Unit Price" value={`${formatPrice(waterUnitPrice)} / m³`} disabled />
            <Input label="Total Water" value={formatPrice(totalWater)} disabled />
          </div>
        </Box>
      </div>

      <Box>
        <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">Fixed Monthly Fees</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input label="Room Rent" value={formatPrice(Number(service?.roomFee || 0))} disabled />
          <Input
            label="Common Fee"
            value={formatPrice(Number(service?.commonServiceFee || 0))}
            disabled
          />
          <Input label="Internet" value={formatPrice(Number(service?.internetFee || 0))} disabled />
          <Input
            label="Electric Bike"
            value={formatPrice(Number(service?.electricBikeFee || 0))}
            disabled
          />
          <FormikItem name="otherServiceFee" label="Other Fee">
            <Input type="number" min="0" step="0.01" loading={isCreating} />
          </FormikItem>
        </div>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl bg-primary text-white p-6">
          <p className="text-12 uppercase tracking-wider">Total Amount Due</p>
          <p className="mt-2 text-48 font-bold">{formatPrice(totalDue)}</p>
          <p className="mt-4 text-12 uppercase tracking-wider">
            Due by: {values.billingMonth} {values.billingYear}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            icon="check"
            loading={isCreating}
            disabled={isCreating}
            onClick={() => submitForm()}
          >
            Create & Send Notification
          </Button>
          <Button
            type="button"
            variant="outline"
            loading={isCreating}
            disabled={isCreating}
            onClick={() => submitForm()}
          >
            Save as Draft
          </Button>
          <Button type="button" variant="text" onClick={onCancel} disabled={isCreating}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BillSlugPage() {
  const { itemId: billId, isAdd } = useSlugParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: billDetailData, isLoading: isLoadingDetail } = useApiQuery<BillDetailRes>(
    {
      endpoint: `${API_ROUTES.BILLS}/${billId}`,
      queryKey: billKeys.detail(billId || ''),
      params: {
        id: billId,
      },
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

  const initialValues: CreateBillFormValues = isAdd
    ? defaultInitialValues
    : {
        tenantId: '',
        billingMonth: defaultInitialValues.billingMonth,
        billingYear: defaultInitialValues.billingYear,
        electricNumberOld: 0,
        electricNumberNew: Number(bill?.electricNumberNew || 0),
        waterNumberOld: 0,
        waterNumberNew: Number(bill?.waterNumberNew || 0),
        otherServiceFee: Number(bill?.otherServiceFee || 0),
        note: bill?.note || '',
      };

  usePageTitle({
    title: isAdd ? 'Create Bill' : 'Bill Detail',
    icon: 'vuesax-money-receive',
  });

  const onCancel = () => {
    router.push(ROUTES.BILLS);
  };

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
      electricNumberNew: Number(values.electricNumberNew || 0),
      waterNumberNew: Number(values.waterNumberNew || 0),
      otherServiceFee: values.otherServiceFee ? Number(values.otherServiceFee) : 0,
      note: values.note?.trim() || undefined,
    };

    createBill(
      {
        endpoint: API_ROUTES.BILLS,
        body: payload,
      },
      {
        onSuccess: () => {
          toastSuccess('Bill created successfully');
          queryClient.invalidateQueries({ queryKey: billKeys.list() });
          router.push(ROUTES.BILLS);
        },
        onError: error => {
          toastError(error?.message);
        },
      }
    );
  };

  if (isAdd) {
    return (
      <FormikForm<CreateBillFormValues>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <CreateBillLayout
          roomOptions={roomOptions}
          tenantOptions={tenantOptions}
          tenantRoomMap={tenantRoomMap}
          roomServiceMap={roomServiceMap}
          isCreating={isCreating}
          isLoadingRooms={isLoadingUsers}
          onCancel={onCancel}
        />
      </FormikForm>
    );
  }

  if (isLoadingDetail) {
    return <p className="text-14 text-neutral-placeholder">Loading bill detail...</p>;
  }

  if (!billId || !bill) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { title: 'Home', href: ROUTES.HOME },
            { title: 'Bills', href: ROUTES.BILLS },
            { title: 'Not Found' },
          ]}
          description="Invoice not found."
        />
        <Box>
          <p className="text-neutral-text-secondary">Bill not found.</p>
          <Link href={ROUTES.BILLS} className="mt-3 inline-block text-primary font-medium">
            Back to bills
          </Link>
        </Box>
      </div>
    );
  }

  const room = bill.room;
  const service = room?.service;
  const user = room?.members?.[0];
  const subtotal = calculateBillAmount(service, bill.otherServiceFee);

  const breakdownRows = [
    { key: 'roomFee', label: 'Monthly Rent', value: service?.roomFee || 0 },
    { key: 'waterFee', label: 'Water Fee', value: service?.waterFee || 0 },
    { key: 'electricFee', label: 'Electricity', value: service?.electricFee || 0 },
    { key: 'electricBikeFee', label: 'Electric Bike Fee', value: service?.electricBikeFee || 0 },
    { key: 'commonServiceFee', label: 'Common Service Fee', value: service?.commonServiceFee || 0 },
    { key: 'internetFee', label: 'Internet Fee', value: service?.internetFee || 0 },
    { key: 'otherServiceFee', label: 'Other Service Fee', value: bill.otherServiceFee || 0 },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: 'Home', href: ROUTES.HOME },
          { title: 'Bills', href: ROUTES.BILLS },
          { title: `Invoice #${bill.id}` },
        ]}
        description={`Billing information for ${room?.name || '-'}.`}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-24 font-semibold text-neutral-text-primary">Invoice Details</h3>
          <p className="text-14 text-neutral-placeholder mt-1">
            Billing for {user?.address || room?.name || '-'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon="printer">
            Print
          </Button>
          <Button variant="outline" icon="arrow-down-tray">
            PDF
          </Button>
          <Button icon="check">Mark as paid</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Box>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Invoice ID</p>
                <p className="text-18 font-semibold text-neutral-text-primary mt-1">#{bill.id}</p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Status</p>
                <div className="mt-1">
                  <Tag content="ROOM BILL" color="green" type="outline" />
                </div>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Issue Date</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {formatDate(bill.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Service Type</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {service?.type || '-'}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">New Electric Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {bill.electricNumberNew ?? 0}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">New Water Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {bill.waterNumberNew ?? 0}
                </p>
              </div>
            </div>
          </Box>

          <Box>
            <p className="text-20 font-semibold text-neutral-text-primary">Billing Breakdown</p>
            <div className="mt-4 divide-y divide-neutral">
              {breakdownRows.map(item => (
                <div key={item.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                  <div>
                    <p className="text-14 font-medium text-neutral-text-primary">{item.label}</p>
                  </div>
                  <div>
                    <p className="text-14 text-neutral-text-secondary">{service?.type || '-'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-14 font-semibold text-neutral-text-primary">
                      {formatPrice(item.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-neutral pt-4 flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-14 text-neutral-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-14 text-neutral-text-secondary">
                  <span>Tax (0%)</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-20 font-semibold text-neutral-text-primary pt-1 border-t border-neutral">
                  <span>Total Amount</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </Box>
        </div>

        <div className="space-y-4">
          <Box>
            <p className="text-16 font-semibold text-neutral-text-primary">Tenant Information</p>
            <div className="mt-4 space-y-2">
              <p className="text-16 font-semibold text-neutral-text-primary">{user?.name || '-'}</p>
              <p className="text-14 text-neutral-text-secondary">{user?.address || '-'}</p>
              <p className="text-14 text-neutral-text-secondary">{user?.phone || '-'}</p>
              <p className="text-14 text-neutral-text-secondary">Room: {room?.name || '-'}</p>
            </div>
          </Box>

          <Box>
            <p className="text-16 font-semibold text-neutral-text-primary">Notes</p>
            <p className="mt-3 text-14 text-neutral-text-secondary">
              {bill.note || `Service type: ${service?.type || '-'}.`}
            </p>
          </Box>
        </div>
      </div>
    </div>
  );
}
