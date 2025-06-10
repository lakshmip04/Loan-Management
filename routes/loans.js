const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PendingLoan = require('../models/pendingloan');
const VerifiedLoan = require('../models/verifiedloan');
const EmiList = require('../models/emiList');
const CustomerAccount = require('../models/customerAccount');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/loan-documents';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, PNG & PDF files are allowed.'));
    }
  }
});

// Create new loan application
router.post('/apply', upload.array('documents', 5), async (req, res) => {
  try {
    const {
      customerName,
      loanAmount,
      loanType,
      interestRate,
      tenure,
      emiAmount,
      customerId
    } = req.body;

    // Get document URLs
    const documents = req.files.map(file => file.path);

    // Create new pending loan
    const newLoan = new PendingLoan({
      customerName,
      loanAmount,
      loanType,
      interestRate,
      tenure,
      emiAmount,
      documents,
      verifiedBy: req.user.id
    });

    await newLoan.save();

    // Update customer account if customerId is provided
    if (customerId) {
      await CustomerAccount.findByIdAndUpdate(customerId, {
        $push: { activeLoans: newLoan._id }
      });
    }

    res.status(201).json(newLoan);
  } catch (error) {
    console.error('Loan application error:', error);
    res.status(500).json({ message: 'Error creating loan application' });
  }
});

// Get all pending loans
router.get('/pending', async (req, res) => {
  try {
    const loans = await PendingLoan.find()
      .populate('verifiedBy', 'name email')
      .sort({ applicationDate: -1 });
    res.json(loans);
  } catch (error) {
    console.error('Get pending loans error:', error);
    res.status(500).json({ message: 'Error fetching pending loans' });
  }
});

// Verify loan
router.post('/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const pendingLoan = await PendingLoan.findById(id);
    if (!pendingLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Create verified loan
    const verifiedLoan = new VerifiedLoan({
      ...pendingLoan.toObject(),
      status: 'active',
      verificationDate: new Date(),
      verifiedBy: req.user.id,
      remarks
    });

    await verifiedLoan.save();

    // Generate EMI schedule
    const emiSchedule = [];
    let nextEmiDate = new Date();
    const loanAmount = pendingLoan.loanAmount;
    const tenure = pendingLoan.tenure;
    const emiAmount = pendingLoan.emiAmount;

    for (let i = 1; i <= tenure; i++) {
      nextEmiDate = new Date(nextEmiDate);
      nextEmiDate.setMonth(nextEmiDate.getMonth() + 1);

      const emi = new EmiList({
        loanId: verifiedLoan._id,
        customerName: pendingLoan.customerName,
        emiNumber: i,
        amount: emiAmount,
        dueDate: nextEmiDate
      });

      await emi.save();
      emiSchedule.push(emi);
    }

    // Delete pending loan
    await PendingLoan.findByIdAndDelete(id);

    res.json({
      loan: verifiedLoan,
      emiSchedule
    });
  } catch (error) {
    console.error('Loan verification error:', error);
    res.status(500).json({ message: 'Error verifying loan' });
  }
});

// Get loan details with EMI schedule
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await VerifiedLoan.findById(id)
      .populate('verifiedBy', 'name email');
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    const emiSchedule = await EmiList.find({ loanId: id })
      .sort({ emiNumber: 1 });

    res.json({
      loan,
      emiSchedule
    });
  } catch (error) {
    console.error('Get loan details error:', error);
    res.status(500).json({ message: 'Error fetching loan details' });
  }
});

// Update loan status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const loan = await VerifiedLoan.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json(loan);
  } catch (error) {
    console.error('Update loan status error:', error);
    res.status(500).json({ message: 'Error updating loan status' });
  }
});

module.exports = router; 