import { Sequelize } from 'sequelize';
import env from './env';

const database = env.db;

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  port: database.port,
  dialect: database.dialect,
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  define: {
    underscored: true,
  },
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
