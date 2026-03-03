import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

/**
 * ProtectedRoute Wrapper
 * Re-routes unauthenticated users to the login page.
 * Optionally checks for required role (e.g., 'admin' or 'caterer').
 */
interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to if you want to redirect them back after login (advanced)
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // If they are logged in but don't have the right role,
    if (user?.role === 'caterer') {
      return <Navigate to="/caterer" replace />;
    } else if (user?.role === 'customer') {
      return <Navigate to="/dashboard" replace />;
    }
    // Fallback for any other unexpected roles
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
