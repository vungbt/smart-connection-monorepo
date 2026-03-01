import { ContractServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  ContractCreateBody,
  ContractListParams,
  ContractUpdateBody,
  IdParams,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllContracts = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, ContractListParams>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const pagination = req.pagination;
    const params = req.query;
    const results = await ContractServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createContract = async (
  req: ApiRequest<Record<string, never>, ContractCreateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { body } = req;
    const result = await ContractServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getContractById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await ContractServices.getById(id);
    if (!result.item) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateContract = async (
  req: ApiRequest<IdParams, ContractUpdateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await ContractServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteContract = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await ContractServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const ContractControllers = {
  getAllContracts,
  createContract,
  getContractById,
  updateContract,
  deleteContract,
};
