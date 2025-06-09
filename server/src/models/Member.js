const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  address: {
    type: String,
    required: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{4}-\d{4}-\d{4}$/, 'Please enter a valid Aadhar number in format XXXX-XXXX-XXXX'],
    index: true
  },
  accountType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C']
  },
  cibilScore: {
    type: Number,
    required: true,
    min: 300,
    max: 900
  },
  miscCharges: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Text index for search
memberSchema.index({ firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('Member', memberSchema); 