import React, { createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Members from "./pages/Members";
import NewMember from "./pages/NewMember";
import LoanDetails from "./pages/LoanDetails";
import Search from "./pages/Search";
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

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = ["Staff", "Manager"] }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace />;
  }

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

// Initial Route Redirect Component
const InitialRouteRedirect = () => {
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<InitialRouteRedirect />} />

        {/* Staff Dashboard and Routes */}
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/search-members"
          element={
            <ProtectedRoute allowedRoles={["Staff", "Manager"]}>
              <SearchMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Members />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-member"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <NewMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-type-selection"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <LoanTypeSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gold"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Gold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business-loan"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <BusinessLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lendbox-loan"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <LendboxLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <Search />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}
        <Route
          path="/member-details"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <Members />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity-feed"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ActivityFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gold-loan-approvals"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <LoanApprovals type="gold" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal-loan-approvals"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <LoanApprovals type="personal" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-approvals"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <LoanApprovals type="all" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-approvals"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <PaymentApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fund-transfer"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <FundTransfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense-approvals"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ExpenseApprovals />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes */}
        <Route
          path="/loan-details"
          element={
            <ProtectedRoute>
              <LoanDetails />
            </ProtectedRoute>
          }
        />

        {/* Redirect all other routes to role-specific dashboard */}
        <Route path="*" element={<InitialRouteRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
