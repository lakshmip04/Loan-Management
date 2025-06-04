import React, { useState } from 'react';

function PaymentApprovals() {
  const [selectedPayments, setSelectedPayments] = useState(new Set());

  const payments = [
    {
      id: 'PAY001',
      memberName: 'John Doe',
      memberId: 'MEM001',
      type: 'EMI Payment',
      amount: '₹5,000',
      date: '2024-03-15',
      loanId: 'LOAN001',
      status: 'Pending'
    },
    {
      id: 'PAY002',
      memberName: 'Jane Smith',
      memberId: 'MEM002',
      type: 'Loan Disbursement',
      amount: '₹50,000',
      date: '2024-03-15',
      loanId: 'LOAN002',
      status: 'Pending'
    },
    {
      id: 'PAY003',
      memberName: 'Mike Johnson',
      memberId: 'MEM003',
      type: 'EMI Payment',
      amount: '₹7,500',
      date: '2024-03-14',
      loanId: 'LOAN003',
      status: 'Pending'
    }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPayments(new Set(payments.map(payment => payment.id)));
    } else {
      setSelectedPayments(new Set());
    }
  };

  const handleSelect = (paymentId) => {
    const newSelected = new Set(selectedPayments);
    if (newSelected.has(paymentId)) {
      newSelected.delete(paymentId);
    } else {
      newSelected.add(paymentId);
    }
    setSelectedPayments(newSelected);
  };

  const handleBulkApprove = () => {
    // Handle bulk approve logic
  };

  const handleBulkReject = () => {
    // Handle bulk reject logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Approvals</h1>
        <p className="mt-1 text-gray-500">Review and approve pending payments</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedPayments.size === payments.length}
                  onChange={handleSelectAll}
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <button
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={selectedPayments.size === 0}
                onClick={handleBulkApprove}
              >
                Approve Selected
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={selectedPayments.size === 0}
                onClick={handleBulkReject}
              >
                Reject Selected
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Filter
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Export
              </button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                        checked={selectedPayments.has(payment.id)}
                        onChange={() => handleSelect(payment.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.memberName}</div>
                      <div className="text-sm text-gray-500">{payment.memberId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.loanId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentApprovals; 