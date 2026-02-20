const express = require('express');
const membersControllers = require('../controllers/members.controller');

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
module.exports = router;
