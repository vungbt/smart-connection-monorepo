import Validator from 'validatorjs';
import existsRule from './rules/existsRule';
import uniqueRule from './rules/uniqueRule';
import dateTimeISORule from './rules/dateTimeISORule';

Validator.registerAsync('exists', existsRule, 'exists');
Validator.registerAsync('unique', uniqueRule, 'unique');
Validator.registerAsync('dateTimeISO', dateTimeISORule, 'dateTimeISO');

export type ValidationConfig = {
  data: Record<string, unknown>;
  rules: {
    [key: string]: string;
  };
  attributes?: {
    [key: string]: string;
  };
  messages?: {
    [key: string]: string;
  };
  message?: string;
};

export default Validator;
