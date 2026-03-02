import { BillServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  BillCreateBody,
  BillListParams,
  BillUpdateBody,
  IdParams,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllBills = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, BillListParams>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const pagination = req.pagination;
    const params = req.query;
    const results = await BillServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createBill = async (
  req: ApiRequest<Record<string, never>, BillCreateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { body } = req;
    const result = await BillServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getBillById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await BillServices.getById(id);
    if (!result.item) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateBill = async (
  req: ApiRequest<IdParams, BillUpdateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await BillServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteBill = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await BillServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const BillControllers = {
  getAllBills,
  createBill,
  getBillById,
  updateBill,
  deleteBill,
};
