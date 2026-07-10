import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'required|string',
      serviceId: 'required|string',
      isUseElectricBike: 'required|boolean',
      memberCount: 'integer|min:0',
    },
    attributes: {
      name: 'Room name',
      serviceId: 'Service ID',
      isUseElectricBike: 'Use Electric Bike',
      memberCount: 'Member Count',
    },
    message: 'Validation failed for room creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      name: 'string',
      serviceId: 'string',
      isUseElectricBike: 'boolean',
      memberCount: 'integer|min:0',
    },
    attributes: {
      name: 'Room Type',
      serviceId: 'Service ID',
      isUseElectricBike: 'Use Electric Bike',
      memberCount: 'Member Count',
    },
    message: 'Validation failed for room update',
  });

const list = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      serviceIds: 'array',
      'serviceIds.*': 'string',
      q: 'string',
      includeMembers: 'string|in:true,false,1,0',
    },
    attributes: {
      serviceIds: 'Service IDs',
      q: 'Search Query',
      includeMembers: 'Include members',
    },
    message: 'Validation failed for room list',
  });

export const RoomValidations = {
  create,
  update,
  list,
};
