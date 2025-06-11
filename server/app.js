const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config/config');
const memberRoutes = require('./src/routes/members');

const app = express();

// MongoDB Connection using config
mongoose.connect(config.mongodb.uri)
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/members', memberRoutes);

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', port: process.env.PORT || 5002 });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

module.exports = app; 