import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import NewMember from './pages/NewMember';
import LoanDetails from './pages/LoanDetails';
import Search from './pages/Search';
import Gold from './pages/Gold';

function App() {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 min-w-0 sm:ml-64 transition-margin duration-300 ease-in-out">
        <Header />
        <main className="pt-32 px-8 pb-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/new-member" element={<NewMember />} />
            <Route path="/loan-details" element={<LoanDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/gold" element={<Gold />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 