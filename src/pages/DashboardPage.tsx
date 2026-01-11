/**
 * DashboardPage - Multi-Level Role Demonstration
 * Senior Frontend Security Architecture
 *
 * DEMONSTRATES:
 *   1. Page-level protection (ProtectedRoute - all authenticated users)
 *   2. Multiple role-gated sections
 *   3. Different access levels for USER, ADMIN, SUPER_ADMIN
 *
 * ROLE LEVELS:
 *   - USER -> Can view basic dashboard stats
 *   - ADMIN -> Can view stats + analytics + export data
 *   - SUPER_ADMIN -> Full access including settings
 */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth.types";
import { RoleGate } from "../components/auth/RoleGate";
import { Link } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [exportFormat, setExportFormat] = useState<string>("csv");

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 856,
    newUsers: 42,
    revenue: "$24,680",
  };

  const analyticsData = {
    userGrowth: "+12.5%",
    engagement: "68%",
    churnRate: "2.3%",
    avgSessionTime: "8m 32s",
  };

  const handleExport = (format: string) => {
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  const handleSettingsSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <nav className="hidden sm:flex space-x-1 bg-gray-100 rounded-lg p-1">
                <Link
                  to="/dashboard"
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md shadow-sm transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/users"
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
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
        {/* Welcome Section - Visible to ALL */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-all">
              {user?.email?.split("@")[0]}
            </span>
            !
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
            Here's what's happening with your platform today
          </p>
        </div>

        {/* ===== SECTION 1: Dashboard Overview ===== */}
        {/* Available to: ALL USERS */}
        <section className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">📊</span>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Dashboard Overview
                </h3>
                <p className="text-sm text-gray-600">Available to all users</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Total
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Total Users
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Active Users
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.activeUsers.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🆕</span>
                </div>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  New
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                New This Week
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.newUsers}
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Revenue
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Total Revenue
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.revenue}
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: Advanced Analytics ===== */}
        {/* Available to: ADMIN, SUPER_ADMIN */}
        <RoleGate
          roles={[Role.ADMIN, Role.SUPER_ADMIN]}
          fallback={
            <section className="mb-6 sm:mb-8 md:mb-10">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl mb-4 sm:mb-6">
                  <span className="text-4xl sm:text-5xl">🔒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Advanced Analytics Locked
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  This section requires <strong>ADMIN</strong> or{" "}
                  <strong>SUPER_ADMIN</strong> role to access detailed analytics
                  and insights.
                </p>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-orange-300">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">
                    Your Role: {user?.roles.join(", ")}
                  </span>
                </div>
              </div>
            </section>
          }
        >
          <section className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="flex items-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">📈</span>
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Advanced Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Available to ADMIN and SUPER_ADMIN
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 text-white hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 mb-1">
                  User Growth
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {analyticsData.userGrowth}
                </p>
                <p className="text-xs text-blue-100 mt-2">vs last month</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 text-white hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <span className="text-2xl">👆</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-green-100 mb-1">
                  Engagement Rate
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {analyticsData.engagement}
                </p>
                <p className="text-xs text-green-100 mt-2">active sessions</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 text-white hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <span className="text-2xl">📉</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-orange-100 mb-1">
                  Churn Rate
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {analyticsData.churnRate}
                </p>
                <p className="text-xs text-orange-100 mt-2">monthly average</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 text-white hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 mb-1">
                  Avg Session Time
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {analyticsData.avgSessionTime}
                </p>
                <p className="text-xs text-purple-100 mt-2">per user</p>
              </div>
            </div>
          </section>
        </RoleGate>

        {/* ===== SECTION 3: Data Export ===== */}
        {/* Available to: ADMIN, SUPER_ADMIN */}
        <RoleGate
          roles={[Role.ADMIN, Role.SUPER_ADMIN]}
          fallback={
            <section className="mb-6 sm:mb-8 md:mb-10">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl mb-4 sm:mb-6">
                  <span className="text-4xl sm:text-5xl">🔒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Data Export Locked
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  Exporting data requires <strong>ADMIN</strong> or{" "}
                  <strong>SUPER_ADMIN</strong> role for security and compliance
                  reasons.
                </p>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-orange-300">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">
                    Your Role: {user?.roles.join(", ")}
                  </span>
                </div>
              </div>
            </section>
          }
        >
          <section className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="flex items-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">📥</span>
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Export Data
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Available to ADMIN and SUPER_ADMIN
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
              <div className="max-w-2xl mx-auto">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center px-4">
                  Export dashboard data in various formats for analysis and
                  reporting
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Export Format:
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {["csv", "json", "pdf"].map((format) => (
                        <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${
                            exportFormat === format
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleExport(exportFormat)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    📥 Export as {exportFormat.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RoleGate>

        {/* ===== SECTION 4: System Settings ===== */}
        {/* Available to: SUPER_ADMIN ONLY */}
        <RoleGate
          role={Role.SUPER_ADMIN}
          fallback={
            <section className="mb-6 sm:mb-8 md:mb-10">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl mb-4 sm:mb-6">
                  <span className="text-4xl sm:text-5xl">🔒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Settings Locked
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  System settings can only be accessed by{" "}
                  <strong>SUPER_ADMIN</strong> role to prevent unauthorized
                  configuration changes.
                </p>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-orange-300">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">
                    Your Role: {user?.roles.join(", ")}
                  </span>
                </div>
              </div>
            </section>
          }
        >
          <section className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="flex items-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">⚙️</span>
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    System Settings
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Available to SUPER_ADMIN only
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-purple-200">
              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center">
                      <span className="text-xl sm:text-2xl mr-2 sm:mr-3">
                        🔔
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-gray-900">
                          Email Notifications
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                          Enable system-wide email notifications
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start sm:items-center">
                      <span className="text-xl sm:text-2xl mr-2 sm:mr-3 flex-shrink-0">
                        🛡️
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-gray-900">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Require 2FA for all users
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start sm:items-center">
                      <span className="text-xl sm:text-2xl mr-2 sm:mr-3 flex-shrink-0">
                        🔒
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-gray-900">
                          Maintenance Mode
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Enable maintenance mode for updates
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSettingsSave}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  💾 Save Settings
                </button>
              </div>
            </div>
          </section>
        </RoleGate>

        {/* Role Debug Panel (Development Only) */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center justify-center">
              <span className="mr-2">🔐</span>{" "}
              <span className="hidden sm:inline">Your Current Roles</span>
              <span className="sm:hidden">Roles</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Active roles for your account
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {user?.roles.map((role) => (
              <span
                key={role}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300"
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
