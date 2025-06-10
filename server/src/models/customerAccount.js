const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    idProof: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    occupation: String,
    monthlyIncome: Number,
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'customers',
    timestamps: true
});

// Index for efficient queries
customerSchema.index({ phone: 1 }, { unique: true });
customerSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Customer', customerSchema); 