import express, { Router } from 'express';

import configs from './configs';
import files from './files';
import NotFound from '@/utils/errors/NotFound';

const router: Router = express.Router();

router.use('/configs', configs);
router.use('/files', files);
router.all('*', () => {
  throw new NotFound();
});

export default router;
