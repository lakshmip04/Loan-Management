const mongoose = require('mongoose');
const connectDB = require('../config/database');
const VerifiedLoan = require('../models/verifiedloan');
const PendingLoan = require('../models/pendingloan');
const RejectedLoan = require('../models/rejectedloan');
const PendingExpense = require('../models/pendingExpense');
const RejectedExpense = require('../models/rejectedExpense');

const sampleData = {
    verifiedLoans: [
        {
            LoanNumber: "VL001",
            Name: "John Smith",
            cusfname: "John",
            cussname: "Smith",
            Amount: 250000,
            Type: "Personal",
            Tenure: 24,
            EMI: 12000,
            status: 1, // Active
            interest: 12,
            balanceamount: 200000,
            collectedamount: 50000,
            emiDay: 5,
            cusaadhaar: "1234-5678-9012",
            cusmob: 9876543210
        },
        {
            LoanNumber: "VL002",
            Name: "Priya Kumar",
            cusfname: "Priya",
            cussname: "Kumar",
            Amount: 150000,
            Type: "Gold",
            Tenure: 12,
            EMI: 14000,
            status: 1, // Active
            interest: 10,
            balanceamount: 98000,
            collectedamount: 52000,
            emiDay: 15,
            cusaadhaar: "9876-5432-1098",
            cusmob: 8765432109,
            ornaments: [
                {
                    ornamentType: "Necklace",
                    netWeight: 25.5,
                    grsWeight: 26,
                    purity: "22K",
                    remark: "Good condition"
                }
            ],
            totalValue: 175000,
            eligibleAmount: 150000
        }
    ],
    pendingLoans: [
        {
            LoanNumber: "PL001",
            Name: "Sarah Johnson",
            cusfname: "Sarah",
            cussname: "Johnson",
            Amount: 300000,
            Type: "Personal",
            Tenure: 36,
            EMI: 10000,
            status: 0, // Pending
            interest: 12,
            cusaadhaar: "4567-8901-2345",
            cusmob: 7654321098
        },
        {
            LoanNumber: "PL002",
            Name: "Raj Patel",
            cusfname: "Raj",
            cussname: "Patel",
            Amount: 200000,
            Type: "Gold",
            Tenure: 24,
            EMI: 9500,
            status: 0,
            interest: 10,
            cusaadhaar: "6789-0123-4567",
            cusmob: 9087654321,
            ornaments: [
                {
                    ornamentType: "Bangles",
                    netWeight: 30.5,
                    grsWeight: 31,
                    purity: "22K",
                    remark: "New condition"
                }
            ],
            totalValue: 225000,
            eligibleAmount: 200000
        }
    ],
    rejectedLoans: [
        {
            LoanNumber: "RL001",
            Name: "Mike Wilson",
            cusfname: "Mike",
            cussname: "Wilson",
            Amount: 500000,
            Type: "Personal",
            Tenure: 48,
            status: 2, // Rejected
            interest: 12,
            cusaadhaar: "8901-2345-6789",
            cusmob: 8765432101,
            rejectionReason: "Insufficient income proof"
        },
        {
            LoanNumber: "RL002",
            Name: "Anita Desai",
            cusfname: "Anita",
            cussname: "Desai",
            Amount: 250000,
            Type: "Gold",
            Tenure: 24,
            status: 2,
            interest: 10,
            cusaadhaar: "2345-6789-0123",
            cusmob: 9876543210,
            ornaments: [
                {
                    ornamentType: "Chain",
                    netWeight: 15.5,
                    grsWeight: 16,
                    purity: "18K",
                    remark: "Low purity"
                }
            ],
            totalValue: 150000,
            eligibleAmount: 120000,
            rejectionReason: "Low purity gold"
        }
    ],
    pendingExpenses: [
        {
            payment_date: new Date('2024-03-15'),
            amount: 25000,
            remark: 'Office Rent March 2024',
            status: 0,
            note: 'Monthly office rent payment'
        },
        {
            payment_date: new Date('2024-03-16'),
            amount: 15000,
            remark: 'Utility Bills',
            status: 0,
            note: 'Electricity and water bills'
        },
        {
            payment_date: new Date('2024-03-17'),
            amount: 8500,
            remark: 'Office Supplies',
            status: 0,
            note: 'Stationery and printer cartridges'
        }
    ],
    rejectedExpenses: [
        {
            payment_date: new Date('2024-03-10'),
            amount: 45000,
            remark: 'Marketing Campaign',
            status: 2,
            note: 'Budget exceeded - needs revision'
        },
        {
            payment_date: new Date('2024-03-12'),
            amount: 12000,
            remark: 'Team Lunch',
            status: 2,
            note: 'Non-essential expense - rejected'
        },
        {
            payment_date: new Date('2024-03-14'),
            amount: 30000,
            remark: 'Software License',
            status: 2,
            note: 'Duplicate request - already purchased'
        }
    ]
};

const insertSampleData = async () => {
    try {
        await connectDB();
        console.log('Connected to database');

        // Insert loan data without clearing existing data
        const verifiedResults = await VerifiedLoan.insertMany(sampleData.verifiedLoans, { ordered: false });
        console.log('Inserted verified loans:', verifiedResults.length);

        const pendingResults = await PendingLoan.insertMany(sampleData.pendingLoans, { ordered: false });
        console.log('Inserted pending loans:', pendingResults.length);

        const rejectedResults = await RejectedLoan.insertMany(sampleData.rejectedLoans, { ordered: false });
        console.log('Inserted rejected loans:', rejectedResults.length);

        // Insert expense data without clearing existing data
        const pendingExpResults = await PendingExpense.insertMany(sampleData.pendingExpenses, { ordered: false });
        console.log('Inserted pending expenses:', pendingExpResults.length);

        const rejectedExpResults = await RejectedExpense.insertMany(sampleData.rejectedExpenses, { ordered: false });
        console.log('Inserted rejected expenses:', rejectedExpResults.length);

        // Verify the data
        const verifiedCount = await VerifiedLoan.countDocuments();
        const pendingCount = await PendingLoan.countDocuments();
        const rejectedCount = await RejectedLoan.countDocuments();
        const pendingExpCount = await PendingExpense.countDocuments();
        const rejectedExpCount = await RejectedExpense.countDocuments();

        console.log(`\nVerification Results:`);
        console.log(`Verified Loans Count: ${verifiedCount}`);
        console.log(`Pending Loans Count: ${pendingCount}`);
        console.log(`Rejected Loans Count: ${rejectedCount}`);
        console.log(`Pending Expenses Count: ${pendingExpCount}`);
        console.log(`Rejected Expenses Count: ${rejectedExpCount}`);

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');

    } catch (error) {
        console.error('Error:', error);
        if (error.writeErrors) {
            console.log('Some documents may be duplicates and were skipped');
        }
        await mongoose.connection.close();
    }
};

// Run the insertion
insertSampleData(); 