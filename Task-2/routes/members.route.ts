import express from 'express';
import * as membersControllers from '../controllers/members.controller.js';

const router = express.Router();

router
    .route('/')
    .get(membersControllers.getAllMembers)
    .post(membersControllers.createMember);

router.get('/:id/edit', membersControllers.editMemberForm);

router
    .route('/:id')
    .put(membersControllers.updateMember)
    .delete(membersControllers.deleteMember);

export default router;
