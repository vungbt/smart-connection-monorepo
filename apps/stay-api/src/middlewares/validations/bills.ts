import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomId: 'required|string',
      billingMonth: 'required|integer|min:1|max:12',
      billingYear: 'required|integer|min:2000|max:2100',
      electricNumberOld: 'required|numeric',
      electricNumberNew: 'required|numeric',
      waterNumberOld: 'required|numeric',
      waterNumberNew: 'required|numeric',
      otherServiceFee: 'numeric',
      note: 'string',
    },
    attributes: {
      roomId: 'Room ID',
      billingMonth: 'Billing Month',
      billingYear: 'Billing Year',
      electricNumberOld: 'Old Electric Number',
      electricNumberNew: 'New Electric Number',
      waterNumberOld: 'Old Water Number',
      waterNumberNew: 'New Water Number',
      otherServiceFee: 'Other Service Fee',
      note: 'Note',
    },
    message: 'Validation failed for bill creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomId: 'string',
      billingMonth: 'integer|min:1|max:12',
      billingYear: 'integer|min:2000|max:2100',
      electricNumberOld: 'numeric',
      electricNumberNew: 'numeric',
      waterNumberOld: 'numeric',
      waterNumberNew: 'numeric',
      otherServiceFee: 'numeric',
      note: 'string',
    },
    attributes: {
      roomId: 'Room ID',
      billingMonth: 'Billing Month',
      billingYear: 'Billing Year',
      electricNumberOld: 'Old Electric Number',
      electricNumberNew: 'New Electric Number',
      waterNumberOld: 'Old Water Number',
      waterNumberNew: 'New Water Number',
      otherServiceFee: 'Other Service Fee',
      note: 'Note',
    },
    message: 'Validation failed for bill update',
  });

const list = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      roomIds: 'array',
      'roomIds.*': 'string',
      billingMonth: 'integer|min:1|max:12',
      billingYear: 'integer|min:2000|max:2100',
      q: 'string',
      sortBy: 'in:createdAt,billingYear,billingMonth,electricNumberNew,waterNumberNew,roomName',
      sortOrder: 'in:ASC,DESC,asc,desc',
    },
    attributes: {
      roomIds: 'Room IDs',
      billingMonth: 'Billing Month',
      billingYear: 'Billing Year',
      q: 'Search Query',
      sortBy: 'Sort By',
      sortOrder: 'Sort Order',
    },
    message: 'Validation failed for bill list',
  });

export const BillValidations = {
  create,
  update,
  list,
};
