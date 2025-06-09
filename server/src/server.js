const app = require('./app');
const config = require('./config/config');
const fs = require('fs');
const path = require('path');

// Create required directories
const dirs = [
  'uploads',
  'uploads/loan-documents',
  'uploads/customer-documents',
  'uploads/expense-receipts',
  'uploads/others'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, '../../', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
}); 