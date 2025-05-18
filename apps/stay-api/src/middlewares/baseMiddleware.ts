import { DataResponse } from '@/type';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { startsWith } from 'lodash';

const baseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // res.t = req.t;

  res.jsonApi = (status = HttpStatus.OK, data?: DataResponse) => {
    if (typeof data === 'string') {
      return res.jsonApi(status, data);
    }
    if (data?.message) {
      if (startsWith(data?.message, 'message:') || startsWith(data?.message, 'error:')) {
        data.message = req.t(data?.message);
      }
    }
    req.resTemp = data;
    return res.status(status).json(data);
  };

  return next();
};

export default baseMiddleware;
