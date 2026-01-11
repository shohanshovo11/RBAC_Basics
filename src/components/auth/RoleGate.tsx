import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../types/auth.types";

interface RoleGateProps {
  role?: Role;
  roles?: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * RoleGate Component
 * Conditionally renders children based on role check
 *
 * @param role - Single required role to render children
 * @param roles - Array of roles (user needs at least one)
 * @param children - Content to render if role is granted
 * @param fallback - Optional content to render if role is denied
 *
 * @example
 * <RoleGate role={Role.ADMIN}>
 *   <button>Create User</button>
 * </RoleGate>
 *
 * @example
 * <RoleGate roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
 *   <button>Delete User</button>
 * </RoleGate>
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  role,
  roles,
  children,
  fallback = null,
}) => {
  const { hasRole, hasAnyRole } = useAuth();

  // Check role and render accordingly
  let hasAccess = false;

  if (role) {
    hasAccess = hasRole(role);
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles);
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
