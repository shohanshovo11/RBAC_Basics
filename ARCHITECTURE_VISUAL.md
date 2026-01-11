# 🏗️ Architecture Visualization

## Enterprise RBAC System - Visual Guide

---

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND (API)                            │
│                                                                   │
│  POST /login → Returns JWT Token                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ JWT Payload                                              │    │
│  │ {                                                        │    │
│  │   "sub": "user-123",                                     │    │
│  │   "email": "user@example.com",                          │    │
│  │   "roles": ["ADMIN"],          ← Metadata only          │    │
│  │   "permissions": [             ← SOURCE OF TRUTH ✅     │    │
│  │     "users:view",                                       │    │
│  │     "users:create",                                     │    │
│  │     "users:update"                                      │    │
│  │   ],                                                     │    │
│  │   "exp": 1735689600                                     │    │
│  │ }                                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               ↓
                        JWT Token (String)
                               ↓
┌──────────────────────────────┼───────────────────────────────────┐
│                         FRONTEND (REACT)                          │
│                              ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              LOGIN COMPONENT                               │  │
│  │  - Receives JWT from backend                             │  │
│  │  - Calls login(token)                                    │  │
│  └───────────────────┬───────────────────────────────────────┘  │
│                      ↓                                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              AUTH CONTEXT (AuthProvider)                  │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ State Management                                     │ │  │
│  │  │ - user: User | null                                 │ │  │
│  │  │ - isAuthenticated: boolean                          │ │  │
│  │  │ - isLoading: boolean                                │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ JWT Decoding (jwt-decode)                           │ │  │
│  │  │ 1. Decode token                                     │ │  │
│  │  │ 2. Validate expiration                              │ │  │
│  │  │ 3. Extract user data                                │ │  │
│  │  │ 4. Store in localStorage                            │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ hasPermission(permission: Permission): boolean      │ │  │
│  │  │ - Memoized for performance                          │ │  │
│  │  │ - Checks user.permissions array                     │ │  │
│  │  │ - Returns true/false                                │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └───────────────────┬───────────────────┬───────────────────┘  │
│                      ↓                   ↓                       │
│         ┌────────────────────┐   ┌──────────────────┐          │
│         │  ProtectedRoute    │   │  PermissionGate  │          │
│         │  (Route Level)     │   │  (UI Level)      │          │
│         └────────────────────┘   └──────────────────┘          │
│                  ↓                         ↓                    │
│    ┌─────────────────────────────────────────────────────┐     │
│    │         AUTHORIZATION FLOW                          │     │
│    │                                                      │     │
│    │  IF NOT AUTHENTICATED:                              │     │
│    │    → Redirect to /login                             │     │
│    │                                                      │     │
│    │  IF AUTHENTICATED BUT NO PERMISSION:                │     │
│    │    → Redirect to /unauthorized                      │     │
│    │                                                      │     │
│    │  IF AUTHENTICATED + HAS PERMISSION:                 │     │
│    │    → Render Component/Children ✅                   │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### 1️⃣ User Login

```
User Input (Email/Password)
         ↓
   Backend API
         ↓
   JWT Token Generated
         ↓
   Frontend receives token
         ↓
   login(token) called
         ↓
   Token decoded & validated
         ↓
   User object stored in state
         ↓
   Token saved to localStorage
         ↓
   Redirect to protected page
```

### 2️⃣ Protected Route Access

```
User navigates to /users
         ↓
   ProtectedRoute intercepts
         ↓
   Checks: isAuthenticated?
         ↓
    ┌─── NO → Redirect to /login
    └─── YES → Continue
         ↓
   Checks: hasPermission(Permission.UsersView)?
         ↓
    ┌─── NO → Redirect to /unauthorized
    └─── YES → Render UsersPage ✅
```

### 3️⃣ Component-Level Gating

```
UsersPage renders
         ↓
   Encounters PermissionGate
         ↓
   hasPermission(Permission.UsersCreate)?
         ↓
    ┌─── NO → Hide button
    └─── YES → Show "Create User" button ✅
```

---

## 🎯 Component Hierarchy

```
App
 └─ BrowserRouter
     └─ AuthProvider ← Wraps entire app
         └─ Routes
             ├─ /login (Public)
             │   └─ LoginPage
             │
             ├─ /unauthorized (Public)
             │   └─ UnauthorizedPage
             │
             └─ /users (Protected)
                 └─ ProtectedRoute
                     ├─ requiredPermission: Permission.UsersView
                     └─ children: UsersPage
                         ├─ User List (Always visible)
                         │
                         ├─ PermissionGate (Permission.UsersCreate)
                         │   └─ Create Button
                         │
                         └─ For each user:
                             ├─ PermissionGate (Permission.UsersUpdate)
                             │   └─ Edit Button
                             │
                             └─ PermissionGate (Permission.UsersDelete)
                                 └─ Delete Button
```

---

## 🧩 Data Flow

### State Management

```
                   ┌─────────────────┐
                   │  localStorage   │
                   │  auth_token     │
                   └────────┬────────┘
                            ↓
                   On App Mount (useEffect)
                            ↓
                   ┌─────────────────┐
                   │  Decode Token   │
                   └────────┬────────┘
                            ↓
                   ┌─────────────────┐
                   │  Validate Exp   │
                   └────────┬────────┘
                            ↓
                   Valid? ─┬─ NO → Clear storage, user = null
                           └─ YES ↓
                   ┌─────────────────┐
                   │  Set User State │
                   │  user: {        │
                   │    id,          │
                   │    email,       │
                   │    roles,       │
                   │    permissions  │
                   │  }              │
                   └────────┬────────┘
                            ↓
                   isLoading = false
                            ↓
                   App Renders ✅
```

