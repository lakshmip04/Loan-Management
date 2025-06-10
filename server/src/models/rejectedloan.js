const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    Name: String,
    cusfname: String,
    cussname: String,
    LoanNumber: String,
    Date: Date,
    Amount: Number,
    Tenure: Number,
    Type: String,
    servicecharge: Number,
    advance: Number,
    EMI: Number,
    balanceamount: Number,
    collectedamount: Number,
    Notes: String,
    paid_from: String,
    status: Number,
    rejectionReason: String,
    rejectionDate: {
        type: Date,
        default: Date.now
    }
}, { 
    collection: 'rejected_loan',
    timestamps: true 
});

module.exports = mongoose.model('RejectedLoan', LoanSchema); 