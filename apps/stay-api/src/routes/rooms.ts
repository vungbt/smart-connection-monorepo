import { RoomControllers } from '@/controllers';
import pagingMiddleware from '@/middlewares/paginationMiddleware';
import { RoomValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', pagingMiddleware, RoomValidations.list, RoomControllers.getAllRooms);
router.post('/', RoomValidations.create, RoomControllers.createRoom);
router.get('/:id', RoomControllers.getRoomById);
router.put('/:id', RoomValidations.update, RoomControllers.updateRoom);
router.delete('/:id', RoomControllers.deleteRoom);

export default router;
