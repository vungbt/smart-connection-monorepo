import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      room_fee: 'required|numeric|min:0',
      water_fee: 'required|numeric|min:0',
      electric_fee: 'required|numeric|min:0',
      common_service_fee: 'required|numeric|min:0',
      internet_fee: 'required|numeric|min:0',
      type: 'required|string',
      is_special_room: 'required|boolean',
    },
    attributes: {
      room_fee: 'Room Fee',
      water_fee: 'Water Fee',
      electric_fee: 'Electric Fee',
      common_service_fee: 'Common Service Fee',
      internet_fee: 'Internet Fee',
      type: 'Room Type',
      is_special_room: 'Special Room Flag',
    },
    message: 'Validation failed for config creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      room_fee: 'numeric|min:0',
      water_fee: 'numeric|min:0',
      electric_fee: 'numeric|min:0',
      common_service_fee: 'numeric|min:0',
      internet_fee: 'numeric|min:0',
      type: 'string',
      is_special_room: 'boolean',
    },
    attributes: {
      room_fee: 'Room Fee',
      water_fee: 'Water Fee',
      electric_fee: 'Electric Fee',
      common_service_fee: 'Common Service Fee',
      internet_fee: 'Internet Fee',
      type: 'Room Type',
      is_special_room: 'Special Room Flag',
    },
    message: 'Validation failed for config update',
  });

export const ConfigValidations = {
  create,
  update,
};
