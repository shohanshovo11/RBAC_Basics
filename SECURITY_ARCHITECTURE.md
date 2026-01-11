# 🔒 Enterprise-Grade RBAC System - Implementation Guide

## Senior Frontend Security Architecture

This is a production-ready, **Permission-Based Access Control (PBAC)** system built with React and TypeScript. Zero magic strings, full type safety, and audit-ready.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Installation](#installation)
3. [Folder Structure](#folder-structure)
4. [Core Concepts](#core-concepts)
5. [Usage Examples](#usage-examples)
6. [Security Scenarios](#security-scenarios)
7. [API Reference](#api-reference)

---

## 🏗️ Architecture Overview

### Design Principles

- **Rule Zero**: NEVER check roles (`user.role === 'admin'`)
- **Rule One**: ALWAYS check permissions (`hasPermission(Permission.UsersDelete)`)
- **Type Safety**: TypeScript enums eliminate "magic strings"
- **Single Source of Truth**: JWT payload from backend

### System Components

```
┌─────────────────────────────────────────────┐
│           AuthProvider (Context)            │
│  - JWT Decoding                             │
│  - Permission Validation                    │
│  - State Management                         │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼─────────┐
│ ProtectedRoute │    │ PermissionGate   │
│ (Route Level)  │    │ (Component Level)│
└────────────────┘    └──────────────────┘
```

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install react-router-dom jwt-decode
npm install -D typescript @types/node
```

### 2. Install TypeScript Types (if needed)

```bash
npm install -D @types/react @types/react-dom
```

---

## 📁 Folder Structure

```
src/
├── types/
│   └── auth.types.ts          # Permission enums & interfaces
├── context/
│   └── AuthContext.tsx        # Auth state & logic engine
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx # Route-level guards
│       └── PermissionGate.tsx # Component-level guards
├── pages/
│   ├── LoginPage.tsx          # Authentication entry
│   ├── UsersPage.tsx          # Demo page (PBAC showcase)
│   └── UnauthorizedPage.tsx   # 403 Forbidden
├── App.tsx                    # Router configuration
└── main.tsx                   # Application entry point
```

---

## 🧠 Core Concepts

### 1. Permission Enum (The Contract)

```typescript
export enum Permission {
  UsersView = "users:view",
  UsersCreate = "users:create",
  UsersUpdate = "users:update",
  UsersDelete = "users:delete",
}
```

**Why Enums?**

- Autocomplete in IDE
- Compile-time validation
- Refactor-safe
- No typos possible

### 2. JWT Payload Structure

Your backend MUST return this structure:

```json
{
  "sub": "user-123",
  "email": "user@example.com",
  "roles": ["USER"],
  "permissions": ["users:view"],
  "exp": 9999999999
}
```

### 3. Permission Checking Flow

```typescript
// ❌ WRONG - Role-based (BAD)
if (user.role === "ADMIN") {
  showDeleteButton();
}

// ✅ CORRECT - Permission-based (GOOD)
if (hasPermission(Permission.UsersDelete)) {
  showDeleteButton();
}
```

---

## 🚀 Usage Examples

### Example 1: Protect Entire Route

```tsx
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Permission } from "./types/auth.types";

<Route
  path="/users"
  element={
    <ProtectedRoute requiredPermission={Permission.UsersView}>
      <UsersPage />
    </ProtectedRoute>
  }
/>;
```

**Behavior:**

- Not logged in → Redirect to `/login`
- Logged in but no permission → Redirect to `/unauthorized`
- Logged in with permission → Render page

---

### Example 2: Conditional UI Rendering

```tsx
import { PermissionGate } from "./components/auth/PermissionGate";
import { Permission } from "./types/auth.types";

<PermissionGate permission={Permission.UsersCreate}>
  <button onClick={handleCreate}>Create User</button>
</PermissionGate>;
```

**Behavior:**

- Has permission → Button visible
- No permission → Nothing rendered

---

### Example 3: Programmatic Permission Check

```tsx
import { useAuth } from "./context/AuthContext";
import { Permission } from "./types/auth.types";

function MyComponent() {
  const { hasPermission } = useAuth();

  const handleAction = () => {
    if (!hasPermission(Permission.UsersDelete)) {
      alert("Access denied");
      return;
    }
    // Proceed with action
  };
}
```

---

## 🎯 Security Scenarios

### Scenario 1: USER Role

**Permissions:** `["users:view"]`

**Access:**

- ✅ Can view Users page
- ❌ Cannot see "Create" button
- ❌ Cannot see "Delete" button

---

### Scenario 2: ADMIN Role

**Permissions:** `["users:view", "users:create", "users:update"]`

**Access:**

- ✅ Can view Users page
- ✅ Can see "Create" button
- ✅ Can see "Edit" button
- ❌ Cannot see "Delete" button

---

### Scenario 3: SUPER_ADMIN Role

**Permissions:** `["users:view", "users:create", "users:update", "users:delete"]`

**Access:**

- ✅ Can view Users page
- ✅ Can see "Create" button
- ✅ Can see "Edit" button
- ✅ Can see "Delete" button

---

## 📚 API Reference

### `useAuth()` Hook

Returns the authentication context:

```typescript
interface AuthContextState {
  user: User | null; // Current user
  isAuthenticated: boolean; // Auth status
  isLoading: boolean; // Loading state
  hasPermission: (permission: Permission) => boolean; // Permission check
  login: (token: string) => void; // Login method
  logout: () => void; // Logout method
}
```

**Example:**

```tsx
const { user, hasPermission, logout } = useAuth();

if (hasPermission(Permission.UsersCreate)) {
  // Show create button
}
```

---

### `<ProtectedRoute>` Component

Route-level authorization guard.

**Props:**

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: Permission;
}
```

**Example:**

```tsx
<ProtectedRoute requiredPermission={Permission.UsersView}>
  <UsersPage />
</ProtectedRoute>
```

---

### `<PermissionGate>` Component

Component-level authorization guard.

**Props:**

```typescript
interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode; // Optional fallback UI
}
```

**Example:**

```tsx
<PermissionGate
  permission={Permission.UsersDelete}
  fallback={<p>You don't have delete access</p>}
>
  <button>Delete</button>
</PermissionGate>
```

---

## 🔐 Security Best Practices

### 1. Never Use Role-Based Logic

```typescript
// ❌ FORBIDDEN
if (user.role === 'ADMIN') { ... }

// ✅ REQUIRED
if (hasPermission(Permission.UsersDelete)) { ... }
```

### 2. Always Use Enum

```typescript
// ❌ FORBIDDEN - Magic string
hasPermission("users:delete");

// ✅ REQUIRED - Type-safe enum
hasPermission(Permission.UsersDelete);
```

### 3. Gate Every Sensitive Action

```tsx
// ❌ EXPOSED - No protection
<button onClick={deleteUser}>Delete</button>

// ✅ PROTECTED - Permission gate
<PermissionGate permission={Permission.UsersDelete}>
  <button onClick={deleteUser}>Delete</button>
</PermissionGate>
```

### 4. Validate on Backend Too

Frontend permissions are for UX only. **ALWAYS validate on backend.**

---

## 🧪 Testing the System

### Quick Test Flow

1. **Login as USER**

   - Should see user list
   - Should NOT see Create/Delete buttons

2. **Login as ADMIN**

   - Should see user list
   - Should see Create button
   - Should NOT see Delete button

3. **Login as SUPER_ADMIN**
   - Should see everything
   - Should see Create button
   - Should see Delete button

---

## 📝 Adding New Permissions

### Step 1: Add to Enum

```typescript
// src/types/auth.types.ts
export enum Permission {
  UsersView = "users:view",
  UsersCreate = "users:create",
  UsersUpdate = "users:update",
  UsersDelete = "users:delete",
  ReportsView = "reports:view", // ← NEW
  ReportsExport = "reports:export", // ← NEW
}
```

### Step 2: Use in Components

```tsx
<PermissionGate permission={Permission.ReportsExport}>
  <button>Export Report</button>
</PermissionGate>
```

### Step 3: Backend Coordination

Ensure backend JWT includes new permissions:

```json
{
  "permissions": ["users:view", "reports:view", "reports:export"]
}
```

---

## 🚨 Common Pitfalls

### Pitfall 1: Checking Roles Instead of Permissions

```typescript
// ❌ WRONG
if (user.roles.includes('ADMIN')) { ... }

// ✅ RIGHT
if (hasPermission(Permission.UsersDelete)) { ... }
```

### Pitfall 2: Using String Literals

```typescript
// ❌ WRONG - Typo risk
hasPermission("users:delte"); // Typo!

// ✅ RIGHT - Compile-time safe
hasPermission(Permission.UsersDelete);
```

### Pitfall 3: Not Handling Loading State

```tsx
// ❌ WRONG - Flashes wrong UI
if (!isAuthenticated) return <LoginPage />;

// ✅ RIGHT - Handle loading
if (isLoading) return <LoadingSpinner />;
if (!isAuthenticated) return <LoginPage />;
```

---

## 🎓 Advanced Patterns

### Pattern 1: Multiple Permissions (OR Logic)

```tsx
const canModify =
  hasPermission(Permission.UsersUpdate) ||
  hasPermission(Permission.UsersDelete);

if (canModify) {
  // Show modify section
}
```

### Pattern 2: Multiple Permissions (AND Logic)

```tsx
const canPerformAudit =
  hasPermission(Permission.UsersView) && hasPermission(Permission.ReportsView);

if (canPerformAudit) {
  // Show audit feature
}
```

### Pattern 3: Permission-Based Routing

```tsx
const getDefaultRoute = () => {
  if (hasPermission(Permission.UsersView)) return "/users";
  if (hasPermission(Permission.ReportsView)) return "/reports";
  return "/profile";
};
```

---

## 📊 Production Checklist

- [ ] All permissions use TypeScript enum
- [ ] No hardcoded permission strings in components
- [ ] No role-based logic (`user.role === ...`)
- [ ] All sensitive routes wrapped in `<ProtectedRoute>`
- [ ] All sensitive UI wrapped in `<PermissionGate>`
- [ ] Loading states handled properly
- [ ] Unauthorized page styled and functional
- [ ] Backend validates permissions (frontend is UX only)
- [ ] JWT expiration handled
- [ ] Logout clears localStorage
- [ ] Type safety enforced (`strict: true` in tsconfig)

---

## 🆘 Troubleshooting

### Issue: "Cannot read property 'permissions' of null"

**Solution:** Check if auth is loading:

```tsx
if (isLoading) return <LoadingSpinner />;
```

### Issue: Button shows but click fails

**Solution:** Backend must also validate. Frontend permissions are UX only.

### Issue: Redirect loop on protected route

**Solution:** Ensure default route is accessible or redirect to login:

```tsx
<Route path="*" element={<Navigate to="/login" />} />
```

---

## 📜 License

This is a reference implementation for educational and production use.

---

## 🙋 Support

For security audits or architecture reviews, consult your L6+ engineers.

**Built with ❤️ by Senior Frontend Security Team**
