const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['staff', 'manager', 'cashier', 'ceo'] },
  phone: { type: String },
  address: { type: String },
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  lastLogin: { type: Date },
  permissions: [{
    type: String,
    enum: [
      'view_loans',
      'create_loans',
      'verify_loans',
      'reject_loans',
      'view_collections',
      'create_collections',
      'verify_collections',
      'reject_collections',
      'view_expenses',
      'create_expenses',
      'verify_expenses',
      'reject_expenses',
      'manage_staff',
      'view_reports'
    ]
  }]
}, {
  timestamps: true
});

// Hash password before saving
staffAccountSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
staffAccountSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('StaffAccount', staffAccountSchema); 