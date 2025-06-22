import { IAuthResponse, ILoginRequest, IRegisterRequest, ITokenPayload } from '@/types/auth';
import User, { IUserInstance } from '@/models/user';
import jwt from 'jsonwebtoken';
import env from '@/configs/env';
import BadRequest from '@/utils/errors/BadRequest';
import Unauthorized from '@/utils/errors/Unauthorized';

export class AuthService {
  static async login(data: ILoginRequest): Promise<IAuthResponse> {
    const user = (await User.findOne({ where: { email: data.email } })) as IUserInstance;
    if (!user) {
      throw new BadRequest('Invalid email or password');
    }

    const isValidPassword = await user.validatePassword(data.password);
    if (!isValidPassword) {
      throw new BadRequest('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Unauthorized('Account is inactive');
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    const payload: ITokenPayload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expires,
    });

    const refreshToken = jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.refreshExpires,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  static async register(data: IRegisterRequest): Promise<IAuthResponse> {
    const existingUser = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequest('Email already exists');
    }

    const user = (await User.create(data)) as IUserInstance;

    const payload: ITokenPayload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expires,
    });

    const refreshToken = jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.refreshExpires,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  static async refreshToken(token: string): Promise<IAuthResponse> {
    try {
      const decoded = jwt.verify(token, env.jwt.secret) as ITokenPayload;
      const user = (await User.findByPk(decoded.id)) as IUserInstance;

      if (!user || !user.isActive) {
        throw new Unauthorized('Invalid refresh token');
      }

      const payload: ITokenPayload = {
        id: user.id,
        role: user.role,
      };

      const accessToken = jwt.sign(payload, env.jwt.secret, {
        expiresIn: env.jwt.expires,
      });

      const refreshToken = jwt.sign(payload, env.jwt.secret, {
        expiresIn: env.jwt.refreshExpires,
      });

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      throw new Unauthorized('Invalid refresh token');
    }
  }
}
