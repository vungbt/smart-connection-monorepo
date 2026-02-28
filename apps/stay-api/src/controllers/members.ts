import { MemberServices } from '@/services';
import { ApiRequest, ApiResponse, IdParams, MemberCreateBody, MemberUpdateBody } from '@/types';

const getAllMembers = async (req: ApiRequest, res: ApiResponse) => {
  try {
    const members = await MemberServices.list();
    return res.jsonApi(200, { data: members });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const createMember = async (
  req: ApiRequest<Record<string, never>, MemberCreateBody>,
  res: ApiResponse
) => {
  try {
    const { body } = req;
    const member = await MemberServices.create(body);
    return res.jsonApi(200, { data: member });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getMemberById = async (req: ApiRequest<IdParams>, res: ApiResponse) => {
  try {
    const { id } = req.params;
    const member = await MemberServices.getById(id);
    if (!member) return res.sendStatus(404);
    return res.jsonApi(200, { data: member });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateMember = async (req: ApiRequest<IdParams, MemberUpdateBody>, res: ApiResponse) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedMember = await MemberServices.update(id, body);
    return res.jsonApi(200, { data: updatedMember });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteMember = async (req: ApiRequest<IdParams>, res: ApiResponse) => {
  try {
    const { id } = req.params;
    const result = await MemberServices.remove(id);
    return res.jsonApi(200, result);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const MemberControllers = {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
};
