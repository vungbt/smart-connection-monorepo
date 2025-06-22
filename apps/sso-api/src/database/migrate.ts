import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import env from '@/configs/env';

const sequelize = new Sequelize({
  dialect: env.db.dialect,
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  username: env.db.username,
  password: env.db.password,
  logging: env.server.env === 'development',
});

const umzug = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Run migrations
(async () => {
  await umzug.up();
  console.log('All migrations have been executed');
  process.exit(0);
})();
