import { ListRes } from '@/types/common';

export type RoomItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  serviceId: string;
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
};
