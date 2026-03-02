import { ServiceItem } from '@/types/services';

export const calculateBillAmount = (service?: ServiceItem, otherServiceFee = 0) => {
  if (!service) return 0;

  return (
    Number(service.roomFee || 0) +
    Number(service.waterFee || 0) +
    Number(service.electricFee || 0) +
    Number(service.electricBikeFee || 0) +
    Number(service.commonServiceFee || 0) +
    Number(service.internetFee || 0) +
    Number(otherServiceFee || 0)
  );
};
