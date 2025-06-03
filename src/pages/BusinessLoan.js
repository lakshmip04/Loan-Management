import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function BusinessLoan() {
  const location = useLocation();
  const member = location.state?.member;
  const scheme = location.state?.scheme;

  // Form state
  const [loanType, setLoanType] = useState('Type A - Personal Loan');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);

  // Guarantor state
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorEmail, setGuarantorEmail] = useState('');
  const [guarantorRelationship, setGuarantorRelationship] = useState('');
  const [guarantorContact, setGuarantorContact] = useState('');

  // Charges state
  const [processingFee, setProcessingFee] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(100);
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [newCharge, setNewCharge] = useState('');

  // Customer details
  const customerDetails = {
    firstName: member?.name?.split(' ')[0] || "John",
    lastName: member?.name?.split(' ')[1] || "Smith",
    aadhaar: member?.aadhar || "1234-5678-9012",
    mobile: member?.mobile || "+91 9876543210",
    cibilScore: 350,
    address: "123 Main Street, Bangalore, Karnataka, 560001",
    registrationDate: "2023-05-15",
    receiptId: member?.id || "R-2023-0042",
    accountNumber: "ACCT-00123456",
  };

  // Calculate processing fee when loan amount changes
  React.useEffect(() => {
    if (loanAmount) {
      const fee = Number(loanAmount) * 0.02;
      setProcessingFee(Math.round(fee));
    } else {
      setProcessingFee(0);
    }
  }, [loanAmount]);

  const addAdditionalCharge = () => {
    if (newCharge && !isNaN(newCharge)) {
      setAdditionalCharges([...additionalCharges, Number(newCharge)]);
      setNewCharge('');
    }
  };

  const removeAdditionalCharge = (index) => {
    const updatedCharges = [...additionalCharges];
    updatedCharges.splice(index, 1);
    setAdditionalCharges(updatedCharges);
  };

  const totalAdditionalCharges = additionalCharges.reduce((sum, charge) => sum + charge, 0);
  const totalCharges = processingFee + serviceCharge + totalAdditionalCharges;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Business Loan Application</h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">CIBIL Score</label>
            <div className="flex items-center space-x-2">
              <input type="text" value={customerDetails.cibilScore} readOnly className="w-20 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-400" style={{ width: `${(customerDetails.cibilScore / 900) * 100}%` }}></div>
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

      {/* Guarantor Details Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow mb-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Guarantor Details</h2>
        <p className="text-sm text-gray-500 mb-6">Please provide guarantor information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={guarantorName}
              onChange={(e) => setGuarantorName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={guarantorEmail}
              onChange={(e) => setGuarantorEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <input
              type="text"
              value={guarantorRelationship}
              onChange={(e) => setGuarantorRelationship(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              value={guarantorContact}
              onChange={(e) => setGuarantorContact(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
            />
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
                  <option value="Scheme 1 - Business Loan">Scheme 1 - Business Loan</option>
                  <option value="Scheme 2 - Business Loan">Scheme 2 - Business Loan</option>
                  <option value="Scheme 3 - Business Loan">Scheme 3 - Business Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Purpose</label>
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Charges</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Processing Fee (2%)</span>
                    <span className="font-semibold">₹ {processingFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Service Charge</span>
                    <span className="font-semibold">₹ {serviceCharge.toLocaleString()}</span>
                  </div>

                  {additionalCharges.map((charge, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Additional Charge {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">₹ {charge.toLocaleString()}</span>
                        <button
                          onClick={() => removeAdditionalCharge(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={newCharge}
                      onChange={(e) => setNewCharge(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                      placeholder="Enter additional charge"
                    />
                    <button
                      onClick={addAdditionalCharge}
                      className="bg-custom text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex justify-between font-bold">
                  <span>Total Additional Charges</span>
                  <span>₹ {totalAdditionalCharges.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Charges</span>
                  <span>₹ {totalCharges.toLocaleString()}</span>
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

export default BusinessLoan;
