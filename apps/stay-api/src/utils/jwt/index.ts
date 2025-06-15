import { Payload } from '@/type';
import jwt from 'jsonwebtoken';
import { addSeconds } from 'date-fns';
import { IJwtRes } from '@/types';
import env from '@/configs/env';
export default jwt;

export const createToken = (payload: Payload, expiresIn: number) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: `${expiresIn}s`,
  });
};

export const createAccessToken = (payload: Payload) => {
  return {
    accessToken: createToken(payload, env.jwt.expires),
    expires: addSeconds(new Date(), env.jwt.expires),
  };
};

export const createRefreshToken = (payload: Payload) => {
  return {
    refreshToken: createToken(payload, env.jwt.refreshExpires),
    expires: addSeconds(new Date(), env.jwt.refreshExpires),
  };
};

export const signJwt = (payload: Payload): IJwtRes => {
  const { accessToken, expires } = createAccessToken(payload);
  const { refreshToken } = createRefreshToken(payload);
  return {
    accessToken,
    refreshToken,
    expires: expires.toISOString(),
  };
};
