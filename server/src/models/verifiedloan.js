const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  id: String,
  LoanNumber: String,
  pledgeNo: String,
  packetNo: String,
  Name: String,
  cusfname: String,
  cussname: String,
  guafname: String,
  guasname: String,
  cusdob: Date,
  guadob: Date,
  cusgen: String,
  guagen: String,
  cusmob: Number,
  guamob: Number,
  cusadd: String,
  guaadd: String,
  guaaadhaar: String,
  cusaadhaar: String,
  nomineeName: String,
  nomineeAadhar: String,
  Date: Date,
  Amount: Number,
  purpose: String,
  Tenure: Number,
  Type: String,
  interest: Number,
  principal: Number,
  fee: Number,
  gst: Number,
  cibilCharge: Number,
  servicecharge: Number,
  disbursalOption: String,
  chargeOption: String,
  collectionOption: String,
  feeOption: String,
  gstOption: String,
  cibilOption: String,
  emiDay: Number,
  advance: Number,
  EMI: Number,
  balanceamount: Number,
  collectedamount: Number,
  Notes: String,
  paid_from: String,
  status: Number,
  audit: String,
  edamt: Number,
  relation: String,
  cusid: String,
  extras: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  fileno: String,
  guacibil: Number,
  cuscibil: Number,
  closingdue: Number,
  closingdate: Date,
  suspense_account: Number,
  groupid: String,
  // New Field for Ornaments (Optional)
  totalValue: Number,
  eligibleAmount: Number,
  ornaments: [{
    ornamentType: String,
    netWeight: Number,
    grsWeight: Number,
    purity: String,
    remark: String
  }],
  image: {
    data: String,
    contentType: String
  },
  imageDriveId: String,
  imageLink: String
}, { 
  collection: 'verified_loan',
  timestamps: true 
});

module.exports = mongoose.model('VerifiedLoan', LoanSchema); 