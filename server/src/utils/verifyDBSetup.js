const mongoose = require('mongoose');
const connectDB = require('../config/database');
const VerifiedLoan = require('../models/verifiedloan');

const verifySetup = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Get the current database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Connected to database: ${dbName}`);

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Verify the verified_loan collection exists
    const verifiedLoanCollection = collections.find(c => c.name === 'verified_loan');
    if (verifiedLoanCollection) {
      console.log('verified_loan collection exists');
      
      // Count documents in the collection
      const count = await VerifiedLoan.countDocuments();
      console.log(`Number of documents in verified_loan collection: ${count}`);
    } else {
      console.log('verified_loan collection does not exist');
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error during verification:', error);
  }
};

// Run the verification
verifySetup(); 