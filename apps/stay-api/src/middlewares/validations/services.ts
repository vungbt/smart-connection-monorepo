import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';
import { EServiceType } from '@/types';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomFee: 'required|numeric|min:0.01',
      waterFee: 'required|numeric|min:0.01',
      electricFee: 'required|numeric|min:0.01',
      electricBikeFee: 'required|numeric|min:0.01',
      commonServiceFee: 'required|numeric|min:0.01',
      internetFee: 'required|numeric|min:0.01',
      type: `required|in:${Object.values(EServiceType).join(',')}`,
    },
    attributes: {
      roomFee: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      electricBikeFee: 'Electric Bike Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
    },
    message: 'Validation failed for service creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomFee: 'numeric|min:0.01',
      waterFee: 'numeric|min:0.01',
      electricFee: 'numeric|min:0.01',
      electricBikeFee: 'numeric|min:0.01',
      commonServiceFee: 'numeric|min:0.01',
      internetFee: 'numeric|min:0.01',
      type: 'string',
    },
    attributes: {
      roomFee: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      electricBikeFee: 'Electric Bike Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
    },
    message: 'Validation failed for service update',
  });

const list = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      types: 'array',
      'types.*': `in:${Object.values(EServiceType).join(',')}`,
      q: 'string',
    },
    attributes: {
      types: 'Room Types',
      q: 'Search Query',
    },
    message: 'Validation failed for service list',
  });

export const ServiceValidations = {
  create,
  update,
  list,
};
