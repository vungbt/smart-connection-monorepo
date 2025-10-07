import MembersModel from '@/models/members';
import { MemberCreateBody, MemberUpdateBody } from '@/types';

const list = async () => {
  return await MembersModel.findAll({
    where: {
      deletedAt: null,
    },
  });
};

const create = async (body: MemberCreateBody): Promise<MembersModel> => {
  return await MembersModel.create({ ...body });
};

const getById = async (id: string) => {
  return await MembersModel.findOne({
    where: { id, deletedAt: null },
  });
};

const update = async (id: string, data: MemberUpdateBody): Promise<MembersModel> => {
  const member = await MembersModel.findByPk(id);
  if (!member) throw new Error('Member not found');

  return await member.update(data);
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
