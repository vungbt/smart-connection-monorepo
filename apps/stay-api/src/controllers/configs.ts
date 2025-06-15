import { ConfigServices } from '@/services';
import express from 'express';

const getAllConfigs = async (req: express.Request, res: express.Response) => {
  try {
    const configs = await ConfigServices.list();
    return res.jsonApi(200, { data: configs });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const createConfig = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req;
    const config = await ConfigServices.create(body);
    return res.jsonApi(200, { data: config });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getConfigById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const config = await ConfigServices.getById(id);
    if (!config) return res.sendStatus(404);
    return res.jsonApi(200, { data: config });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateConfig = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedConfig = await ConfigServices.update(id, body);
    return res.jsonApi(200, { data: updatedConfig });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteConfig = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await ConfigServices.remove(id);
    return res.jsonApi(200, result);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const ConfigControllers = {
  getAllConfigs,
  createConfig,
  getConfigById,
  updateConfig,
  deleteConfig,
};
