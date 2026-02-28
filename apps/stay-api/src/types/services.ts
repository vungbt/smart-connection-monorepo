import ServicesModel from '@/models/services';

export interface IServiceAttributes {
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
}

export enum EServiceType {
  DELUXE = 'DELUXE',
  LUXURY = 'LUXURY',
  PREMIUM = 'PREMIUM',
  BUSINESS = 'BUSINESS',
}

export type ServiceItem = ServicesModel;

export type ServiceCreateBody = Omit<
  IServiceAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ServiceUpdateBody = Partial<Omit<IServiceAttributes, 'id' | 'createdAt' | 'deletedAt'>>;

export type ServiceListParams = {
  q?: string;
  types?: EServiceType[];
};
