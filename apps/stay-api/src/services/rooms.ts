import RoomsModel from '@/models/rooms';
import { RoomCreateBody, RoomUpdateBody } from '@/types';

const list = async () => {
  return await RoomsModel.findAll({
    where: {
      deletedAt: null,
    },
  });
};

const create = async (body: RoomCreateBody): Promise<RoomsModel> => {
  return await RoomsModel.create({ ...body });
};

const getById = async (id: string) => {
  return await RoomsModel.findOne({
    where: { id, deletedAt: null },
  });
};

const update = async (id: string, data: RoomUpdateBody): Promise<RoomsModel> => {
  const room = await RoomsModel.findByPk(id);
  if (!room) throw new Error('Room not found');

  return await room.update(data);
};

const remove = async (id: string) => {
  const room = await RoomsModel.findByPk(id);
  if (!room) throw new Error('Room not found');

  await room.destroy();
  return { message: 'Room deleted successfully' };
};

export const RoomServices = {
  list,
  create,
  getById,
  update,
  remove,
};
