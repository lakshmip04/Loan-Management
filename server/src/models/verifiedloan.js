const mongoose = require('mongoose');

const verifiedLoanSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanType: { type: String, required: true },
  interestRate: { type: Number, required: true },
  tenure: { type: Number, required: true },
  emiAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  nextEmiDate: { type: Date, required: true },
  status: { type: String, default: 'active' },
  verificationDate: { type: Date, default: Date.now },
  documents: [{ type: String }],
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  remarks: { type: String },
  emiHistory: [{
    amount: Number,
    date: Date,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    receiptNumber: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('VerifiedLoan', verifiedLoanSchema); 