# 🔐 AutoSharm Admin Portal - Security Setup Guide

## Overview

Your admin portal now features **enterprise-grade security** with:
- ✅ Server-side authentication (credentials never exposed to browser)
- ✅ Secure HTTP-only cookies for session management
- ✅ Next.js Server Actions for credential validation
- ✅ Premium glassmorphism UI with AutoSharm styling
- ✅ Automatic session timeout (8 hours)
- ✅ TypeScript for type safety

---

## 🚀 Quick Start

### 1. **Access the Admin Portal**
```
Visit: http://localhost:3000/admin
```

### 2. **Default Login Credentials**
The `.env.local` file contains default credentials:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_123
```

### 3. **Login Process**
1. Navigate to `/admin`
2. Enter username and password
3. Click "Access Admin Panel"
4. On success → Full admin dashboard loads
5. On failure → "Invalid username or password" error appears

---

## 🔒 Security Architecture

### Server-Side Authentication
```typescript
// credentials stored SERVER-SIDE ONLY (app/admin/actions.ts)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

// Never sent to browser
// Environment variables checked on server
// No NEXT_PUBLIC_ prefix = invisible to client
```

### Session Management
```typescript
// Secure HTTP-only cookie (httpOnly: true)
// Cannot be accessed by JavaScript
// Automatically expires in 8 hours
// Strict same-site policy
// Secure flag on HTTPS (production)
```

### Request Flow
```
Browser (Client)
    ↓
  Form Submit
    ↓
Server Action (authenticateAdmin)
    ↓
Validates credentials against process.env
    ↓
Sets secure HTTP-only cookie
    ↓
Returns success/error to client
    ↓
Browser shows dashboard or error
```

---

## ⚙️ Configuration

### Environment Variables

**File:** `.env.local` (kept out of git by default)

```bash
# Required: Admin credentials
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

### Production Setup

**For your production environment:**

1. **Set environment variables securely:**
   - Use your hosting provider's secrets manager (Vercel, Railway, etc.)
   - Never commit `.env.local` to version control
   - Use strong passwords: minimum 16 characters, mix of uppercase, lowercase, numbers, symbols

2. **Example for Vercel:**
   ```bash
   vercel env add ADMIN_USERNAME
   vercel env add ADMIN_PASSWORD
   ```

3. **Example for Railway:**
   - Go to Project Settings → Variables
   - Add `ADMIN_USERNAME` and `ADMIN_PASSWORD`

---

## 📁 File Structure

```
app/admin/
├── page.tsx                 # Main secure admin page with authentication
├── login.tsx               # Login UI component (client-side)
├── actions.ts              # Server actions for authentication
└── (other features)

.env.local                  # Local development credentials (not in git)
```

### Key Files Explained

**`app/admin/actions.ts`** (Server Actions)
- `authenticateAdmin(username, password)` - Validates credentials
- `verifyAdminSession()` - Checks if user has valid session
- `logoutAdmin()` - Clears session cookie

**`app/admin/login.tsx`** (Client Component)
- Login form with AutoSharm styling
- Password visibility toggle
- Error message display
- Loading states with spinner

**`app/admin/page.tsx`** (Main Page)
- Authentication check on mount
- Redirects unauthenticated users to login
- Full admin dashboard when authenticated
- Logout button for session termination

---

## 🎨 UI Features

### Login Page
- **Dark Theme:** Black (#0a0a0a) and dark blue (#0f1419)
- **Gold Accents:** Premium gold (#D4AF37)
- **Glassmorphism:** Blurred background effect
- **AutoSharm Logo:** Displayed at top of login card
- **Lock Icon:** Security indicator next to login button
- **Password Toggle:** Show/hide password visibility
- **Error Messages:** Gold-highlighted error display
- **Loading State:** Animated spinner during authentication

### Admin Dashboard
- **Header:** Professional dark header with logout button
- **6 Tabs:** Vehicles, News, Inquiries, Reviews, FAQ, Settings
- **Dashboard Stats:** 5 key metrics at a glance
- **Content Management:** Full CRUD operations for all features

---

## 🔄 Session Management

### Session Duration
- **Default:** 8 hours
- **Cookie Type:** HTTP-only, Secure, SameSite=Strict
- **Auto-Logout:** Refreshing page after session expires shows login

### Logout Button
Located in the admin header:
```typescript
// Click "Logout" to:
// 1. Clear session cookie
// 2. Return to login page
// 3. Redirect unauthenticated back to /admin
```

### Manual Session Termination
```typescript
// Call from client side:
await logoutAdmin();
setIsAuthenticated(false);
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Change default credentials immediately
- Use strong, unique passwords
- Store credentials in secure secrets manager (production)
- Rotate credentials regularly
- Keep .env.local out of version control
- Use HTTPS in production

### ❌ DON'T:
- Use "admin" as username
- Use simple passwords like "password123"
- Commit .env.local to Git
- Expose credentials in logs
- Use same credentials across environments
- Skip HTTPS in production

---

## 🚨 Troubleshooting

### Login Not Working
**Problem:** "Invalid username or password"
- **Solution:** Verify .env.local file exists with correct credentials
- **Check:** `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set

### Session Expires Immediately
**Problem:** Logged out after page refresh
- **Solution:** Browser cookies may be disabled
- **Check:** Enable cookies in browser settings

### Can't Access Admin After Setting Credentials
**Problem:** Login page shows but credentials don't work
- **Solution:** Restart dev server to load .env.local
- **Command:** `npm run dev`

### Production Authentication Issues
**Problem:** Works locally but not on deployed site
- **Solution:** Environment variables not set on hosting provider
- **Fix:** Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` to provider's secrets

---

## 🔐 Advanced Security Topics

### HTTPS in Production (Recommended)
```typescript
// In actions.ts - automatically enabled
secure: process.env.NODE_ENV === "production"
// Only sends cookie over HTTPS
```

### CSRF Protection
Next.js Server Actions automatically:
- Include CSRF tokens
- Validate origin headers
- Prevent cross-site requests

### Rate Limiting (Optional - Future Enhancement)
```typescript
// Consider adding for production:
// - Failed login attempt throttling
// - IP-based rate limiting
// - Login attempt logging
```

---

## 📝 Email Alerts (Optional Integration)

To add login notifications:

```typescript
// In authenticateAdmin function:
if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
  // Send email alert
  await sendLoginAlert({
    email: process.env.ADMIN_EMAIL,
    timestamp: new Date(),
    ipAddress: headers().get("x-forwarded-for")
  });
}
```

---

## 🚀 Deployment Checklist

- [ ] Change default credentials in .env.local
- [ ] Ensure .env.local is in .gitignore
- [ ] Set environment variables on hosting provider
- [ ] Test login on staging environment
- [ ] Enable HTTPS on production domain
- [ ] Set up monitoring/logging for login attempts
- [ ] Create backup admin account (separate credentials)
- [ ] Document credential recovery process
- [ ] Update team on login credentials (secure communication)

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review the troubleshooting section
3. Check Next.js Server Actions documentation
4. Review environment variable setup for your hosting provider

---

**Security Last Updated:** March 18, 2026  
**Next.js Version:** 16.1.6+  
**React Version:** 19.2.4+  
**TypeScript Version:** 5.7.3+
