const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { authenticateToken, authorize } = require('../middleware/auth');
const {
  createLoan,
  getPendingLoans,
  verifyLoan,
  getLoanDetails,
  updateLoanStatus
} = require('../controllers/loanController');

// Apply middleware to all routes
router.use(authenticateToken);

// Create new loan application
router.post('/apply', 
  authorize(['staff', 'manager']),
  upload.array('documents', 5),
  createLoan
);

// Get all pending loans
router.get('/pending',
  authorize(['manager', 'ceo']),
  getPendingLoans
);

// Verify loan
router.post('/verify/:id',
  authorize(['manager', 'ceo']),
  verifyLoan
);

// Get loan details with EMI schedule
router.get('/:id',
  authorize(['staff', 'manager', 'cashier', 'ceo']),
  getLoanDetails
);

// Update loan status
router.patch('/:id/status',
  authorize(['manager', 'ceo']),
  updateLoanStatus
);

module.exports = router; 