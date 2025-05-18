import express, { Router } from 'express';

import configs from './configs';
import NotFound from '@/utils/errors/NotFound copy';

const router: Router = express.Router();

router.use('/configs', configs);
router.all('*', () => {
  throw new NotFound();
});

export default router;
