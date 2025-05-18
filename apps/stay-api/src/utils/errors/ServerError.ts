import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class ServerError extends BaseError {
  override code = 'server_error';
  override status = HttpStatus.INTERNAL_SERVER_ERROR;
}
