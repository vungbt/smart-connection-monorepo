import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { CustomError } from 'ts-custom-error';

export type Extensions = Record<string, unknown>;

export default class BaseError extends CustomError {
  code = 'error';
  status = HttpStatus.INTERNAL_SERVER_ERROR;
  extensions?: Extensions;

  constructor(message?: string, extensions?: Extensions) {
    super(message);
    this.extensions = extensions;
  }
}

export const handleErrorApi = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.jsonApi(error.status, {
      error: error.code,
      message: error.message,
      ...(error.extensions || {}),
    });
  }

  return res.jsonApi(HttpStatus.INTERNAL_SERVER_ERROR, {
    error: 'server_error',
    message: error.message,
  });
};
