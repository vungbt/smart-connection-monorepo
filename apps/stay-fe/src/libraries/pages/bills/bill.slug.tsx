'use client';
import { SERVICE_TYPE_TAG_COLORS } from '@/constants/common';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ServiceItem } from '@/types/services';
import { formatDate, formatPrice } from '@/utils/formatter';
import {
  Box,
  Breadcrumb,
  Button,
  Checkbox,
  FormikForm,
  FormikItem,
  Input,
  Select,
  SelectOption,
  Tag,
  yup,
} from '@smart-connection-monorepo/ui-components';
import BillSlugUtils, {
  CreateBillFormValues,
  defaultInitialValues,
  getBillDetail,
  monthOptions,
  useBillForm,
  yearOptions,
} from './utils/bill-slug.utils';

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
  useCustomElectricFee: yup.boolean().optional(),
  customElectricFee: yup.number().when('useCustomElectricFee', {
    is: true,
    then: schema =>
      schema
        .typeError('Custom electric price must be a number')
        .min(0, 'Value must be greater than or equal to 0')
        .required('Please input custom electric price'),
    otherwise: schema => schema.optional(),
  }),
  useCustomWaterFee: yup.boolean().optional(),
  customWaterFee: yup.number().when('useCustomWaterFee', {
    is: true,
    then: schema =>
      schema
        .typeError('Custom water price must be a number')
        .min(0, 'Value must be greater than or equal to 0')
        .required('Please input custom water price'),
    otherwise: schema => schema.optional(),
  }),
  isMoveOutBill: yup.boolean().optional(),
  note: yup.string().max(1000, 'Note is too long').optional(),
});

function CreateBillLayout({
  roomOptions,
  tenantOptions,
  tenantRoomMap,
  roomServiceMap,
  roomMemberCountMap,
  roomElectricBikeMap,
  isSubmitting,
  isEdit,
  isLoadingRooms,
  onCancel,
}: {
  roomOptions: SelectOption[];
  tenantOptions: SelectOption[];
  tenantRoomMap: Map<string, string>;
  roomServiceMap: Map<string, ServiceItem | undefined>;
  roomMemberCountMap: Map<string, number>;
  roomElectricBikeMap: Map<string, boolean>;
  isSubmitting: boolean;
  isEdit: boolean;
  isLoadingRooms: boolean;
  onCancel: () => void;
}) {
  const {
    values,
    setFieldValue,
    submitForm,
    selectedRoomLabel,
    service,
    totalElectricity,
    totalWater,
    totalDue,
  } = useBillForm({
    tenantRoomMap,
    roomOptions,
    roomServiceMap,
    roomMemberCountMap,
    roomElectricBikeMap,
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: 'Home', href: ROUTES.HOME },
          { title: 'Bills', href: ROUTES.BILLS },
          { title: isEdit ? 'Edit Bill' : 'Create Bill' },
        ]}
        description="Generate and send a detailed invoice for the current billing cycle."
      />

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
              setFieldValue('useCustomElectricFee', false);
              setFieldValue('customElectricFee', '');
              setFieldValue('useCustomWaterFee', false);
              setFieldValue('customWaterFee', '');
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
              loading={isSubmitting || isLoadingRooms}
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
            <Select options={monthOptions} placeholder="Month" loading={isSubmitting} />
          </FormikItem>

          <FormikItem
            name="billingYear"
            label="&nbsp;"
            mapValue={value => yearOptions.find(option => option.value === value) || null}
            mapOnChange={option =>
              (option as SelectOption | null)?.value || defaultInitialValues.billingYear
            }
          >
            <Select options={yearOptions} placeholder="Year" loading={isSubmitting} />
          </FormikItem>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral">
          <FormikItem
            name="isMoveOutBill"
            mapValue={value => Boolean(value)}
            mapOnChange={event => Boolean(event?.target?.checked)}
          >
            <Checkbox
              checked={Boolean(values.isMoveOutBill)}
              label="Bill chuyển đi (chỉ tính điện & nước)"
            />
          </FormikItem>
          {values.isMoveOutBill && (
            <p className="mt-2 text-14 text-neutral-text-secondary">
              Không tính tiền phòng, phí dịch vụ, internet, xe điện và phí khác.
            </p>
          )}
        </div>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Box>
          <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            Electricity Usage
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikItem name="electricNumberOld" label="Previous Index">
              <Input type="number" min="0" step="0.01" loading={isSubmitting} />
            </FormikItem>
            <FormikItem name="electricNumberNew" required label="Current Index">
              <Input type="number" min="0" step="0.01" loading={isSubmitting} />
            </FormikItem>
            <div className="md:col-span-2 space-y-2">
              <FormikItem
                name="useCustomElectricFee"
                mapValue={value => Boolean(value)}
                mapOnChange={event => {
                  const checked = Boolean(event?.target?.checked);
                  if (!checked) {
                    setFieldValue('customElectricFee', '');
                  } else if (values.customElectricFee === '') {
                    setFieldValue('customElectricFee', Number(service?.electricFee || 0));
                  }
                  return checked;
                }}
              >
                <Checkbox
                  checked={Boolean(values.useCustomElectricFee)}
                  label="Custom electric price"
                />
              </FormikItem>
              {values.useCustomElectricFee ? (
                <FormikItem name="customElectricFee" required label="Unit Price (đ/kWh)">
                  <Input type="number" min="0" step="0.01" loading={isSubmitting} />
                </FormikItem>
              ) : (
                <Input
                  label="Unit Price"
                  value={`${formatPrice(Number(service?.electricFee || 0))} / kWh (default)`}
                  disabled
                />
              )}
            </div>
            <Input label="Total Electricity" value={formatPrice(totalElectricity)} disabled />
          </div>
        </Box>

        <Box>
          <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">Water Usage</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikItem name="waterNumberOld" label="Previous Index">
              <Input type="number" min="0" step="0.01" loading={isSubmitting} />
            </FormikItem>
            <FormikItem name="waterNumberNew" required label="Current Index">
              <Input type="number" min="0" step="0.01" loading={isSubmitting} />
            </FormikItem>
            <div className="md:col-span-2 space-y-2">
              <FormikItem
                name="useCustomWaterFee"
                mapValue={value => Boolean(value)}
                mapOnChange={event => {
                  const checked = Boolean(event?.target?.checked);
                  if (!checked) {
                    setFieldValue('customWaterFee', '');
                  } else if (values.customWaterFee === '') {
                    setFieldValue('customWaterFee', Number(service?.waterFee || 0));
                  }
                  return checked;
                }}
              >
                <Checkbox checked={Boolean(values.useCustomWaterFee)} label="Custom water price" />
              </FormikItem>
              {values.useCustomWaterFee ? (
                <FormikItem name="customWaterFee" required label="Unit Price (đ/m³)">
                  <Input type="number" min="0" step="0.01" loading={isSubmitting} />
                </FormikItem>
              ) : (
                <Input
                  label="Unit Price"
                  value={`${formatPrice(Number(service?.waterFee || 0))} / m³ (default)`}
                  disabled
                />
              )}
            </div>
            <Input label="Total Water" value={formatPrice(totalWater)} disabled />
          </div>
        </Box>
      </div>

      {!values.isMoveOutBill && (
        <Box>
          <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            Fixed Monthly Fees
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input label="Room Rent" value={formatPrice(Number(service?.roomFee || 0))} disabled />
            <Input
              label="Common Fee"
              value={formatPrice(Number(service?.commonServiceFee || 0))}
              disabled
            />
            <Input
              label="Internet"
              value={formatPrice(Number(service?.internetFee || 0))}
              disabled
            />
            <Input
              label="Electric Bike"
              value={formatPrice(Number(service?.electricBikeFee || 0))}
              disabled
            />
            <FormikItem name="otherServiceFee" label="Other Fee">
              <Input type="number" min="0" step="0.01" loading={isSubmitting} />
            </FormikItem>
          </div>
        </Box>
      )}

      <div className="rounded-xl bg-primary text-white px-6 py-4">
        <p className="text-12 uppercase tracking-wider">Total Amount Due</p>
        <p className="mt-1 text-36 font-bold">{formatPrice(totalDue)}</p>
        <p className="mt-1 text-12 uppercase tracking-wider">
          Due by: {values.billingMonth} {values.billingYear}
        </p>
      </div>

      <div className="flex items-center justify-end w-full gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="solid"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={() => submitForm()}
        >
          {!isEdit ? 'Create new bill' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}

