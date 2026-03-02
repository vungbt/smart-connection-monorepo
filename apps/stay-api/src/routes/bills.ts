import { BillControllers } from '@/controllers';
import pagingMiddleware from '@/middlewares/paginationMiddleware';
import { BillValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', pagingMiddleware, BillValidations.list, BillControllers.getAllBills);
router.post('/', BillValidations.create, BillControllers.createBill);
router.get('/:id', BillControllers.getBillById);
router.put('/:id', BillValidations.update, BillControllers.updateBill);
router.delete('/:id', BillControllers.deleteBill);

export default router;
