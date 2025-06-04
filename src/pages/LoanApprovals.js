import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoanApprovals({ type = 'all' }) {
  const navigate = useNavigate();
  const [selectedLoans, setSelectedLoans] = useState(new Set());

  const loans = [
    {
      id: 'LOAN001',
      memberName: 'John Doe',
      memberId: 'MEM001',
      type: 'Gold',
      amount: '₹50,000',
      date: '2024-03-15',
      collateral: 'Gold - 15g',
      status: 'Pending'
    },
    {
      id: 'LOAN002',
      memberName: 'Jane Smith',
      memberId: 'MEM002',
      type: 'Personal',
      amount: '₹1,00,000',
      date: '2024-03-14',
      status: 'Pending'
    },
    {
      id: 'LOAN003',
      memberName: 'Mike Johnson',
      memberId: 'MEM003',
      type: 'Gold',
      amount: '₹75,000',
      date: '2024-03-14',
      collateral: 'Gold - 22g',
      status: 'Pending'
    }
  ].filter(loan => type === 'all' || loan.type.toLowerCase() === type.toLowerCase());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLoans(new Set(loans.map(loan => loan.id)));
    } else {
      setSelectedLoans(new Set());
    }
  };

  const handleSelect = (loanId) => {
    const newSelected = new Set(selectedLoans);
    if (newSelected.has(loanId)) {
      newSelected.delete(loanId);
    } else {
      newSelected.add(loanId);
    }
    setSelectedLoans(newSelected);
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
        <h1 className="text-2xl font-bold text-gray-900">
          {type === 'all' ? 'Loan Approvals' : `${type.charAt(0).toUpperCase() + type.slice(1)} Loan Approvals`}
        </h1>
        <p className="mt-1 text-gray-500">Review and approve pending loan applications</p>
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
                  checked={selectedLoans.size === loans.length}
                  onChange={handleSelectAll}
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <button
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={selectedLoans.size === 0}
                onClick={handleBulkApprove}
              >
                Approve Selected
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={selectedLoans.size === 0}
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

          {/* Loans Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan ID
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
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                        checked={selectedLoans.has(loan.id)}
                        onChange={() => handleSelect(loan.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {loan.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{loan.memberName}</div>
                      <div className="text-sm text-gray-500">{loan.memberId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {loan.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {loan.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {loan.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate('/loan-details', { state: { loanId: loan.id } })}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
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

export default LoanApprovals; 