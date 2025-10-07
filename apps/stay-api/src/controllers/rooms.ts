import { RoomServices } from '@/services';
import express from 'express';

const getAllRooms = async (req: express.Request, res: express.Response) => {
  try {
    const rooms = await RoomServices.list();
    return res.jsonApi(200, { data: rooms });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const createRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req;
    const room = await RoomServices.create(body);
    return res.jsonApi(200, { data: room });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getRoomById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const room = await RoomServices.getById(id);
    if (!room) return res.sendStatus(404);
    return res.jsonApi(200, { data: room });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedRoom = await RoomServices.update(id, body);
    return res.jsonApi(200, { data: updatedRoom });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.remove(id);
    return res.jsonApi(200, result);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const RoomControllers = {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
};
