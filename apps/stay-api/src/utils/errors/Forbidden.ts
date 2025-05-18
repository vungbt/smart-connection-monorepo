import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class Forbidden extends BaseError {
  override code = 'forbidden';
  override status = HttpStatus.FORBIDDEN;
}
