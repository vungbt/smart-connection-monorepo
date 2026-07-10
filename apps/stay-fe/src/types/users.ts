import { ListRes, SingleRes } from '@/types/common';
import { ServiceItem } from '@/types/services';

export type UserItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  phone: string;
  address: string;
  isActive: boolean;
  isRoomLeader: boolean;
  identityCardNumber: string;
  roomId: string;
  room?: {
    id: string;
    name: string;
    serviceId: string;
    isUseElectricBike: boolean;
    memberCount?: number | null;
    members?: { isActive?: boolean }[];
    service?: ServiceItem;
  };
};

export type UserListRes = ListRes<UserItem>;

export type UserDetailRes = SingleRes<UserItem>;

export type UserFormValues = {
  name: string;
  phone: string;
  address: string;
  isActive: boolean;
  isRoomLeader: boolean;
  identityCardNumber: string;
  roomId: string;
};

export type UserImportItem = {
  name: string;
  isActive: boolean;
  isRoomLeader?: boolean;
  phone?: string;
  address?: string;
  identityCardNumber?: string;
  roomId?: string;
};

export type UserImportBody = {
  items: UserImportItem[];
};

export type UserImportRes = {
  items: UserItem[];
};
