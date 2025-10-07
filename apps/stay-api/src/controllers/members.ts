import { MemberServices } from '@/services';
import express from 'express';

const getAllMembers = async (req: express.Request, res: express.Response) => {
  try {
    const members = await MemberServices.list();
    return res.jsonApi(200, { data: members });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const createMember = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req;
    const member = await MemberServices.create(body);
    return res.jsonApi(200, { data: member });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getMemberById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const member = await MemberServices.getById(id);
    if (!member) return res.sendStatus(404);
    return res.jsonApi(200, { data: member });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateMember = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedMember = await MemberServices.update(id, body);
    return res.jsonApi(200, { data: updatedMember });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteMember = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await MemberServices.remove(id);
    return res.jsonApi(200, result);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const MemberControllers = {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
};
