import HttpStatus from 'http-status-codes';
import BaseError from '.';

export default class InputValidError extends BaseError {
  override status = HttpStatus.BAD_REQUEST;
  override code = 'input_valid_error';
}
