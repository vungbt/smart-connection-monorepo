import { ServiceItem } from '@/types/services';
import { SelectOption } from '@smart-connection-monorepo/ui-components';

export const monthOptions: SelectOption[] = [
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

export const yearOptions: SelectOption[] = [0, 1, 2, 3, 4].map(offset => {
  const year = String(new Date().getFullYear() - offset);
  return { value: year, label: year };
});

type MeterValues = {
  electricNumberOld?: number;
  electricNumberNew?: number;
  waterNumberOld?: number;
  waterNumberNew?: number;
};

export const calculateBillAmount = (
  service?: ServiceItem,
  meterValues?: MeterValues,
  otherServiceFee = 0,
  isUseElectricBike = false,
  memberCount = 0
) => {
  if (!service) return 0;

  const electricUsage = Math.max(
    Number(meterValues?.electricNumberNew || 0) - Number(meterValues?.electricNumberOld || 0),
    0
  );
  const waterUsage = Math.max(
    Number(meterValues?.waterNumberNew || 0) - Number(meterValues?.waterNumberOld || 0),
    0
  );

  return (
    Number(service.roomFee || 0) +
    waterUsage * Number(service.waterFee || 0) +
    electricUsage * Number(service.electricFee || 0) +
    (isUseElectricBike ? Number(service.electricBikeFee || 0) : 0) +
    Number(service.commonServiceFee || 0) * Math.max(memberCount, 0) +
    Number(service.internetFee || 0) +
    Number(otherServiceFee || 0)
  );
};
