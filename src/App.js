import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Members from "./pages/Members";
import NewMember from "./pages/NewMember";
import LoanDetails from "./pages/LoanDetails";

import Gold from "./pages/Gold";
import BusinessLoan from "./pages/BusinessLoan";
import LendboxLoan from "./pages/LendboxLoan";
import LoanTypeSelection from "./components/LoanTypeSelection";
import SearchMembers from "./pages/SearchMembers";
import LoginPage from "./pages/Login";
import ActivityFeed from "./pages/ActivityFeed";
import LoanApprovals from "./pages/LoanApprovals";
import PaymentApprovals from "./pages/PaymentApprovals";
import FundTransfer from "./pages/FundTransfer";
import ExpenseApprovals from "./pages/ExpenseApprovals";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";

// Create context for user role and permissions
export const UserContext = createContext(null);

// Auth Guard Component
const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Role Guard Component
const RoleGuard = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Protected Layout Component
const ProtectedLayout = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  const canEdit = userRole === "Staff";

  return (
    <UserContext.Provider value={{ role: userRole, canEdit }}>
      <div className="min-h-screen flex bg-gray-50 font-sans">
        <Sidebar />
        <div className="flex-1 min-w-0 sm:ml-64 transition-margin duration-300 ease-in-out">
          <Header />
          <main className="pt-32 px-8 pb-8">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles = ["Staff", "Manager"] }) => {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={allowedRoles}>
        <ProtectedLayout>
          {element}
        </ProtectedLayout>
      </RoleGuard>
    </AuthGuard>
  );
};

// Public Route Component
const PublicRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    const userRole = localStorage.getItem("userRole");
    return <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace />;
  }

  return element;
};

// Role-based Dashboard Redirect
const RoleBasedRedirect = () => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/" element={<PublicRoute element={<LoginPage />} />} />

        {/* Role-based Dashboard Routes */}
        <Route path="/staff-dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["Staff"]} />} />
        <Route path="/manager-dashboard" element={<ProtectedRoute element={<ManagerDashboard />} allowedRoles={["Manager"]} />} />

        {/* Redirect to role-based dashboard */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />

        {/* Staff Routes */}
        <Route path="/search-members" element={<ProtectedRoute element={<SearchMembers />} allowedRoles={["Staff", "Manager"]} />} />
        <Route path="/members" element={<ProtectedRoute element={<Members />} allowedRoles={["Staff"]} />} />
        <Route path="/new-member" element={<ProtectedRoute element={<NewMember />} allowedRoles={["Staff"]} />} />
        <Route path="/loan-type-selection" element={<ProtectedRoute element={<LoanTypeSelection />} allowedRoles={["Staff"]} />} />
        <Route path="/gold" element={<ProtectedRoute element={<Gold />} allowedRoles={["Staff"]} />} />
        <Route path="/business-loan" element={<ProtectedRoute element={<BusinessLoan />} allowedRoles={["Staff"]} />} />
        <Route path="/lendbox-loan" element={<ProtectedRoute element={<LendboxLoan />} allowedRoles={["Staff"]} />} />
        <Route path="/payments" element={<ProtectedRoute element={<Payments />} allowedRoles={["Staff"]} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} allowedRoles={["Staff"]} />} />
        

        {/* Manager Routes */}
        <Route path="/member-details" element={<ProtectedRoute element={<Members />} allowedRoles={["Manager"]} />} />
        <Route path="/activity-feed" element={<ProtectedRoute element={<ActivityFeed />} allowedRoles={["Manager"]} />} />
        <Route path="/gold-loan-approvals" element={<ProtectedRoute element={<LoanApprovals type="gold" />} allowedRoles={["Manager"]} />} />
        <Route path="/personal-loan-approvals" element={<ProtectedRoute element={<LoanApprovals type="personal" />} allowedRoles={["Manager"]} />} />
        <Route path="/loan-approvals" element={<ProtectedRoute element={<LoanApprovals type="all" />} allowedRoles={["Manager"]} />} />
        <Route path="/payment-approvals" element={<ProtectedRoute element={<PaymentApprovals />} allowedRoles={["Manager"]} />} />
        <Route path="/fund-transfer" element={<ProtectedRoute element={<FundTransfer />} allowedRoles={["Manager"]} />} />
        <Route path="/expense-approvals" element={<ProtectedRoute element={<ExpenseApprovals />} allowedRoles={["Manager"]} />} />

        {/* Shared Routes */}
        <Route path="/loan-details" element={<ProtectedRoute element={<LoanDetails />} />} />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
              <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
              <button
                onClick={() => window.history.back()}
                className="bg-custom text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        } />

        {/* Catch-all route - redirect to login if not authenticated, or to role-specific dashboard if authenticated */}
        <Route path="*" element={
          <AuthGuard>
            <RoleBasedRedirect />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}

export default App;
