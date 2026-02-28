import { ServiceServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  IdParams,
  ServiceCreateBody,
  ServiceListParams,
  ServiceUpdateBody,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllServices = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, ServiceListParams>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const pagination = req.pagination;
    const params = req.query;
    const results = await ServiceServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createService = async (
  req: ApiRequest<Record<string, never>, ServiceCreateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { body } = req;
    const result = await ServiceServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getServiceById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await ServiceServices.getById(id);
    if (!result.item) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateService = async (
  req: ApiRequest<IdParams, ServiceUpdateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await ServiceServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteService = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await ServiceServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const ServiceControllers = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
};
