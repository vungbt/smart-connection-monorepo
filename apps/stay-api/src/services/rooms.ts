import RoomsModel from '@/models/rooms';
import MembersModel from '@/models/members';
import {
  IPaginationReq,
  IRoomAttributes,
  RoomCreateBody,
  RoomListParams,
  RoomUpdateBody,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Includeable, Op, WhereOptions } from 'sequelize';

const toStringArray = (value?: string[] | string) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const list = async (params: RoomListParams, pagination: IPaginationReq) => {
  const { serviceIds, q, includeMembers } = params;
  const whereCondition: WhereOptions<IRoomAttributes> = {};
  const shouldIncludeMembers =
    includeMembers === true ||
    `${includeMembers || ''}`.toLowerCase() === 'true' ||
    `${includeMembers || ''}` === '1';

  const include: Includeable[] = shouldIncludeMembers
    ? [
        {
          model: MembersModel,
          as: 'members',
          required: false,
          attributes: ['id', 'name', 'phone', 'address', 'isActive', 'isRoomLeader', 'roomId'],
          where: {
            deletedAt: null,
          },
        },
      ]
    : [];

  const normalizedServiceIds = toStringArray(serviceIds);
  if (normalizedServiceIds.length > 0) {
    whereCondition.serviceId = { [Op.in]: normalizedServiceIds };
  }

  if (q && q.length > 0) {
    whereCondition.name = { [Op.like]: `%${q}%` };
  }

  const { count, rows } = await RoomsModel.findAndCountAll({
    include,
    where: {
      deletedAt: null,
      ...whereCondition,
    },
    distinct: true,
    limit: pagination.limit,
    offset: pagination.offset,
  });

  const paginationRes = resPagination(count, pagination);
  return {
    items: rows,
    metadata: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...paginationRes,
    },
  };
};

const create = async (body: RoomCreateBody) => {
  const result = await RoomsModel.create({ ...body });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await RoomsModel.findOne({
    where: { id, deletedAt: null },
  });
  return { item: result };
};

const update = async (id: string, data: RoomUpdateBody) => {
  const room = await RoomsModel.findByPk(id);
  if (!room) throw new Error('Room not found');

  const result = await room.update(data);
  return { item: result };
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
