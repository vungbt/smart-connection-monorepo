import express, { Router } from 'express';

import configs from './configs';
import members from './members';
import rooms from './rooms';
import files from './files';
import NotFound from '@/utils/errors/NotFound';

const router: Router = express.Router();

router.use('/configs', configs);
router.use('/members', members);
router.use('/rooms', rooms);
router.use('/files', files);
router.all('*', () => {
  throw new NotFound();
});

export default router;
