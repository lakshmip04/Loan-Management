const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  cusid: {
    type: String,
    unique: true,
    required: false
  },
  cusfname: {
    type: String,
    required: true,
    trim: true
  },
  cussname: {
    type: String,
    required: true,
    trim: true
  },
  cusdob: {
    type: Date,
    required: true
  },
  cusgen: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  cusmob: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  cusadd: {
    type: String,
    required: true
  },
  cusaadhaar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid Aadhar number!`
    }
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  reference: {
    type: String,
    default: 'SELF'
  },
  Date: {
    type: Date,
    default: Date.now
  },
  cibil: {
    type: Number,
    required: true,
    min: 300,
    max: 900
  },
  category: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'customer'
});

// Auto-generate cusid before saving
customerSchema.pre('save', function(next) {
  if (!this.cusid) {
    this.cusid = `CUS${Date.now()}`;
  }
  next();
});

// Prevent OverwriteModelError
let Customer;
try {
  Customer = mongoose.model('Customer');
} catch (error) {
  Customer = mongoose.model('Customer', customerSchema);
}

module.exports = Customer; 