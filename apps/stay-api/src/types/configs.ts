import ConfigsModel from '@/models/configs';

export interface IConfigAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  config: number;
  waterFee: number;
  electricFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: EConfigType;
  isSpecialRoom: boolean;
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
