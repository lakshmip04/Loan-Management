import React, { useState } from 'react';

function Payments() {
  const [payments] = useState([
    {
      id: 'PMT001',
      memberName: 'John Smith',
      loanId: 'L-2024-001',
      amount: '₹2,500',
      date: '2024-03-15',
      status: 'Completed',
      type: 'EMI'
    },
    {
      id: 'PMT002',
      memberName: 'Sarah Johnson',
      loanId: 'L-2024-002',
      amount: '₹1,800',
      date: '2024-03-15',
      status: 'Pending',
      type: 'EMI'
    },
    {
      id: 'PMT003',
      memberName: 'Michael Brown',
      loanId: 'L-2024-003',
      amount: '₹3,200',
      date: '2024-03-14',
      status: 'Completed',
      type: 'Interest'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="mt-1 text-gray-500">Manage and track loan payments</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium rounded-lg hover:bg-indigo-600">
              <i className="fas fa-plus-circle mr-2"></i>
              Record New Payment
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium rounded-lg hover:bg-indigo-600">
              <i className="fas fa-file-invoice mr-2"></i>
              Generate Payment Report
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium rounded-lg hover:bg-indigo-600">
              <i className="fas fa-clock mr-2"></i>
              View Payment Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search payments..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">All Types</option>
                <option value="emi">EMI</option>
                <option value="interest">Interest</option>
                <option value="penalty">Penalty</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.memberName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.loanId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Print</button>
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

export default Payments; 