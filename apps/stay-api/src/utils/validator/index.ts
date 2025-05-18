import { NextFunction, Request, Response } from 'express';
import InputValidError from '@/utils/errors/InputValidError';
import ServerError from '@/utils/errors/ServerError';
import env from '@/configs/env';
import Validator, { ValidationConfig } from '@/configs/validator';

const validator = (req: Request, res: Response, next: NextFunction, config: ValidationConfig) => {
  try {
    Validator.useLang(req.i18n.language ?? env.language);
    const validator = new Validator(config.data, config.rules, {
      ...(req.t(`validator:message`, {
        returnObjects: true,
      } as any) as any),
      ...(config.messages ?? {}),
    });

    validator.setAttributeFormatter((attribute: string) => {
      const newAttribute = attribute
        .split('.')
        .filter(x => isNaN(parseInt(x)))
        .join('.');

      return config?.attributes?.[newAttribute] || req.t(`validator:attribute.${newAttribute}`);
    });

    const passes = () => next();

    const fails = () => {
      next(new InputValidError(undefined, validator.errors.errors));
    };

    return validator.checkAsync(passes, fails);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ServerError(error.message));
  }
};

export default validator;
