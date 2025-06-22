import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class BadRequest extends BaseError {
  override code = 'bad_request';
  override status = HttpStatus.BAD_REQUEST;
}
