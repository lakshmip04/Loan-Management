import React, { useState } from 'react';

function ExpenseApprovals() {
  const [selectedExpenses, setSelectedExpenses] = useState(new Set());

  const expenses = [
    {
      id: 'EXP001',
      department: 'Finance',
      requestedBy: 'John Smith',
      category: 'Office Supplies',
      amount: '₹15,000',
      date: '2024-03-15',
      description: 'Monthly office supplies and stationery',
      status: 'Pending'
    },
    {
      id: 'EXP002',
      department: 'IT',
      requestedBy: 'Jane Wilson',
      category: 'Equipment',
      amount: '₹75,000',
      date: '2024-03-15',
      description: 'New laptop for development team',
      status: 'Pending'
    },
    {
      id: 'EXP003',
      department: 'Operations',
      requestedBy: 'Mike Brown',
      category: 'Maintenance',
      amount: '₹25,000',
      date: '2024-03-14',
      description: 'Office AC maintenance and repairs',
      status: 'Pending'
    }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedExpenses(new Set(expenses.map(expense => expense.id)));
    } else {
      setSelectedExpenses(new Set());
    }
  };

  const handleSelect = (expenseId) => {
    const newSelected = new Set(selectedExpenses);
    if (newSelected.has(expenseId)) {
      newSelected.delete(expenseId);
    } else {
      newSelected.add(expenseId);
    }
    setSelectedExpenses(newSelected);
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
        <h1 className="text-2xl font-bold text-gray-900">Expense Approvals</h1>
        <p className="mt-1 text-gray-500">Review and approve expense requests</p>
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
                  checked={selectedExpenses.size === expenses.length}
                  onChange={handleSelectAll}
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <button
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={selectedExpenses.size === 0}
                onClick={handleBulkApprove}
              >
                Approve Selected
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={selectedExpenses.size === 0}
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

          {/* Expenses Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                        checked={selectedExpenses.has(expense.id)}
                        onChange={() => handleSelect(expense.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{expense.department}</div>
                      <div className="text-sm text-gray-500">{expense.requestedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          // Handle review action
                        }}
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

export default ExpenseApprovals; 