import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchModal from './SearchModal';
import SearchMembers from '../pages/SearchMembers';

function Sidebar() {
  const [isLoansMenuOpen, setIsLoansMenuOpen] = useState(false);
  const [isBusinessSubMenuOpen, setIsBusinessSubMenuOpen] = useState(false);
  const [isLendboxSubMenuOpen, setIsLendboxSubMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const loansMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loansMenuRef.current && !loansMenuRef.current.contains(event.target)) {
        setIsLoansMenuOpen(false);
        setIsBusinessSubMenuOpen(false);
        setIsLendboxSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler to open SearchModal with loan type and scheme
  const handleSchemeSelect = (loanType, scheme) => {
    setSelectedLoanType(loanType);
    setSelectedScheme(scheme);
    setShowSearchModal(true);
    setIsLoansMenuOpen(false);
    setIsBusinessSubMenuOpen(false);
    setIsLendboxSubMenuOpen(false);
  };

  return (
    <>
      <aside className="js-sidebar fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <img src="" alt="Logo" className="h-8" />
          <button className="sm:hidden text-gray-500 hover:text-gray-600">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <NavLink to="/" className={({ isActive }) => 
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
            }`
          }>
            <i className="fas fa-home w-5 h-5 mr-3"></i>
            Dashboard
          </NavLink>
          <NavLink to="/members" className={({ isActive }) => 
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
            }`
          }>
            <i className="fas fa-users w-5 h-5 mr-3"></i>
            Members
          </NavLink>
          <NavLink to="/new-member" className={({ isActive }) => 
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
            }`
          }>
            <i className="fas fa-user-plus w-5 h-5 mr-3"></i>
            New Member
          </NavLink>

          {/* Loans Menu */}
          <div className="relative" ref={loansMenuRef}>
            <button 
              onClick={() => setIsLoansMenuOpen(!isLoansMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <i className="fas fa-money w-5 h-5 mr-3"></i>
                <span>Loans</span>
              </div>
              <i className={`fas fa-chevron-right text-xs transition-transform ${isLoansMenuOpen ? 'rotate-90' : ''}`}></i>
            </button>
            <div className={`absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg py-2 ${isLoansMenuOpen ? 'block' : 'hidden'} z-10`}>
              <div className="px-4 py-2 font-semibold text-sm text-gray-500">LOAN TYPES</div>
              <div className="relative">
                <button 
                  onClick={() => setIsBusinessSubMenuOpen(!isBusinessSubMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span>Business Loan</span>
                  <i className={`fas fa-chevron-right text-xs transition-transform ${isBusinessSubMenuOpen ? 'rotate-90' : ''}`}></i>
                </button>
                <div className={`absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg py-2 ${isBusinessSubMenuOpen ? 'block' : 'hidden'} z-20`}>
                  {[1,2,3,4,5].map(scheme => (
                    <button
                      key={scheme}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => handleSchemeSelect('Business Loan', `Scheme ${scheme}`)}
                    >
                      Scheme {scheme}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => handleSchemeSelect('Gold Loan', 'Gold Loan')}
              >
                Gold Loan
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsLendboxSubMenuOpen(!isLendboxSubMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span>Lendbox Loan</span>
                  <i className={`fas fa-chevron-right text-xs transition-transform ${isLendboxSubMenuOpen ? 'rotate-90' : ''}`}></i>
                </button>
                <div className={`absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg py-2 ${isLendboxSubMenuOpen ? 'block' : 'hidden'} z-20`}>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleSchemeSelect('Lendbox Loan', 'Personal')}
                  >
                    Personal
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleSchemeSelect('Lendbox Loan', 'Scheme 1 - Weekly')}
                  >
                    Scheme 1 - Weekly
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleSchemeSelect('Lendbox Loan', 'Scheme 2')}
                  >
                    Scheme 2
                  </button>
                </div>
              </div>
            </div>
          </div>

          <NavLink to="/payments" className={({ isActive }) => 
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
            }`
          }>
            <i className="fas fa-money-bill-wave w-5 h-5 mr-3"></i>
            Payments
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => 
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
            }`
          }>
            <i className="fas fa-cog w-5 h-5 mr-3"></i>
            Settings
          </NavLink>
        </nav>
      </aside>
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        loanType={selectedLoanType}
        scheme={selectedScheme}
      />
    </>
  );
}

export default Sidebar; 