import express, { Router } from 'express';

import services from './services';
import members from './members';
import rooms from './rooms';
import files from './files';
import bills from './bills';
import NotFound from '@/utils/errors/NotFound';

const router: Router = express.Router();

router.use('/services', services);
router.use('/members', members);
router.use('/rooms', rooms);
router.use('/files', files);
router.use('/bills', bills);
router.all('*', () => {
  throw new NotFound();
});

export default router;
