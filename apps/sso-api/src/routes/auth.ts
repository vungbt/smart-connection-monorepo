import { AuthController } from '@/controllers/auth';
import { AuthValidations } from '@/middlewares/validations/auth';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/login', AuthValidations.login, AuthController.login);
router.post('/register', AuthValidations.register, AuthController.register);
router.post('/refresh-token', AuthValidations.refreshToken, AuthController.refreshToken);

export default router;
