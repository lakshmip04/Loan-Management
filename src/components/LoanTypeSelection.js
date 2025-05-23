import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const LoanTypeSelection = () => {
  const navigate = useNavigate();

  const handleLoanTypeSelect = (loanType, scheme) => {
    navigate('/search-members', { 
      state: { 
        loanType,
        scheme 
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Select Loan Type</h1>
        <p className="mt-1 text-sm text-gray-500">Choose the type of loan you want to process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gold Loan Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Gold Loan</h2>
            <p className="mt-1 text-sm text-gray-500">Secure loans against gold assets</p>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((scheme) => (
              <Button
                key={scheme}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleLoanTypeSelect('Gold Loan', scheme)}
              >
                Scheme {scheme}
              </Button>
            ))}
          </div>
        </div>

        {/* Business Loan Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Business Loan</h2>
            <p className="mt-1 text-sm text-gray-500">Finance for business growth</p>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((scheme) => (
              <Button
                key={scheme}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleLoanTypeSelect('Business Loan', scheme)}
              >
                Scheme {scheme}
              </Button>
            ))}
          </div>
        </div>

        {/* Lendbox Loan Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Lendbox Loan</h2>
            <p className="mt-1 text-sm text-gray-500">Quick personal loans</p>
          </div>
          <div className="space-y-3">
            {[1, 2].map((scheme) => (
              <Button
                key={scheme}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleLoanTypeSelect('Lendbox Loan', scheme)}
              >
                Scheme {scheme}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSelection; 