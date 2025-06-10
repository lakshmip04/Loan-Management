import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { members } from '../services/api';

function NewMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    cusfname: '',
    cussname: '',
    cusdob: '',
    cusgen: '',
    cusmob: '',
    cusadd: '',
    cusaadhaar: '',
    fee: '',
    reference: 'SELF',
    Date: new Date().toISOString().split('T')[0],
    cibil: '',
    category: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the data according to our API requirements
      const memberData = {
        ...formData,
        cusmob: Number(formData.cusmob),
        fee: Number(formData.fee),
        cibil: Number(formData.cibil),
        category: Number(formData.category),
        // Ensure proper date format
        cusdob: new Date(formData.cusdob).toISOString(),
        Date: new Date(formData.Date).toISOString()
      };

      // Send data to the API
      const response = await members.create(memberData);

      if (response.data.success) {
        // Show success message
        alert('Member registered successfully!');
        // Redirect to members list or show success page
        navigate('/members');
      } else {
        throw new Error(response.data.error || 'Failed to register member');
      }
    } catch (err) {
      console.error('Error registering member:', err);
      setError(err.response?.data?.error || err.message || 'Failed to register member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Member Registration</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* Personal Details Section */}
        <div className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                required
                pattern="[A-Za-z ]+"
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="Enter first name"
                value={formData.cusfname}
                onChange={(e) => setFormData({...formData, cusfname: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                required
                pattern="[A-Za-z ]+"
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="Enter last name"
                value={formData.cussname}
                onChange={(e) => setFormData({...formData, cussname: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                value={formData.cusdob}
                onChange={(e) => setFormData({...formData, cusdob: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Aadhar Card Number *</label>
              <input
                type="text"
                required
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="XXXX-XXXX-XXXX"
                value={formData.cusaadhaar}
                onChange={(e) => setFormData({...formData, cusaadhaar: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">Gender *</label>
              <div className="space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-5 h-5 text-custom focus:ring-custom"
                    required
                    checked={formData.cusgen === 'male'}
                    onChange={(e) => setFormData({...formData, cusgen: e.target.value})}
                  />
                  <span className="ml-2 text-base">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-5 h-5 text-custom focus:ring-custom"
                    checked={formData.cusgen === 'female'}
                    onChange={(e) => setFormData({...formData, cusgen: e.target.value})}
                  />
                  <span className="ml-2 text-base">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="w-5 h-5 text-custom focus:ring-custom"
                    checked={formData.cusgen === 'other'}
                    onChange={(e) => setFormData({...formData, cusgen: e.target.value})}
                  />
                  <span className="ml-2 text-base">Other</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 !rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-base h-12">+91</span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="flex-1 h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-r-lg !rounded-l-none"
                  placeholder="Enter mobile number"
                  value={formData.cusmob}
                  onChange={(e) => setFormData({...formData, cusmob: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">CIBIL Score</label>
              <input
                type="number"
                min="300"
                max="900"
                required
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="Enter CIBIL score"
                value={formData.cibil}
                onChange={(e) => setFormData({...formData, cibil: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-base font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                required
                rows="4"
                className="w-full border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="Enter full address"
                value={formData.cusadd}
                onChange={(e) => setFormData({...formData, cusadd: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Registration Details Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Registration Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Registration Date</label>
              <input
                type="date"
                value={formData.Date}
                className="w-full h-12 border-gray-300 bg-gray-50 cursor-not-allowed text-base !rounded-lg"
                disabled
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Registration Fee *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 !rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-base h-12">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="flex-1 h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-r-lg !rounded-l-none"
                  placeholder="Enter fee amount"
                  value={formData.fee}
                  onChange={(e) => setFormData({...formData, fee: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Reference</label>
              <input
                type="text"
                className="w-full h-12 border-gray-300 focus:border-custom focus:ring-custom text-base !rounded-lg"
                placeholder="Enter reference (optional)"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-6 pt-8">
          <button
            type="reset"
            onClick={() => {
              setFormData({
                cusfname: '',
                cussname: '',
                cusdob: '',
                cusgen: '',
                cusmob: '',
                cusadd: '',
                cusaadhaar: '',
                fee: '',
                reference: 'SELF',
                Date: new Date().toISOString().split('T')[0],
                cibil: '',
                category: 0
              });
              setError(null);
            }}
            className="!rounded-lg px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            disabled={loading}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="!rounded-lg px-6 py-3 text-base font-medium text-white bg-custom hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMember; 