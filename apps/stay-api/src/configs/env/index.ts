const language = process.env.LOCALE_DEFAULT ?? 'en';

const jwt = {
  secret: process.env.JWT_SECRET_KEY ?? 'BaseAPI',
  expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10,
  refreshExpires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30,
};
export default {
  language,
  jwt,
  server: {
    env: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'http://localhost',
    port: process.env.PORT ?? 4000,
  },
};
