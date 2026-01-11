# 🚀 Installation & Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Step-by-Step Installation

### 1. Install TypeScript (if not already installed)

```bash
npm install -D typescript
```

### 2. Install All Dependencies

```bash
npm install
```

This will install:

- ✅ `react-router-dom` (already installed)
- ✅ `jwt-decode` (already installed)
- ✅ TypeScript types (already configured)

### 3. Verify Installation

Check that all dependencies are installed:

```bash
npm list react-router-dom jwt-decode typescript
```

Expected output:

```
rbac-react@1.0.0
├── jwt-decode@4.0.0
├── react-router-dom@7.12.0
└── typescript@5.7.3
```

### 4. Run Development Server

```bash
npm run dev
```

You should see:

```
  VITE v7.2.4  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open in Browser

Navigate to: `http://localhost:5173`

You should be redirected to the login page.

## Testing the System

### Test Scenario 1: USER Role

1. Click **"Login as USER"**
2. You should be redirected to `/users`
3. ✅ You can see the user list
4. ❌ You cannot see the "Create New User" button
5. ❌ You cannot see "Edit" or "Delete" buttons

### Test Scenario 2: ADMIN Role

1. Logout (if needed)
2. Click **"Login as ADMIN"**
3. You should be redirected to `/users`
4. ✅ You can see the user list
5. ✅ You can see the "Create New User" button
6. ✅ You can see "Edit" buttons
7. ❌ You cannot see "Delete" buttons

### Test Scenario 3: SUPER_ADMIN Role

1. Logout (if needed)
2. Click **"Login as SUPER ADMIN"**
3. You should be redirected to `/users`
4. ✅ You can see the user list
5. ✅ You can see the "Create New User" button
6. ✅ You can see "Edit" buttons
7. ✅ You can see "Delete" buttons

## Troubleshooting

### Issue: TypeScript errors in IDE

**Solution:** Restart your IDE/VS Code

```bash
# VS Code command palette
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Issue: Module not found errors

**Solution:** Clear cache and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Cannot find module 'jwt-decode'"

**Solution:** Ensure jwt-decode is installed

```bash
npm install jwt-decode
```

### Issue: Vite dev server won't start

**Solution:** Check if port 5173 is in use

```bash
# Kill process on port 5173 (Linux/Mac)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

## Build for Production

```bash
npm run build
```

This will:

1. Run TypeScript compiler (`tsc`)
2. Build with Vite
3. Output to `dist/` folder

## Preview Production Build

```bash
npm run preview
```

## File Structure Overview

```
rbac-react/
├── src/
│   ├── types/
│   │   └── auth.types.ts              # ✅ Created
│   ├── context/
│   │   └── AuthContext.tsx            # ✅ Created
│   ├── components/
│   │   └── auth/
│   │       ├── ProtectedRoute.tsx     # ✅ Created
│   │       └── PermissionGate.tsx     # ✅ Created
│   ├── pages/
│   │   ├── LoginPage.tsx              # ✅ Created
│   │   ├── UsersPage.tsx              # ✅ Created
│   │   └── UnauthorizedPage.tsx       # ✅ Created
│   ├── App.tsx                        # ✅ Created
│   ├── main.tsx                       # ✅ Updated
│   └── index.css                      # Existing
├── tsconfig.json                      # ✅ Created
├── tsconfig.node.json                 # ✅ Created
├── package.json                       # ✅ Updated
├── README.md                          # ✅ Updated
└── SECURITY_ARCHITECTURE.md           # ✅ Created
```

## Next Steps

1. **Read the Documentation**

   - Open [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md)
   - Understand the permission model

2. **Test All Scenarios**

   - Login as each user type
   - Verify permissions work correctly

3. **Integrate with Backend**

   - Replace mock tokens with real API calls
   - Update login logic in `LoginPage.tsx`

4. **Customize Permissions**
   - Add new permissions to `auth.types.ts`
   - Create new protected pages

## Quick Reference

### Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Key Files to Customize

| File                      | Purpose                          |
| ------------------------- | -------------------------------- |
| `src/types/auth.types.ts` | Add new permissions              |
| `src/pages/LoginPage.tsx` | Replace mock login with real API |
| `src/App.tsx`             | Add new protected routes         |
| `src/pages/UsersPage.tsx` | Reference implementation         |

## Success Checklist

- [ ] TypeScript compiles without errors
- [ ] Dev server runs successfully
- [ ] Can login as all 3 user types
- [ ] Permissions enforce correctly
- [ ] No console errors
- [ ] Protected routes redirect properly
- [ ] Unauthorized page displays correctly

## Support

For detailed documentation, see:

- [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md) - Full API reference
- [README.md](./README.md) - Quick start guide

---

**🎉 You're all set! Start building with enterprise-grade security.**
