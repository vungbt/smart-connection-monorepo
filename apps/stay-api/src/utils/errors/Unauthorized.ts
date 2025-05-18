import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class Unauthorized extends BaseError {
  override code = 'unauthorized';
  override status = HttpStatus.UNAUTHORIZED;
}
