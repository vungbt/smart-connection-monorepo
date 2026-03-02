import { ListRes } from '@/types/common';

export type RoomItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  serviceId: string;
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
  userIds: string[];
};
