import { MemberServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  IdParams,
  MemberCreateBody,
  MemberListParams,
  MemberUpdateBody,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllMembers = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, MemberListParams>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const pagination = req.pagination;
    const params = req.query;
    const results = await MemberServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createMember = async (
  req: ApiRequest<Record<string, never>, MemberCreateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { body } = req;
    const result = await MemberServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getMemberById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await MemberServices.getById(id);
    if (!result.item) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateMember = async (
  req: ApiRequest<IdParams, MemberUpdateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await MemberServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteMember = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await MemberServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const MemberControllers = {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
};
