import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useLocation } from "react-router-dom";

function GoldLoanSearch() {
  const [searchType, setSearchType] = useState('aadhaar');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member;

  const [customerDetails, setCustomerDetails] = useState({
    firstName: member?.name?.split(' ')[0] || "",
    lastName: member?.name?.split(' ')[1] || "",
    aadhaar: member?.aadhar || "",
    mobile: member?.mobile || "",
    // ...other fields as needed
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    let query = supabase.from('gold_loans').select('*');
    if (searchType === 'aadhaar') {
      query = query.eq('aadhaar', searchValue);
    } else if (searchType === 'mobile') {
      query = query.eq('mobile', searchValue);
    } else if (searchType === 'receipt') {
      query = query.eq('receipt_id', searchValue);
    }
    const { data, error } = await query;
    if (error) setError('Error fetching data');
    else setResults(data);
    setLoading(false);
  };

  const handleApplyLoan = (member) => {
    if (loanType === "Gold Loan") {
      navigate("/gold", { state: { member } });
    }
    // Add similar logic for other loan types if needed
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Gold Loan Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="aadhaar">Aadhaar</option>
          <option value="mobile">Mobile</option>
          <option value="receipt">Receipt ID</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder={`Enter ${searchType}`}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-custom text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 disabled:opacity-50"
          disabled={loading || !searchValue}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Gross Weight</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Net Weight</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Purity</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Gold Value (₹)</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Eligible Amount (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Receipt ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.type}</td>
                    <td className="px-4 py-2">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.type} className="h-12 w-12 object-cover rounded-md" />
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.gross_weight}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.net_weight}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.purity}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">₹ {item.gold_value?.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">₹ {item.eligible_amount?.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.remarks}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.receipt_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Button
        variant="default"
        size="sm"
        className="!rounded-button whitespace-nowrap cursor-pointer"
        onClick={() => handleApplyLoan(member)}
      >
        <i className="fas fa-plus-circle mr-1"></i> Apply Loan
      </Button>
    </div>
  );
}

export default GoldLoanSearch; 