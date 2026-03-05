import { ListRes } from '@/types/common';
import { ServiceItem } from '@/types/services';

export type RoomItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  serviceId: string;
  isUseElectricBike: boolean;
  service?: ServiceItem;
  members?: {
    id: string;
    name: string;
    phone: string;
    address: string;
    isActive: boolean;
    isRoomLeader: boolean;
    roomId: string;
  }[];
};

export type RoomListRes = {
  items: RoomItem[];
} & ListRes<RoomItem>;

export type RoomDetailRes = {
  item: RoomItem;
};

export type RoomFormValues = {
  name: string;
  serviceId: string;
  isUseElectricBike: boolean;
  userIds: string[];
};
