import { ListRes } from '@/types/common';

export type ConfigItem = {
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
};

export enum EConfigType {
  DELUXE = 'DELUXE',
  LUXURY = 'LUXURY',
  PREMIUM = 'PREMIUM',
}

export type ConfigListRes = ListRes<ConfigItem>;
