const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine upload directory based on file type
    let uploadDir = 'uploads/';
    
    switch (file.fieldname) {
      case 'loanDocuments':
        uploadDir += 'loan-documents/';
        break;
      case 'customerDocuments':
        uploadDir += 'customer-documents/';
        break;
      case 'expenseReceipts':
        uploadDir += 'expense-receipts/';
        break;
      default:
        uploadDir += 'others/';
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Define allowed file types based on fieldname
  const allowedTypes = {
    loanDocuments: ['.jpg', '.jpeg', '.png', '.pdf'],
    customerDocuments: ['.jpg', '.jpeg', '.png', '.pdf'],
    expenseReceipts: ['.jpg', '.jpeg', '.png', '.pdf', '.xlsx', '.xls'],
    default: ['.jpg', '.jpeg', '.png', '.pdf']
  };

  // Get allowed types for this field
  const types = allowedTypes[file.fieldname] || allowedTypes.default;
  const ext = path.extname(file.originalname).toLowerCase();

  if (types.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${types.join(', ')}`));
  }
};

// Create multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB default
    files: 5 // Maximum 5 files per request
  }
});

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'Too many files. Maximum is 5 files.'
      });
    }
    return res.status(400).json({
      message: `Upload error: ${err.message}`
    });
  }
  
  if (err) {
    return res.status(400).json({
      message: err.message
    });
  }
  
  next();
};

// Clean up middleware to remove files on error
const cleanupOnError = (req, res, next) => {
  const files = req.files;
  
  // Add cleanup to response object
  res.on('finish', () => {
    if (res.statusCode >= 400 && files) {
      // Remove uploaded files if there was an error
      if (Array.isArray(files)) {
        files.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error removing file:', err);
          });
        });
      } else {
        Object.values(files).forEach(fileArray => {
          fileArray.forEach(file => {
            fs.unlink(file.path, (err) => {
              if (err) console.error('Error removing file:', err);
            });
          });
        });
      }
    }
  });
  
  next();
};

module.exports = {
  upload,
  handleUploadError,
  cleanupOnError
}; 