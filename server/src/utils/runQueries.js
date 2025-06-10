const mongoose = require('mongoose');
const connectDB = require('../config/database');
const VerifiedLoan = require('../models/verifiedloan');
const PendingLoan = require('../models/pendingloan');
const RejectedLoan = require('../models/rejectedloan');

const runQueries = async () => {
  try {
    await connectDB();
    console.log('Connected to database\n');

    // 1. Loan Type Analysis
    console.log('1. LOAN TYPE ANALYSIS:');
    const loanTypes = await VerifiedLoan.aggregate([
      {
        $group: {
          _id: '$Type',
          count: { $sum: 1 },
          totalAmount: { $sum: '$Amount' },
          averageAmount: { $avg: '$Amount' }
        }
      }
    ]);
    console.log('Loan distribution by type:', loanTypes);

    // 2. Gold Loans Across All Collections
    console.log('\n2. GOLD LOANS ANALYSIS:');
    const verifiedGold = await VerifiedLoan.find({ Type: 'Gold' }).select('LoanNumber Amount ornaments totalValue');
    const pendingGold = await PendingLoan.find({ Type: 'Gold' }).select('LoanNumber Amount ornaments totalValue');
    console.log('Verified Gold Loans:', verifiedGold);
    console.log('Pending Gold Loans:', pendingGold);

    // 3. High Value Loans (>200000)
    console.log('\n3. HIGH VALUE LOANS (>200000):');
    const highValueLoans = await VerifiedLoan.find({ 
      Amount: { $gt: 200000 },
      status: 1
    }).select('LoanNumber Name Amount Type');
    console.log('High value active loans:', highValueLoans);

    // 4. EMI Collection Analysis
    console.log('\n4. EMI COLLECTION ANALYSIS:');
    const emiAnalysis = await VerifiedLoan.aggregate([
      {
        $match: { status: 1 }
      },
      {
        $group: {
          _id: null,
          totalEMI: { $sum: '$EMI' },
          averageEMI: { $avg: '$EMI' },
          totalCollected: { $sum: '$collectedamount' },
          totalBalance: { $sum: '$balanceamount' }
        }
      }
    ]);
    console.log('EMI Statistics:', emiAnalysis);

    // 5. Rejection Analysis
    console.log('\n5. REJECTION ANALYSIS:');
    const rejectionAnalysis = await RejectedLoan.aggregate([
      {
        $group: {
          _id: '$rejectionReason',
          count: { $sum: 1 },
          averageAmount: { $avg: '$Amount' }
        }
      }
    ]);
    console.log('Rejection reasons breakdown:', rejectionAnalysis);

    // 6. Pending Applications by Type
    console.log('\n6. PENDING APPLICATIONS:');
    const pendingAnalysis = await PendingLoan.aggregate([
      {
        $group: {
          _id: '$Type',
          count: { $sum: 1 },
          totalAmount: { $sum: '$Amount' }
        }
      }
    ]);
    console.log('Pending applications by type:', pendingAnalysis);

    // 7. Customer Search (across all collections)
    console.log('\n7. CUSTOMER SEARCH (Kumar):');
    const verifiedCustomers = await VerifiedLoan.find({
      $or: [
        { Name: { $regex: 'Kumar', $options: 'i' } },
        { cusfname: { $regex: 'Kumar', $options: 'i' } },
        { cussname: { $regex: 'Kumar', $options: 'i' } }
      ]
    }).select('LoanNumber Name Amount Type status');
    console.log('Customers with "Kumar" in name:', verifiedCustomers);

    // 8. Loan Amount Range Analysis
    console.log('\n8. LOAN AMOUNT RANGE ANALYSIS:');
    const amountRanges = await VerifiedLoan.aggregate([
      {
        $bucket: {
          groupBy: '$Amount',
          boundaries: [0, 100000, 200000, 300000, 500000],
          default: 'Above 500000',
          output: {
            count: { $sum: 1 },
            loans: { $push: { loanNumber: '$LoanNumber', amount: '$Amount' } }
          }
        }
      }
    ]);
    console.log('Loans by amount ranges:', amountRanges);

    // 9. Today's EMI Due Loans
    console.log('\n9. TODAY\'S EMI DUE:');
    const today = new Date();
    const emiDueLoans = await VerifiedLoan.find({
      status: 1,
      emiDay: today.getDate()
    }).select('LoanNumber Name EMI emiDay');
    console.log('Loans with EMI due today:', emiDueLoans);

    // 10. Collection Efficiency
    console.log('\n10. COLLECTION EFFICIENCY:');
    const collectionEfficiency = await VerifiedLoan.aggregate([
      {
        $match: { status: 1 }
      },
      {
        $project: {
          LoanNumber: 1,
          collectionEfficiency: {
            $multiply: [
              { $divide: ['$collectedamount', { $add: ['$collectedamount', '$balanceamount'] }] },
              100
            ]
          }
        }
      }
    ]);
    console.log('Collection efficiency by loan:', collectionEfficiency);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error during queries:', error);
    await mongoose.connection.close();
  }
};

// Run the queries
runQueries(); 