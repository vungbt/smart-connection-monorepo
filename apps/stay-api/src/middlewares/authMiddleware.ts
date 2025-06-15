import { Payload } from '@/type';
import { EUserRole } from '@/types';
import env from '@/configs/env';
import Forbidden from '@/utils/errors/Forbidden';
import Unauthorized from '@/utils/errors/Unauthorized';
import jwt from '@/utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';

export const authenticateToken = (roles?: EUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = (req.headers.authorization?.toString() ?? '').trim();
      const token = accessToken.startsWith('Bearer')
        ? accessToken.replace('Bearer', '').trim()
        : accessToken;
      const payload = jwt.verify(token, env.jwt.secret);
      if (!token) return next(new Unauthorized());
      const newPayload = pick(payload, ['id', 'type']) as Payload;
      if (roles && !roles.includes(newPayload.type)) return next(new Forbidden());
      req.auth = newPayload;
      next();
    } catch (error) {
      return next(new Unauthorized());
    }
  };
};
