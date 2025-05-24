import React, { useState } from 'react';

function NewMember() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    aadharNumber: '',
    gender: '',
    mobileNumber: '',
    cibilScore: '',
    address: '',
    registrationDate: new Date().toISOString().split('T')[0],
    miscCharges: '',
    transactionId: 'TXN' + Date.now(),
    accountType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">New Member Registration</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
        {/* Personal Details Section */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                pattern="[A-Za-z ]+"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                pattern="[A-Za-z ]+"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card Number *</label>
              <input
                type="text"
                required
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                placeholder="XXXX-XXXX-XXXX"
                value={formData.aadharNumber}
                onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="text-custom focus:ring-custom"
                    required
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  />
                  <span className="ml-2 text-sm">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="text-custom focus:ring-custom"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  />
                  <span className="ml-2 text-sm">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="text-custom focus:ring-custom"
                    checked={formData.gender === 'other'}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  />
                  <span className="ml-2 text-sm">Other</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 !rounded-l-button border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="flex-1 border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-r-button !rounded-l-none"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CIBIL Score</label>
              <input
                type="number"
                min="300"
                max="900"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                placeholder="Enter CIBIL score"
                value={formData.cibilScore}
                onChange={(e) => setFormData({...formData, cibilScore: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                required
                rows="3"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Registration Details Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Registration Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Registration</label>
              <input
                type="date"
                value={formData.registrationDate}
                className="w-full border-gray-300 bg-gray-50 cursor-not-allowed text-sm !rounded-button"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Miscellaneous Charges *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 !rounded-l-button border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="flex-1 border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-r-button !rounded-l-none"
                  placeholder="Enter amount"
                  value={formData.miscCharges}
                  onChange={(e) => setFormData({...formData, miscCharges: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID/Bill No</label>
              <input
                type="text"
                value={formData.transactionId}
                className="w-full border-gray-300 bg-gray-50 cursor-not-allowed text-sm !rounded-button"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type *</label>
              <select
                required
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-sm !rounded-button"
                value={formData.accountType}
                onChange={(e) => setFormData({...formData, accountType: e.target.value})}
              >
                <option value="">Select account type</option>
                <option value="A">Type A</option>
                <option value="B">Type B</option>
                <option value="C">Type C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="reset"
            onClick={() => setFormData({
              ...formData,
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              aadharNumber: '',
              gender: '',
              mobileNumber: '',
              cibilScore: '',
              address: '',
              miscCharges: '',
              accountType: ''
            })}
            className="!rounded-button px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="!rounded-button px-4 py-2 text-sm font-medium text-white bg-custom hover:bg-indigo-600"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMember; 