const mongoose = require('mongoose');

const pendingLoanSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanType: { type: String, required: true },
  interestRate: { type: Number, required: true },
  tenure: { type: Number, required: true },
  emiAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  applicationDate: { type: Date, default: Date.now },
  documents: [{ type: String }],
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  remarks: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('PendingLoan', pendingLoanSchema); 