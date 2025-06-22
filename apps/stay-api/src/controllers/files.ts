import { FileServices } from '@/services/files';
import express, { NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

const getSignUrlUpload = async (
  req: express.Request<{}, {}, {}, { name?: string }>,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const queries = req.query;
    const name = queries?.name ?? '';
    const urlUpload = await FileServices.uploadUrl(name);
    return res.jsonApi(HttpStatus.OK, { data: urlUpload });
  } catch (error) {
    return next(error);
  }
};

const getSignUrlUploads = async (
  req: express.Request<{}, {}, {}, { names: string[] }>,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const queries = req.query;
    let names = queries?.names ?? [];
    if (typeof names === 'string') {
      names = [names];
    }
    const urlUpload = await FileServices.uploadUrls(names);
    return res.jsonApi(HttpStatus.OK, { data: urlUpload });
  } catch (error) {
    return next(error);
  }
};

export const FileControllers = {
  getSignUrlUpload,
  getSignUrlUploads,
};
