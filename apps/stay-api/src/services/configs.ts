import ConfigsModel from '@/models/configs';
import {
  ConfigCreateBody,
  ConfigListParams,
  ConfigUpdateBody,
  IConfigAttributes,
  IPaginationReq,
} from '@/types';
import { resPagination } from '@/utils/helpers';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';

const list = async (params: ConfigListParams, pagination: IPaginationReq) => {
  const { types } = params;
  const whereCondition: WhereOptions<IConfigAttributes> = {};

  if (types && types.length > 0) {
    whereCondition.type = { [Op.in]: types };
  }

  const { count, rows } = await ConfigsModel.findAndCountAll({
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

const create = async (body: ConfigCreateBody) => {
  const result = await ConfigsModel.create({ ...body });
  return { item: result };
};

const getById = async (id: string) => {
  const result = await ConfigsModel.findOne({
    where: { id, deletedAt: null },
  });
  return { item: result };
};

const update = async (id: string, data: ConfigUpdateBody) => {
  const config = await ConfigsModel.findByPk(id);
  if (!config) throw new Error('Config not found');

  const result = await config.update(data);
  return { item: result };
};

const remove = async (id: string) => {
  const config = await ConfigsModel.findByPk(id);
  if (!config) throw new Error('Config not found');

  await config.destroy();
  return { message: 'Config deleted successfully' };
};

export const ConfigServices = {
  list,
  create,
  getById,
  update,
  remove,
};
