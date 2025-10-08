import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';
import { EConfigType } from '@/types';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomFee: 'required|numeric|min:0',
      waterFee: 'required|numeric|min:0',
      electricFee: 'required|numeric|min:0',
      commonServiceFee: 'required|numeric|min:0',
      internetFee: 'required|numeric|min:0',
      type: `required|in:${Object.values(EConfigType).join(',')}`,
    },
    attributes: {
      roomFee: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
    },
    message: 'Validation failed for config creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomFee: 'numeric|min:0',
      waterFee: 'numeric|min:0',
      electricFee: 'numeric|min:0',
      commonServiceFee: 'numeric|min:0',
      internetFee: 'numeric|min:0',
      type: 'string',
    },
    attributes: {
      roomFee: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
    },
    message: 'Validation failed for config update',
  });

const list = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      types: 'array',
      'types.*': `in:${Object.values(EConfigType).join(',')}`,
      q: 'string',
    },
    attributes: {
      types: 'Room Types',
      q: 'Search Query',
    },
    message: 'Validation failed for config list',
  });

export const ConfigValidations = {
  create,
  update,
  list,
};
