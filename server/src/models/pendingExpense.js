const mongoose = require('mongoose');

const pendingExpenseSchema = new mongoose.Schema({
  expenseType: { 
    type: String, 
    required: true,
    enum: ['salary', 'rent', 'utilities', 'maintenance', 'office_supplies', 'travel', 'marketing', 'other']
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffAccount', required: true },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  documents: [{
    title: String,
    url: String
  }],
  paymentMethod: { 
    type: String,
    enum: ['cash', 'bank_transfer', 'cheque', 'upi'],
    required: true
  },
  paymentDetails: {
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    upiId: String,
    chequeNumber: String
  },
  remarks: String
}, {
  timestamps: true
});

module.exports = mongoose.model('PendingExpense', pendingExpenseSchema); 