export default function BillSlugPage() {
  const {
    isAdd,
    isEditing,
    isLoading,
    isSubmitting,
    isLoadingUsers,
    bill,
    billId,
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
  } = BillSlugUtils();

  usePageTitle({
    title: isAdd ? 'Create Bill' : isEditing ? 'Edit Bill' : 'Bill Detail',
    icon: 'vuesax-money-receive',
  });

  if (isAdd || isEditing) {
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
          roomMemberCountMap={roomMemberCountMap}
          roomElectricBikeMap={roomElectricBikeMap}
          isSubmitting={isSubmitting}
          isEdit={isEditing}
          isLoadingRooms={isLoadingUsers}
          onCancel={isAdd ? onCancelAdd : onCancelEdit}
        />
      </FormikForm>
    );
  }

  if (isLoading) {
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
        </Box>
      </div>
    );
  }

  const { room, service, user, subtotal, breakdownRows, isMoveOutBill } = getBillDetail(bill);

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

      <div className="flex items-center w-full justify-end gap-2">
        <Button variant="outline" size="small" icon="pencil" onClick={onStartEdit}>
          Edit Bill
        </Button>
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
                <div className="mt-1 flex flex-wrap gap-2">
                  <Tag
                    content={isMoveOutBill ? 'MOVE-OUT BILL' : 'ROOM BILL'}
                    color={isMoveOutBill ? 'pending' : 'green'}
                    type="outline"
                  />
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
                <div className="mt-1">
                  {service?.type ? (
                    <Tag
                      content={service.type}
                      color={SERVICE_TYPE_TAG_COLORS[service.type]}
                      type="outline"
                    />
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Old Electric Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {bill.electricNumberOld ?? 0}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">New Electric Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {bill.electricNumberNew ?? 0}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Old Water Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {bill.waterNumberOld ?? 0}
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
                    <p className="text-14 text-neutral-text-secondary">{item.formula}</p>
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
