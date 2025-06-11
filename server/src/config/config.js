require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5001,
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  },
  
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://lp1304:easyfin123@loanmangement.k0lomvq.mongodb.net/easyfin?retryWrites=true&w=majority&appName=loanMangement'
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  }
};

module.exports = config; 