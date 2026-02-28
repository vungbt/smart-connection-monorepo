import { ServiceControllers } from '@/controllers';
import pagingMiddleware from '@/middlewares/paginationMiddleware';
import { ServiceValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', pagingMiddleware, ServiceValidations.list, ServiceControllers.getAllServices);
router.post('/', ServiceValidations.create, ServiceControllers.createService);
router.get('/:id', ServiceControllers.getServiceById);
router.put('/:id', ServiceValidations.update, ServiceControllers.updateService);
router.delete('/:id', ServiceControllers.deleteService);

export default router;
