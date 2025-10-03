import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from '@/configs/database';

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
