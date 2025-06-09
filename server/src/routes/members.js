const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middleware/auth');
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// Create new member (no auth required during development)
router.post('/', createMember);

// Apply authentication middleware to all other routes
router.use(authenticateToken);

// Get all members
router.get('/',
  authorize(['staff', 'manager', 'cashier', 'ceo']),
  getAllMembers
);

// Get member by ID
router.get('/:id',
  authorize(['staff', 'manager', 'cashier', 'ceo']),
  getMemberById
);

// Update member
router.put('/:id',
  authorize(['staff', 'manager']),
  updateMember
);

// Delete member
router.delete('/:id',
  authorize(['manager', 'ceo']),
  deleteMember
);

module.exports = router; 