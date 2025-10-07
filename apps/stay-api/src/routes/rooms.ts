import { RoomControllers } from '@/controllers';
import { RoomValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', RoomControllers.getAllRooms);
router.post('/', RoomValidations.create, RoomControllers.createRoom);
router.get('/:id', RoomControllers.getRoomById);
router.put('/:id', RoomValidations.update, RoomControllers.updateRoom);
router.delete('/:id', RoomControllers.deleteRoom);

export default router;
