import { MemberControllers } from '@/controllers';
import { MemberValidations } from '@/middlewares/validations';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', MemberControllers.getAllMembers);
router.post('/', MemberValidations.create, MemberControllers.createMember);
router.get('/:id', MemberControllers.getMemberById);
router.put('/:id', MemberValidations.update, MemberControllers.updateMember);
router.delete('/:id', MemberControllers.deleteMember);

export default router;
