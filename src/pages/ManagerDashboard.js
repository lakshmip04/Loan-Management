import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ManagerDashboard() {
  const navigate = useNavigate();

  const stats = {
    activeLoans: 2451,
    todaysPayments: '₹12,675',
    pendingApplications: 18,
    duePayments: 124
  };

  const recentActivity = [
    {
      id: 1,
      type: 'Payment Approval',
      description: 'Rs.2,500 from John Smith',
      time: '2 minutes ago',
      icon: 'fas fa-check',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 2,
      type: 'Loan Approval',
      description: 'Gold loan application from Sarah Johnson',
      time: '15 minutes ago',
      icon: 'fas fa-file-alt',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      type: 'Fund Transfer',
      description: 'Rs.50,000 to Branch #123',
      time: '1 hour ago',
      icon: 'fas fa-exchange-alt',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  const recentPayments = [
    {
      date: '2024-02-20',
      memberName: 'John Smith',
      loanId: 'L-2024-001',
      amount: '₹2,500',
      status: 'Approved'
    },
    {
      date: '2024-02-20',
      memberName: 'Sarah Johnson',
      loanId: 'L-2024-002',
      amount: '₹1,800',
      status: 'Pending'
    }
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50">
              <i className="fas fa-file-invoice-dollar text-custom"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-500">Active Loans</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeLoans}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50">
              <i className="fas fa-money-bill-wave text-green-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-500">Today's Payments</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.todaysPayments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-50">
              <i className="fas fa-clock text-yellow-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-500">Pending Applications</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingApplications}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-50">
              <i className="fas fa-exclamation-circle text-red-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-500">Due Payments</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.duePayments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/loan-approvals" className="!rounded-button flex items-center justify-center px-5 py-4 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-check-circle mr-2"></i>
                Loan Approval
              </Link>
              <Link to="/fund-transfer" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-exchange-alt mr-2"></i>
                Fund Transfer
              </Link>
              <Link to="/payment-approvals" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-file-invoice mr-2"></i>
                Payment Approval
              </Link>
              <Link to="/search-members" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-search mr-2"></i>
                Search Members
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${activity.iconBg}`}>
                      <i className={`${activity.icon} ${activity.iconColor}`}></i>
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{activity.type}</p>
                    <p className="text-lg text-gray-500">{activity.description}</p>
                    <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.memberName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.loanId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
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

export default ManagerDashboard; 