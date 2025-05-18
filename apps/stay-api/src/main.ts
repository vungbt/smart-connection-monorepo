if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

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
  const port = env.server.port ?? 4000;

  // basic
  app.use(compression());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // middleware
  app.use(
    cors({
      credentials: true,
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

  const morgan = await createLogger();
  app.use('/api', morgan, baseMiddleware, routers, handleErrorApi);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
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
      logger.info(`[App] ✅ started on worker ${process.pid} http://localhost:${port}/api`);
    } catch (error) {
      logger.error(`[App] ❌ Unable to connect to the database:`, error);
    }
  });
};

bootstrap();
