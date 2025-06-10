const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://lp1304:easyfin123@loanmangement.k0lomvq.mongodb.net/easyfin';
    
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Connection URI:', mongoURI.replace(/:[^:]*@/, ':****@'));

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.db.databaseName}`);
    
    // List all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Create the verified_loan collection if it doesn't exist
    const collectionExists = collections.some(c => c.name === 'verified_loan');
    if (!collectionExists) {
      console.log('Creating verified_loan collection...');
      await conn.connection.db.createCollection('verified_loan');
      console.log('verified_loan collection created successfully');
    }

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 