import ContractsModel from '@/models/contracts';
import { ContractCreateBody, ContractUpdateBody } from '@/types';

const list = async () => {
  return await ContractsModel.findAll({
    where: {
      deletedAt: null,
    },
  });
};

const create = async (body: ContractCreateBody): Promise<ContractsModel> => {
  return await ContractsModel.create({ ...body });
};

const getById = async (id: string) => {
  return await ContractsModel.findOne({
    where: { id, deletedAt: null },
  });
};

const update = async (id: string, data: ContractUpdateBody): Promise<ContractsModel> => {
  const contract = await ContractsModel.findByPk(id);
  if (!contract) throw new Error('Contract not found');

  return await contract.update(data);
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
