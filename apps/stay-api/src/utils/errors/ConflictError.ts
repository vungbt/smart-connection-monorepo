import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class ConflictError extends BaseError {
  override code = 'conflict_error';
  override status = HttpStatus.CONFLICT;
}
