import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth';
import HttpStatus from 'http-status-codes';
import { ILoginRequest, IRegisterRequest, IRefreshTokenRequest } from '@/types/auth';

export class AuthController {
  static async login(req: Request<any, any, ILoginRequest>, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return res.jsonApi(HttpStatus.OK, { data: result });
    } catch (error) {
      next(error);
    }
  }

  static async register(
    req: Request<any, any, IRegisterRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.register(req.body);
      return res.jsonApi(HttpStatus.CREATED, { data: result });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(
    req: Request<any, any, IRefreshTokenRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.refreshToken(req.body.refreshToken);
      return res.jsonApi(HttpStatus.OK, { data: result });
    } catch (error) {
      next(error);
    }
  }
}
