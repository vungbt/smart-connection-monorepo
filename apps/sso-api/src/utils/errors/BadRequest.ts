import BaseError, { Extensions } from '.';
import HttpStatus from 'http-status-codes';

export default class BadRequest extends BaseError {
  override code = 'bad_request';
  override status = HttpStatus.BAD_REQUEST;

  constructor(message?: string, extensions?: Extensions) {
    super(message, extensions);
  }
}
