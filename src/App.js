import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import NewMember from './pages/NewMember';
import LoanDetails from './pages/LoanDetails';
import Search from './pages/Search';
import Gold from './pages/Gold';
import BusinessLoan from './pages/BusinessLoan';
import LendboxLoan from './pages/LendboxLoan';
import LoanTypeSelection from './components/LoanTypeSelection';
import SearchMembers from './pages/SearchMembers';
import LoginPage from './pages/Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // For now, we'll use a simple check. In a real app, you'd check for a valid token
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 min-w-0 sm:ml-64 transition-margin duration-300 ease-in-out">
        <Header />
        <main className="pt-32 px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/search-members" element={
          <ProtectedRoute>
            <SearchMembers />
          </ProtectedRoute>
        } />
        <Route path="/gold" element={
          <ProtectedRoute>
            <Gold />
          </ProtectedRoute>
        } />
        <Route path="/members" element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        } />
        <Route path="/new-member" element={
          <ProtectedRoute>
            <NewMember />
          </ProtectedRoute>
        } />
        <Route path="/loan-details" element={
          <ProtectedRoute>
            <LoanDetails />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        } />
        <Route path="/loan-type-selection" element={
          <ProtectedRoute>
            <LoanTypeSelection />
          </ProtectedRoute>
        } />
        <Route path="/business-loan" element={
          <ProtectedRoute>
            <BusinessLoan />
          </ProtectedRoute>
        } />
        <Route path="/lendbox-loan" element={
          <ProtectedRoute>
            <LendboxLoan />
          </ProtectedRoute>
        } />

        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 