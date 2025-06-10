const mongoose = require('mongoose');
const connectDB = require('../config/database');
const VerifiedLoan = require('../models/verifiedloan');

const queryExamples = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Example 1: Find all active loans (status = 1)
    const activeLoans = await VerifiedLoan.find({ status: 1 })
      .select('LoanNumber Name Amount EMI balanceamount status')
      .sort({ createdAt: -1 });
    console.log('\n1. Active Loans:', activeLoans.length);

    // Example 2: Find loans by amount range
    const highValueLoans = await VerifiedLoan.find({
      Amount: { $gte: 100000 },  // Loans >= 100,000
      status: { $in: [1, 2] }    // Active or Pending
    }).select('LoanNumber Name Amount');
    console.log('\n2. High Value Loans:', highValueLoans.length);

    // Example 3: Search by customer name (case-insensitive)
    const customerLoans = await VerifiedLoan.find({
      $or: [
        { Name: { $regex: 'kumar', $options: 'i' } },
        { cusfname: { $regex: 'kumar', $options: 'i' } }
      ]
    }).select('Name cusfname Amount status');
    console.log('\n3. Loans for customers with "Kumar":', customerLoans.length);

    // Example 4: Aggregate - Summary by loan status
    const loanSummary = await VerifiedLoan.aggregate([
      {
        $group: {
          _id: '$status',
          totalLoans: { $sum: 1 },
          totalAmount: { $sum: '$Amount' },
          averageEMI: { $avg: '$EMI' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    console.log('\n4. Loan Summary by Status:', loanSummary);

    // Example 5: Find gold loans with pending status
    const pendingGoldLoans = await VerifiedLoan.find({
      Type: 'Gold',
      status: 2,
      ornaments: { $exists: true, $ne: [] }
    }).select('LoanNumber Name Amount ornaments totalValue');
    console.log('\n5. Pending Gold Loans:', pendingGoldLoans.length);

    // Example 6: Find loans due for EMI
    const today = new Date();
    const dueLoans = await VerifiedLoan.find({
      status: 1,
      emiDay: today.getDate(),
      balanceamount: { $gt: 0 }
    }).select('LoanNumber Name EMI emiDay balanceamount');
    console.log('\n6. Loans Due for EMI Today:', dueLoans.length);

    // Example 7: Advanced aggregation - Monthly disbursement report
    const monthlyReport = await VerifiedLoan.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalDisbursed: { $sum: '$Amount' },
          loanCount: { $sum: 1 },
          averageLoanAmount: { $avg: '$Amount' }
        }
      }
    ]);
    console.log('\n7. Monthly Disbursement Report:', monthlyReport);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error during queries:', error);
    await mongoose.connection.close();
  }
};

// Run the queries
queryExamples(); 