import BillsModel from '@/models/bills';

export interface IBillAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomId: string;
  billingMonth: number;
  billingYear: number;
  electricNumberOld: number;
  electricNumberNew: number;
  waterNumberOld: number;
  waterNumberNew: number;
  otherServiceFee?: number;
  note?: string;
}

export type BillItem = BillsModel;

export type BillCreateBody = Omit<IBillAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type BillUpdateBody = Partial<Omit<IBillAttributes, 'id' | 'createdAt' | 'deletedAt'>>;

export type BillListParams = {
  roomIds?: string[];
  q?: string;
  sortBy?:
    | 'createdAt'
    | 'billingYear'
    | 'billingMonth'
    | 'electricNumberNew'
    | 'waterNumberNew'
    | 'roomName';
  sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc';
};
