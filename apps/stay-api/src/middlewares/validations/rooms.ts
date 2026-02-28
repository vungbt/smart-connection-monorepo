import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'required|string',
      serviceId: 'required|string',
    },
    attributes: {
      name: 'Room name',
      serviceId: 'Service ID',
    },
    message: 'Validation failed for room creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'string',
      serviceId: 'string',
    },
    attributes: {
      name: 'Room Type',
      serviceId: 'Service ID',
    },
    message: 'Validation failed for room update',
  });

export const RoomValidations = {
  create,
  update,
};
