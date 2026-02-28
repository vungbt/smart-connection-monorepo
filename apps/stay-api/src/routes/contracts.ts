import { ContractControllers } from '@/controllers';
import { ContractValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', ContractControllers.getAllContracts);
router.post('/', ContractValidations.create, ContractControllers.createContract);
router.get('/:id', ContractControllers.getContractById);
router.put('/:id', ContractValidations.update, ContractControllers.updateContract);
router.delete('/:id', ContractControllers.deleteContract);

export default router;
