const mongoose = require('mongoose');
const connectDB = require('../config/database');
const RejectedLoan = require('../models/rejectedloan');

const testRejectedLoan = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Example 1: Count all rejected loans
    const totalRejected = await RejectedLoan.countDocuments();
    console.log('\n1. Total Rejected Loans:', totalRejected);

    // Example 2: Find recent rejections
    const recentRejections = await RejectedLoan.find()
      .select('LoanNumber Name Amount Type rejectionReason rejectionDate')
      .sort({ rejectionDate: -1 })
      .limit(5);
    console.log('\n2. Recent Rejections:', recentRejections);

    // Example 3: Group by rejection reason
    const rejectionStats = await RejectedLoan.aggregate([
      {
        $group: {
          _id: '$rejectionReason',
          count: { $sum: 1 },
          totalAmount: { $sum: '$Amount' },
          averageAmount: { $avg: '$Amount' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    console.log('\n3. Rejections by Reason:', rejectionStats);

    // Example 4: Rejection timeline
    const rejectionTimeline = await RejectedLoan.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$rejectionDate' },
            month: { $month: '$rejectionDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);
    console.log('\n4. Rejection Timeline:', rejectionTimeline);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error during test:', error);
    await mongoose.connection.close();
  }
};

// Run the test
testRejectedLoan(); 