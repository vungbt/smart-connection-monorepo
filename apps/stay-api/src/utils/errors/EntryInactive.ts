import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class EntryInactive extends BaseError {
  override code = 'entry_inactive';
  override status = HttpStatus.UNAUTHORIZED;
}
