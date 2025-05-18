import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { CustomError } from 'ts-custom-error';
import { isString } from 'lodash';

export type Extensions = Record<string, unknown>;

export default class BaseError extends CustomError {
  public status = HttpStatus.BAD_REQUEST;
  public code = 'error';
  public extensions: Extensions;

  public constructor(message?: string, extensions: Extensions = {}) {
    super(message);
    this.extensions = extensions;
  }
}

export const handleErrorApi = (
  err: BaseError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  return res.jsonApi(err.status || HttpStatus.INTERNAL_SERVER_ERROR, {
    message: isString(err) ? err : res.t(`error:${err.message || err.code}`),
    error: err.code,
    extensions: err.extensions,
  });
};
