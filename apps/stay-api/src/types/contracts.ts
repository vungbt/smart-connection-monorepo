import ContractsModel from '@/models/contracts';

export enum EContractStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}

export interface IContractAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomId: string;
  memberId: string;
  serviceId: string;
  startDate: Date;
  endDate?: Date;
  status: EContractStatus;
}

export type ContractItem = ContractsModel;

export type ContractCreateBody = Omit<
  IContractAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ContractUpdateBody = Partial<
  Omit<IContractAttributes, 'id' | 'createdAt' | 'deletedAt'>
>;

export type ContractListParams = {
  roomIds?: string[];
  memberIds?: string[];
  serviceIds?: string[];
  statuses?: EContractStatus[];
  q?: string;
};
