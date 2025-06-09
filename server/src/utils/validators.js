const validateLoanApplication = (data) => {
  const errors = {};

  // Customer name validation
  if (!data.customerName) {
    errors.customerName = 'Customer name is required';
  } else if (data.customerName.length < 3) {
    errors.customerName = 'Customer name must be at least 3 characters long';
  }

  // Loan amount validation
  if (!data.loanAmount) {
    errors.loanAmount = 'Loan amount is required';
  } else if (isNaN(data.loanAmount) || data.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be a positive number';
  }

  // Interest rate validation
  if (!data.interestRate) {
    errors.interestRate = 'Interest rate is required';
  } else if (isNaN(data.interestRate) || data.interestRate < 0) {
    errors.interestRate = 'Interest rate must be a non-negative number';
  }

  // Tenure validation
  if (!data.tenure) {
    errors.tenure = 'Tenure is required';
  } else if (!Number.isInteger(data.tenure) || data.tenure <= 0) {
    errors.tenure = 'Tenure must be a positive integer';
  }

  // EMI amount validation
  if (!data.emiAmount) {
    errors.emiAmount = 'EMI amount is required';
  } else if (isNaN(data.emiAmount) || data.emiAmount <= 0) {
    errors.emiAmount = 'EMI amount must be a positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateCustomer = (data) => {
  const errors = {};

  // Name validation
  if (!data.name) {
    errors.name = 'Name is required';
  } else if (data.name.length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  // Phone validation
  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  // Email validation (optional)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Address validation
  if (data.address) {
    if (!data.address.city) {
      errors.city = 'City is required';
    }
    if (!data.address.state) {
      errors.state = 'State is required';
    }
    if (!data.address.pincode || !/^\d{6}$/.test(data.address.pincode)) {
      errors.pincode = 'Valid 6-digit pincode is required';
    }
  }

  // ID proof validation
  if (data.idProof) {
    if (!data.idProof.type) {
      errors.idProofType = 'ID proof type is required';
    }
    if (!data.idProof.number) {
      errors.idProofNumber = 'ID proof number is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateExpense = (data) => {
  const errors = {};

  // Expense type validation
  if (!data.expenseType) {
    errors.expenseType = 'Expense type is required';
  }

  // Amount validation
  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(data.amount) || data.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  // Description validation
  if (!data.description) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  // Payment method validation
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }

  // Payment details validation based on payment method
  if (data.paymentMethod === 'bank_transfer') {
    if (!data.paymentDetails?.bankName) {
      errors.bankName = 'Bank name is required';
    }
    if (!data.paymentDetails?.accountNumber) {
      errors.accountNumber = 'Account number is required';
    }
    if (!data.paymentDetails?.ifscCode) {
      errors.ifscCode = 'IFSC code is required';
    }
  } else if (data.paymentMethod === 'upi') {
    if (!data.paymentDetails?.upiId) {
      errors.upiId = 'UPI ID is required';
    }
  } else if (data.paymentMethod === 'cheque') {
    if (!data.paymentDetails?.chequeNumber) {
      errors.chequeNumber = 'Cheque number is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateGoldRate = (data) => {
  const errors = {};

  // Rate validation for 22K gold
  if (!data.rate22K) {
    errors.rate22K = '22K gold rate is required';
  } else if (isNaN(data.rate22K) || data.rate22K <= 0) {
    errors.rate22K = '22K gold rate must be a positive number';
  }

  // Rate validation for 24K gold
  if (!data.rate24K) {
    errors.rate24K = '24K gold rate is required';
  } else if (isNaN(data.rate24K) || data.rate24K <= 0) {
    errors.rate24K = '24K gold rate must be a positive number';
  }

  // Source validation
  if (!data.source) {
    errors.source = 'Rate source is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateLoanApplication,
  validateCustomer,
  validateExpense,
  validateGoldRate
}; 