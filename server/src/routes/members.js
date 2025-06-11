const express = require('express');
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// Member routes
router.route('/')
  .get(getAllMembers)
  .post(createMember);

router.route('/:id')
  .get(getMemberById)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router; 