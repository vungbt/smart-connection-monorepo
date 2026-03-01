import { ContractControllers } from '@/controllers';
import pagingMiddleware from '@/middlewares/paginationMiddleware';
import { ContractValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', pagingMiddleware, ContractValidations.list, ContractControllers.getAllContracts);
router.post('/', ContractValidations.create, ContractControllers.createContract);
router.get('/:id', ContractControllers.getContractById);
router.put('/:id', ContractValidations.update, ContractControllers.updateContract);
router.delete('/:id', ContractControllers.deleteContract);

export default router;