---

## 🔒 Permission Check Flow

```
Component calls hasPermission(Permission.UsersDelete)
                     ↓
          ┌──────────────────────┐
          │  Check: user exists? │
          └──────────┬───────────┘
                     ↓
              ┌──── NO → return false
              └──── YES ↓
          ┌──────────────────────────────────┐
          │  Check: permission in            │
          │  user.permissions array?         │
          └──────────┬───────────────────────┘
                     ↓
              ┌──── NO → return false
              └──── YES → return true ✅
```

---

## 🎭 User Scenarios

### Scenario 1: USER Role

```
user.permissions = ["users:view"]

/users route
    ↓
ProtectedRoute checks Permission.UsersView
    ↓
hasPermission("users:view") → ✅ TRUE
    ↓
Page renders
    ↓
Create button (PermissionGate)
    ↓
hasPermission("users:create") → ❌ FALSE
    ↓
Button HIDDEN
```

### Scenario 2: ADMIN Role

```
user.permissions = ["users:view", "users:create", "users:update"]

/users route
    ↓
ProtectedRoute checks Permission.UsersView
    ↓
hasPermission("users:view") → ✅ TRUE
    ↓
Page renders
    ↓
Create button (PermissionGate)
    ↓
hasPermission("users:create") → ✅ TRUE
    ↓
Button VISIBLE
    ↓
Delete button (PermissionGate)
    ↓
hasPermission("users:delete") → ❌ FALSE
    ↓
Button HIDDEN
```

### Scenario 3: SUPER_ADMIN Role

```
user.permissions = ["users:view", "users:create", "users:update", "users:delete"]

All permission checks return ✅ TRUE
All buttons VISIBLE
```

---

## 📦 Module Dependencies

```
main.tsx
  └─ imports App.tsx
      └─ imports AuthProvider
          ├─ imports types (Permission, User, JWTPayload)
          └─ imports jwt-decode
      └─ imports ProtectedRoute
          └─ imports AuthContext (useAuth)
              └─ imports types (Permission)
      └─ imports Pages
          ├─ LoginPage
          │   └─ imports AuthContext (useAuth)
          ├─ UsersPage
          │   ├─ imports AuthContext (useAuth)
          │   ├─ imports PermissionGate
          │   └─ imports types (Permission)
          └─ UnauthorizedPage
              └─ imports AuthContext (useAuth)
```

---

## 🛠️ Type System

```
Permission Enum (Single Source of Truth)
    ↓
┌─────────────────────────────────┐
│ Permission.UsersView            │ → "users:view"
│ Permission.UsersCreate          │ → "users:create"
│ Permission.UsersUpdate          │ → "users:update"
│ Permission.UsersDelete          │ → "users:delete"
└─────────────────────────────────┘
    ↓ Used by
┌─────────────────────────────────┐
│ hasPermission(permission)       │ ← Type-safe parameter
└─────────────────────────────────┘
    ↓ Used by
┌─────────────────────────────────┐
│ ProtectedRoute                  │ ← requiredPermission: Permission
│ PermissionGate                  │ ← permission: Permission
└─────────────────────────────────┘
```

---

## 🔄 Lifecycle Events

### App Initialization

```
1. App Mounts
2. AuthProvider mounts
3. useEffect runs
4. Check localStorage for token
5. If token exists:
   a. Decode token
   b. Validate expiration
   c. Set user state
6. Set isLoading = false
7. Routes evaluate
8. ProtectedRoute checks auth
9. Components render
```

### Login Event

```
1. User clicks login button
2. login(token) called
3. Token decoded
4. Token saved to localStorage
5. User state updated
6. Re-render triggered
7. Protected routes now accessible
8. Navigate to protected page
```

### Logout Event

```
1. User clicks logout
2. logout() called
3. localStorage.removeItem('auth_token')
4. Set user = null
5. Re-render triggered
6. ProtectedRoute detects no auth
7. Redirect to /login
```

---

## 📊 Security Layers

```
Layer 1: Route Level (ProtectedRoute)
    ↓ Blocks entire pages

Layer 2: Component Level (PermissionGate)
    ↓ Hides UI elements

Layer 3: Backend API (Required!)
    ↓ Validates all requests

🔒 Defense in Depth
```

---

## 🎓 Key Concepts

### 1. Permission-Based (NOT Role-Based)

```
❌ WRONG:
if (user.role === 'ADMIN') {
  showDeleteButton();
}

✅ RIGHT:
if (hasPermission(Permission.UsersDelete)) {
  showDeleteButton();
}
```

### 2. Type Safety

```
❌ WRONG (Magic String):
hasPermission('users:delte')  // Typo! Runtime error

✅ RIGHT (Enum):
hasPermission(Permission.UsersDelete)  // Compile-time safe
```

### 3. Memoization

```
hasPermission is memoized with useMemo
    ↓
Only recalculates when user object changes
    ↓
Prevents unnecessary re-renders
    ↓
Better performance ⚡
```

---

**This visual guide complements the text documentation.**

For implementation details, see:

- [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md)
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
