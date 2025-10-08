import { ConfigServices } from '@/services';
import express from 'express';
import HttpStatus from 'http-status-codes';

const getAllConfigs = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const pagination = req.pagination;
    const params = req?.query;
    const results = await ConfigServices.list(params, pagination);
    return res.jsonApi(HttpStatus.OK, results);
  } catch (error) {
    return next(error);
  }
};

const createConfig = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { body } = req;
    const result = await ConfigServices.create(body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const getConfigById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await ConfigServices.getById(id);
    if (!result) return res.sendStatus(HttpStatus.NOT_FOUND);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const updateConfig = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await ConfigServices.update(id, body);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

const deleteConfig = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await ConfigServices.remove(id);
    return res.jsonApi(HttpStatus.OK, result);
  } catch (error) {
    return next(error);
  }
};

export const ConfigControllers = {
  getAllConfigs,
  createConfig,
  getConfigById,
  updateConfig,
  deleteConfig,
};
