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
const VerifiedLoan = require('../models/verifiedloan');

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

// Get all verified loans
router.get('/verified', async (req, res) => {
  try {
    const loans = await VerifiedLoan.find()
      .sort({ Date: -1 }); // Sort by date in descending order
    res.json(loans);
  } catch (error) {
    console.error('Error fetching verified loans:', error);
    res.status(500).json({ error: 'Failed to fetch verified loans' });
  }
});

module.exports = router; 