import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50">
              <i className="fas fa-file-invoice-dollar text-custom"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
              <p className="text-2xl font-semibold text-gray-900">2,451</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50">
              <i className="fas fa-money-bill-wave text-green-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Today's Payments</h3>
              <p className="text-2xl font-semibold text-gray-900">Rs.12,675</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-50">
              <i className="fas fa-clock text-yellow-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Applications</h3>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-50">
              <i className="fas fa-exclamation-circle text-red-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Due Payments</h3>
              <p className="text-2xl font-semibold text-gray-900">124</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/new-member" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-user-plus mr-2"></i>
                New Member
              </Link>
              <Link to="/members" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-file-alt mr-2"></i>
                New Loan
              </Link>
              <button className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-money-check-alt mr-2"></i>
                Record Payment
              </button>
              <Link to="/search" className="!rounded-button flex items-center justify-center px-4 py-3 bg-custom text-white text-sm font-medium hover:bg-indigo-600">
                <i className="fas fa-search mr-2"></i>
                Search Members
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                    <i className="fas fa-check text-green-600"></i>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Payment Received</p>
                  <p className="text-sm text-gray-500">Rs.2,500 from John Smith</p>
                  <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <i className="fas fa-user-plus text-blue-600"></i>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New Member Added</p>
                  <p className="text-sm text-gray-500">Sarah Johnson registered</p>
                  <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
                    <i className="fas fa-file-alt text-yellow-600"></i>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Loan Application</p>
                  <p className="text-sm text-gray-500">New application from Michael Brown</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-02-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">L-2024-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs.2,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-02-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">L-2024-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rs.1,800</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 