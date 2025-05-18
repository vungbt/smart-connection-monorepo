import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class EntryNotFound extends BaseError {
  override code = 'entry_not_found';
  override status = HttpStatus.NOT_FOUND;
}
