import React, { useState } from 'react';

function ActivityFeed() {
  const [activities] = useState([
    {
      id: 1,
      type: 'Loan Application',
      member: 'John Doe',
      action: 'Applied for Gold Loan',
      amount: '₹50,000',
      timestamp: '2024-03-15 10:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Payment',
      member: 'Jane Smith',
      action: 'Made EMI Payment',
      amount: '₹5,000',
      timestamp: '2024-03-15 09:45 AM',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Member Update',
      member: 'Mike Johnson',
      action: 'Updated Contact Details',
      timestamp: '2024-03-14 03:15 PM',
      status: 'Completed'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Activity Feed</h1>
        <p className="mt-1 text-gray-500">Recent member activities and transactions</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Filter
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Export
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'Loan Application' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'Payment' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <i className={
                    activity.type === 'Loan Application' ? 'fas fa-file-invoice' :
                    activity.type === 'Payment' ? 'fas fa-money-bill-wave' :
                    'fas fa-user-edit'
                  }></i>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{activity.member}</h3>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{activity.action}</p>
                  {activity.amount && (
                    <p className="mt-1 text-sm font-medium text-gray-900">{activity.amount}</p>
                  )}
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>

                {activity.status === 'Pending' && (
                  <button className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    Review
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityFeed; 