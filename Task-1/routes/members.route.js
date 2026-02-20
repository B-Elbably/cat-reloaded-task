const express = require('express');
const membersControllers = require('../controllers/members.controller');

const router = express.Router();

router.get('/', membersControllers.getAllMembers);
router.get('/add', membersControllers.addMemberForm);
router.get('/:id/edit', membersControllers.editMemberForm);
router.post('/', membersControllers.createMember);
router.patch('/:id', membersControllers.updateMember);
router.delete('/:id', membersControllers.deleteMember);

module.exports = router;
