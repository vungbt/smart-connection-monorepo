import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class ArgumentError extends BaseError {
  override code = 'argument_error';
  override status = HttpStatus.BAD_REQUEST;
}
