/**
 * UsersPage - Demonstration of Role-Based UI
 * Senior Frontend Security Architecture
 *
 * DEMONSTRATES:
 *   1. Page-level protection (ProtectedRoute - all authenticated users)
 *   2. Component-level gating (RoleGate for Create/Edit/Delete buttons)
 *   3. Type-safe role checks (Role enum)
 *
 * SECURITY SCENARIOS:
 *   - USER: Can view list only
 *   - ADMIN: Can view list, Create, Edit users
 *   - SUPER_ADMIN: Full access (View, Create, Edit, Delete)
 */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth.types";
import { RoleGate } from "../components/auth/RoleGate";
import { Link } from "react-router-dom";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * UsersPage Component
 * Protected at route level - all authenticated users can access
 */
export const UsersPage: React.FC = () => {
  const { user, logout } = useAuth();

  // Mock user data for demonstration
  const [users] = useState<UserData[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "USER" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "ADMIN" },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "USER" },
  ]);

  const handleCreateUser = () => {
    alert("Create User clicked - would open create modal");
  };

  const handleDeleteUser = (userId: string) => {
    alert(`Delete User ${userId} clicked - would trigger delete action`);
  };

  const handleEditUser = (userId: string) => {
    alert(`Edit User ${userId} clicked - would open edit modal`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
              <h1 className="text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </h1>
              <nav className="hidden sm:flex space-x-1 bg-gray-100 rounded-lg p-1">
                <Link
                  to="/dashboard"
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/users"
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md shadow-sm transition-all duration-200"
                >
                  Users
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.roles.join(", ")}
                </p>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">⏏️</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Management
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and organize your team members
          </p>
        </div>

        {/* Action Bar - Create Button with Role Gate */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl sm:text-3xl">👥</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {users.length}
              </p>
            </div>
          </div>

          {/* ROLE GATE: Only ADMIN and SUPER_ADMIN can create users */}
          <RoleGate roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
            <button
              onClick={handleCreateUser}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm font-semibold rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">+</span> Create New User
            </button>
          </RoleGate>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users.map((userData) => (
                  <tr
                    key={userData.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {userData.name}
                          </div>
                          <div className="text-xs text-gray-500 sm:hidden">
                            {userData.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {userData.email}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-300 shadow-sm">
                        {userData.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        {/* ROLE GATE: Only ADMIN and SUPER_ADMIN can edit users */}
                        <RoleGate roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
                          <button
                            onClick={() => handleEditUser(userData.id)}
                            className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          >
                            <span>✏️</span>
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </button>
                        </RoleGate>

                        {/* ROLE GATE: Only SUPER_ADMIN can delete users */}
                        <RoleGate role={Role.SUPER_ADMIN}>
                          <button
                            onClick={() => handleDeleteUser(userData.id)}
                            className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          >
                            <span>🗑️</span>
                            <span className="hidden sm:inline ml-1">
                              Delete
                            </span>
                          </button>
                        </RoleGate>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Debug Panel (Development Only) */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-3 shadow-md">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Your Current Roles
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Active roles for your account
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {user?.roles.map((role) => (
              <span
                key={role}
                className="px-5 py-2.5 text-sm font-bold rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-2 border-blue-400 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
