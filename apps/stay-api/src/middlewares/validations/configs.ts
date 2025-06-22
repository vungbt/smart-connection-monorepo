import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      config: 'required|numeric|min:0',
      waterFee: 'required|numeric|min:0',
      electricFee: 'required|numeric|min:0',
      commonServiceFee: 'required|numeric|min:0',
      internetFee: 'required|numeric|min:0',
      type: 'required|string',
      isSpecialRoom: 'required|boolean',
    },
    attributes: {
      config: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
      isSpecialRoom: 'Special Room Flag',
    },
    message: 'Validation failed for config creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      config: 'numeric|min:0',
      waterFee: 'numeric|min:0',
      electricFee: 'numeric|min:0',
      commonServiceFee: 'numeric|min:0',
      internetFee: 'numeric|min:0',
      type: 'string',
      isSpecialRoom: 'boolean',
    },
    attributes: {
      config: 'Room Fee',
      waterFee: 'Water Fee',
      electricFee: 'Electric Fee',
      commonServiceFee: 'Common Service Fee',
      internetFee: 'Internet Fee',
      type: 'Room Type',
      isSpecialRoom: 'Special Room Flag',
    },
    message: 'Validation failed for config update',
  });

export const ConfigValidations = {
  create,
  update,
};
