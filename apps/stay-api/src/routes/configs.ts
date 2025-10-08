import { ConfigControllers } from '@/controllers';
import pagingMiddleware from '@/middlewares/paginationMiddleware';
import { ConfigValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', pagingMiddleware, ConfigValidations.list, ConfigControllers.getAllConfigs);
router.post('/', ConfigValidations.create, ConfigControllers.createConfig);
router.get('/:id', ConfigControllers.getConfigById);
router.put('/:id', ConfigValidations.update, ConfigControllers.updateConfig);
router.delete('/:id', ConfigControllers.deleteConfig);

export default router;
