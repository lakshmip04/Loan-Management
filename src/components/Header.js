import React from 'react';

function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 sm:left-64 z-40 transition-transform duration-300 ease-in-out">
      <button className="sm:hidden text-gray-500 hover:text-gray-600">
        <i className="fas fa-bars text-xl"></i>
      </button>
      <div className="flex items-center space-x-4 w-full">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex-1 text-left">
          Welcome Staff, You Are Logged In!
        </div>
        <button className="relative p-2">
          <i className="fas fa-bell text-gray-600"></i>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-600">
            Session expires in: <span className="font-medium">10:00</span>
          </div>
          <button className="relative !rounded-button bg-custom text-white px-4 py-2 text-sm font-medium hover:bg-indigo-600">
            Extend Session
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header; 