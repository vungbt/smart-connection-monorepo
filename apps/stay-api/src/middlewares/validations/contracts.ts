import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';
import { EContractStatus } from '@/types';

const create = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomId: 'required|string',
      memberId: 'required|string',
      serviceId: 'required|string',
      startDate: 'required|date',
      endDate: 'date',
      status: `in:${Object.values(EContractStatus).join(',')}`,
    },
    attributes: {
      roomId: 'Room ID',
      memberId: 'Member ID',
      serviceId: 'Service ID',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Contract Status',
    },
    message: 'Validation failed for contract creation',
  });

const update = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      roomId: 'string',
      memberId: 'string',
      serviceId: 'string',
      startDate: 'date',
      endDate: 'date',
      status: `in:${Object.values(EContractStatus).join(',')}`,
    },
    attributes: {
      roomId: 'Room ID',
      memberId: 'Member ID',
      serviceId: 'Service ID',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Contract Status',
    },
    message: 'Validation failed for contract update',
  });

export const ContractValidations = {
  create,
  update,
};
