# 🚀 QUICK REFERENCE CARD

## Enterprise RBAC System - Developer Cheat Sheet

---

## 📋 Essential Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔐 Permission Enum

```typescript
import { Permission } from "./types/auth.types";

Permission.UsersView; // users:view
Permission.UsersCreate; // users:create
Permission.UsersUpdate; // users:update
Permission.UsersDelete; // users:delete
```

---

## 🎣 useAuth Hook

```typescript
import { useAuth } from "./context/AuthContext";

const {
  user, // Current user object
  isAuthenticated, // Boolean: logged in?
  isLoading, // Boolean: loading state?
  hasPermission, // Function: check permission
  login, // Function: login with token
  logout, // Function: logout
} = useAuth();
```

---

## 🛡️ Route Protection

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

- Not logged in → `/login`
- No permission → `/unauthorized`
- Has permission → Render page

---

## 🚪 UI Gating

```tsx
import { PermissionGate } from "./components/auth/PermissionGate";
import { Permission } from "./types/auth.types";

<PermissionGate permission={Permission.UsersCreate}>
  <button>Create User</button>
</PermissionGate>;
```

**With fallback:**

```tsx
<PermissionGate
  permission={Permission.UsersDelete}
  fallback={<p>You don't have delete access</p>}
>
  <button>Delete</button>
</PermissionGate>
```

---

## ✅ Programmatic Check

```typescript
const { hasPermission } = useAuth();

if (hasPermission(Permission.UsersDelete)) {
  // User has delete permission
  performDelete();
} else {
  // User lacks permission
  alert("Access denied");
}
```

---

## 🔑 Login Flow

```typescript
import { useAuth } from "./context/AuthContext";

const { login } = useAuth();
const navigate = useNavigate();

// Get JWT from your backend API
const token = await fetchTokenFromBackend(credentials);

// Login with token
login(token);

// Redirect
navigate("/dashboard");
```

---

## 🚪 Logout Flow

```typescript
const { logout } = useAuth();
const navigate = useNavigate();

logout(); // Clears localStorage
navigate("/login"); // Redirect to login
```

---

## 📦 JWT Payload Structure

```typescript
{
  "sub": "user-123",           // User ID
  "email": "user@example.com", // Email
  "roles": ["ADMIN"],          // Metadata (don't use for logic!)
  "permissions": [             // Use THIS for logic ✅
    "users:view",
    "users:create",
    "users:update"
  ],
  "exp": 1735689600            // Expiration timestamp
}
```

---

## ❌ DON'T DO THIS

```typescript
// ❌ WRONG - Role-based check
if (user.role === 'ADMIN') { ... }

// ❌ WRONG - Magic string
hasPermission('users:delete')

// ❌ WRONG - Hidden with CSS
<button style={{display: hasPermission(...) ? 'block' : 'none'}}>
```

---

## ✅ DO THIS INSTEAD

```typescript
// ✅ RIGHT - Permission-based check
if (hasPermission(Permission.UsersDelete)) { ... }

// ✅ RIGHT - Type-safe enum
hasPermission(Permission.UsersDelete)

// ✅ RIGHT - Conditional rendering
<PermissionGate permission={Permission.UsersDelete}>
  <button>Delete</button>
</PermissionGate>
```

---

## 🧪 Test Users (Mock Login)

### USER

- **Email:** user@example.com
- **Permissions:** `users:view`
- **Can:** View list
- **Cannot:** Create, Edit, Delete

### ADMIN

- **Email:** admin@example.com
- **Permissions:** `users:view`, `users:create`, `users:update`
- **Can:** View, Create, Edit
- **Cannot:** Delete

### SUPER_ADMIN

- **Email:** super@example.com
- **Permissions:** All (`users:view`, `users:create`, `users:update`, `users:delete`)
- **Can:** Everything

---

## 📁 Key Files

| File                                 | What It Does                 |
| ------------------------------------ | ---------------------------- |
| `types/auth.types.ts`                | Permission enum & interfaces |
| `context/AuthContext.tsx`            | Auth state & logic           |
| `components/auth/ProtectedRoute.tsx` | Route guard                  |
| `components/auth/PermissionGate.tsx` | UI gate                      |
| `pages/LoginPage.tsx`                | Login page                   |
| `App.tsx`                            | Router config                |

---

## 🐛 Common Errors

### "useAuth must be used within AuthProvider"

**Fix:** Wrap your app in `<AuthProvider>`

### "Cannot read property 'permissions' of null"

**Fix:** Check `isLoading` before accessing `user`

```tsx
if (isLoading) return <LoadingSpinner />;
if (!user) return <LoginPage />;
```

### Redirect loop

**Fix:** Ensure default route is accessible or redirects to login

---

## 🔧 Adding New Permissions

### Step 1: Add to enum

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

### Step 2: Use in components

```tsx
<PermissionGate permission={Permission.ReportsExport}>
  <button>Export</button>
</PermissionGate>
```

### Step 3: Backend coordination

Ensure backend JWT includes new permission in the `permissions` array.

---

## 📊 Security Rules (CRITICAL)

### Rule Zero

**NEVER check roles**

```typescript
// ❌ FORBIDDEN
if (user.role === 'ADMIN') { ... }
```

### Rule One

**ALWAYS check permissions**

```typescript
// ✅ REQUIRED
if (hasPermission(Permission.UsersDelete)) { ... }
```

### Rule Two

**ALWAYS use enum**

```typescript
// ❌ FORBIDDEN
hasPermission("users:delete");

// ✅ REQUIRED
hasPermission(Permission.UsersDelete);
```

---

## 🎯 Pattern Examples

### Multiple permissions (OR)

```typescript
const canModify =
  hasPermission(Permission.UsersUpdate) ||
  hasPermission(Permission.UsersDelete);
```

### Multiple permissions (AND)

```typescript
const canAudit =
  hasPermission(Permission.UsersView) && hasPermission(Permission.ReportsView);
```

### Nested gates

```tsx
<PermissionGate permission={Permission.UsersView}>
  <UserList>
    <PermissionGate permission={Permission.UsersDelete}>
      <DeleteButton />
    </PermissionGate>
  </UserList>
</PermissionGate>
```

---

## 📚 Documentation Links

- **Quick Start:** [README.md](./README.md)
- **Full API Docs:** [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md)
- **Setup Guide:** [INSTALLATION.md](./INSTALLATION.md)
- **Security Audit:** [SECURITY_AUDIT_CHECKLIST.md](./SECURITY_AUDIT_CHECKLIST.md)
- **Project Summary:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## 🆘 Need Help?

1. Check documentation above
2. Review code examples
3. Test with mock users
4. Escalate to senior engineer

---

**Print this and keep it at your desk!** 📌

**Version:** 1.0.0  
**Last Updated:** January 11, 2026
