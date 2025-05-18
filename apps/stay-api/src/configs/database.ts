import { Dialect, Sequelize } from 'sequelize';

const DB_NAME = process.env.POSTGRES_DB || 'smartconnection';
const DB_USER = process.env.POSTGRES_USER || 'postgres';
const DB_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const DB_HOST = process.env.POSTGRES_HOST || 'localhost';
const DB_PORT = parseInt(process.env.POSTGRES_PORT || '5432', 10);
const DB_DIALECT = (process.env.DB_DIALECT ?? 'postgres') as Dialect;

const database = {
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: DB_DIALECT,
};

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  port: database.port,
  dialect: database.dialect,
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
