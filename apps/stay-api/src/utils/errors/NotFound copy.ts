import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class NotFound extends BaseError {
  override code = 'not_found';
  override status = HttpStatus.NOT_FOUND;
}
