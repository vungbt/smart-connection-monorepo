import RoomsModel from '@/models/rooms';

export interface IRoomAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  serviceId: string;
}

export type RoomItem = RoomsModel;

export type RoomCreateBody = Omit<IRoomAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type RoomUpdateBody = Partial<Omit<IRoomAttributes, 'id' | 'createdAt' | 'deletedAt'>>;
