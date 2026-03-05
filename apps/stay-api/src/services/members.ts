import MembersModel from '@/models/members';
import RoomsModel from '@/models/rooms';
import ServicesModel from '@/models/services';
import {
  IMemberAttributes,
  IPaginationReq,
  MemberCreateBody,
  MemberImportBody,
  MemberListParams,
  MemberUpdateBody,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { col, Op, OrderItem, WhereOptions } from 'sequelize';

const defaultImportValue = '000000000';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type MemberListRoomService = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roomFee: number;
  waterFee: number;
  electricFee: number;
  electricBikeFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: string;
};

type MemberListRoom = {
  id: string;
  name: string;
  serviceId: string;
  isUseElectricBike: boolean;
  service?: MemberListRoomService | null;
};

type MemberListRow = {
  id: string;
  roomId: string;
  room?: MemberListRoom | null;
};

const sortableFields = new Set([
  'createdAt',
  'name',
  'phone',
  'address',
  'isActive',
  'isRoomLeader',
  'roomName',
]);

const toSortOrder = (sortOrder?: string) =>
  `${sortOrder || ''}`.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

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
  const { roomIds, isActives, q, sortBy, sortOrder } = params;
  const whereCondition: WhereOptions<IMemberAttributes> = {};
  const orderField = sortBy && sortableFields.has(sortBy) ? sortBy : 'createdAt';
  const orderDirection = toSortOrder(sortOrder);
  const order: OrderItem[] =
    orderField === 'roomName'
      ? [
          [{ model: RoomsModel, as: 'room' }, 'name', orderDirection],
          [col('members.name'), orderDirection],
        ]
      : orderField === 'name'
      ? [[col('members.name'), orderDirection]]
      : [[orderField, orderDirection]];

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
    include: [
      {
        model: RoomsModel,
        as: 'room',
        attributes: ['id', 'name', 'serviceId', 'isUseElectricBike'],
        required: false,
        where: { deletedAt: null },
        include: [
          {
            model: ServicesModel,
            as: 'service',
            required: false,
          },
        ],
      },
    ],
    where: {
      deletedAt: null,
      ...whereCondition,
    },
    order,
    limit: pagination.limit,
    offset: pagination.offset,
  });

  const items = rows.map(row => row.toJSON() as MemberListRow);

  const paginationRes = resPagination(count, pagination);
  return {
    items,
    metadata: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...paginationRes,
    },
  };
};

const create = async (body: MemberCreateBody) => {
  const created = await MembersModel.create({ ...body });
  const result = await MembersModel.findOne({
    where: { id: created.id, deletedAt: null },
  });
  return { item: result };
};

const createImportMany = async (bodies: MemberImportBody[]) => {
  const rooms = await RoomsModel.findAll({
    where: { deletedAt: null },
    order: [['createdAt', 'ASC']],
    attributes: ['id'],
  });

  const firstRoomId = rooms[0]?.id;
  const existingRoomIdSet = new Set(rooms.map(room => room.id));

  const normalizedBodies: MemberCreateBody[] = bodies.map(body => {
    const normalizedRoomId = body.roomId?.trim();
    const roomId =
      normalizedRoomId &&
      uuidPattern.test(normalizedRoomId) &&
      existingRoomIdSet.has(normalizedRoomId)
        ? normalizedRoomId
        : firstRoomId;
    if (!roomId) throw new Error('No room available for member import');

    const normalizeImportValue = (value?: string) => {
      if (value === undefined || value === null) return defaultImportValue;
      const trimmedValue = value.trim();
      return trimmedValue.length > 0 ? trimmedValue : defaultImportValue;
    };

    return {
      name: body.name,
      isActive: body.isActive,
      isRoomLeader: body.isRoomLeader ?? false,
      phone: normalizeImportValue(body.phone),
      address: normalizeImportValue(body.address),
      identityCardNumber: normalizeImportValue(body.identityCardNumber),
      roomId,
    };
  });

  const items = await MembersModel.bulkCreate(normalizedBodies, { returning: true });
  return { items };
};

const getById = async (id: string) => {
  const result = await MembersModel.findOne({
    where: { id, deletedAt: null },
    include: [
      {
        model: RoomsModel,
        as: 'room',
        attributes: ['id', 'name', 'serviceId', 'isUseElectricBike'],
        required: false,
        where: { deletedAt: null },
        include: [
          {
            model: ServicesModel,
            as: 'service',
            required: false,
          },
        ],
      },
    ],
  });
  return { item: result };
};

const update = async (id: string, data: MemberUpdateBody) => {
  const member = await MembersModel.findByPk(id);
  if (!member) throw new Error('Member not found');

  await member.update(data);
  const result = await MembersModel.findOne({
    where: { id, deletedAt: null },
  });
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
  createImportMany,
  getById,
  update,
  remove,
};
