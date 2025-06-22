import { Dialect } from 'sequelize';

const language = process.env.LOCALE_DEFAULT ?? 'en';

const jwt = {
  secret: process.env.JWT_SECRET_KEY ?? 'SSOServiceSecret',
  expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10, // 10 minutes
  refreshExpires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30, // 30 days
};

const DB_NAME = process.env.SSO_POSTGRES_DB || 'smartconnection_sso';
const DB_USER = process.env.SSO_POSTGRES_USER || 'postgres';
const DB_PASSWORD = process.env.SSO_POSTGRES_PASSWORD || 'postgres';
const DB_HOST = process.env.SSO_POSTGRES_HOST || 'localhost';
const DB_PORT = parseInt(process.env.SSO_POSTGRES_PORT || '5432', 10);
const DB_DIALECT = (process.env.SSO_DB_DIALECT ?? 'postgres') as Dialect;

export default {
  language,
  jwt,
  server: {
    env: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'http://localhost',
    port: process.env.SSO_PORT ?? 5000,
    allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
  },
};
