import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";

function LoanDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { loanId, memberId, memberName } = location.state || { 
    loanId: 'L-10001', 
    memberId: 'MEM-10001',
    memberName: 'John Smith'
  };

  // Mock loan data - matching the member data structure from SearchMembers
  const loan = {
    loanID: loanId,
    memberID: memberId,
    memberName: memberName,
    amount: 50000,
    interestRate: 12,
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    status: "Active",
    payments: [
      {
        date: "2024-02-20",
        amount: 2500,
        status: "Completed",
        transactionID: "TXN001"
      },
      {
        date: "2024-01-20",
        amount: 2500,
        status: "Completed",
        transactionID: "TXN002"
      }
    ]
  };

  // Mock member data - matching SearchMembers structure
  const member = {
    id: memberId,
    name: memberName,
    customerId: "67890",
    mobile: "9876543210",
    aadhar: "123456789012",
    status: "Active",
    lastLoan: `₹${loan.amount.toLocaleString()}`
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin text-blue-500 text-2xl">⌛</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Loan Details</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage loan information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Member Information */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Member Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Member ID</p>
                  <p className="text-sm font-medium text-gray-900">{member.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="text-sm font-medium text-gray-900">{member.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aadhar</p>
                  <p className="text-sm font-medium text-gray-900">{member.aadhar}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {member.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Loan ID</p>
                  <p className="text-sm font-medium text-gray-900">{loan.loanID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="text-sm font-medium text-gray-900">₹{loan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="text-sm font-medium text-gray-900">{loan.interestRate}% per annum</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(loan.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(loan.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      loan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {loan.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mt-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loan.payments.map((payment) => (
                      <tr key={payment.transactionID}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.transactionID}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                      </td>
                    </tr>
                    ))}
                    {loan.payments.length === 0 && (
                    <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No payment records found
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Button 
                  className="w-full !rounded-button flex items-center justify-center"
                  variant="default"
                >
                  <i className="fas fa-money-check-alt mr-2"></i>
                  Record Payment
                </Button>
                <Button 
                  className="w-full !rounded-button flex items-center justify-center"
                  variant="default"
                >
                  <i className="fas fa-file-alt mr-2"></i>
                  Generate Statement
                </Button>
                <Button 
                  className="w-full !rounded-button flex items-center justify-center"
                  variant="default"
                >
                  <i className="fas fa-print mr-2"></i>
                  Print Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails; 