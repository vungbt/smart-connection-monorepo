import { ConfigControllers } from '@/controllers';
import { ConfigValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', ConfigControllers.getAllConfigs);
router.post('/', ConfigValidations.create, ConfigControllers.createConfig);
router.get('/:id', ConfigControllers.getConfigById);
router.put('/:id', ConfigValidations.update, ConfigControllers.updateConfig);
router.delete('/:id', ConfigControllers.deleteConfig);

export default router;
