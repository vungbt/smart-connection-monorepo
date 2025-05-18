import Validator from 'validatorjs';
import existsRule from './rules/existsRule';
import uniqueRule from './rules/uniqueRule';
import dateTimeISORule from './rules/dateTimeISORule';
import { NextFunction, Request, Response } from 'express';

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

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
  config: ValidationConfig
) => {
  const { data, rules, attributes, messages, message } = config;
  const validation = new Validator(data, rules, messages);

  if (attributes) {
    validation.setAttributeNames(attributes);
  }

  validation.checkAsync(
    () => next(),
    () => {
      return res.status(422).json({
        message: message || 'Validation failed',
        errors: validation.errors.all(),
      });
    }
  );
};
