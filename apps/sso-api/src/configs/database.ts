import env from '@/configs/env';
import { Sequelize } from 'sequelize';
import logger from '@/utils/logger';

const sequelize = new Sequelize({
  dialect: env.db.dialect,
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  username: env.db.username,
  password: env.db.password,
  logging: env.server.env === 'development' ? msg => logger.debug(msg) : false,
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
});

export default sequelize;
