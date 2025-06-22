if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import env from '@/configs/env';
import routers from '@/routes';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import http from 'http';
import sequelize from '@/configs/database';
import baseMiddleware from '@/middlewares/baseMiddleware';
import { handleErrorApi } from '@/utils/errors';
import logger from '@/utils/logger';
import { createLogger } from '@/utils/logger/morgan';
import i18next from '@/locale/config/i18next';

const bootstrap = async () => {
  // Initialize express app
  const app: Application = express();
  const port = env.server.port ?? 5000; // Using port 5000 for SSO service

  // basic
  app.use(compression());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // middleware
  app.use(
    cors({
      credentials: true,
      origin: env.server.allowedOrigins,
    })
  );

  // security
  if (env.server.env === 'production') {
    app.use(helmet());
  }

  // language
  app.use(i18next);
  app.use((req, res, next) => {
    req.i18n.changeLanguage(
      req.i18n.language.split('-').shift() || process.env.LANGUAGE_DEFAULT || 'en'
    );
    return next();
  });

  // base middleware
  app.use(baseMiddleware);

  // logger
  const morgan = await createLogger();
  app.use(morgan);

  // routes
  app.use('/api/auth', routers);

  // error handler
  app.use(handleErrorApi);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.jsonApi(200, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  const server = http.createServer(app);
  server.listen(port, async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      logger.info(`[DB] ✅ Connection has been established successfully.`);
      logger.info(
        `[App] ✅ SSO API started on worker ${process.pid} http://localhost:${port}/api/auth`
      );
    } catch (error) {
      logger.error(`[App] ❌ Unable to connect to the database:`, error);
    }
  });
};

bootstrap();
