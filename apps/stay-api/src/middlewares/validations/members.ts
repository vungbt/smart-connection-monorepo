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
      identityCardNumber: 'required|string',
      roomId: 'required|string',
    },
    attributes: {
      name: 'Member name',
      phone: 'Phone number',
      address: 'Address',
      isActive: 'Active status',
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
      'items.*.phone': 'string',
      'items.*.address': 'string',
      'items.*.identityCardNumber': 'string',
      'items.*.roomId': 'string',
    },
    attributes: {
      items: 'Import items',
      'items.*.name': 'Member name',
      'items.*.isActive': 'Active status',
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
    },
    attributes: {
      name: 'Member Type',
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
    },
    attributes: {
      roomIds: 'Room IDs',
      isActives: 'Active States',
      q: 'Search Query',
    },
    message: 'Validation failed for member list',
  });

export const MemberValidations = {
  create,
  importMany,
  update,
  list,
};
