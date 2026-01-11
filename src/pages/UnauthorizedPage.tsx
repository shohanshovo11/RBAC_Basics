/**
 * UnauthorizedPage - 403 Forbidden
 * Shown when user is authenticated but lacks required role
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center border border-gray-100">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl mb-6 shadow-lg">
          <span className="text-6xl">🚫</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Access Denied
          </span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You don't have the required role to access this resource.
        </p>

        {/* User Info Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-8 text-left border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-base font-bold text-gray-900">{user?.email}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Your Roles:
            </p>
            <div className="flex flex-wrap gap-2">
              {user?.roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-semibold rounded-lg border border-green-300"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            🏠 Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/users")}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            👥 Go to Users Page
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};
