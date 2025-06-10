const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lp1304:easyfin123@loanmangement.k0lomvq.mongodb.net/easyfin?retryWrites=true&w=majority';
    
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Connection URI:', mongoURI.replace(/:[^:]*@/, ':****@'));

    const conn = await mongoose.connect(mongoURI, {
      dbName: 'easyfin', // Explicitly set the database name
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    
    // List all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

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