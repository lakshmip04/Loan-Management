# Loan Management System

A web-based loan management system with MongoDB database.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Make sure MongoDB is running on your local machine or update the MongoDB connection string in `src/db.js`
4. Start the application
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Features

- Member management
- Loan application and tracking
- Search functionality
- Member and loan details

## MongoDB Connection

The application connects to MongoDB using Mongoose. The default connection string is:
```
mongodb://localhost:27017/loanManagement
```

If you want to use a different MongoDB instance, update the `MONGODB_URI` variable in the `src/db.js` file.

## API Endpoints

### Members
- GET `/api/members` - Get all members
- GET `/api/members/:id` - Get member by ID
- POST `/api/members` - Create a new member

### Loans
- GET `/api/loans` - Get all loans
- GET `/api/loans/member/:memberID` - Get loans by member ID
- POST `/api/loans` - Create a new loan