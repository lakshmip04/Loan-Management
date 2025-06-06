const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, Member, Loan, Payment } = require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both server and React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
connectDB();

// API Routes
// Members API
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findOne({ memberID: req.params.id });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/members', async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Loans API
app.get('/api/loans', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/loans/:id', async (req, res) => {
  try {
    const loan = await Loan.findOne({ loanID: req.params.id });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Get member details
    const member = await Member.findOne({ memberID: loan.memberID });
    
    // Get payment history
    const payments = await Payment.find({ loanID: req.params.id }).sort({ date: -1 });
    
    // Format the response
    const response = {
      ...loan.toObject(),
      memberName: member ? member.name : 'Unknown Member',
      payments: payments.map(payment => ({
        date: payment.date,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        transactionID: payment.transactionID,
        remarks: payment.remarks
      }))
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/loans/member/:memberID', async (req, res) => {
  try {
    const loans = await Loan.find({ memberID: req.params.memberID });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/loans', async (req, res) => {
  const loan = new Loan(req.body);
  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 