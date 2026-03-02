import { FileControllers } from '@/controllers';
import { FileValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get(
  '/sign-upload-url',
  FileValidations.getUrl,
  // authenticateToken([EUserRole.Admin]),
  FileControllers.getSignUrlUpload
);
router.get(
  '/sign-upload-urls',
  FileValidations.getUrls,
  // authenticateToken([EUserRole.Admin]),
  FileControllers.getSignUrlUploads
);

export default router;
