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

export const MemberValidations = {
  create,
  update,
};
