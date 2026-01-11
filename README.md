# RBAC React - Enterprise Permission-Based Access Control

A production-ready, type-safe Permission-Based Access Control (PBAC) system for React applications.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install react-router-dom jwt-decode
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Test the System

Open your browser and navigate to `http://localhost:5173`

Try logging in as:

- **USER** - Can only view (no create/delete)
- **ADMIN** - Can view and create (no delete)
- **SUPER_ADMIN** - Full access (view, create, update, delete)

## 📋 Features

✅ **Permission-Based** - NOT role-based (security best practice)  
✅ **Type-Safe** - TypeScript enums, zero magic strings  
✅ **JWT-Ready** - Decodes and validates JWT tokens  
✅ **Route Guards** - Protect routes with permission requirements  
✅ **Component Gates** - Conditionally render UI elements  
✅ **Production-Ready** - Audit-ready, enterprise-grade

## 🏗️ Architecture

```
src/
├── types/auth.types.ts       # Permission enums & interfaces
├── context/AuthContext.tsx   # Auth state management
├── components/auth/
│   ├── ProtectedRoute.tsx    # Route-level guards
│   └── PermissionGate.tsx    # UI-level guards
└── pages/
    ├── LoginPage.tsx         # Mock JWT login
    ├── UsersPage.tsx         # Demo page with PBAC
    └── UnauthorizedPage.tsx  # 403 page
```

## 🔐 Security Rules

**Rule Zero:** NEVER check roles (`user.role === 'admin'`)  
**Rule One:** ALWAYS check permissions (`hasPermission(Permission.UsersDelete)`)

## 📖 Documentation

See [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md) for:

- Complete API reference
- Usage examples
- Security best practices
- Production checklist

## 🎯 Permission Model

```typescript
enum Permission {
  UsersView = "users:view", // View user list
  UsersCreate = "users:create", // Create new users
  UsersUpdate = "users:update", // Edit existing users
  UsersDelete = "users:delete", // Delete users
}
```

## 📝 Usage Example

```tsx
import { PermissionGate } from "./components/auth/PermissionGate";
import { Permission } from "./types/auth.types";

// Only users with users:create permission will see this button
<PermissionGate permission={Permission.UsersCreate}>
  <button>Create User</button>
</PermissionGate>;
```

## 🚨 Important Notes

- Frontend permissions are for **UX only**
- **ALWAYS validate permissions on the backend**
- JWT tokens in demo are for testing only
- Replace mock tokens with real API integration

---

**Built for enterprise security standards** 🔒
