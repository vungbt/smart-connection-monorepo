import BillsModel from '@/models/bills';
import MembersModel from '@/models/members';
import RoomsModel from '@/models/rooms';
import ServicesModel from '@/models/services';
import {
  BillCreateBody,
  BillListParams,
  BillUpdateBody,
  IBillAttributes,
  IPaginationReq,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Op, OrderItem, WhereOptions } from 'sequelize';

const billInclude = [
  {
    model: RoomsModel,
    as: 'room',
    required: false,
    include: [
      {
        model: ServicesModel,
        as: 'service',
        required: false,
      },
      {
        model: MembersModel,
        as: 'members',
        attributes: ['id', 'name', 'phone', 'address', 'roomId'],
        required: false,
      },
    ],
  },
];

const toStringArray = (value?: string[] | string) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const sortableFields = new Set([
  'createdAt',
  'billingYear',
  'billingMonth',
  'electricNumberNew',
  'waterNumberNew',
  'roomName',
]);

const toSortOrder = (value?: string): 'ASC' | 'DESC' =>
  value && value.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

const list = async (params: BillListParams, pagination: IPaginationReq) => {
  const { roomIds, q, sortBy, sortOrder } = params;
  const whereCondition: WhereOptions<IBillAttributes> = {};
  const orderField = sortBy && sortableFields.has(sortBy) ? sortBy : 'createdAt';
  const orderDirection = toSortOrder(sortOrder);
  const order: OrderItem[] =
    orderField === 'roomName'
      ? [[{ model: RoomsModel, as: 'room' }, 'name', orderDirection]]
      : [[orderField, orderDirection]];

  const normalizedRoomIds = toStringArray(roomIds);
  if (normalizedRoomIds.length > 0) {
    whereCondition.roomId = { [Op.in]: normalizedRoomIds };
  }

  if (q && q.length > 0) {
    whereCondition[Op.or] = [
      { id: { [Op.like]: `%${q}%` } },
      { roomId: { [Op.like]: `%${q}%` } },
      { note: { [Op.like]: `%${q}%` } },
    ];
  }

  const { count, rows } = await BillsModel.findAndCountAll({
    include: billInclude,
    where: {
      deletedAt: null,
      ...whereCondition,
    },
    limit: pagination.limit,
    offset: pagination.offset,
    order,
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

const create = async (body: BillCreateBody) => {
  const created = await BillsModel.create({ ...body });
  const result = await BillsModel.findOne({
    where: { id: created.id, deletedAt: null },
    include: billInclude,
  });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await BillsModel.findOne({
    where: { id, deletedAt: null },
    include: billInclude,
  });
  return { item: result };
};

const update = async (id: string, data: BillUpdateBody) => {
  const bill = await BillsModel.findByPk(id);
  if (!bill) throw new Error('Bill not found');

  await bill.update(data);
  const result = await BillsModel.findOne({
    where: { id, deletedAt: null },
    include: billInclude,
  });
  return { item: result };
};

const remove = async (id: string) => {
  const bill = await BillsModel.findByPk(id);
  if (!bill) throw new Error('Bill not found');

  await bill.destroy();
  return { message: 'Bill deleted successfully' };
};

export const BillServices = {
  list,
  create,
  getById,
  update,
  remove,
};
