import BaseError, { Extensions } from '.';
import HttpStatus from 'http-status-codes';

export default class InputValidError extends BaseError {
  override code = 'validation_error';
  override status = HttpStatus.UNPROCESSABLE_ENTITY;

  constructor(message?: string, extensions?: Extensions) {
    super(message, extensions);
  }
}
