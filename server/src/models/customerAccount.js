const mongoose = require('mongoose');

const customerAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  idProof: {
    type: { type: String, enum: ['aadhar', 'pan', 'voter', 'driving_license'] },
    number: String,
    documentUrl: String
  },
  addressProof: {
    type: { type: String, enum: ['aadhar', 'utility_bill', 'rental_agreement', 'passport'] },
    documentUrl: String
  },
  occupation: String,
  monthlyIncome: Number,
  status: { type: String, default: 'active' },
  activeLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedLoan' }],
  completedLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedLoan' }],
  totalLoanAmount: { type: Number, default: 0 },
  totalPaidAmount: { type: Number, default: 0 },
  creditScore: { type: Number, default: 0 },
  remarks: String,
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffAccount' }
}, {
  timestamps: true
});

// Index for efficient queries
customerAccountSchema.index({ phone: 1 }, { unique: true });
customerAccountSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('CustomerAccount', customerAccountSchema); 