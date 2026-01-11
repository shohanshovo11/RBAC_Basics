/**
 * Role-Based Access Control (RBAC) Type Definitions
 * Senior Frontend Security Architecture
 *
 * CRITICAL: Use Role enum ONLY. No magic strings allowed.
 */

/**
 * Role Enum - Single Source of Truth
 * Maps to backend role strings
 */
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

/**
 * JWT Payload Structure
 * Contract with backend authentication system
 */
export interface JWTPayload {
  sub: string; // User ID
  email: string; // User email
  roles: string[]; // User roles for authorization
  exp: number; // Expiration timestamp
}

/**
 * Authenticated User Interface
 * Represents the current user state in the application
 */
export interface User {
  id: string;
  email: string;
  roles: string[]; // Core authorization data
}

/**
 * Auth Context State
 */
export interface AuthContextState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  login: (token: string) => void;
  logout: () => void;
}
