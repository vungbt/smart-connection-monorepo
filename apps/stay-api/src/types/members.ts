import MembersModel from '@/models/members';

export interface IMemberAttributes {
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
}

export type MemberItem = MembersModel;

export type MemberCreateBody = Omit<
  IMemberAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type MemberUpdateBody = Partial<Omit<IMemberAttributes, 'id' | 'createdAt' | 'deletedAt'>>;

export type MemberListParams = {
  roomIds?: string[];
  isActives?: boolean[];
  q?: string;
};
