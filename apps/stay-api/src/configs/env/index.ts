import { Dialect } from 'sequelize';

const language = process.env.LOCALE_DEFAULT ?? 'en';

const jwt = {
  secret: process.env.JWT_SECRET_KEY ?? 'BaseAPI',
  expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10,
  refreshExpires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30,
};

const DB_NAME = process.env.POSTGRES_DB || 'smartconnection';
const DB_USER = process.env.POSTGRES_USER || 'postgres';
const DB_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const DB_HOST = process.env.POSTGRES_HOST || 'localhost';
const DB_PORT = parseInt(process.env.POSTGRES_PORT || '5432', 10);
const DB_DIALECT = (process.env.DB_DIALECT ?? 'postgres') as Dialect;

export default {
  language,
  jwt,
  server: {
    env: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'http://localhost',
    port: process.env.PORT ?? 4000,
  },
  folder: {
    temp: process.env.FILE_FOLDER_TEMP ?? 'temp',
    assets: process.env.FILE_FOLDER_ASSETS ?? 'assets',
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME ?? 'CLOUDINARY_NAME',
    key: process.env.CLOUDINARY_API_KEY ?? 'CLOUDINARY_API_KEY',
    secret: process.env.CLOUDINARY_API_SECRET ?? 'CLOUDINARY_API_SECRET',
    domain: process.env.CLOUDINARY_DOMAIN ?? 'CLOUDINARY_DOMAIN',
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
