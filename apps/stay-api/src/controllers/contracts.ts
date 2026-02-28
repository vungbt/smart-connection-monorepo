import { ContractServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  ContractCreateBody,
  ContractUpdateBody,
  IdParams,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllContracts = async (req: ApiRequest, res: ApiResponse, next: ApiNext) => {
  try {
    const contracts = await ContractServices.list();
    return res.jsonApi(HttpStatus.OK, { data: contracts });
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
    return res.jsonApi(HttpStatus.OK, { data: result });
  } catch (error) {
    return next(error);
  }
};

const getContractById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const contract = await ContractServices.getById(id);
    if (!contract) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, { data: contract });
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
    const contract = await ContractServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, { data: contract });
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
