import { Request, Response, NextFunction } from 'express';
import validator from '@/utils/validator';

const login = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      email: 'required|email',
      password: 'required|string|min:6',
    },
  });

const register = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      email: 'required|email|unique:User,email',
      username: 'required|string|min:3|unique:User,username',
      password: 'required|string|min:6',
    },
  });

const refreshToken = (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      refreshToken: 'required|string',
    },
  });

export const AuthValidations = {
  login,
  register,
  refreshToken,
};
