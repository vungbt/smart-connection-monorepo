import { RoomServices } from '@/services';
import {
  ApiNext,
  ApiRequest,
  ApiResponse,
  IdParams,
  RoomCreateBody,
  RoomListParams,
  RoomUpdateBody,
} from '@/types';
import HttpStatus from 'http-status-codes';

const getAllRooms = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, RoomListParams>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const pagination = req.pagination;
    const params = req.query;
    const results = await RoomServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createRoom = async (
  req: ApiRequest<Record<string, never>, RoomCreateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { body } = req;
    const result = await RoomServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getRoomById = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.getById(id);
    if (!result.item) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateRoom = async (
  req: ApiRequest<IdParams, RoomUpdateBody>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await RoomServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteRoom = async (req: ApiRequest<IdParams>, res: ApiResponse, next: ApiNext) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const RoomControllers = {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
};
