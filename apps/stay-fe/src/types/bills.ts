import { ListRes, SingleRes } from '@/types/common';
import { RoomItem } from '@/types/rooms';
import { ServiceItem } from '@/types/services';
import { UserItem } from '@/types/users';

export type BillRoom = RoomItem & {
  service?: ServiceItem;
  members?: UserItem[];
};

export type BillItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomId: string;
  billingMonth: number;
  billingYear: number;
  electricNumberNew: number;
  waterNumberNew: number;
  otherServiceFee?: number;
  note?: string;
  room?: BillRoom;
};

export type BillListRes = ListRes<BillItem>;

export type BillDetailRes = SingleRes<BillItem>;

export type BillCreateValues = {
  roomId: string;
  billingMonth: number;
  billingYear: number;
  electricNumberNew: number;
  waterNumberNew: number;
  otherServiceFee?: number;
  note?: string;
};
