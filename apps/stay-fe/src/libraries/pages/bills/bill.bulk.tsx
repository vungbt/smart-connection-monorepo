'use client';

import { usePageTitle } from '@/hooks/usePageTitle';
import { ROUTES } from '@/constants/route';
import { formatPrice } from '@/utils/formatter';
import {
  Box,
  Breadcrumb,
  Button,
  Input,
  Select,
  SelectOption,
} from '@smart-connection-monorepo/ui-components';
import BillBulkUtils, {
  BulkDraft,
  getFixedFeeBreakdown,
  monthOptions,
  toNumber,
  yearOptions,
} from './utils/bill-bulk.utils';

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
          <div className="min-w-[1400px]">
            <div className="grid grid-cols-10 gap-3 pb-3 border-b border-neutral">
              <p className="text-12 font-semibold text-neutral-text-secondary">Room</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric Old</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Electric New</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Water Old</p>
              <p className="text-12 font-semibold text-neutral-text-secondary">Water New</p>
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
              };
              const service = row.service;
              const electricUsage = Math.max(draft.electricNumberNew - draft.electricNumberOld, 0);
              const waterUsage = Math.max(draft.waterNumberNew - draft.waterNumberOld, 0);
              const electricTotal = electricUsage * toNumber(service?.electricFee || 0);
              const waterTotal = waterUsage * toNumber(service?.waterFee || 0);
              const fixedFees = getFixedFeeBreakdown(service, row.isUseElectricBike);
              const total =
                electricTotal +
                waterTotal +
                fixedFees.roomFee +
                fixedFees.commonServiceFee * row.memberCount +
                fixedFees.internetFee +
                fixedFees.electricBikeFee +
                toNumber(draft.otherServiceFee);

              return (
                <div
                  key={row.roomId}
                  className="grid grid-cols-10 gap-3 py-3 border-b border-neutral/60 items-center"
                >
                  <p className="text-14 font-medium text-neutral-text-primary">{row.roomName}</p>
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
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {formatPrice(fixedFees.roomFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {formatPrice(row.memberCount * fixedFees.commonServiceFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {formatPrice(fixedFees.internetFee)}
                  </p>
                  <p className="text-14 font-semibold text-neutral-text-primary">
                    {formatPrice(fixedFees.electricBikeFee)}
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
