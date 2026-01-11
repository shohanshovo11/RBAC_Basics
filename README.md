# RBAC React - Enterprise Permission-Based Access Control

A production-ready, type-safe Permission-Based Access Control (PBAC) system for React applications.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
yarn install
```

### 2. Run Development Server

```bash
yarn dev
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
│   └── RoleGate.tsx          # UI-level guards
└── pages/
    ├── LoginPage.tsx         # Mock JWT login
    ├── UsersPage.tsx         # Demo page with RBAC
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
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
```