import ConfigsModel from '@/models/configs';

export interface IConfigAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomFee: number;
  waterFee: number;
  electricFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: EConfigType;
}

export enum EConfigType {
  DELUXE = 'DELUXE',
  LUXURY = 'LUXURY',
  PREMIUM = 'PREMIUM',
}

export type ConfigItem = ConfigsModel;

export type ConfigCreateBody = Omit<
  IConfigAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ConfigUpdateBody = Partial<Omit<IConfigAttributes, 'id' | 'createdAt' | 'deletedAt'>>;

export type ConfigListParams = {
  q?: string;
  types?: EConfigType[];
};
