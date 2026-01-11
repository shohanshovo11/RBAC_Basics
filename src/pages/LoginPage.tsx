/**
 * LoginPage - Authentication Entry Point
 * Demonstrates token-based login flow
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Mock JWT tokens for different user types
 * In production, these would come from your backend API
 *
 * Note: These tokens only contain roles, no permission arrays
 */
const MOCK_TOKENS = {
  user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiZXhwIjo5OTk5OTk5OTk5fQ.USER_TOKEN_SIGNATURE",
  admin:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbi00NTYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjo5OTk5OTk5OTk5fQ.ADMIN_TOKEN_SIGNATURE",
  superAdmin:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlci03ODkiLCJlbWFpbCI6InN1cGVyQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iXSwiZXhwIjo5OTk5OTk5OTk5fQ.SUPERADMIN_TOKEN_SIGNATURE",
};

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = (userType: keyof typeof MOCK_TOKENS) => {
    try {
      const token = MOCK_TOKENS[userType];
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RBAC Demo
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Permission-Based Access Control System
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* USER Login */}
          <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">User Role</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Basic access for viewing content only
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <code className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold border border-gray-200">
                Role: USER
              </code>
              <code className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold border border-blue-200">
                View Dashboard
              </code>
              <code className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-semibold border border-purple-200">
                View Users
              </code>
            </div>
            <button
              onClick={() => handleLogin("user")}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login as User
            </button>
          </div>

          {/* ADMIN Login */}
          <div className="border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50/30 to-transparent">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Admin Role</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Extended access for user management and analytics
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <code className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold border border-blue-200">
                Role: ADMIN
              </code>
              <code className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-semibold border border-green-200">
                Create/Edit Users
              </code>
              <code className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-semibold border border-purple-200">
                Analytics + Export
              </code>
            </div>
            <button
              onClick={() => handleLogin("admin")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login as Admin
            </button>
          </div>

          {/* SUPER_ADMIN Login */}
          <div className="border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50/30 to-transparent">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Super Admin Role
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Full system access including settings and delete operations
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <code className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-semibold border border-purple-200">
                Role: SUPER_ADMIN
              </code>
              <code className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-xs font-semibold border border-red-200">
                Delete Users
              </code>
              <code className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-xs font-semibold border border-orange-200">
                System Settings
              </code>
            </div>
            <button
              onClick={() => handleLogin("superAdmin")}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login as Super Admin
            </button>
          </div>
        </div>

        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <p className="text-sm text-amber-900 font-semibold mb-1">
                Development Demo
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                These are mock JWT tokens for demonstration purposes. In
                production environments, authentication tokens would be securely
                obtained from your backend API with proper credential
                validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
