import { ListRes } from '@/types/common';

export type ServiceItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomFee: number;
  waterFee: number;
  electricFee: number;
  electricBikeFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: EServiceType;
};

export enum EServiceType {
  DELUXE = 'DELUXE',
  LUXURY = 'LUXURY',
  PREMIUM = 'PREMIUM',
  BUSINESS = 'BUSINESS',
}

export type ServiceListRes = ListRes<ServiceItem>;

export type ServiceFeeField = keyof Pick<
  ServiceItem,
  'roomFee' | 'waterFee' | 'electricFee' | 'electricBikeFee' | 'commonServiceFee' | 'internetFee'
>;

export type ServiceFeeValues = Record<ServiceFeeField, number>;

export type ServiceFormValues = {
  type: EServiceType;
} & Record<ServiceFeeField, number>;

export const SERVICE_FEE_FIELDS: ServiceFeeField[] = [
  'roomFee',
  'waterFee',
  'electricFee',
  'electricBikeFee',
  'commonServiceFee',
  'internetFee',
];
