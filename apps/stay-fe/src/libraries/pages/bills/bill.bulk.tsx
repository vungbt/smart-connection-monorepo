'use client';

import { usePageTitle } from '@/hooks/usePageTitle';
import { ROUTES } from '@/constants/route';
import { formatPrice } from '@/utils/formatter';
import {
  Box,
  Breadcrumb,
  Button,
  Checkbox,
  Input,
  Select,
  SelectOption,
} from '@smart-connection-monorepo/ui-components';
import BillBulkUtils, {
  BulkDraft,
  getFixedFeeBreakdown,
  monthOptions,
  toNullableFee,
  toNumber,
  yearOptions,
} from './utils/bill-bulk.utils';
import { calculateBillAmount } from '@/utils/bills';

export default function BillBulkPage() {
  const {
    billingMonth,
    billingYear,
    roomRows,
    preparedDrafts,
    isLoading,
    isSubmitting,
    setBillingMonth,
    setBillingYear,
    updateDraft,
    onSubmitBulk,
    onCancel,
  } = BillBulkUtils();

  usePageTitle({ title: 'Create Bills (Bulk)', icon: 'vuesax-money-receive' });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: 'Home', href: ROUTES.HOME },
          { title: 'Bills', href: ROUTES.BILLS },
          { title: 'Create Bills (Bulk)' },
        ]}
        description="Create monthly bills for multiple rooms at once."
      />

      <h3 className="text-30 font-semibold text-neutral-text-primary">Create Bills (Bulk)</h3>

      <Box>
        <h4 className="mb-4 text-20 font-semibold text-neutral-text-primary">
          General Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-14 font-medium text-neutral-text-primary mb-2">Billing Month</p>
            <Select
              options={monthOptions}
              value={monthOptions.find(option => option.value === billingMonth) || null}
              onChange={value =>
                setBillingMonth(
                  String((value as SelectOption | null)?.value || monthOptions[0].value)
                )
              }
              placeholder="Month"
            />
          </div>

          <div>
            <p className="text-14 font-medium text-neutral-text-primary mb-2">Billing Year</p>
            <Select
              options={yearOptions}
              value={yearOptions.find(option => option.value === billingYear) || null}
              onChange={value =>
                setBillingYear(
                  String((value as SelectOption | null)?.value || yearOptions[0].value)
                )
              }
              placeholder="Year"
            />
          </div>
        </div>
      </Box>

      <Box>
        <div className="overflow-x-auto">
          <div className="min-w-[1850px]">
            <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-3 pb-3 border-b border-neutral">
              <p className="text-12 font-semibold text-neutral-text-secondary">Room</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Move Out</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric Old</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric New</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric Price</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Water Old</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Water New</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Water Price</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Room Fee</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Common Fee</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Internet</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric Bike Fee</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Total</p>
            </div>

            {roomRows.map(row => {
              const draft: BulkDraft = preparedDrafts[row.roomId] || {
                electricNumberOld: 0,
                electricNumberNew: 0,
                waterNumberOld: 0,
                waterNumberNew: 0,
                otherServiceFee: 0,
                customElectricFee: '',
                customWaterFee: '',
                isMoveOutBill: false,
              };
              const service = row.service;
              const customElectricFee = toNullableFee(draft.customElectricFee);
              const customWaterFee = toNullableFee(draft.customWaterFee);
              const isMoveOutBill = Boolean(draft.isMoveOutBill);
              const total = calculateBillAmount(
                service,
                {
                  electricNumberOld: draft.electricNumberOld,
                  electricNumberNew: draft.electricNumberNew,
                  waterNumberOld: draft.waterNumberOld,
                  waterNumberNew: draft.waterNumberNew,
                },
                toNumber(draft.otherServiceFee),
                row.isUseElectricBike,
                row.memberCount,
                { customElectricFee, customWaterFee },
                isMoveOutBill
              );
              const fixedFees = getFixedFeeBreakdown(service, row.isUseElectricBike);

              return (
                <div
                  key={row.roomId}
                  className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-3 py-3 border-b border-neutral/60 items-center"
                >
                  <p className="text-14 font-medium text-neutral-text-primary">{row.roomName}</p>
                  <Checkbox
                    checked={isMoveOutBill}
                    onChange={event =>
                      updateDraft(row.roomId, 'isMoveOutBill', event.target.checked)
                    }
                    disabled={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={draft.electricNumberOld}
                    onChange={event =>
                      updateDraft(row.roomId, 'electricNumberOld', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={draft.electricNumberNew}
                    onChange={event =>
                      updateDraft(row.roomId, 'electricNumberNew', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={String(service?.electricFee ?? '')}
                    value={draft.customElectricFee}
                    onChange={event =>
                      updateDraft(row.roomId, 'customElectricFee', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={draft.waterNumberOld}
                    onChange={event =>
                      updateDraft(row.roomId, 'waterNumberOld', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={draft.waterNumberNew}
                    onChange={event =>
                      updateDraft(row.roomId, 'waterNumberNew', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={String(service?.waterFee ?? '')}
                    value={draft.customWaterFee}
                    onChange={event =>
                      updateDraft(row.roomId, 'customWaterFee', event.target.value)
                    }
                    loading={isLoading}
                  />
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {isMoveOutBill ? '-' : formatPrice(fixedFees.roomFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {isMoveOutBill
                      ? '-'
                      : formatPrice(row.memberCount * fixedFees.commonServiceFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {isMoveOutBill ? '-' : formatPrice(fixedFees.internetFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {isMoveOutBill ? '-' : formatPrice(fixedFees.electricBikeFee)}
                  </p>
                  <p className="text-14 font-semibold text-primary">{formatPrice(total)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Box>

      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="button" loading={isSubmitting} disabled={isSubmitting} onClick={onSubmitBulk}>
          Create Bills
        </Button>
      </div>
    </div>
  );
}
