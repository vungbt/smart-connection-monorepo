import ServerError from '@/utils/errors/ServerError';
import { NextFunction, Response } from 'express';

const pagingMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    // Ensure non-negative values
    const pagination = {
      page: Math.max(page, 1),
      pageSize: Math.max(pageSize, 1),
    };

    req.pagination = pagination;
    // If you're using Sequelize, you might want to use these values in your query
    const offset = ((pagination?.page ?? 1) - 1) * (pagination.pageSize ?? 10);
    const limit = pagination.pageSize;

    req.pagination = { ...pagination, offset, limit };

    // search q = ?
    req.query.q = String(req.query.q || '');
    next();
  } catch (error) {
    next(new ServerError('server_error'));
  }
};

export default pagingMiddleware;
