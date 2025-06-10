const mongoose = require('mongoose');
const connectDB = require('../config/database');
const PendingLoan = require('../models/pendingloan');

const testPendingLoan = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Example 1: Count all pending loans
    const totalPending = await PendingLoan.countDocuments();
    console.log('\n1. Total Pending Loans:', totalPending);

    // Example 2: Find recent pending loans
    const recentPending = await PendingLoan.find()
      .select('LoanNumber Name Amount Type status')
      .sort({ createdAt: -1 })
      .limit(5);
    console.log('\n2. Recent Pending Loans:', recentPending);

    // Example 3: Group by loan type
    const loanTypes = await PendingLoan.aggregate([
      {
        $group: {
          _id: '$Type',
          count: { $sum: 1 },
          totalAmount: { $sum: '$Amount' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    console.log('\n3. Loans by Type:', loanTypes);

    // Example 4: Find gold loans with ornaments
    const goldLoans = await PendingLoan.find({
      Type: 'Gold',
      ornaments: { $exists: true, $ne: [] }
    }).select('LoanNumber Name totalValue eligibleAmount ornaments');
    console.log('\n4. Gold Loans:', goldLoans.length);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error during test:', error);
    await mongoose.connection.close();
  }
};

// Run the test
testPendingLoan(); 