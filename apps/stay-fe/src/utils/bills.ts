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

type CustomFeeOverrides = {
  customElectricFee?: number | null;
  customWaterFee?: number | null;
};

export const getEffectiveElectricFee = (
  service?: ServiceItem,
  customElectricFee?: number | null
) => {
  if (customElectricFee != null && Number.isFinite(Number(customElectricFee))) {
    return Number(customElectricFee);
  }
  return Number(service?.electricFee || 0);
};

export const getEffectiveWaterFee = (service?: ServiceItem, customWaterFee?: number | null) => {
  if (customWaterFee != null && Number.isFinite(Number(customWaterFee))) {
    return Number(customWaterFee);
  }
  return Number(service?.waterFee || 0);
};

export const calculateBillAmount = (
  service?: ServiceItem,
  meterValues?: MeterValues,
  otherServiceFee = 0,
  isUseElectricBike = false,
  memberCount = 0,
  customFees?: CustomFeeOverrides,
  isMoveOutBill = false
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

  const electricFee = getEffectiveElectricFee(service, customFees?.customElectricFee);
  const waterFee = getEffectiveWaterFee(service, customFees?.customWaterFee);
  const usageTotal = waterUsage * waterFee + electricUsage * electricFee;

  if (isMoveOutBill) {
    return usageTotal;
  }

  return (
    Number(service.roomFee || 0) +
    usageTotal +
    (isUseElectricBike ? Number(service.electricBikeFee || 0) : 0) +
    Number(service.commonServiceFee || 0) * Math.max(memberCount, 0) +
    Number(service.internetFee || 0) +
    Number(otherServiceFee || 0)
  );
};
