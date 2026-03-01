import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'required|string',
      phone: 'required|string',
      email: 'required|string',
      address: 'required|string',
      isActive: 'required|boolean',
      cccd: 'required|string',
      roomId: 'required|string',
    },
    attributes: {
      name: 'Member name',
    },
    message: 'Validation failed for member creation',
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
  update,
  list,
};
