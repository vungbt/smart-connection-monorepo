import { ListRes, SingleRes } from '@/types/common';

export type UserItem = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  phone: string;
  address: string;
  isActive: boolean;
  identityCardNumber: string;
  roomId: string;
  room?: {
    id: string;
    name: string;
    serviceId: string;
  };
};

export type UserListRes = ListRes<UserItem>;

export type UserDetailRes = SingleRes<UserItem>;

export type UserFormValues = {
  name: string;
  phone: string;
  address: string;
  isActive: boolean;
  identityCardNumber: string;
  roomId: string;
};

export type UserImportItem = {
  name: string;
  isActive: boolean;
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

export enum EContractStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}

export type UserContractItem = {
  id: string;
  roomId: string;
  memberId: string;
  serviceId: string;
  startDate: Date;
  endDate?: Date;
  status: EContractStatus;
};

export type UserContractListRes = ListRes<UserContractItem>;
