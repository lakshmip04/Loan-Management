import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const { isManager } = usePermissions();
  const userRole = localStorage.getItem("userRole");
  const dashboardPath = `/${userRole.toLowerCase()}-dashboard`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ManagerMenu = {
    memberServices: {
      title: 'Member Services',
      icon: 'fas fa-users',
      items: [
        { name: 'Member Details', path: '/member-details', icon: 'fas fa-user-circle' },
        { name: 'Activity Feed', path: '/activity-feed', icon: 'fas fa-stream' }
      ]
    },
    loanServices: {
      title: 'Loan Services',
      icon: 'fas fa-money-bill-wave',
      items: [
        { name: 'Gold Loan', path: '/gold-loan-approvals', icon: 'fas fa-coins' },
        { name: 'Personal Loan', path: '/personal-loan-approvals', icon: 'fas fa-user-tag' },
        { name: 'Loan Approval', path: '/loan-approvals', icon: 'fas fa-check-circle' }
      ]
    },
    paymentsTransfers: {
      title: 'Payments & Transfers',
      icon: 'fas fa-exchange-alt',
      items: [
        { name: 'Payment Approval', path: '/payment-approvals', icon: 'fas fa-file-invoice' },
        { name: 'Fund Transfer', path: '/fund-transfer', icon: 'fas fa-money-bill-transfer' }
      ]
    },
    financeManagement: {
      title: 'Finance Management',
      icon: 'fas fa-chart-line',
      items: [
        { name: 'Expense Approval', path: '/expense-approvals', icon: 'fas fa-file-invoice-dollar' }
      ]
    }
  };

  const renderManagerSubmenu = (menuKey, menu) => (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setActiveMenu(activeMenu === menuKey ? null : menuKey)}
        className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        <div className="flex items-center">
          <i className={`${menu.icon} w-5 h-5 mr-3`}></i>
          <span>{menu.title}</span>
        </div>
        <i className={`fas fa-chevron-right text-xs transition-transform ${activeMenu === menuKey ? 'rotate-90' : ''}`}></i>
      </button>
      {activeMenu === menuKey && (
        <div className="mt-2 ml-4 space-y-1">
          {menu.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-md font-medium rounded-lg ${
                  isActive ? 'text-custom bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <i className={`${item.icon} w-5 h-5 mr-3`}></i>
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  const renderStaffMenu = () => (
    <>
      <NavLink to="/search-members" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-search w-5 h-5 mr-3"></i>
        Search Members
      </NavLink>

      {/* <NavLink to="/members" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-users w-5 h-5 mr-3"></i>
        Members
      </NavLink> */}

      <NavLink to="/new-member" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-user-plus w-5 h-5 mr-3"></i>
        New Member
      </NavLink>

      <NavLink to="/loan-type-selection" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-money-bill-wave w-5 h-5 mr-3"></i>
        Loans
      </NavLink>

      <NavLink to="/payments" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-file-invoice w-5 h-5 mr-3"></i>
        Payments
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => 
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
          isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
        }`
      }>
        <i className="fas fa-cog w-5 h-5 mr-3"></i>
        Settings
      </NavLink>
    </>
  );

  return (
    <aside className="js-sidebar fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <img src="" alt="Logo" className="h-8" />
        <button className="lg:hidden text-gray-500 hover:text-gray-600">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to={dashboardPath} className={({ isActive }) => 
          `flex items-center px-4 py-3 text-lg font-medium rounded-lg ${
            isActive ? 'text-custom bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
          }`
        }>
          <i className="fas fa-home w-5 h-5 mr-3"></i>
          Dashboard
        </NavLink>

        {isManager ? (
          <>
            {renderManagerSubmenu('memberServices', ManagerMenu.memberServices)}
            {renderManagerSubmenu('loanServices', ManagerMenu.loanServices)}
            {renderManagerSubmenu('paymentsTransfers', ManagerMenu.paymentsTransfers)}
            {renderManagerSubmenu('financeManagement', ManagerMenu.financeManagement)}
          </>
        ) : (
          renderStaffMenu()
        )}
      </nav>
    </aside>
  );
}

export default Sidebar; 