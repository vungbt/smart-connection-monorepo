import BaseError, { Extensions } from '.';
import HttpStatus from 'http-status-codes';

export default class Unauthorized extends BaseError {
  override code = 'unauthorized';
  override status = HttpStatus.UNAUTHORIZED;

  constructor(message?: string, extensions?: Extensions) {
    super(message, extensions);
  }
}
