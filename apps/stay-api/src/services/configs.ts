import ConfigsModel from '@/models/configs';
import { ConfigCreateBody, ConfigUpdateBody } from '@/types';

const list = async () => {
  return await ConfigsModel.findAll({
    where: {
      deletedAt: null,
    },
  });
};

const create = async (body: ConfigCreateBody): Promise<ConfigsModel> => {
  return await ConfigsModel.create({ ...body });
};

const getById = async (id: string) => {
  return await ConfigsModel.findOne({
    where: { id, deletedAt: null },
  });
};

const update = async (id: string, data: ConfigUpdateBody): Promise<ConfigsModel> => {
  const config = await ConfigsModel.findByPk(id);
  if (!config) throw new Error('Config not found');

  return await config.update(data);
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
