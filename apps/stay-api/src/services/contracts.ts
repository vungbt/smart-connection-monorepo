import ContractsModel from '@/models/contracts';
import {
  ContractCreateBody,
  ContractListParams,
  ContractUpdateBody,
  EContractStatus,
  IContractAttributes,
  IPaginationReq,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Op, WhereOptions } from 'sequelize';

const toStringArray = (value?: string[] | string) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const toStatusArray = (value?: EContractStatus[] | string[] | EContractStatus | string) => {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  const availableStatuses = Object.values(EContractStatus);

  return values.filter((item): item is EContractStatus =>
    availableStatuses.includes(item as EContractStatus)
  );
};

const list = async (params: ContractListParams, pagination: IPaginationReq) => {
  const { roomIds, memberIds, serviceIds, statuses, q } = params;
  const whereCondition: WhereOptions<IContractAttributes> = {};

  const normalizedRoomIds = toStringArray(roomIds);
  if (normalizedRoomIds.length > 0) {
    whereCondition.roomId = { [Op.in]: normalizedRoomIds };
  }

  const normalizedMemberIds = toStringArray(memberIds);
  if (normalizedMemberIds.length > 0) {
    whereCondition.memberId = { [Op.in]: normalizedMemberIds };
  }

  const normalizedServiceIds = toStringArray(serviceIds);
  if (normalizedServiceIds.length > 0) {
    whereCondition.serviceId = { [Op.in]: normalizedServiceIds };
  }

  const normalizedStatuses = toStatusArray(statuses);
  if (normalizedStatuses.length > 0) {
    whereCondition.status = { [Op.in]: normalizedStatuses };
  }

  if (q && q.length > 0) {
    whereCondition[Op.or] = [
      { roomId: { [Op.like]: `%${q}%` } },
      { memberId: { [Op.like]: `%${q}%` } },
      { serviceId: { [Op.like]: `%${q}%` } },
    ];
  }

  const { count, rows } = await ContractsModel.findAndCountAll({
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

const create = async (body: ContractCreateBody) => {
  const result = await ContractsModel.create({ ...body });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await ContractsModel.findOne({
    where: { id, deletedAt: null },
  });
  return { item: result };
};

const update = async (id: string, data: ContractUpdateBody) => {
  const contract = await ContractsModel.findByPk(id);
  if (!contract) throw new Error('Contract not found');

  const result = await contract.update(data);
  return { item: result };
};

const remove = async (id: string) => {
  const contract = await ContractsModel.findByPk(id);
  if (!contract) throw new Error('Contract not found');

  await contract.destroy();
  return { message: 'Contract deleted successfully' };
};

export const ContractServices = {
  list,
  create,
  getById,
  update,
  remove,
};
