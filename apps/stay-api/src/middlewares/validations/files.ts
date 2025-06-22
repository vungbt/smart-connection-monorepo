import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const getUrl = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      name: 'required|string',
    },
    attributes: {
      name: 'Name',
    },
    message: 'Validation failed for config get sign url',
  });

const getUrls = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.query,
    rules: {
      names: 'array|min:1|required',
      'names.*': 'required|string|min:1',
    },
    attributes: {
      names: 'Names',
    },
    message: 'Validation failed for config get sign urls',
  });

export const FileValidations = {
  getUrl,
  getUrls,
};
