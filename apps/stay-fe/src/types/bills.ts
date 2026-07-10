import { ListRes, SingleRes } from '@/types/common';
import { RoomItem } from '@/types/rooms';
import { ServiceItem } from '@/types/services';
import { UserItem } from '@/types/users';

export type BulkDraft = {
  electricNumberOld: number;
  electricNumberNew: number;
  waterNumberOld: number;
  waterNumberNew: number;
  otherServiceFee: number;
  customElectricFee: number | '';
  customWaterFee: number | '';
  isMoveOutBill: boolean;
};

export type BulkRoomRow = {
  roomId: string;
  roomName: string;
  service?: ServiceItem;
  isUseElectricBike: boolean;
  memberCount: number;
};

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
  electricNumberOld: number;
  electricNumberNew: number;
  waterNumberOld: number;
  waterNumberNew: number;
  otherServiceFee?: number;
  customElectricFee?: number | null;
  customWaterFee?: number | null;
  isMoveOutBill?: boolean;
  note?: string;
  room?: BillRoom;
};

export type BillListRes = ListRes<BillItem>;

export type BillDetailRes = SingleRes<BillItem>;

export type BillCreateValues = {
  roomId: string;
  billingMonth: number;
  billingYear: number;
  electricNumberOld: number;
  electricNumberNew: number;
  waterNumberOld: number;
  waterNumberNew: number;
  otherServiceFee?: number;
  customElectricFee?: number | null;
  customWaterFee?: number | null;
  isMoveOutBill?: boolean;
  note?: string;
};
