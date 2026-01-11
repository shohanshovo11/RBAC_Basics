import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextState, JWTPayload, User, Role } from "../types/auth.types";

// Storage key for JWT token
const TOKEN_KEY = "auth_token";

// Create context with undefined default (enforces useAuth usage)
const AuthContext = createContext<AuthContextState | undefined>(undefined);

/**
 * AuthProvider Component
 * Wraps the application and provides authentication state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Decode and validate JWT token
   * Returns User object or null if invalid/expired
   */
  const decodeToken = useCallback((token: string): User | null => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("[Auth] Token expired");
        return null;
      }
      console.log(decoded, "shovo");
      // Transform JWT payload to User object
      return {
        id: decoded.sub,
        email: decoded.email,
        roles: decoded.roles,
      };
    } catch (error) {
      console.error("[Auth] Token decode error:", error);
      return null;
    }
  }, []);

  /**
   * Initialize auth state from localStorage
   * Runs once on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        const decodedUser = decodeToken(token);
        if (decodedUser) {
          setUser(decodedUser);
        } else {
          // Invalid or expired token - clean up
          localStorage.removeItem(TOKEN_KEY);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [decodeToken]);

  /**
   * CORE AUTHORIZATION METHOD
   * Check if user has a specific role
   *
   * @param role - Role enum value
   * @returns boolean - true if user has role
   *
   * MEMOIZED for performance
   */
  const hasRole = useMemo(() => {
    return (role: Role): boolean => {
      if (!user) {
        return false;
      }

      // Check if role exists in user's roles array
      return user.roles.includes(role);
    };
  }, [user]);

  /**
   * Check if user has any of the specified roles
   *
   * @param roles - Array of Role enum values
   * @returns boolean - true if user has at least one role
   */
  const hasAnyRole = useMemo(() => {
    return (roles: Role[]): boolean => {
      if (!user) {
        return false;
      }

      // Check if user has at least one of the specified roles
      return roles.some((role) => user.roles.includes(role));
    };
  }, [user]);

  /**
   * Login Method
   * Stores token and decodes user data
   *
   * @param token - JWT token from backend
   */
  const login = useCallback(
    (token: string): void => {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        localStorage.setItem(TOKEN_KEY, token);
        setUser(decodedUser);
      } else {
        throw new Error("Invalid token");
      }
    },
    [decodeToken]
  );

  /**
   * Logout Method
   * Clears all auth state and storage
   */
  const logout = useCallback((): void => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<AuthContextState>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      hasRole,
      hasAnyRole,
      login,
      logout,
    }),
    [user, isLoading, hasRole, hasAnyRole, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom Hook for Auth Context
 * MUST be used inside AuthProvider
 *
 * @returns AuthContextState
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
