import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../types/auth.types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredRoles?: Role[];
}

/**
 * ProtectedRoute Component
 * Wraps routes that require specific roles
 *
 * @param children - Route component to render if authorized
 * @param requiredRole - Single role required to access route
 * @param requiredRoles - Array of roles (user needs at least one)
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredRoles,
}) => {
  const { isAuthenticated, isLoading, hasRole, hasAnyRole } = useAuth();

  // Show nothing while loading auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  let hasAccess = false;

  if (requiredRole) {
    hasAccess = hasRole(requiredRole);
  } else if (requiredRoles && requiredRoles.length > 0) {
    hasAccess = hasAnyRole(requiredRoles);
  } else {
    // No role requirement means just authenticated is enough
    hasAccess = true;
  }

  // Authenticated but lacks required role -> redirect to unauthorized
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized -> render children
  return <>{children}</>;
};
