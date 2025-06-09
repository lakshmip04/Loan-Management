const mongoose = require('mongoose');

const emiListSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedLoan', required: true },
  customerName: { type: String, required: true },
  emiNumber: { type: Number, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'overdue'] },
  paidAmount: { type: Number, default: 0 },
  paidDate: { type: Date },
  lateFee: { type: Number, default: 0 },
  receiptNumber: { type: String },
  collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffAccount' },
  remarks: { type: String }
}, {
  timestamps: true
});

// Index for efficient queries
emiListSchema.index({ loanId: 1, emiNumber: 1 });
emiListSchema.index({ dueDate: 1, status: 1 });
emiListSchema.index({ customerName: 'text' });

module.exports = mongoose.model('EmiList', emiListSchema); 