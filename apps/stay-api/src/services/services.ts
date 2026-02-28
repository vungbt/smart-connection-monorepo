import ServicesModel from '@/models/services';
import {
  IServiceAttributes,
  IPaginationReq,
  ServiceCreateBody,
  ServiceListParams,
  ServiceUpdateBody,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Op, WhereOptions } from 'sequelize';

const list = async (params: ServiceListParams, pagination: IPaginationReq) => {
  const { types } = params;
  const whereCondition: WhereOptions<IServiceAttributes> = {};

  if (types && types.length > 0) {
    whereCondition.type = { [Op.in]: types };
  }

  const { count, rows } = await ServicesModel.findAndCountAll({
    where: whereCondition,
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

const create = async (body: ServiceCreateBody) => {
  const result = await ServicesModel.create({ ...body });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await ServicesModel.findOne({
    where: { id, deletedAt: null },
  });
  return { item: result };
};

const update = async (id: string, data: ServiceUpdateBody) => {
  const service = await ServicesModel.findByPk(id);
  if (!service) throw new Error('Service not found');

  const result = await service.update(data);
  return { item: result };
};

const remove = async (id: string) => {
  const service = await ServicesModel.findByPk(id);
  if (!service) throw new Error('Service not found');

  await service.destroy();
  return { message: 'Service deleted successfully' };
};

export const ServiceServices = {
  list,
  create,
  getById,
  update,
  remove,
};
