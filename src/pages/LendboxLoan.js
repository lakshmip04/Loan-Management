import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function LendboxLoan() {
  const location = useLocation();
  const member = location.state?.member;
  const scheme = location.state?.scheme;

  // Form state
  const [loanType, setLoanType] = useState('Personal Loan');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [repaymentPeriod, setRepaymentPeriod] = useState('12');
  const [interestRate, setInterestRate] = useState(12);
  const [processingFee, setProcessingFee] = useState(0);
  const [emiAmount, setEmiAmount] = useState(0);

  // Customer details
  const customerDetails = {
    firstName: member?.name?.split(' ')[0] || "John",
    lastName: member?.name?.split(' ')[1] || "Smith",
    aadhaar: member?.aadhar || "1234-5678-9012",
    mobile: member?.mobile || "+91 9876543210",
    civilScore: 750,
    address: "123 Main Street, Bangalore, Karnataka, 560001",
    registrationDate: "2023-05-15",
    receiptId: member?.id || "R-2023-0042",
    accountNumber: "ACCT-00123456",
  };

  // Calculate EMI when loan amount or repayment period changes
  React.useEffect(() => {
    if (loanAmount && repaymentPeriod) {
      const principal = Number(loanAmount);
      const months = Number(repaymentPeriod);
      const monthlyRate = interestRate / 100 / 12;

      if (principal > 0 && months > 0 && monthlyRate > 0) {
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                  (Math.pow(1 + monthlyRate, months) - 1);
        setEmiAmount(Math.round(emi));

        // Calculate processing fee (1% of loan amount)
        setProcessingFee(Math.round(principal * 0.01));
      }
    }
  }, [loanAmount, repaymentPeriod, interestRate]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Lendbox Loan Application</h1>
      </div>

      {/* Customer Details Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow mb-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Customer Details</h2>
        <p className="text-sm text-gray-500 mb-6">Automatically fetched from the system</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={`${customerDetails.firstName} ${customerDetails.lastName}`} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input type="text" value={customerDetails.aadhaar} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input type="text" value={customerDetails.mobile} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Civil Score</label>
            <div className="flex items-center space-x-2">
              <input type="text" value={customerDetails.civilScore} readOnly className="w-20 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-400" style={{ width: `${(customerDetails.civilScore / 900) * 100}%` }}></div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
            <input type="text" value={customerDetails.registrationDate} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt ID</label>
            <input type="text" value={customerDetails.receiptId} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={customerDetails.address} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input type="text" value={customerDetails.accountNumber} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
        </div>
      </div>

      {/* Loan Details Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Type</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Education Loan">Education Loan</option>
                  <option value="Home Loan">Home Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Purpose</label>
                <input
                  type="text"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                  placeholder="Enter loan purpose"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Application Date</label>
                <input
                  type="date"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Repayment Period (months)</label>
                <select
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Loan Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="font-semibold">₹ {loanAmount ? Number(loanAmount).toLocaleString() : '0'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Processing Fee (1%)</span>
                    <span className="font-semibold">₹ {processingFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <span className="font-semibold">{interestRate}% per annum</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Repayment Period</span>
                    <span className="font-semibold">{repaymentPeriod} months</span>
                  </div>

                  <div className="border-t border-gray-200 my-3"></div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Monthly EMI</span>
                    <span>₹ {emiAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="!rounded-button bg-white text-gray-700 px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="!rounded-button bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700">
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendboxLoan;
