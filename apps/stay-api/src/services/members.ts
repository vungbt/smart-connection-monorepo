import MembersModel from '@/models/members';
import {
  IMemberAttributes,
  IPaginationReq,
  MemberCreateBody,
  MemberListParams,
  MemberUpdateBody,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Op, WhereOptions } from 'sequelize';

const toStringArray = (value?: string[] | string) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const toBooleanArray = (value?: boolean[] | string[] | boolean | string) => {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];

  return values
    .map(item => {
      if (typeof item === 'boolean') return item;
      if (item === 'true') return true;
      if (item === 'false') return false;
      return null;
    })
    .filter((item): item is boolean => item !== null);
};

const list = async (params: MemberListParams, pagination: IPaginationReq) => {
  const { roomIds, isActives, q } = params;
  const whereCondition: WhereOptions<IMemberAttributes> = {};

  const normalizedRoomIds = toStringArray(roomIds);
  if (normalizedRoomIds.length > 0) {
    whereCondition.roomId = { [Op.in]: normalizedRoomIds };
  }

  const normalizedActives = toBooleanArray(isActives);
  if (normalizedActives.length > 0) {
    whereCondition.isActive = { [Op.in]: normalizedActives };
  }

  if (q && q.length > 0) {
    whereCondition[Op.or] = [
      { name: { [Op.like]: `%${q}%` } },
      { phone: { [Op.like]: `%${q}%` } },
      { address: { [Op.like]: `%${q}%` } },
    ];
  }

  const { count, rows } = await MembersModel.findAndCountAll({
    where: {
      deletedAt: null,
      ...whereCondition,
    },
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

const create = async (body: MemberCreateBody) => {
  const result = await MembersModel.create({ ...body });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await MembersModel.findOne({
    where: { id, deletedAt: null },
  });
  return { item: result };
};

const update = async (id: string, data: MemberUpdateBody) => {
  const member = await MembersModel.findByPk(id);
  if (!member) throw new Error('Member not found');

  const result = await member.update(data);
  return { item: result };
};

const remove = async (id: string) => {
  const member = await MembersModel.findByPk(id);
  if (!member) throw new Error('Member not found');

  await member.destroy();
  return { message: 'Member deleted successfully' };
};

export const MemberServices = {
  list,
  create,
  getById,
  update,
  remove,
};
