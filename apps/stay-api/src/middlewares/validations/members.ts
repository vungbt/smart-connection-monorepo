import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'required|string',
      phone: 'required|string',
      address: 'required|string',
      isActive: 'required|boolean',
      isRoomLeader: 'boolean',
      identityCardNumber: 'required|string',
      roomId: 'required|string',
    },
    attributes: {
      name: 'Member name',
      phone: 'Phone number',
      address: 'Address',
      isActive: 'Active status',
      isRoomLeader: 'Room Leader Status',
      identityCardNumber: 'Identity Card Number',
      roomId: 'Room ID',
    },
    message: 'Validation failed for member creation',
  });

const importMany = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      items: 'required|array',
      'items.*.name': 'required|string',
      'items.*.isActive': 'required|boolean',
      'items.*.isRoomLeader': 'boolean',
      'items.*.phone': 'string',
      'items.*.address': 'string',
      'items.*.identityCardNumber': 'string',
      'items.*.roomId': 'string',
    },
    attributes: {
      items: 'Import items',
      'items.*.name': 'Member name',
      'items.*.isActive': 'Active status',
      'items.*.isRoomLeader': 'Room Leader Status',
      'items.*.phone': 'Phone number',
      'items.*.address': 'Address',
      'items.*.identityCardNumber': 'Identity Card Number',
      'items.*.roomId': 'Room ID',
    },
    message: 'Validation failed for member import',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'string',
      phone: 'string',
      address: 'string',
      isActive: 'boolean',
      isRoomLeader: 'boolean',
      identityCardNumber: 'string',
      roomId: 'string',
    },
    attributes: {
      name: 'Member name',
      phone: 'Phone number',
      address: 'Address',
      isActive: 'Active status',
      isRoomLeader: 'Room Leader Status',
      identityCardNumber: 'Identity Card Number',
      roomId: 'Room ID',
    },
    message: 'Validation failed for member update',
  });

const list = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      roomIds: 'array',
      'roomIds.*': 'string',
      isActives: 'array',
      'isActives.*': 'boolean',
      q: 'string',
      sortBy: 'string|in:createdAt,name,phone,address,isActive,isRoomLeader,roomName',
      sortOrder: 'string|in:ASC,DESC,asc,desc',
      includeRoomService: 'string|in:true,false,1,0',
    },
    attributes: {
      roomIds: 'Room IDs',
      isActives: 'Active States',
      q: 'Search Query',
      sortBy: 'Sort field',
      sortOrder: 'Sort order',
      includeRoomService: 'Include room service',
    },
    message: 'Validation failed for member list',
  });

export const MemberValidations = {
  create,
  importMany,
  update,
  list,
};
