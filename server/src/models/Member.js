const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  cusid: {
    type: String,
    required: true,
    unique: true,
    default: () => 'CUS' + Date.now()
  },
  cusfname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  cussname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  cusdob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  cusgen: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  cusmob: {
    type: Number,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v.toString());
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  cusadd: {
    type: String,
    required: [true, 'Address is required']
  },
  cusaadhaar: {
    type: String,
    required: [true, 'Aadhar number is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{4}-\d{4}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid Aadhar number!`
    }
  },
  fee: {
    type: Number,
    required: [true, 'Fee is required'],
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
    required: [true, 'CIBIL score is required'],
    min: 300,
    max: 900
  },
  category: {
    type: Number,
    default: 0
  }
}, { 
  collection: 'customer',
  timestamps: true 
});

// Text index for search
MemberSchema.index({ cusfname: 'text', cussname: 'text' });

module.exports = mongoose.model('Member', MemberSchema, 'customer'); 